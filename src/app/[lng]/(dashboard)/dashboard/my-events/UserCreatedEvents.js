import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../../firebase/firestore/fetchData";
import deleteData from "../../../../../firebase/firestore/deleteData";
import { auth } from "../../../../../firebase/config.js";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link z Next.js

function UserCreatedEvents() {
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    async function fetchUserEvents() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      const { data, error } = await fetchData("events");

      if (data) {
        // Odfiltruj wydarzenia, zostawiając tylko te utworzone przez zalogowanego użytkownika
        const userCreatedEvents = data.filter(
          (event) => event.roles[currentUser.uid] === "organizer"
        );
        setUserEvents(userCreatedEvents);
      }

      if (error) {
        setError(error);
      }

      setLoading(false);
    }

    fetchUserEvents();
  }, [currentUser]);

  const handleDeleteEvent = async (eventId) => {
    try {
      // Usuń wydarzenie z kolekcji "events"
      await deleteData("events", eventId);

      // Usuń również informacje o wydarzeniu z kolekcji "userEvents" w dokumencie użytkownika
      await deleteData(`users/${currentUser.uid}/userEvents`, eventId);

      // Przekieruj użytkownika na stronę z listą wydarzeń po usunięciu
      router.push("/dashboard/my-events"); // Zmień na właściwą ścieżkę URL
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("There was an error deleting the event. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error loading events: {error.message}</div>;
  }

  return (
    <div>
      <h1>Your Created Events</h1>
      <ul>
        {userEvents.map((event) => (
          <li key={event.id}>
            <Link href={`/dashboard/events/${event.id}`}>
              {event.eventName} - {event.eventDate}
            </Link>
            <button onClick={() => handleDeleteEvent(event.id)}>
              Delete Event
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserCreatedEvents;
