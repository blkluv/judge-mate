import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../../../firebase/firestore/fetchData";
import { auth } from "../../../../../../firebase/config.js";
import Link from "next/link";
import styles from "./UserProfile.module.css"; // Importuj moduł CSS

function UserProfile() {
  const currentUser = auth.currentUser;

  // Użyj obiektu stanu do śledzenia nazwy użytkownika, stanu ładowania i błędu
  const [state, setState] = useState({
    username: "",
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Pobierz nazwę użytkownika z Firestore, używając kolekcji "users" i identyfikatora "userId"
    async function fetchUsername() {
      if (!currentUser) {
        setState({ loading: false, error: "Nie jesteś zalogowany" });
        return;
      }

      const userId = currentUser.uid;
      const { data, error } = await fetchData("users", userId);

      if (data) {
        setState({ loading: false, username: data.username });
      }

      if (error) {
        setState({ error });
      }
    }

    fetchUsername();
  }, [currentUser]);

  // Sprawdź, czy nazwa użytkownika jest załadowana i nie wystąpił błąd
  if (state.loading) {
    return <div>Loading user profile...</div>;
  }

  if (state.error) {
    return <div>Error loading user profile: {state.error.message}</div>;
  }

  // Wyrenderuj link do profilu użytkownika
  return (
    <Link href="/dashboard/user-profile" className={styles.userProfile}>
      <img src="/icons/user-circle.svg" alt="logo" className={styles.icon} />
      <p className={styles.userName}>{state.username}</p>
    </Link>
  );
}

export default UserProfile;
