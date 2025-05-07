import React, { useEffect } from "react";
import { AboutTemplate } from "../components";

const About = () => {
  useEffect(() => {
    document.title = "Eventora - About Us";
  }, []);
  return <AboutTemplate />;
};

export default About;
