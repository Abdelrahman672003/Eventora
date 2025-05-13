import React, { useEffect, useState } from "react";
import { RegisterTemplate } from "../components";
import { useAuthService } from "../api/services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const { signup, loading, error } = useAuthService();

  useEffect(() => {
    document.title = "Eventora - Register";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setFormError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    try {
      const response = await signup(formData);
      if (response.token) {
        navigate("/login");
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        toast.success("Registration successful. Please login to continue.", {
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
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again.",
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
          closeButton: false,
        }
      );
    }
  };

  return (
    <RegisterTemplate
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
      error={formError || error}
    />
  );
};

export default Register;
