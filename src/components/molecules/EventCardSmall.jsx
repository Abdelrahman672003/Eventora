import { Star } from "lucide-react";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";

const EventCardSmall = ({ event }) => {
  const navigate = useNavigate()
  return (
    <div className="flex gap-3 bg-white dark:bg-gray-800 rounded shadow">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-46 h-full object-cover rounded"
        />

        <button className="absolute top-2 right-2 bg-white/80 backdrop-blur rounded-full p-1">
          <Star size={16} className="text-gray-600 cursor-pointer" />
        </button>
      </div>
      <div className="flex-1 p-4">
        <h3 className="font-semibold text-sm mb-1 line-clamp-2 dark:text-white">
          {event.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{event.date}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{event.location}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-green-600">
            {event.price}
          </div>
          <Button
            className="bg-primary text-white dark:bg-secondary dark:text-primary"
            onClick={() => navigate(`/events/${1}`)}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCardSmall;
