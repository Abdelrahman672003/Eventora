import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileTemplate from "../components/templates/Profile.template";
import { toast } from "react-toastify";
import { useBookingService, useEventService } from "../api/services";

const Profile = () => {
  const navigate = useNavigate();
  const {
    getUserBookings,
    cancelBooking,
    loading: bookingsLoading,
    error: bookingsError,
  } = useBookingService();

  const {
    getFavoriteEvents,
    removeFavoriteEvent,
    loading: favoritesLoading,
    error: favoritesError,
  } = useEventService();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const fetchBookings = async () => {
    try {
      const data = await getUserBookings();
      setBookings(data?.bookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const fetchFavorites = async () => {
    try {
      const data = await getFavoriteEvents();
      setFavorites(data);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(localStorage.getItem("user")));
    fetchBookings();
    fetchFavorites();
  }, [navigate]);

  // const handleCancelTicket = async (ticketId) => {
  //   try {
  //     await cancelTicket(ticketId);
  //     toast.success("Ticket cancelled successfully", {
  //       position: "bottom-right",
  //       autoClose: 5000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined,
  //       theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
  //       closeButton: false,
  //     });
  //   } catch (err) {
  //     toast.error("Failed to cancel ticket", {
  //       position: "bottom-right",
  //       autoClose: 5000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //       progress: undefined,
  //       theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
  //       closeButton: false,
  //     });
  //   }
  // };

  return (
    <ProfileTemplate
      user={user}
      bookings={bookings}
      favorites={favorites}
      favoritesLoading={favoritesLoading}
      bookingsLoading={bookingsLoading}
      favoritesError={favoritesError}
      bookingsError={bookingsError}
      onUnfavorite={fetchFavorites}
      fetchBookings={fetchBookings}
      // onCancelTicket={handleCancelTicket}
    />
  );
};

export default Profile;
