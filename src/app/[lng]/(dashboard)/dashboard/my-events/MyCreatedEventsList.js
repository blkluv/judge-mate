import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../../firebase/firestore/fetchData";
import deleteData from "../../../../../firebase/firestore/deleteData";
import { auth } from "../../../../../firebase/config.js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./MyCreatedEventsList.module.css";
import PopupConfirmation from "../components/popup-confirmation/PopupConfirmation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../firebase/config";

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
      console.log(
        "Starting event deletion process for event ID:",
        eventToDelete
      );

      const eventRef = doc(db, "events", eventToDelete);
      const eventSnapshot = await getDoc(eventRef);
      const event = eventSnapshot.data();

      if (event && event.roles) {
        console.log("Found event roles:", event.roles);

        // Usuń wydarzenie z kolekcji userEvents dla każdego użytkownika
        for (const userId in event.roles) {
          console.log("Deleting event for user ID:", userId);
          await deleteData(`users/${userId}/userEvents`, eventToDelete);
        }
      } else {
        console.log("No roles found for the event or event not found.");
      }

      // Usuń wydarzenie z kolekcji "events"
      console.log("Deleting event from main events collection.");
      await deleteData("events", eventToDelete);

      // Aktualizacja stanu userEvents po usunięciu wydarzenia
      console.log("Updating local state for user events.");
      setUserEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventToDelete)
      );

      console.log("Closing confirmation popup.");
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
