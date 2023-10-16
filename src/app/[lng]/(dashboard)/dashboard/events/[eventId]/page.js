"use client";
import React, { useEffect, useState, createContext } from "react";
import { fetchData } from "../../../../../../firebase/firestore/fetchData";
import { useAuthContext } from "../../../../../../firebase/context/AuthContext";
import styles from "./page.module.css";
import EventUsers from "./(users-management)/EventUsers";
import JudgingTableCreator from "./components/JudgingTableCreator";
import JudgeScoring from "./components/JudgeScoring";
import AllParticipantsScoresTable from "./components/AllParticipantsScoresTable";
import EventDetails from "./(event-details)/EventDetails";
import JudgingCriteriaDisplay from "./components/JudgingCriteriaDisplay";
import ManageUserEvent from "./(users-management)/ManageUserEvent";
import JoinEvent from "./components/JoinEvent";
import {
  GoogleMapsProvider,
  useGoogleMaps,
} from "./(event-details)/GoogleMapsContext";

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

  const userRole = eventData?.roles?.[user?.uid]?.role;
  const isJudge = userRole === "judge";
  const isOrganizer = userRole === "organizer";
  const hasNoRole = !userRole;

  if (loading) {
    return <div>Loading event...</div>;
  }

  if (error) {
    return <div>Error loading event: {error.message}</div>;
  }

  return (
    <GoogleMapsProvider>
      <EventContext.Provider value={eventData}>
        <div className={styles.container}>
          <EventDetails
            eventId={eventId}
            eventData={eventData}
            currentUser={user}
          />
          <div className={styles.eventUserManagementSection}>
            {hasNoRole && <JoinEvent eventId={eventId} currentUser={user} />}
            {isOrganizer && (
              <ManageUserEvent
                eventId={eventId}
                onUserUpdated={() => setRefreshData((prev) => !prev)}
              />
            )}

            <EventUsers eventId={eventId} refreshData={refreshData} />
          </div>
          <div className={styles.eventTableCreatorSection}>
            {isOrganizer && <JudgingTableCreator eventId={eventId} />}
            <JudgingCriteriaDisplay eventId={eventId} />
          </div>

          {isJudge && <JudgeScoring eventId={eventId} userId={user.uid} />}
          <AllParticipantsScoresTable eventId={eventId} />
        </div>
      </EventContext.Provider>{" "}
    </GoogleMapsProvider>
  );
}

export default Page;
