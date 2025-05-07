import React, { useEffect } from "react";
import { CongratulationsTemplate } from "../components";

const Congratulations = () => {
  useEffect(() => {
    document.title = "Eventora - Congratulations";
  }, []);
  return <CongratulationsTemplate />;
};

export default Congratulations;
