import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import { useEventService, useBookingService } from "../../api/services";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CancelEventModal from "../modals/CancelEventModal";

const EventCard = ({ key, event }) => {
  const navigate = useNavigate();
  const { makeFavoriteEvent, removeFavoriteEvent } = useEventService();

  const [isFavorite, setIsFavorite] = useState(event.isFavorite || false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(event.isFavorite || false);
  }, [event]);

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
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden w-full md:max-w-sm"
    >
      <div
        className="relative h-40 cursor-pointer"
        onClick={() => navigate(`/events/${event?.id}`)}
      >
        <img
          src={event?.image}
          alt={event?.name}
          className="object-cover w-full h-full"
        />
        <span className="absolute top-2 left-2 text-xs bg-secondary text-black px-2 py-1 rounded">
          {event?.category}
        </span>
        {localStorage.getItem("user") && (
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

      <div
        className="p-4 cursor-pointer"
        onClick={() => navigate(`/events/${event?.id}`)}
      >
        <div className="text-sm text-gray-500 font-bold mb-1">
          {event?.date?.split("T")[0]}
        </div>
        <h3 className="text-md font-semibold text-black dark:text-white truncate">
          {event?.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
          {event?.venue}
        </p>
        <div className="text-xs text-gray-500 mt-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-green-600">
              EGP {event?.price}
            </span>
            {event?.interestedCount ? (
              <span className="flex items-center gap-1">
                <Star size={14} className="text-purple-500" />
                {event?.interestedCount} interested
              </span>
            ) : (
              ""
            )}
          </div>

          <Button
            className="bg-primary text-white dark:bg-secondary dark:text-primary"
            onClick={() => navigate(`/events/${event?.id}`)}
          >
            See More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
