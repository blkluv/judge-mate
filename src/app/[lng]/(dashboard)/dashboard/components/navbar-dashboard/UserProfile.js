import React from "react";
import { useAuthContext } from "../../../../../../firebase/context/AuthContext";
import Link from "next/link";
import styles from "./UserProfile.module.css";

function UserProfile() {
  const { currentUserData, loading } = useAuthContext();
  const username = currentUserData ? currentUserData.username : null;

  console.log("uzytkownik zalogowany userProfile: ", username);

  if (loading) {
    return <div>Wczytywanie profilu użytkownika...</div>;
  }

  return (
    <Link href="/dashboard/user-profile" className={styles.userProfile}>
      <img src="/icons/user-circle.svg" alt="logo" className={styles.icon} />
      <p className={styles.userName}>{username}</p>
    </Link>
  );
}

export default React.memo(UserProfile);
