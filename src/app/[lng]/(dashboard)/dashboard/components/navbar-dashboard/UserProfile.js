import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../../../firebase/firestore/fetchData";
import { auth } from "../../../../../../firebase/config.js";
import Link from "next/link";
import styles from "./UserProfile.module.css"; // Importuj moduł CSS

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
    <Link href="/dashboard/user-profile" className={styles.userProfile}>
      <img src="/icons/user-circle.svg" alt="logo" className={styles.icon} />
      <p className={styles.userName}>{username}</p>
    </Link>
  );
}

export default UserProfile;
