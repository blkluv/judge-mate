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
  FieldValue,
} from "firebase/firestore";

const RemoveUserFromEvent = ({ eventId }) => {
  const [username, setUsername] = useState("");

  const handleRemoveUser = async () => {
    if (!username) {
      alert("Please provide a username.");
      return;
    }

    try {
      // 1. Find the user ID for the given username
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const userSnapshot = await getDocs(q);

      if (userSnapshot.empty) {
        alert("User not found.");
        return;
      }

      const userId = userSnapshot.docs[0].id;

      // 2. Update the event to remove the user role
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, {
        [`roles.${userId}`]: FieldValue.delete(),
      });

      // 3. Delete the user's events subcollection record for this event
      const userEventRef = doc(db, `users/${userId}/userEvents`, eventId);
      await deleteDoc(userEventRef);

      alert("User successfully removed from the event!");
      setUsername(""); // Clear the input
    } catch (error) {
      console.error("Error removing user from event:", error);
      alert(
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
      </div>
    </div>
  );
};

export default RemoveUserFromEvent;
