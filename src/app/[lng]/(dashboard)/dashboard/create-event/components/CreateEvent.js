import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Popraw import
import { auth } from "../../../../../../firebase/config.js";
import addData from "../../../../../../firebase/firestore/addData.js";
import styles from "./CreateEvent.module.css";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  // Get the current user
  const currentUser = auth.currentUser;
  const router = useRouter();

  const handleCreateEvent = async () => {
    if (!eventName || !eventDate) {
      alert("Please provide both event name and date.");
      return;
    }

    const eventData = {
      eventName,
      eventDate,
      roles: {
        [currentUser.uid]: "organizer",
      },
    };

    try {
      // Add the new event to the events collection
      const { result: eventDocRef, error } = await addData(
        "events",
        null,
        eventData
      );

      if (error) {
        throw error;
      }

      // Update the user's events subcollection to include the event role
      const userEventRole = {
        role: "organizer",
        joinedAt: new Date().toISOString(),
      };

      // This now writes to the subcollection 'userEvents' of the user's document
      const { error: userUpdateError } = await addData(
        `users/${currentUser.uid}/userEvents`,
        eventDocRef.id,
        userEventRole
      );

      if (userUpdateError) {
        throw userUpdateError;
      }

      setEventName("");
      setEventDate("");

      alert("Event successfully created!");

      // Przekieruj użytkownika na stronę wydarzenia po jego utworzeniu
      router.push(`/dashboard/events/${eventDocRef.id}`); // Zmień na właściwą ścieżkę URL
    } catch (error) {
      console.error("Error creating event:", error);
      alert("There was an error creating the event. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Create New Event</h1>
        <form>
          <label className={styles.label}>
            Event Name:
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Event Date:
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className={styles.input}
            />
          </label>
          <button
            type="button"
            onClick={handleCreateEvent}
            className={styles.button}
          >
            {" "}
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};
export default CreateEvent;
