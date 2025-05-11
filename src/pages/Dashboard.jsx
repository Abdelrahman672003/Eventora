import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEventService } from "../api/services";
import { DashboardTemplate } from "../components";
const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const { getEvents, deleteEvent, loading, error } = useEventService();

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data?.events);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    document.title = "Eventora - Dashboard";

    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    fetchEvents();
  }, [navigate]);

  return (
    <DashboardTemplate
      events={events}
      loading={loading}
      error={error}
      deleteEvent={deleteEvent}
      fetchEvents={fetchEvents}
    />
  );
};

export default Dashboard;
