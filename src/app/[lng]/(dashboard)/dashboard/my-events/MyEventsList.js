import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../../firebase/firestore/fetchData";
import { auth } from "../../../../../firebase/config.js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./MyEventsList.module.css"; // Importuj nowoczesne style

function MyEventsList() {
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    async function fetchUserEvents() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      const { data, error } = await fetchData("events");

      if (data) {
        // Odfiltruj wydarzenia, zostawiając tylko te, w których użytkownik bierze udział
        const userParticipatedEvents = data.filter((event) => {
          const roles = event.roles;
          const userRole = roles[currentUser.uid];
          return userRole && userRole !== "none";
        });

        setUserEvents(userParticipatedEvents);
      }

      if (error) {
        setError(error);
      }

      setLoading(false);
    }

    fetchUserEvents();
  }, [currentUser]);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error loading events: {error.message}</div>;
  }

  return (
    <div>
      <h1 className={styles.title}>Your Participated Events</h1>
      <ul className={styles.eventList}>
        {userEvents.map((event) => (
          <li key={event.id} className={styles.eventItem}>
            <Link
              href={`/dashboard/events/${event.id}`}
              className={styles.eventLink}
            >
              <span className={styles.eventName}>{event.eventName}</span>
              <span className={styles.eventDate}>{event.eventDate}</span>
              <span className={styles.eventRole}>
                Role: {event.roles[currentUser.uid]}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyEventsList;
