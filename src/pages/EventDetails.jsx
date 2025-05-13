import React, { useEffect, useState } from "react";
import { EventDetailsTemplate } from "../components";
import { useParams } from "react-router-dom";
import { useEventService } from "../api/services";
import { toast } from "react-toastify";

const EventDetails = () => {
  const { id } = useParams();
  const { getEventById, loading, error } = useEventService();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    document.title = "Eventora - Event Details";
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const data = await getEventById(id);
      setEvent(data);
    } catch (err) {
      toast.error("Failed to fetch event details", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
        closeButton: false,
      });
    }
  };

  return (
    <EventDetailsTemplate
      event={event}
      loading={loading}
      error={error}
    />
  );
};

export default EventDetails;
