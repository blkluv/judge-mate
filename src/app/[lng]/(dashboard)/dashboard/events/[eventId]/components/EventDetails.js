import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styles from "./EventDetails.module.css";

const mapStyles = {
  height: "300px",
  width: "100%",
  borderRadius: "12px",
  overflow: "hidden",
};

const EventDetails = ({ eventData, currentUser }) => {
  const {
    eventName,
    eventDate,
    eventLocation,
    eventDescription,
    eventType,
    eventContact,
    eventTime,
    roles,
  } = eventData;

  const isOrganizer = eventData?.roles?.[currentUser?.uid] === "organizer";

  return (
    <div className={styles.detailsContainer}>
      <h1 className={styles.eventName}>{eventName}</h1>
      <p className={styles.eventDate}>Date: {eventDate}</p>
      <p className={styles.eventTime}>Time: {eventTime}</p>
      <p className={styles.eventType}>Type: {eventType}</p>
      <p className={styles.eventDescription}>Description: {eventDescription}</p>
      <p className={styles.eventContact}>Contact: {eventContact}</p>
      <div className={styles.mapContainer}>
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={eventLocation}
          >
            <Marker position={eventLocation} />
          </GoogleMap>
        </LoadScript>
      </div>
      {isOrganizer && <button className={styles.editButton}>Edit Event</button>}
    </div>
  );
};

export default EventDetails;
