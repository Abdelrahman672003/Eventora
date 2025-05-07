import React, { useEffect } from "react";
import { SignupTemplate } from "../components";

const Signup = () => {
  useEffect(() => {
    document.title = "Eventora - Signup";
  }, []);
  return <SignupTemplate />;
};

export default Signup;
