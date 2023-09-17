import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../../firebase/firestore/fetchData";
import { auth } from "../../../../../firebase/config";
import { updateData } from "../../../../../firebase/firestore/updateData";

import styles from "./EditUserProfile.module.css";

function EditUserProfile() {
  const [newUsername, setNewUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    async function fetchUserData() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      const userId = currentUser.uid;

      // Pobierz nazwę użytkownika z Firestore, używając kolekcji "users" i identyfikatora "userId"
      const { data, error } = await fetchData("users", userId);

      if (data) {
        setCurrentUserData(data);
        setNewUsername(data.username); // Ustaw domyślną wartość dla nowego username
      }

      if (error) {
        setError(error);
      }

      setLoading(false);
    }

    fetchUserData();
  }, [currentUser]);

  const handleUpdateUsername = async () => {
    try {
      const updatedData = {
        username: newUsername,
      };

      // Aktualizuj dane użytkownika w Firestore
      const { success, error } = await updateData(
        "users",
        currentUser.uid,
        updatedData
      );

      if (success) {
        alert("Username updated successfully!");
        if (currentUserData) {
          setCurrentUserData({ ...currentUserData, username: newUsername }); // Aktualizuj dane w lokalnym stanie
        }
      } else {
        throw error;
      }
    } catch (error) {
      console.error("Error updating username:", error);
      alert("There was an error updating the username. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading user profile...</div>;
  }

  if (error) {
    return <div>Error loading user profile: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit User Profile</h1>
      <p className={styles.username}>
        Current Username:{" "}
        {loading ? (
          <span className={styles.loader}>Loading...</span>
        ) : currentUserData ? (
          currentUserData.username
        ) : (
          "N/A"
        )}
      </p>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>New Username:</label>
        <input
          className={styles.inputField}
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </div>
      <div className={styles.buttoContainer}>
        <button
          className={styles.updateButton}
          type="button"
          onClick={handleUpdateUsername}
        >
          Update Username
        </button>
      </div>
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </div>
  );
}

export default EditUserProfile;
