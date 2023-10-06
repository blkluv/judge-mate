import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Poprawiony import
import { auth } from "../../../../../../firebase/config.js";
import addData from "../../../../../../firebase/firestore/addData.js";
import styles from "./CreateEvent.module.css";

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventCategories, setEventCategories] = useState("");
  const [eventSafety, setEventSafety] = useState("");
  const [eventFees, setEventFees] = useState("");
  const [eventContact, setEventContact] = useState("");

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
      eventLocation,
      eventDescription,
      eventCategories,
      eventSafety,
      eventFees,
      eventContact,
      roles: {
        [currentUser.uid]: "organizer",
      },
    };

    try {
      const { result: eventDocRef, error } = await addData(
        "events",
        null,
        eventData
      );

      if (error) {
        throw error;
      }

      const userEventRole = {
        role: "organizer",
        joinedAt: new Date().toISOString(),
      };

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
      setEventLocation("");
      setEventDescription("");
      setEventCategories("");
      setEventSafety("");
      setEventFees("");
      setEventContact("");

      alert("Event successfully created!");
      router.push(`/dashboard/events/${eventDocRef.id}`);
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
          <label className={styles.label}>
            Location:
            <input
              type="text"
              value={eventLocation}
              onChange={(e) => setEventLocation(e.target.value)}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Description:
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className={styles.textarea}
            />
          </label>
          <label className={styles.label}>
            Categories:
            <input
              type="text"
              value={eventCategories}
              onChange={(e) => setEventCategories(e.target.value)}
              className={styles.textarea}
            />
          </label>
          <label className={styles.label}>
            Safety Information:
            <textarea
              value={eventSafety}
              onChange={(e) => setEventSafety(e.target.value)}
              className={styles.textarea}
            />
          </label>
          <label className={styles.label}>
            Fees:
            <input
              type="text"
              value={eventFees}
              onChange={(e) => setEventFees(e.target.value)}
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Contact Information:
            <input
              type="text"
              value={eventContact}
              onChange={(e) => setEventContact(e.target.value)}
              className={styles.input}
            />
          </label>
          <button
            type="button"
            onClick={handleCreateEvent}
            className={styles.button}
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
