import React from "react";
import styles from "./PopupAlert.module.css";

const PopupAlert = ({ message, onClose, isOpen }) => {
  // Nie wyświetlaj komponentu, jeśli isOpen jest false
  if (!isOpen) return null;

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <p>{message}</p>
        <div className={styles.popupButtons}>
          <button onClick={onClose}>Zamknij</button>
        </div>
      </div>
    </div>
  );
};

export default PopupAlert;
