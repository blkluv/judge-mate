import React, { useState } from "react";
import { db } from "../../../../../../../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const AddUserToEvent = ({ eventId, onUserAdded }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("participant"); // default role

  const handleAddUser = async () => {
    if (!username || !role) {
      alert("Please provide both username and role.");
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

      // 2. Update the event to include the new user role
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, {
        [`roles.${userId}`]: role,
      });

      // 3. Update the user's events subcollection to reflect their role and the event
      const userEventRole = {
        role,
        joinedAt: new Date().toISOString(),
      };
      const userEventRef = doc(db, `users/${userId}/userEvents`, eventId);
      await setDoc(userEventRef, userEventRole);

      alert("User successfully added to the event!");
      setUsername(""); // Clear the input

      // Notify parent component about the user addition
      if (typeof onUserAdded === "function") {
        onUserAdded();
      }
    } catch (error) {
      console.error("Error adding user to event:", error);

      // Display a more specific error message based on the cause of the error
      if (error.code === "INVALID_ARGUMENT") {
        alert("The user does not exist.");
      } else if (error.code === "ALREADY_EXISTS") {
        alert("The user already has the role.");
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <div>
      <h2>Add User to Event</h2>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="participant">Participant</option>
            <option value="judge">Judge</option>
            <option value="cameraman">Cameraman</option>
            {/* Add more roles as needed */}
          </select>
        </label>
        <button type="button" onClick={handleAddUser}>
          Add User
        </button>
      </div>
    </div>
  );
};

export default AddUserToEvent;
