import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  MapPin,
  Star,
  Share2,
  CircleDollarSign,
  Tickets,
} from "lucide-react";
import { event1 } from "../../assets";
import Button from "../atoms/Button";
import { toast } from "react-toastify";

const EventDetailsTemplate = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast("Link copied to clipboard!", {
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
      setTimeout(() => setCopied(false), 5000);
    });
  };

  const event = {
    title: "Sound Of Christmas 2025",
    image: event1,
    date: "Saturday, 2 December 2025",
    time: "6:30 PM - 9:30 PM",
    venue: "Balgandharva Rang Mandir, Bandra West, Mumbai, India",
    category: "Concert",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.870703087366!2d72.83276531490098!3d19.076090787088576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce5e26b88d43%3A0x888ab4950b3ab0f9!2sBalgandharva%20Rang%20Mandir!5e0!3m2!1sen!2sin!4v1700000000000",
    price: "EGP 999",
    host: {
      name: "City Youth Movement",
      logo: "/assets/host-logo.png",
    },
    description: `
      Get ready to kick off the Christmas season in Mumbai with SOUND OF CHRISTMAS - your favourite LIVE Christmas concert!
      City Youth Movement invites you to the 4th edition of our annual Christmas festivities. 
      Join the youth and the youth-feat, your favourite worship leaders, carols, games, and some exciting surprises!
    `,
    reasons: [
      "The FIRST Christmas concert of Mumbai!",
      "A special Christmas choir",
      "Special dance performances and many more surprises!",
    ],
    tags: [
      "Holiday Event",
      "Live Performance",
      "Seasonal Event",
      "Family Friendly",
      "Christmas Spirit",
    ],
  };

  const handleBooking = () => {
    // simulate booking logic (e.g., update user state, count, etc.)
    navigate("/congratulations");
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white pb-10 pt-28 max-w-[1200px] mx-auto px-10">
      {/* Banner */}
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-90 object-cover rounded-lg"
      />

      {/* Title & Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 mb-4">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Star className="cursor-pointer" />
          <Share2 onClick={handleShare} className="cursor-pointer" />
        </div>
      </div>

      {/* Date & Time */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <CircleDollarSign /> Ticket Price: {event.price}
          </div>
          <div className="flex items-center gap-2 text-md font-semibold">
            <CalendarDays /> {event.date}
          </div>
          <div className="flex items-center gap-2 text-md font-semibold">
            <Clock /> {event.time}
          </div>
          <div className="flex items-center gap-2 text-md font-semibold">
            <Tickets /> {event.category}
          </div>
        </div>

        {/* Ticket Info */}
        <div className="mt-6 md:mt-0">
          <Button
            className="bg-primary text-white dark:bg-secondary dark:text-primary px-8 text-xl"
            onClick={handleBooking}
          >
            Book Now
          </Button>
        </div>
      </div>

      {/* Description */}
      <div className="mb-3">
        <h3 className="text-xl font-semibold">Event Description</h3>
        <p className="text-sm leading-relaxed whitespace-pre-line">
          {event.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 text-sm mt-4">
        {event.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Location & Map */}
      <div className="mb-6 mt-6">
        <h3 className="text-xl font-semibold mb-2">Location</h3>
        <p className="text-sm flex items-center gap-2 mb-3">
          <MapPin /> {event.venue}
        </p>
        <iframe
          src={event.mapSrc}
          width="100%"
          height="250"
          className="rounded"
          allowFullScreen=""
          loading="lazy"
          title="event-map"
        />
      </div>

      {/* Host Info */}
      <div className="mb-6">
        <h3 className="font-semibold text-xl mb-2">Hosted by</h3>
        <div className="flex items-center gap-4">
          <img
            src={event.host.logo}
            alt="host"
            className="w-15 h-15 rounded-full"
          />
          <div>
            <p className="font-medium">{event.host.name}</p>
            <div className="text-sm text-blue-600 cursor-pointer">Contact</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsTemplate;
