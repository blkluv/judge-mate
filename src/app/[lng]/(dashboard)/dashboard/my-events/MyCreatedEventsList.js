import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../../firebase/firestore/fetchData";
import deleteData from "../../../../../firebase/firestore/deleteData";
import { auth } from "../../../../../firebase/config.js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./MyCreatedEventsList.module.css";
import PopupConfirmation from "../components/popup-confirmation/PopupConfirmation";

function MyCreatedEventsList() {
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility
  const [eventToDelete, setEventToDelete] = useState(null); // State to store the event ID to delete
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

  const handleDeleteEvent = async () => {
    try {
      await deleteData("events", eventToDelete);
      await deleteData(`users/${currentUser.uid}/userEvents`, eventToDelete);

      // Aktualizacja stanu userEvents po usunięciu wydarzenia
      setUserEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventToDelete)
      );

      setShowPopup(false); // Close the popup after deleting
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
        <table className={styles.eventsTable}>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userEvents.map((event) => (
              <tr key={event.id}>
                <td>
                  <Link href={`/dashboard/events/${event.id}`}>
                    <div className={styles.eventLink}>{event.eventName}</div>
                  </Link>
                </td>
                <td>{event.eventDate}</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => {
                      setEventToDelete(event.id);
                      setShowPopup(true);
                    }}
                  >
                    Delete Event
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No events created yet.</p>
      )}

      {showPopup && (
        <PopupConfirmation
          message="Are you sure you want to delete this event?"
          onConfirm={handleDeleteEvent}
          onCancel={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
export default MyCreatedEventsList;
