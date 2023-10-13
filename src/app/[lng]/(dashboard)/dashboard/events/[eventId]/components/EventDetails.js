import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styles from "./EventDetails.module.css";
import EditEvent from "./EditEvent";

const mapStyles = {
  height: "100px",
  width: "100%",
};

const EventDetails = ({ eventId, eventData, currentUser }) => {
  const {
    eventName,
    eventDate,
    eventTime,
    eventDescription,
    eventContact,
    eventLatLng,
    eventLocation,
    eventType,
  } = eventData;

  const userRole = eventData?.roles?.[currentUser?.uid]?.role;
  const isOrganizer = userRole === "organizer";
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <div className={styles.detailsContainer}>
      <h1 className={styles.eventName}>{eventName}</h1>

      <div className={styles.eventInfo}>
        <div className={styles.shortEventInfo}>
          <span className={styles.infoItem}>
            <strong>Kategoria:</strong> {eventType}
          </span>
          <span className={styles.infoItem}>
            <strong>Date:</strong> {eventDate}
          </span>
          <span className={styles.infoItem}>
            <strong>Start:</strong> {eventTime}
          </span>
          <span className={styles.infoItem}>
            <strong>Contact:</strong> {eventContact}
          </span>
          <span className={styles.infoItem}>
            <strong>Lokalizacja:</strong> {eventLocation}
          </span>
        </div>

        <details className={styles.eventDescriptionDetails}>
          <summary>Description</summary>
          <p>{eventDescription}</p>
        </details>

        {isOrganizer && (
          <button className={styles.editButton} onClick={handleEditClick}>
            Edit Event
          </button>
        )}
      </div>

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

      {isEditing && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <EditEvent
              eventId={eventId}
              initialEventData={eventData}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
