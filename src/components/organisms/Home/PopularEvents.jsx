import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import EventCard from "../../molecules/EventCard";

const PopularEvents = ({ events, title }) => {
  const navigate = useNavigate();
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl font-bold text-start text-primary dark:text-white">
            {title}
          </h2>
          <Button
            className="bg-primary text-white px-8 dark:bg-secondary dark:text-primary mt-4 md:mt-0"
            onClick={() => navigate("/events")}
          >
            See All Events
          </Button>
        </div>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {events?.map((event, idx) => (
            <EventCard key={idx} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularEvents;
