import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEventService } from "../api/services";
import { toast } from "react-toastify";
import { AddEventTemplate } from "../components";

const AddEvent = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { createEvent, updateEvent, getEventById, loading, error } =
    useEventService();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "",
    price: "",
    image: null,
    totalTickets: "",
    tags: [],
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    document.title = eventId ? "Eventora - Edit Event" : "Eventora - Add Event";

    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }

    if (eventId) {
      fetchEventData();
    }
  }, [eventId, navigate]);

  const fetchEventData = async () => {
    try {
      const event = await getEventById(eventId);
      setFormData({
        name: event.name,
        description: event.description,
        date: event.date.split("T")[0],
        time: event.date.split("T")[1].substring(0, 5),
        venue: event.venue,
        category: event.category,
        price: event.price,
        totalTickets: event.totalTickets,
        image: null,
        tags: event.tags,
      });
      setImagePreview(event.image);
    } catch (err) {
      toast.error("Failed to fetch event data", {
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
  };

  const validateForm = () => {
    const errors = {};
    const now = new Date();
    const selectedDateTime = new Date(`${formData.date}T${formData.time}`);

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.length < 3) {
      errors.name = "Name must be at least 3 characters long";
    } else if (formData.name.length > 100) {
      errors.name = "Name must be less than 100 characters";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.length < 10) {
      errors.description = "Description must be at least 10 characters long";
    } else if (formData.description.length > 1000) {
      errors.description = "Description must be less than 1000 characters";
    }

    if (!formData.date) {
      errors.date = "Date is required";
    } else if (selectedDateTime <= now) {
      errors.date = "Event date and time must be in the future";
    }

    if (!formData.time) {
      errors.time = "Time is required";
    }

    if (!formData.venue.trim()) {
      errors.venue = "Venue is required";
    } else if (formData.venue.length < 3) {
      errors.venue = "Venue must be at least 3 characters long";
    }

    if (!formData.category) {
      errors.category = "Category is required";
    }

    if (!formData.price) {
      errors.price = "Price is required";
    } else if (isNaN(formData.price) || parseFloat(formData.price) < 0) {
      errors.price = "Price must be a positive number";
    }

    if (!formData.totalTickets) {
      errors.totalTickets = "Total tickets is required";
    } else if (
      isNaN(formData.totalTickets) ||
      parseInt(formData.totalTickets) <= 0
    ) {
      errors.totalTickets = "Total tickets must be a positive number";
    } else if (parseInt(formData.totalTickets) > 10000) {
      errors.totalTickets = "Total tickets cannot exceed 10,000";
    }

    if (!eventId && !formData.image) {
      errors.image = "Event image is required";
    } else if (formData.image && formData.image.size > 5 * 1024 * 1024) {
      errors.image = "Image size must be less than 5MB";
    } else if (
      formData.image &&
      !["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
        formData.image.type
      )
    ) {
      errors.image = "Image must be in PNG, JPG, JPEG, or GIF format";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the validation errors before submitting", {
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
      return;
    }

    try {
      if (eventId) {
        const data = {
          ...formData,
          tags: formData.tags.length > 0 ? formData.tags : "",
        };
        await updateEvent(eventId, data);
        toast.success("Event updated successfully!", {
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
      } else {
        await createEvent(formData);
        toast.success("Event created successfully!", {
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
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          (eventId ? "Failed to update event" : "Failed to create event"),
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
    <AddEventTemplate
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
      validationErrors={validationErrors}
      imagePreview={imagePreview}
      setImagePreview={setImagePreview}
      isEdit={!!eventId}
    />
  );
};

export default AddEvent;
