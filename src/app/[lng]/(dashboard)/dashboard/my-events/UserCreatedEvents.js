import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../../firebase/firestore/fetchData";
import deleteData from "../../../../../firebase/firestore/deleteData";
import { auth } from "../../../../../firebase/config.js";
import { useRouter } from "next/navigation";
import Link from "next/link";

function RemoveUserFromEventList() {
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    async function fetchUserEvents() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      const { data, error } = await fetchData("events");

      if (data) {
        const currentUserEvents = data.filter(
          (event) => event.roles && event.roles[currentUser.uid]
        );
        setUserEvents(currentUserEvents);
      }

      if (error) {
        setError(error);
      }

      setLoading(false);
    }

    fetchUserEvents();
  }, [currentUser]);

  const handleRemoveUserFromEvent = async (eventId) => {
    try {
      // 1. Remove the user's role from the event
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, {
        [`roles.${currentUser.uid}`]: FieldValue.delete(),
      });

      // 2. Delete the event entry from the `userEvents` subcollection of the user
      await deleteData(`users/${currentUser.uid}/userEvents`, eventId);

      // Redirect the user to the list of events after removal
      router.push("/dashboard/my-events");
    } catch (error) {
      console.error("Error removing user from event:", error);
      alert(
        "There was an error removing the user from the event. Please try again."
      );
    }
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error loading events: {error.message}</div>;
  }

  return (
    <div>
      <h1>Events you're participating in</h1>
      <ul>
        {userEvents.map((event) => (
          <li key={event.id}>
            <Link href={`/dashboard/events/${event.id}`}>
              {event.eventName} - {event.eventDate}
            </Link>
            <button onClick={() => handleRemoveUserFromEvent(event.id)}>
              Remove from Event
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RemoveUserFromEventList;
