import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../../firebase/firestore/fetchData";
import Link from "next/link";

function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await fetchData("events");

      if (data) {
        setEvents(data);
      }
      if (error) {
        setError(error);
      }

      setLoading(false);
    }

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error loading events: {error.message}</div>;
  }

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link href={`pl/dashboard/events/${event.id}`}>
              {" "}
              {/* Dodaj Link, który przekierowuje do strony danego wydarzenia */}
              <a>
                {event.eventName} - {event.eventDate}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
