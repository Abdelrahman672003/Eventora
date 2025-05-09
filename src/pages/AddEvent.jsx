import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AddEventTemplate from "../components/templates/AddEvent.template";
import { useEventService } from "../api/services";
import { toast } from "react-toastify";

const AddEvent = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const {
    createEvent,
    updateEvent,
    getEventById,
    deleteEvent,
    loading,
    error,
  } = useEventService();
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
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    document.title = eventId ? "Eventora - Edit Event" : "Eventora - Add Event";

    // Check if user is authenticated
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }

    // If eventId exists, fetch event data
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
        image: null, // We don't set the image as it's already uploaded
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
      // navigate("/dashboard");
    }
  };

  const validateForm = () => {
    const errors = {};
    const now = new Date();
    const selectedDateTime = new Date(`${formData.date}T${formData.time}`);

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.length < 3) {
      errors.name = "Name must be at least 3 characters long";
    } else if (formData.name.length > 100) {
      errors.name = "Name must be less than 100 characters";
    }

    // Description validation
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    } else if (formData.description.length < 10) {
      errors.description = "Description must be at least 10 characters long";
    } else if (formData.description.length > 1000) {
      errors.description = "Description must be less than 1000 characters";
    }

    // Date and Time validation
    if (!formData.date) {
      errors.date = "Date is required";
    } else if (selectedDateTime <= now) {
      errors.date = "Event date and time must be in the future";
    }

    if (!formData.time) {
      errors.time = "Time is required";
    }

    // Venue validation
    if (!formData.venue.trim()) {
      errors.venue = "Venue is required";
    } else if (formData.venue.length < 3) {
      errors.venue = "Venue must be at least 3 characters long";
    }

    // Category validation
    if (!formData.category) {
      errors.category = "Category is required";
    }

    // Price validation
    if (!formData.price) {
      errors.price = "Price is required";
    } else if (isNaN(formData.price) || parseFloat(formData.price) < 0) {
      errors.price = "Price must be a positive number";
    }

    // Total Tickets validation
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

    // Image validation (only for new events)
    if (!eventId && !formData.image) {
      errors.image = "Event image is required";
    } else if (formData.image && formData.image.size > 5 * 1024 * 1024) {
      // 5MB
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
    // Clear validation error when user starts typing
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
        await updateEvent(eventId, formData);
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
      console.log(err);
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

  const handleDelete = async () => {
    try {
      await deleteEvent(eventId);
      toast.success("Event deleted successfully!", {
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
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to delete event", {
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
      onDelete={() => setIsDeleteModalOpen(true)}
      isDeleteModalOpen={isDeleteModalOpen}
      onCloseDeleteModal={() => setIsDeleteModalOpen(false)}
      onConfirmDelete={handleDelete}
      deleteLoading={loading}
    />
  );
};

export default AddEvent;
