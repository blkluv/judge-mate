"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchData } from "../../../../../../firebase/firestore/fetchData";
import AddUserToEvent from "../../components/AddUserToEvent";
import EventUsers from "../../components/EventUsers";
import JudgingTableCreator from "../../components/JudgingTableCreator";
import JudgingTableDisplay from "../../components/JudgingTableDisplay";
import JudgeScoring from "../../components/JudgeScoring"; // Import JudgeScoring component
import AllParticipantsScoresTable from "../../components/AllParticipantsScoresTable";
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
      <AddUserToEvent eventId={eventId} />
      <EventUsers eventId={eventId} />
      <JudgingTableCreator eventId={eventId} />
      <JudgingTableDisplay eventId={eventId} />
      {isJudge && <JudgeScoring eventId={eventId} userId={user.uid} />}{" "}
      {/* Display JudgeScoring if user is a judge */}
      <AllParticipantsScoresTable eventId={eventId} />
    </div>
  );
}

export default Page;
