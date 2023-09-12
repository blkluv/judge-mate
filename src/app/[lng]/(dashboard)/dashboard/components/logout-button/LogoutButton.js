import React from "react";
import { getAuth, signOut } from "firebase/auth";
import styles from "../logout-button/LogoutButton.module.css";

function LogoutButton() {
  const handleLogout = async () => {
    setTimeout(async () => {
      const auth = getAuth();

      try {
        await signOut(auth);
        // Tutaj możesz dodać dodatkową logikę po wylogowaniu
      } catch (error) {
        console.log("Błąd wylogowania:", error);
      }
    }, 1500);
  };

  return (
    <div className={styles.toggleWrapper} onClick={handleLogout}>
      <input className={styles.toggleCheckbox} type="checkbox" />
      <div className={styles.toggleContainer}>
        <div className={styles.toggleButton}>
          <div className={styles.toggleButtonCirclesContainer}>
            <div className={styles.toggleButtonCircle}></div>
            <div className={styles.toggleButtonCircle}></div>
            <div className={styles.toggleButtonCircle}></div>
            <div className={styles.toggleButtonCircle}></div>
            <div className={styles.toggleButtonCircle}></div>
            <div className={styles.toggleButtonCircle}></div>
            <div className={styles.toggleButtonCircle}></div>
            <div className={styles.toggleButtonCircle}></div>
            <div className={styles.toggleButtonCircle}></div>
            <div className={styles.toggleButtonCircle}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

LogoutButton.propTypes = {
  // Tutaj możesz zdefiniować wymagane propsy, jeśli są potrzebne
};

export default LogoutButton;
