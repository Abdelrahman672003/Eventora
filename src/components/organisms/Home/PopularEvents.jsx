import { useNavigate } from "react-router-dom";
import { event1 } from "../../../assets";
import Button from "../../atoms/Button";
import EventCard from "../../molecules/EventCard";

const dummyEvents = [
  {
    image: event1,
    title: "Lakeside Camping at Pawna",
    category: "Travel & Adventure",
    date: "NOV 25 - 26",
    location: "Adventure Geek - Explore the Unexplored...",
    price: "ُEGP 1,400",
    interested: 14,
  },
  {
    image: event1,
    title: "Sound Of Christmas 2023",
    category: "Cultural & Arts",
    date: "MAY 28",
    location: "Bal Gandharva Rang Mandir, Mumbai",
    price: "EGP 499",
    interested: 16,
  },
  {
    image: event1,
    title: "Meet the Royal College of Art in Mumbai 2023",
    category: "Educational & Business",
    date: "DEC 02",
    location: "Sofitel Mumbai BKC, Mumbai",
    price: "FREE",
    interested: 16,
  },
  {
    image: event1,
    title: "Meet the Royal College of Art in Mumbai 2023",
    category: "Educational & Business",
    date: "MAR 13",
    location: "Sofitel Mumbai BKC, Mumbai",
    price: "FREE",
  },
  {
    image: event1,
    title: "Meet the Royal College of Art in Mumbai 2023",
    category: "Educational & Business",
    date: "FEB 22 - 24",
    location: "Sofitel Mumbai BKC, Mumbai",
    price: "EGP 999",
    interested: 3,
  },
  {
    image: event1,
    title: "Meet the Royal College of Art in Mumbai 2023",
    category: "Educational & Business",
    date: "JAN 09",
    location: "Sofitel Mumbai BKC, Mumbai",
    price: "FREE",
    interested: 126,
  },
];

const PopularEvents = ({ events, title }) => {
  const navigate = useNavigate();
  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-start text-primary dark:text-white">
            {title}
          </h2>
          <Button
            className="bg-primary text-white px-8 dark:bg-secondary dark:text-primary"
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
