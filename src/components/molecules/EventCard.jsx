import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden w-full md:max-w-sm">
      <div className="relative h-40">
        <img
          src={event.image}
          alt={event.title}
          className="object-cover w-full h-full"
        />
        <span className="absolute top-2 left-2 text-xs bg-secondary text-black px-2 py-1 rounded">
          {event.category}
        </span>
        <button className="absolute top-2 right-2 bg-white/80 backdrop-blur rounded-full p-1">
          <Star size={16} className="text-gray-600 cursor-pointer" />
        </button>
      </div>

      <div
        className="p-4 cursor-pointer"
        onClick={() => navigate(`/events/${1}`)}
      >
        <div className="text-sm text-gray-500 font-bold mb-1">{event.date}</div>
        <h3 className="text-md font-semibold text-black dark:text-white truncate">
          {event.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
          {event.location}
        </p>
        <div className="text-xs text-gray-500 mt-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span>{event.price}</span>
            {event.interested && (
              <span className="flex items-center gap-1">
                <Star size={14} className="text-purple-500" />
                {event.interested} interested
              </span>
            )}
          </div>
          <Button
            className="bg-primary text-white dark:bg-secondary dark:text-primary"
            onClick={() => navigate(`/events/${1}`)}
          >
            See More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
