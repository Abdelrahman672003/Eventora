import { Star } from "lucide-react";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { useBookingService, useEventService } from "../../api/services";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CancelEventModal from "../modals/CancelEventModal";

const EventCardSmall = ({
  key,
  event,
  onFavorite,
  showFavoriteButton = true,
  isBooked,
  booking = null,
  fetchBookings,
}) => {
  const navigate = useNavigate();
  const { cancelBooking, loading: cancelLoading } = useBookingService();
  const { makeFavoriteEvent, removeFavoriteEvent } = useEventService();

  const [isFavorite, setIsFavorite] = useState(event.isFavorite || false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(event.isFavorite || false);
  }, [event]);

  const handleCancelConfirm = async () => {
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

      fetchBookings();
    } catch (err) {
      // console.log(err);
      toast.error(err?.response?.data?.message || "Failed to cancan event", {
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
      // console.error("Failed to update favorite status:", err);
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
    <div
      key={key}
      className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded shadow-md"
    >
      <div
        className="relative cursor-pointer"
        onClick={() => navigate(`/events/${event?.id}`)}
      >
        <img
          src={event?.image}
          alt={event?.name}
          className="w-full md:w-46 h-40 md:h-full object-cover rounded"
        />
        <span className="absolute bottom-2 left-2 text-xs bg-secondary text-black px-2 py-1 rounded max-w-[90%] truncate">
          {event?.category}
        </span>
        {event?.isBooked || isBooked ? (
          <span className="absolute top-2 left-2 text-xs bg-green-600 text-white px-2 py-1 rounded">
            Booked
          </span>
        ) : (
          ""
        )}
        {showFavoriteButton && localStorage.getItem("user") && (
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
      <div className="flex flex-col p-4 justify-between md:w-4/6">
        <div>
          <div className="text-sm text-gray-500 font-bold mb-1">
            {event?.date?.split("T")[0]}
          </div>
          <h3
            className="font-semibold text-md mb-1 line-clamp-2 dark:text-white cursor-pointer"
            onClick={() => navigate(`/events/${event?.id}`)}
          >
            {event?.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            {event?.venue}
          </p>
          <div className="flex items-center justify-between gap-4 block md:hidden">
            <span className="text-sm font-medium text-green-600">
              EGP {event?.price}
            </span>
            {event?.interestedCount ? (
              <span className="flex text-sm text-gray-500 dark:text-gray-400 items-center gap-1">
                <Star size={14} className="text-purple-500" />
                {event?.interestedCount} interested
              </span>
            ) : (
              ""
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 hidden md:block">
            {event?.interestedCount ? (
              <span className="flex items-center gap-1">
                <Star size={14} className="text-purple-500" />
                {event?.interestedCount} interested
              </span>
            ) : (
              ""
            )}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div className="text-sm font-medium text-green-600 hidden md:block">
            EGP {event?.price}
          </div>
          {isBooked ? (
            <Button
              className="bg-red-700 hover:bg-red-600 text-white mt-2 md:mt-0"
              onClick={() => setIsCancelModalOpen(true)}
            >
              Cancel
            </Button>
          ) : (
            <Button
              className="bg-primary text-white dark:bg-secondary dark:text-primary mt-2 md:mt-0"
              onClick={() => navigate(`/events/${event?.id}`)}
            >
              See More
            </Button>
          )}
        </div>
      </div>

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
