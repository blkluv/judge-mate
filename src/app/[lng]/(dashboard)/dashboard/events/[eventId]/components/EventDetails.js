import React from "react";
import styles from "./EventDetails.module.css"; // Importujemy stworzony arkusz stylów

const EventDetails = ({ eventData }) => {
  return (
    <div className={styles.detailsContainer}>
      <h1 className={styles.eventName}>{eventData?.eventName}</h1>
      <p className={styles.eventDate}>Date: {eventData?.eventDate}</p>
    </div>
  );
};

export default EventDetails;
