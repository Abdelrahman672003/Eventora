import React, { useEffect } from "react";
import { NotFoundTemplate } from "../components";

const NotFound = () => {
  useEffect(() => {
    document.title = "Eventora - Not Found";
  }, []);
  return <NotFoundTemplate />;
};

export default NotFound;
