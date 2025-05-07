import React, { useEffect } from "react";
import { HomeTemplate } from "../components";

const Home = () => {
  useEffect(() => {
    document.title = "Eventora - Home";
  }, []);
  return <HomeTemplate />;
};

export default Home;
