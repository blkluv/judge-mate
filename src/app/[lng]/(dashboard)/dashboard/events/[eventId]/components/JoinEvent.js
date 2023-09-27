import React, { useState } from "react";
import { db } from "../../../../../../../firebase/config";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import styles from "./JoinEvent.module.css";

const JoinEvent = ({ eventId, currentUser }) => {
  const [role, setRole] = useState("participant"); // default role

  const handleJoinEvent = async () => {
    if (!role) {
      alert("Please select a role.");
      return;
    }

    try {
      const userEventRef = doc(
        db,
        `users/${currentUser.uid}/userEvents`,
        eventId
      );
      const userEventSnapshot = await getDoc(userEventRef);
      const userData = userEventSnapshot.data();

      console.log("User Event Data:", userData);

      if (userData) {
        alert("You have already joined this event.");
        return;
      }

      const userEventRole = {
        role,
        joinedAt: new Date().toISOString(),
        isApproved: false,
      };

      // Update the user's events subcollection to reflect their role and the event
      await setDoc(userEventRef, userEventRole);

      // Update the event to include the new user role
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, {
        [`roles.${currentUser.uid}`]: role,
      });

      alert("Successfully joined the event!");
    } catch (error) {
      console.error("Error joining the event:", error);
      alert("An error occurred while joining the event.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Join Event</h2>
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Role:
          <select
            className={styles.select}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="participant">Participant</option>
            <option value="judge">Judge</option>
            <option value="cameraman">Cameraman</option>
          </select>
        </label>
        <button
          className={styles.button}
          type="button"
          onClick={handleJoinEvent}
        >
          Join Event
        </button>
      </div>
    </div>
  );
};

export default JoinEvent;
