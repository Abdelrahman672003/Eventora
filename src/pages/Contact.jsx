import React, { useEffect } from "react";
import { ContactTemplate } from "../components";

const Contact = () => {
  useEffect(() => {
    document.title = "Eventora - Contact Us";
  }, []);
  return <ContactTemplate />;
};

export default Contact;
