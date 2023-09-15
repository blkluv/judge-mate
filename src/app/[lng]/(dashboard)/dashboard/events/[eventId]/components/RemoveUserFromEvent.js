import React, { useState } from "react";
import { db } from "../../../../../../../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  arrayRemove, // Importuj arrayRemove z Firebase Firestore
} from "firebase/firestore";

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

      // 2. Update the event to remove the user role
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, {
        [`roles.${userId}`]: null, // Usunięcie pola z obiektu roles
      });

      // 3. Delete the user's events subcollection record for this event
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
    <div>
      <h2>Remove User from Event</h2>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleRemoveUser}>
          Remove User
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default RemoveUserFromEvent;
