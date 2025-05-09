import React, { useEffect, useState } from "react";
import { HomeTemplate } from "../components";
import { useEventService } from "../api/services";

const Home = () => {
  const [techEvents, setTechEvents] = useState([]);
  const [sportsEvents, setSportsEvents] = useState([]);
  const [businessEvents, setBusinessEvents] = useState([]);
  const { getEvents, loading, error } = useEventService();

  const fetchTechEvents = async () => {
    try {
      const data = await getEvents({ category: "Technology & Innovation" });
      setTechEvents(data?.events);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const fetchSportsEvents = async () => {
    try {
      const data = await getEvents({ category: "Sports & Fitness" });
      setSportsEvents(data?.events);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const fetchBusinessEvents = async () => {
    try {
      const data = await getEvents({ category: "Educational & Business" });
      setBusinessEvents(data?.events);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    document.title = "Eventora - Home";
    fetchTechEvents();
    fetchSportsEvents();
    fetchBusinessEvents();
  }, []);

  return (
    <HomeTemplate
      techEvents={techEvents}
      sportsEvents={sportsEvents}
      businessEvents={businessEvents}
    />
  );
};

export default Home;
