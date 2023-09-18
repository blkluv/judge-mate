import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../../firebase/firestore/fetchData";
import Link from "next/link";
import styles from "./MyEventsList.module.css";
import { useAuthContext } from "../../../../../firebase/context/AuthContext";

function MyEventsList() {
  const { user } = useAuthContext();
  const [state, setState] = useState({
    userEvents: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!user) {
        setState((prev) => ({ ...prev, loading: false }));
        return;
      }

      try {
        const { data } = await fetchData("events");

        if (data) {
          const userParticipatedEvents = data.filter((event) => {
            const roles = event.roles;
            const userRole = roles[user.uid];
            return userRole && userRole !== "none";
          });

          setState({
            userEvents: userParticipatedEvents,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        setState({ userEvents: [], loading: false, error });
      }
    };

    fetchUserEvents();
  }, [user]);

  if (state.loading) {
    return <div>Loading events...</div>;
  }

  if (state.error) {
    return <div>Error loading events: {state.error.message}</div>;
  }

  return (
    <div>
      <h1 className={styles.title}>Your Participated Events</h1>
      <ul className={styles.eventList}>
        {state.userEvents.map((event) => (
          <li key={event.id} className={styles.eventItem}>
            <Link
              href={`/dashboard/events/${event.id}`}
              className={styles.eventLink}
            >
              <span className={styles.eventName}>{event.eventName}</span>
              <span className={styles.eventDate}>{event.eventDate}</span>
              <span className={styles.eventRole}>
                Role: {event.roles[user.uid]}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyEventsList;
