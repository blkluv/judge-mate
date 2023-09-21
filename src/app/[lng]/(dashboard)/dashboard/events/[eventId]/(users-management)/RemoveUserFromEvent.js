import React, { useState } from "react";
import { db } from "../../../../../../../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import styles from "./RemoveUserFromEvent.module.css";

const RemoveUserFromEvent = ({ eventId }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleRemoveUser = async () => {
    if (!username) {
      setError("Please provide a username.");
      return;
    }

    try {
      // 1. Find the user ID for the given username
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const userSnapshot = await getDocs(q);

      if (userSnapshot.empty) {
        setError("User not found.");
        return;
      }

      const userId = userSnapshot.docs[0].id;

      // 2. Pobierz obecne role z dokumentu wydarzenia
      const eventRef = doc(db, "events", eventId);
      const eventSnapshot = await getDoc(eventRef);
      const event = eventSnapshot.data();

      if (!event) {
        setError("Event not found.");
        return;
      }

      // 3. Usuń ID użytkownika z tablicy roles
      const updatedRoles = { ...event.roles };
      delete updatedRoles[userId];

      // 4. Zaktualizuj dokument wydarzenia
      await updateDoc(eventRef, {
        roles: updatedRoles,
      });

      // 5. Delete the user's events subcollection record for this event
      const userEventRef = doc(db, `users/${userId}/userEvents/${eventId}`);
      await deleteDoc(userEventRef);

      setError(""); // Wyczyść ewentualny poprzedni błąd
      setUsername(""); // Wyczyść pole wejściowe
      alert("User successfully removed from the event!");
    } catch (error) {
      console.error("Error removing user from event:", error);
      setError(
        "An error occurred while trying to remove the user from the event."
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Remove User from Event</h2>
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
        </label>
        <button
          type="button"
          onClick={handleRemoveUser}
          className={styles.button}
        >
          Remove User
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
};

export default RemoveUserFromEvent;
