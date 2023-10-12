import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import { useRouter } from "next/navigation"; // Corrected import
import { auth } from "../../../../../../firebase/config.js";
import addData from "../../../../../../firebase/firestore/addData.js";
import styles from "./CreateEvent.module.css";

const mapStyles = {
  height: "400px",
  width: "100%",
};

const defaultCenter = {
  lat: 50.0151,
  lng: 19.9342,
};

const libraries = ["places"];

const CreateEvent = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventCategories, setEventCategories] = useState("");
  const [eventSafety, setEventSafety] = useState("");
  const [eventFees, setEventFees] = useState("");
  const [eventContact, setEventContact] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapZoom, setMapZoom] = useState(12); // initial zoom level
  const [eventTime, setEventTime] = useState("");

  const currentUser = auth.currentUser;
  const router = useRouter();
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && markerPosition) {
      mapRef.current.panTo(markerPosition);
      setMapZoom(15); // Adjust zoom level when a marker is placed
    }
  }, [markerPosition]);

  const handlePlacesChanged = () => {
    const place = searchBoxRef.current.getPlaces()[0];
    if (place) {
      const location = place.geometry.location;
      setEventLocation(place.formatted_address);
      setMarkerPosition({ lat: location.lat(), lng: location.lng() });
    }
  };

  const handleCreateEvent = async () => {
    if (!eventName || !eventDate || !eventTime) {
      alert("Please provide the event name, date, and time.");
      return;
    }

    const eventData = {
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      eventDescription,
      eventCategories,
      eventSafety,
      eventFees,
      eventContact,
      roles: {
        [currentUser.uid]: "organizer",
      },
    };

    try {
      const { result: eventDocRef, error } = await addData(
        "events",
        null,
        eventData
      );

      if (error) {
        throw error;
      }

      const userEventRole = {
        role: "organizer",
        joinedAt: new Date().toISOString(),
      };

      const { error: userUpdateError } = await addData(
        `users/${currentUser.uid}/userEvents`,
        eventDocRef.id,
        userEventRole
      );

      if (userUpdateError) {
        throw userUpdateError;
      }

      setEventName("");
      setEventDate("");
      setEventLocation("");
      setEventDescription("");
      setEventCategories("");
      setEventSafety("");
      setEventFees("");
      setEventContact("");
      setEventTime("");

      alert("Event successfully created!");
      router.push(`/dashboard/events/${eventDocRef.id}`);
    } catch (error) {
      console.error("Error creating event:", error);
      alert("There was an error creating the event. Please try again.");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.title}>Create New Event</h1>
        <form className={styles.grid}>
          {/* Left Column: Form Fields */}
          <div>
            <label className={styles.label}>
              Event Name:
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className={styles.input}
              />
            </label>
            <label className={styles.label}>
              Event Date:
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className={styles.input}
              />
            </label>
            <label className={styles.label}>
              Event Time:
              <input
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
                className={styles.input}
              />
            </label>
            <label className={`${styles.label} ${styles.descriptionField}`}>
              Description:
              <textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                className={styles.textarea}
              />
            </label>
            <label className={styles.label}>
              Categories:
              <input
                type="text"
                value={eventCategories}
                onChange={(e) => setEventCategories(e.target.value)}
                className={styles.input}
              />
            </label>
            <label className={styles.label}>
              Safety Information:
              <textarea
                value={eventSafety}
                onChange={(e) => setEventSafety(e.target.value)}
                className={styles.textarea}
              />
            </label>
            <label className={styles.label}>
              Fees:
              <input
                type="text"
                value={eventFees}
                onChange={(e) => setEventFees(e.target.value)}
                className={styles.input}
              />
            </label>
            <label className={styles.label}>
              Contact Information:
              <input
                type="text"
                value={eventContact}
                onChange={(e) => setEventContact(e.target.value)}
                className={styles.input}
              />
            </label>
          </div>

          {/* Right Column: Map and Search Box */}
          <div>
            <div className={styles.mapContainer}>
              <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                libraries={libraries}
              >
                <label className={styles.label}>
                  Location:
                  <StandaloneSearchBox
                    onLoad={(ref) => (searchBoxRef.current = ref)}
                    onPlacesChanged={handlePlacesChanged}
                  >
                    <input
                      type="text"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      className={styles.input}
                      placeholder="Search for location"
                    />
                  </StandaloneSearchBox>
                </label>
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  zoom={mapZoom}
                  center={markerPosition || defaultCenter}
                  onLoad={(map) => {
                    mapRef.current = map;
                  }}
                  onClick={(e) => {
                    const lat = e.latLng.lat();
                    const lng = e.latLng.lng();
                    setMarkerPosition({ lat, lng });

                    // Utworzenie instancji Geocoder
                    const geocoder = new google.maps.Geocoder();

                    geocoder.geocode(
                      { location: { lat, lng } },
                      (results, status) => {
                        if (status === "OK" && results[0]) {
                          // Aktualizacja stanu eventLocation na podstawie uzyskanego adresu
                          setEventLocation(results[0].formatted_address);
                        } else {
                          console.error("Geocoder failed due to: " + status);
                        }
                      }
                    );
                  }}
                >
                  {markerPosition && <Marker position={markerPosition} />}
                </GoogleMap>
              </LoadScript>
            </div>
            <button
              type="button"
              onClick={handleCreateEvent}
              className={styles.button}
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
