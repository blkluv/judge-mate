import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../../firebase/firestore/fetchData";
import deleteData from "../../../../../firebase/firestore/deleteData";
import { auth } from "../../../../../firebase/config.js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./MyCreatedEventsList.module.css";

function MyCreatedEventsList() {
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
        const userCreatedEvents = data.filter(
          (event) => event.roles[currentUser.uid] === "organizer"
        );
        setUserEvents(userCreatedEvents);
      }

      if (error) {
        setError(error);
      }

      setLoading(false);
    }

    fetchUserEvents();
  }, [currentUser]);

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteData("events", eventId);
      await deleteData(`users/${currentUser.uid}/userEvents`, eventId);
      router.push("/dashboard/my-events");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("There was an error deleting the event. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error loading events: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Created Events</h1>
      {userEvents.length ? (
        <ul className={styles.eventsList}>
          {userEvents.map((event) => (
            <li key={event.id} className={styles.eventItem}>
              <Link href={`/dashboard/events/${event.id}`}>
                <span className={styles.eventLink}>
                  {event.eventName} - {event.eventDate}
                </span>
              </Link>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteEvent(event.id)}
              >
                Delete Event
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events created yet.</p>
      )}
    </div>
  );
}

export default MyCreatedEventsList;
