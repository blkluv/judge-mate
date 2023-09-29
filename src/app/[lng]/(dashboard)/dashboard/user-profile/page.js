"use client";

import EditUserProfile from "./components/EditUserProfile";
import LogoutButton from "./components/LogoutButton";
import styles from "./page.module.css";

function Page() {
  return (
    <div className={styles.container}>
      <LogoutButton />
      <EditUserProfile />
    </div>
  );
}

export default Page;
