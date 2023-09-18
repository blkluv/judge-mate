"use client";
import React, { useEffect, useState, useContext, createContext } from "react";
import { fetchData } from "../../../../../../firebase/firestore/fetchData";
import { useAuthContext } from "../../../../../../firebase/context/AuthContext";
import styles from "./page.module.css";
import AddUserToEvent from "./(users-management)/AddUserToEvent";
import EventUsers from "./(users-management)/EventUsers";
import JudgingTableCreator from "./components/JudgingTableCreator";
import RemoveUserFromEvent from "./(users-management)/RemoveUserFromEvent";
import JudgeScoring from "./components/JudgeScoring";
import AllParticipantsScoresTable from "./components/AllParticipantsScoresTable";

const EventContext = createContext();

function Page({ params: { eventId } }) {
  const { user } = useAuthContext();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvent() {
      const { data, error } = await fetchData("events", eventId);

      if (data) {
        setEventData(data);
      }
      if (error) {
        setError(error);
      }

      setLoading(false);
    }

    if (eventId) fetchEvent();
  }, [eventId]);

  const isJudge = eventData?.roles?.[user?.uid] === "judge";
  const isOrganizer = eventData?.roles?.[user?.uid] === "organizer";

  if (loading) {
    return <div>Loading event...</div>;
  }

  if (error) {
    return <div>Error loading event: {error.message}</div>;
  }

  return (
    <EventContext.Provider value={eventData}>
      <div>
        <h1>{eventData?.eventName}</h1>
        <p>Date: {eventData?.eventDate}</p>
        {isOrganizer && <AddUserToEvent eventId={eventId} />}
        {isOrganizer && <RemoveUserFromEvent eventId={eventId} />}
        <EventUsers eventId={eventId} />
        {isOrganizer && <JudgingTableCreator eventId={eventId} />}
        {isJudge && <JudgeScoring eventId={eventId} userId={user.uid} />}
        <AllParticipantsScoresTable eventId={eventId} />
      </div>
    </EventContext.Provider>
  );
}

export default Page;
