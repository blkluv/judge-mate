import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../../firebase/firestore/fetchData";
import { auth } from "../../../../../firebase/config.js";

function UserProfile() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    async function fetchUsername() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      const userId = currentUser.uid;

      // Pobierz nazwę użytkownika z Firestore, używając kolekcji "users" i identyfikatora "userId"
      const { data, error } = await fetchData("users", userId);

      if (data) {
        setUsername(data.username);
      }

      if (error) {
        setError(error);
      }

      setLoading(false);
    }

    fetchUsername();
  }, [currentUser]);

  if (loading) {
    return <div>Loading user profile...</div>;
  }

  if (error) {
    return <div>Error loading user profile: {error.message}</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {username}</p>
    </div>
  );
}

export default UserProfile;
