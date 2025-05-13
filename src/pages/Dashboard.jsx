import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEventService } from "../api/services";
import { DashboardTemplate } from "../components";
const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const { getEvents, deleteEvent, loading, error } = useEventService();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const itemsPerPage = 10;

  const handlePageChange = (page) => {
    setPage(page);
  };

  const fetchEvents = async () => {
    try {
      const data = await getEvents({ page: page, limit: itemsPerPage });
      setEvents(data?.events);
      setTotalPages(data?.totalPages);
      setTotalEvents(data?.totalEvents);
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
  }, [navigate, page]);

  return (
    <DashboardTemplate
      events={events}
      loading={loading}
      error={error}
      deleteEvent={deleteEvent}
      fetchEvents={fetchEvents}
      page={page}
      setPage={setPage}
      totalPages={totalPages}
      totalEvents={totalEvents}
      itemsPerPage={itemsPerPage}
      handlePageChange={handlePageChange}
    />
  );
};

export default Dashboard;
