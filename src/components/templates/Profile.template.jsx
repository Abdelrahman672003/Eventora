import React from "react";
import { Calendar, MapPin, Clock, X, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EventCardSmall from "../molecules/EventCardSmall";

const ProfileTemplate = ({
  user,
  bookings,
  favorites,
  favoritesLoading,
  bookingsLoading,
  favoritesError,
  bookingsError,
  onUnfavorite,
  fetchBookings,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-30 pb-12 max-w-5xl mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            My Bookings
          </h2>

          {bookingsLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : bookingsError ? (
            <div className="text-center text-red-500 p-4">
              Error loading bookings. Please try again later.
            </div>
          ) : bookings?.filter((booking) => booking.status != "cancelled")
              ?.length === 0 ? (
            <div className="text-center text-gray-500 p-4">
              No bookings found.{" "}
              <button
                onClick={() => navigate("/events")}
                className="text-primary dark:text-white dark:underline hover:underline cursor-pointer"
              >
                Browse events
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings
                ?.filter((booking) => booking.status != "cancelled")
                ?.map((booking) => (
                  <EventCardSmall
                    key={booking.id}
                    booking={booking}
                    event={booking.event}
                    onViewEvent={() => navigate(`/events/${booking.event.id}`)}
                    showFavoriteButton={false}
                    isBooked={true}
                    fetchBookings={fetchBookings}
                  />
                ))}
            </div>
          )}
        </div>

        {/* Favorites Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            My Favorites
          </h2>

          {favoritesLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : favoritesError ? (
            <div className="text-center text-red-500 p-4">
              Error loading favorites. Please try again later.
            </div>
          ) : favorites?.length === 0 ? (
            <div className="text-center text-gray-500 p-4">
              No favorite events yet.{" "}
              <button
                onClick={() => navigate("/events")}
                className="text-primary dark:text-white dark:underline hover:underline cursor-pointer"
              >
                Browse events
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {favorites.map((event) => (
                <EventCardSmall
                  key={event.id}
                  event={event}
                  onViewEvent={() => navigate(`/events/${event.id}`)}
                  showFavoriteButton={true}
                  onFavorite={() => onUnfavorite(event.id)}
                  isFavorite={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileTemplate;
