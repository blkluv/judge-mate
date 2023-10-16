import React, { useState, useRef, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { db } from "../../../../../../../firebase/config.js";
import { updateDoc, doc } from "firebase/firestore";
import styles from "./EditEvent.module.css";
import { useGoogleMaps } from "./GoogleMapsContext";

const mapStyles = {
  height: "400px",
  width: "100%",
};

const libraries = ["places"];

const EditEvent = ({ eventId, initialEventData, onClose }) => {
  const isGoogleMapsLoaded = useGoogleMaps();
  console.log(initialEventData);
  console.log(eventId);
  const [isModified, setIsModified] = useState(false);
  const [eventName, setEventName] = useState(initialEventData.eventName);
  const [eventDate, setEventDate] = useState(initialEventData.eventDate);
  const [eventLocation, setEventLocation] = useState(
    initialEventData.eventLocation
  );
  const [eventDescription, setEventDescription] = useState(
    initialEventData.eventDescription
  );
  const [eventType, setEventType] = useState(initialEventData.eventType);
  const [eventContact, setEventContact] = useState(
    initialEventData.eventContact
  );
  const [markerPosition, setMarkerPosition] = useState(
    initialEventData.eventLatLng
  );
  const [mapZoom, setMapZoom] = useState(15);
  const [eventTime, setEventTime] = useState(initialEventData.eventTime);

  const router = useRouter();
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);

  const handlePlacesChanged = useCallback(() => {
    const place = searchBoxRef.current.getPlaces()[0];
    if (place) {
      const location = place.geometry.location;
      setEventLocation(place.formatted_address);
      setMarkerPosition({ lat: location.lat(), lng: location.lng() });
      setIsModified(true);
    }
  }, []);

  const handleUpdateEvent = useCallback(async () => {
    if (
      !eventName ||
      !eventDate ||
      !eventTime ||
      !eventType ||
      !markerPosition
    ) {
      alert("Please provide the event name, date, time, and event type.");
      return;
    }

    const eventData = {
      eventName,
      eventDate,
      eventTime,
      eventLatLng: markerPosition,
      eventLocation,
      eventDescription,
      eventType,
      eventContact,
    };

    try {
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, eventData);
      alert("Event successfully updated!");
      onClose();
      router.push(`/dashboard/events/${eventId}`);
    } catch (error) {
      console.error("Error updating event:", error);
      alert("There was an error updating the event. Please try again.");
    }
  }, [
    eventName,
    eventDate,
    eventTime,
    eventType,
    markerPosition,
    eventLocation,
    eventDescription,
    eventContact,
    router,
    onClose,
  ]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.container}>
          <div className={styles.form}>
            <h1 className={styles.title}>Edit Event</h1>
            <div className={styles.grid}>
              {/* Left Column: Form Fields */}
              <div>
                <label className={styles.label}>
                  Event Name:
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => {
                      setEventName(e.target.value);
                      setIsModified(true);
                    }}
                    className={styles.input}
                  />
                </label>
                <label className={styles.label}>
                  Event Type:
                  <select
                    value={eventType}
                    onChange={(e) => {
                      setEventType(e.target.value);
                      setIsModified(true);
                    }}
                    className={styles.dropdown}
                  >
                    <option value="">Select an event type</option>
                    <option value="Extreme Scootering">
                      Hulajnoga wyczynowa
                    </option>
                    <option value="Extreme Skateboarding">Deskorolka</option>
                  </select>
                </label>
                <div className={styles.row}>
                  <label className={styles.label}>
                    Event Date:
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => {
                        setEventDate(e.target.value);
                        setIsModified(true);
                      }}
                      className={styles.input}
                    />
                  </label>
                  <label className={styles.label}>
                    Event Time:
                    <input
                      type="time"
                      value={eventTime}
                      onChange={(e) => {
                        setEventTime(e.target.value);
                        setIsModified(true);
                      }}
                      className={styles.input}
                    />
                  </label>
                </div>
                <label className={`${styles.label} ${styles.descriptionField}`}>
                  Description:
                  <textarea
                    value={eventDescription}
                    onChange={(e) => {
                      setEventDescription(e.target.value);
                      setIsModified(true);
                    }}
                    className={styles.textarea}
                  />
                </label>
                <label className={styles.label}>
                  Contact Information:
                  <input
                    type="text"
                    value={eventContact}
                    onChange={(e) => {
                      setEventContact(e.target.value);
                      setIsModified(true);
                    }}
                    className={styles.input}
                  />
                </label>
              </div>

              {/* Right Column: Map and Search Box */}

              <div className={styles.mapContainer}>
                <label className={styles.label}>
                  Location:
                  <StandaloneSearchBox
                    onLoad={(ref) => (searchBoxRef.current = ref)}
                    onPlacesChanged={handlePlacesChanged}
                  >
                    <input
                      type="text"
                      value={eventLocation}
                      onChange={(e) => {
                        setEventLocation(e.target.value);
                        setIsModified(true);
                      }}
                      className={styles.mapInput}
                      placeholder="Search for location"
                    />
                  </StandaloneSearchBox>
                </label>
                {isGoogleMapsLoaded && (
                  <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={mapZoom}
                    center={markerPosition}
                    onLoad={(map) => {
                      mapRef.current = map;
                    }}
                    onClick={(e) => {
                      const lat = e.latLng.lat();
                      const lng = e.latLng.lng();
                      setMarkerPosition({ lat, lng });
                      setIsModified(true);
                    }}
                  >
                    {markerPosition && <Marker position={markerPosition} />}
                  </GoogleMap>
                )}
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={handleUpdateEvent}
                className={styles.button}
                disabled={!isModified}
              >
                Update Event
              </button>
              <button onClick={onClose} className={styles.closeButton}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
