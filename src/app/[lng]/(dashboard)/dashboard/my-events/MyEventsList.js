import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { fetchData } from "../../../../../firebase/firestore/fetchData";
import Link from "next/link";
import styles from "./MyEventsList.module.css";
import { useAuthContext } from "../../../../../firebase/context/AuthContext";

const MyEventsList = forwardRef((props, ref) => {
  const { user } = useAuthContext();
  const [state, setState] = useState({
    userEvents: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchUserEvents();
  }, [user]);

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

  useImperativeHandle(ref, () => ({
    refreshEvents: () => {
      fetchUserEvents();
    },
  }));

  if (state.loading) {
    return <div>Loading events...</div>;
  }

  if (state.error) {
    return <div>Error loading events: {state.error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Participated Events</h1>
      {state.userEvents.length ? (
        <table className={styles.eventsTable}>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {state.userEvents.map((event) => (
              <tr key={event.id}>
                <td>
                  <Link href={`/dashboard/events/${event.id}`}>
                    <div className={styles.eventLink}>{event.eventName}</div>
                  </Link>
                </td>
                <td>{event.eventDate}</td>
                <td>{event.roles[user.uid]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No events participated in yet.</p>
      )}
    </div>
  );
});

export default MyEventsList;
