import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../../firebase/firestore/fetchData";
import Link from "next/link";
import styles from "./UpcomingEvents.module.css";

function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const { data } = await fetchData("events");

        if (data) {
          setEvents(data);
          setLoading(false);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error loading events: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upcoming Events</h1>
      <ul className={styles.eventList}>
        {events.map((event) => (
          <li key={event.id} className={styles.eventItem}>
            <Link href={`/dashboard/events/${event.id}`}>
              <div className={styles.eventLink}>
                <span className={styles.eventName}>{event.eventName}</span>
                <span className={styles.eventDate}>{event.eventDate}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingEvents;
