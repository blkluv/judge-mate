import React from "react";
import styles from "./PopupConfirmation.module.css";

const PopupConfirmation = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <p>{message}</p>
        <div className={styles.popupButtons}>
          <button onClick={onConfirm}>Tak</button>
          <button onClick={onCancel}>Nie</button>
        </div>
      </div>
    </div>
  );
};

export default PopupConfirmation;
