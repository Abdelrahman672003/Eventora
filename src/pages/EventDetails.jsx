import React, { useEffect } from "react";
import { EventDetailsTemplate } from "../components";

const EventDetails = () => {
  useEffect(() => {
    document.title = "Eventora";
  }, []);
  return <EventDetailsTemplate />;
};

export default EventDetails;
