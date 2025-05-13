import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileTemplate } from "../components";
import { useBookingService, useEventService } from "../api/services";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);

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

  return (
    <ProfileTemplate
      user={user}
      bookings={bookings}
      bookingsLoading={bookingsLoading}
      bookingsError={bookingsError}
      fetchBookings={fetchBookings}
      favorites={favorites}
      favoritesLoading={favoritesLoading}
      favoritesError={favoritesError}
      fetchFavorites={fetchFavorites}
    />
  );
};

export default Profile;
