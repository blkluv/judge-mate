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
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import styles from "./ManageUserEvent.module.css";

const ManageUserEvent = ({ eventId, onUserUpdated }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("participant"); // default role
  const [error, setError] = useState("");
  const [action, setAction] = useState(""); // 'add', 'remove', 'approve', 'changeRole' or ''

  const handleActionClick = (selectedAction) => {
    setAction(selectedAction);
    setUsername("");
    setRole("participant");
    setError("");
  };

  const handleAddUser = async () => {
    if (!username || !role) {
      alert("Please provide both username and role.");
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const userSnapshot = await getDocs(q);

      if (userSnapshot.empty) {
        alert("User not found.");
        return;
      }

      const userId = userSnapshot.docs[0].id;
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, {
        [`roles.${userId}`]: {
          role: role,
          isApproved: false, // default to false
        },
      });

      const userEventRef = doc(db, `users/${userId}/userEvents`, eventId);
      await setDoc(userEventRef, { eventId: eventId });

      alert("User successfully added to the event!");
      setUsername(""); // Clear the input

      if (typeof onUserUpdated === "function") {
        onUserUpdated();
      }
    } catch (error) {
      console.error("Error adding user to event:", error);
      alert("An unknown error occurred.");
    }
  };

  const handleRemoveUser = async () => {
    if (!username) {
      setError("Please provide a username.");
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const userSnapshot = await getDocs(q);

      if (userSnapshot.empty) {
        setError("User not found.");
        return;
      }

      const userId = userSnapshot.docs[0].id;
      const eventRef = doc(db, "events", eventId);
      const eventSnapshot = await getDoc(eventRef);
      const event = eventSnapshot.data();

      if (!event) {
        setError("Event not found.");
        return;
      }

      const updatedRoles = { ...event.roles };
      delete updatedRoles[userId];

      await updateDoc(eventRef, {
        roles: updatedRoles,
      });

      const userEventRef = doc(db, `users/${userId}/userEvents/${eventId}`);
      await deleteDoc(userEventRef);

      setError(""); // Clear any previous error
      setUsername(""); // Clear the input
      alert("User successfully removed from the event!");

      if (typeof onUserUpdated === "function") {
        onUserUpdated();
      }
    } catch (error) {
      console.error("Error removing user from event:", error);
      setError(
        "An error occurred while trying to remove the user from the event."
      );
    }
  };

  const handleApproveUser = async () => {
    if (!username) {
      setError("Please provide a username.");
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const userSnapshot = await getDocs(q);

      if (userSnapshot.empty) {
        setError("User not found.");
        return;
      }

      const userId = userSnapshot.docs[0].id;
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, {
        [`roles.${userId}.isApproved`]: true,
      });

      setError(""); // Clear any previous error
      setUsername(""); // Clear the input
      alert("User participation approved!");

      if (typeof onUserUpdated === "function") {
        onUserUpdated();
      }
    } catch (error) {
      console.error("Error approving user participation:", error);
      setError(
        "An error occurred while trying to approve the user's participation."
      );
    }
  };
  const handleChangeRole = async () => {
    if (!username || !role) {
      alert("Please provide both username and role.");
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const userSnapshot = await getDocs(q);

      if (userSnapshot.empty) {
        alert("User not found.");
        return;
      }

      const userId = userSnapshot.docs[0].id;
      const eventRef = doc(db, "events", eventId);

      // Update only the role field without touching the isApproved field
      await updateDoc(eventRef, {
        [`roles.${userId}.role`]: role,
      });

      const userEventRef = doc(db, `users/${userId}/userEvents`, eventId);
      const userEventSnapshot = await getDoc(userEventRef);
      if (!userEventSnapshot.exists()) {
        alert("User is not associated with this event.");
        return;
      }

      alert("User role successfully updated!");
      setUsername(""); // Clear the input
      setRole("participant"); // Reset to default role

      if (typeof onUserUpdated === "function") {
        onUserUpdated();
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("An error occurred while trying to update the user's role.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Manage User in Event</h2>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.button}
          onClick={() => handleActionClick("add")}
        >
          Add User
        </button>
        <button
          className={styles.button}
          onClick={() => handleActionClick("remove")}
        >
          Remove User
        </button>
        <button
          className={styles.button}
          onClick={() => handleActionClick("approve")}
        >
          Approve User Participation
        </button>
        <button
          className={styles.button}
          onClick={() => handleActionClick("changeRole")}
        >
          Change User Role
        </button>
      </div>

      {action === "add" && (
        <>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Username:
              <input
                className={styles.input}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
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
          </div>
          <button className={styles.button} onClick={handleAddUser}>
            Confirm Add
          </button>
        </>
      )}

      {action === "remove" && (
        <>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Username:
              <input
                className={styles.input}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <button className={styles.button} onClick={handleRemoveUser}>
            Confirm Remove
          </button>
        </>
      )}

      {action === "approve" && (
        <>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Username:
              <input
                className={styles.input}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <button className={styles.button} onClick={handleApproveUser}>
            Confirm Approve
          </button>
        </>
      )}

      {action === "changeRole" && (
        <>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Username:
              <input
                className={styles.input}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
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
          </div>
          <button className={styles.button} onClick={handleChangeRole}>
            Confirm Change
          </button>
        </>
      )}

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default ManageUserEvent;
