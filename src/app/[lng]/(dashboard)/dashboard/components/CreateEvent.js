import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../../../firebase/config.js";
import addData from "../../../../../firebase/firestore/addData.js";

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
      // Optionally, redirect user to a different page after event creation
      // router.push('/path-to-next-page');
    } catch (error) {
      console.error("Error creating event:", error);
      alert("There was an error creating the event. Please try again.");
    }
  };

  return (
    <div>
      <h1>Create New Event</h1>
      <form>
        <label>
          Event Name:
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </label>
        <label>
          Event Date:
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleCreateEvent}>
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
