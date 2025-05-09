import React, { useEffect, useState } from "react";
import { EventsTemplate } from "../components";
import { useEventService } from "../api/services";

const Events = () => {
  const [events, setEvents] = useState([]);
  const { getEvents, loading, error } = useEventService();

  useEffect(() => {
    document.title = "Eventora - Events";
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data?.events);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  return <EventsTemplate events={events} loading={loading} error={error} />;
};

export default Events;
