import React, { useEffect } from "react";
import { EventsTemplate } from "../components";

const Events = () => {
  useEffect(() => {
    document.title = "Eventora - Events";
  }, []);
  return <EventsTemplate />;
};

export default Events;
