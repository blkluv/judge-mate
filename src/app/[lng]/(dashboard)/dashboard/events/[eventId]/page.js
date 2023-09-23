"use client";
import React, { useEffect, useState, createContext } from "react";
import { fetchData } from "../../../../../../firebase/firestore/fetchData";
import { useAuthContext } from "../../../../../../firebase/context/AuthContext";
import styles from "./page.module.css";
import AddUserToEvent from "./(users-management)/AddUserToEvent";
import EventUsers from "./(users-management)/EventUsers";
import JudgingTableCreator from "./components/JudgingTableCreator";
import RemoveUserFromEvent from "./(users-management)/RemoveUserFromEvent";
import JudgeScoring from "./components/JudgeScoring";
import AllParticipantsScoresTable from "./components/AllParticipantsScoresTable";
import EventDetails from "./components/EventDetails";
import JudgingTableDisplay from "./components/JudgingTableDisplay";

const EventContext = createContext();

function Page({ params: { eventId } }) {
  const { user } = useAuthContext();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

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
      <div className={styles.container}>
        <EventDetails eventData={eventData} />
        <div className={styles.eventUserManagementSection}>
          {isOrganizer && (
            <AddUserToEvent
              eventId={eventId}
              onUserAdded={() => setRefreshData((prev) => !prev)}
            />
          )}{" "}
          <EventUsers eventId={eventId} refreshData={refreshData} />
          {isOrganizer && <RemoveUserFromEvent eventId={eventId} />}{" "}
        </div>
        <div className={styles.eventTableCreatorSection}>
          {" "}
          {isOrganizer && <JudgingTableCreator eventId={eventId} />}
          <JudgingTableDisplay eventId={eventId} />
        </div>

        {isJudge && <JudgeScoring eventId={eventId} userId={user.uid} />}
        <AllParticipantsScoresTable eventId={eventId} />
      </div>
    </EventContext.Provider>
  );
}

export default Page;
