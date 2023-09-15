"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../../../firebase/firestore/fetchData";
import AddUserToEvent from "./components/AddUserToEvent";
import EventUsers from "./components/EventUsers";
import JudgingTableCreator from "./components/JudgingTableCreator";
import RemoveUserFromEvent from "./components/RemoveUserFromEvent";
import JudgeScoring from "./components/JudgeScoring"; // Import JudgeScoring component
import AllParticipantsScoresTable from "./components/AllParticipantsScoresTable";
import { useAuthContext } from "../../../../../../firebase/context/AuthContext"; // Import the AuthContext

function Page({ params: { eventId } }) {
  const router = useRouter();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuthContext(); // Get user from AuthContext

  useEffect(() => {
    // Ensure router is ready before attempting to access query parameters
    if (router.isReady) {
      const { eventId } = router.query;
      setEventData({ ...eventData, eventId });
    }
  }, [router.isReady]);

  useEffect(() => {
    if (eventId) {
      // Fetch event data
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

      fetchEvent();
    }
  }, [eventId]);

  // Check if user is a judge for this event
  const isJudge = eventData?.roles?.[user?.uid] === "judge";

  const isOrganizer = eventData?.roles?.[user?.uid] === "organizer"; // Check if user is an organizer

  if (loading) {
    return <div>Loading event...</div>;
  }

  if (error) {
    return <div>Error loading event: {error.message}</div>;
  }

  return (
    <div>
      <h1>{eventData?.eventName}</h1>
      <p>Date: {eventData?.eventDate}</p>
      {isOrganizer && <AddUserToEvent eventId={eventId} />}{" "}
      {isOrganizer && <RemoveUserFromEvent eventId={eventId} />}{" "}
      {/* Display AddUserToEvent for organizers */}
      <EventUsers eventId={eventId} />
      {isOrganizer && <JudgingTableCreator eventId={eventId} />}{" "}
      {/* Display JudgingTableCreator for organizers */}
      {isJudge && <JudgeScoring eventId={eventId} userId={user.uid} />}{" "}
      {/* Display JudgeScoring if user is a judge */}
      <AllParticipantsScoresTable eventId={eventId} />
    </div>
  );
}

export default Page;
