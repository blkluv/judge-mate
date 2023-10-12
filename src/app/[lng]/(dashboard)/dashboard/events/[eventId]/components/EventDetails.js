import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styles from "./EventDetails.module.css";

const mapStyles = {
  height: "100px",
  width: "100%",
};

const EventDetails = ({ eventData, currentUser }) => {
  const {
    eventName,
    eventDate,
    eventTime,
    eventDescription,
    eventContact,
    eventLatLng,
    roles,
  } = eventData;
  const isOrganizer = eventData?.roles?.[currentUser?.uid] === "organizer";

  return (
    <div>
      <div className={styles.detailsContainer}>
        <h1 className={styles.eventName}>{eventName}</h1>

        <div className={styles.eventInfo}>
          <div className={styles.shortEventInfo}>
            <p className={styles.eventDate}>Date: {eventDate}</p>
            <p className={styles.eventTime}>Time: {eventTime}</p>
            <p className={styles.eventContact}>Contact: {eventContact}</p>
          </div>
          <details className={styles.eventDescriptionDetails}>
            <summary>Description</summary>
            <p className={styles.eventDescription}>{eventDescription}</p>
          </details>
          {isOrganizer && (
            <button className={styles.editButton}>Edit Event</button>
          )}
        </div>
      </div>{" "}
      <div className={styles.mapContainer}>
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={eventLatLng}
          >
            <Marker position={eventLatLng} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default EventDetails;
