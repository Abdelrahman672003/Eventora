import { Star } from "lucide-react";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { useBookingService, useEventService } from "../../api/services";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CancelEventModal from "../modals/CancelEventModal";

const EventCardSmall = ({
  event,
  onFavorite,
  isBooked,
  showFavoriteButton = true,
  booking = null,
  fetchBookings,
}) => {
  const navigate = useNavigate();
  const { cancelBooking, loading: cancelLoading } = useBookingService();
  const { makeFavoriteEvent, removeFavoriteEvent } = useEventService();
  const [isFavorite, setIsFavorite] = useState(event.isFavorite || false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    setIsFavorite(event.isFavorite || false);
  }, [event]);

  const handleCancelConfirm = async () => {
    if (!event) return;

    try {
      await cancelBooking(booking.id);
      toast.success("Event cancelled successfully!", {
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
      // Refresh the events list
      fetchBookings();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to cancan event", {
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
    } finally {
      setIsCancelModalOpen(false);
    }
  };

  const handleFavorite = async (e) => {
    e.stopPropagation();
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (isFavorite) {
        await removeFavoriteEvent(event.id);
      } else {
        await makeFavoriteEvent(event.id);
      }
      if (onFavorite) onFavorite();
      setIsFavorite(!isFavorite);
      toast.success(
        isFavorite ? "Removed from favorites" : "Added to favorites",
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
    } catch (err) {
      console.error("Failed to update favorite status:", err);
      toast.error("Failed to update favorite status", {
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-3 bg-white dark:bg-gray-800 rounded shadow">
      <div
        className="relative cursor-pointer"
        onClick={() => navigate(`/events/${event.id}`)}
      >
        <img
          src={event.image}
          alt={event.name}
          className="w-46 h-full object-cover rounded"
        />
        <span className="absolute top-2 left-2 text-xs bg-secondary text-black px-2 py-1 rounded">
          {event.category}
        </span>
        {event.isBooked || isBooked ? (
          <span className="absolute top-10 left-2 text-xs bg-green-600 text-white px-2 py-1 rounded">
            Booked
          </span>
        ) : (
          ""
        )}
        {showFavoriteButton && (
          <button
            className="absolute top-2 right-2 bg-white/80 backdrop-blur rounded-full p-1"
            onClick={handleFavorite}
            disabled={isLoading}
          >
            <Star
              size={16}
              className={`${
                isFavorite ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
              } cursor-pointer`}
            />
          </button>
        )}
      </div>
      <div className="flex flex-col p-4 justify-between w-4/6">
        <div>
          <h3
            className="font-semibold text-sm mb-1 line-clamp-2 dark:text-white cursor-pointer"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            {event.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {event.date?.split("T")?.at(0)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            {event.venue}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-green-600">
            EGP {event.price}
          </div>
          {isBooked ? (
            <Button
              className="bg-red-700 hover:bg-red-600 text-white"
              onClick={() => setIsCancelModalOpen(true)}
            >
              Cancel
            </Button>
          ) : (
            <Button
              className="bg-primary text-white dark:bg-secondary dark:text-primary"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              See More
            </Button>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <CancelEventModal
        isOpen={isCancelModalOpen}
        onClose={() => {
          setIsCancelModalOpen(false);
        }}
        onConfirm={handleCancelConfirm}
        eventName={event?.name}
        loading={cancelLoading}
      />
    </div>
  );
};

export default EventCardSmall;
