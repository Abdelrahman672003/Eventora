import React, { useEffect } from "react";
import { LoginTemplate } from "../components";

const Login = () => {
  useEffect(() => {
    document.title = "Eventora - Login";
  }, []);
  return <LoginTemplate />;
};

export default Login;
