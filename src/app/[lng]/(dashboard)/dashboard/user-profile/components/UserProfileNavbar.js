// Navbar.js
import React from "react";
import LogoutButton from "./LogoutButton";
import styles from "./UserProfileNavbar.module.css"; // Załóżmy, że stworzysz nowy plik CSS dla tego komponentu

function Navbar({ setSelectedOption }) {
  return (
    <div className={styles.userProfileNavbar}>
      <div className={styles.sidebar}>
        <ul className={styles.ulstyle}>
          <li
            className={styles.listyle}
            onClick={() => setSelectedOption("Dane osobowe")}
          >
            Dane osobowe
          </li>
          <li
            className={styles.listyle}
            onClick={() => setSelectedOption("Zamówienia")}
          >
            Zamówienia
          </li>
          <li
            className={styles.listyle}
            onClick={() => setSelectedOption("Ustawienia newslettera")}
          >
            Ustawienia newslettera
          </li>
          <li
            className={styles.listyle}
            onClick={() => setSelectedOption("Pomoc i FAQ")}
          >
            Pomoc i FAQ
          </li>
          <LogoutButton />
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
