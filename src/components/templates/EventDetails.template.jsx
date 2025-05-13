import React, { useEffect, useState } from "react";
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
import Button from "../atoms/Button";
import { toast } from "react-toastify";
import { useEventService } from "../../api/services";
import { useBookingService } from "../../api/services";
import { logo1, logo5, logo6 } from "../../assets";

const EventDetailsTemplate = ({ event, loading, error }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const { makeFavoriteEvent, removeFavoriteEvent } = useEventService();
  const { createNewBooking } = useBookingService();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  useEffect(() => {
    setIsFavorite(event?.isFavorite || false);
    setIsBooked(event?.isBooked || false);
  }, [event]);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast.success("Link copied to clipboard!", {
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

  const handleFavorite = async () => {
    if (!event) return;

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

  const handleBooking = async () => {
    if (!event || isBooked) return;

    setIsBookingLoading(true);
    try {
      await createNewBooking(event.id);
      setIsBooked(true);
      toast.success("Event booked successfully!", {
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
      navigate("/congratulations");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to book event", {
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
      setIsBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white pb-10 pt-28 max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white pb-10 pt-28 max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="text-center text-red-500 p-4">
          {error || "Event not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white pb-10 pt-28 max-w-[1200px] mx-auto px-6 md:px-10">
      <img
        src={event?.image}
        alt={event?.name}
        className="w-full h-60 md:h-90 object-cover rounded-lg"
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 mb-4">
        <h1 className="text-3xl font-bold">{event?.name}</h1>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button
            onClick={handleFavorite}
            disabled={isLoading}
            className="cursor-pointer"
          >
            <Star
              className={`${
                isFavorite ? "fill-yellow-400 text-yellow-400" : ""
              }`}
            />
          </button>
          <Share2 onClick={handleShare} className="cursor-pointer" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <CircleDollarSign /> Ticket Price: EGP {event?.price}
          </div>
          <div className="flex items-center gap-2 text-md font-semibold">
            <CalendarDays /> {event?.date?.split("T")?.at(0)}
          </div>
          <div className="flex items-center gap-2 text-md font-semibold">
            <Clock /> {event?.time}
          </div>
          <div className="flex items-center gap-2 text-md font-semibold">
            <Tickets /> {event?.category}
          </div>
        </div>

        <div className="mt-6 md:mt-0">
          <Button
            className={`${
              isBooked
                ? "bg-green-600 text-white dark:text-white"
                : "bg-primary hover:bg-primary/90 dark:bg-secondary"
            } text-white dark:text-primary px-8 text-xl w-full md:w-auto m-0`}
            onClick={handleBooking}
            disabled={isBooked || isBookingLoading}
          >
            {isBookingLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : isBooked ? (
              "Booked"
            ) : (
              "Book Now"
            )}
          </Button>
        </div>
      </div>

      <div className="mb-3">
        <h3 className="text-xl font-semibold">Event Description</h3>
        <p className="text-sm leading-relaxed whitespace-pre-line">
          {event?.description}
        </p>
      </div>

      {event?.tags && event?.tags?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {event?.tags?.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6 mt-6">
        <h3 className="text-xl font-semibold mb-2">Location</h3>
        <p className="text-sm flex items-center gap-2 mb-3">
          <MapPin /> {event?.venue}
        </p>
        <iframe
          src={
            event?.mapSrc ??
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.870703087366!2d72.83276531490098!3d19.076090787088576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce5e26b88d43%3A0x888ab4950b3ab0f9!2sBalgandharva%20Rang%20Mandir!5e0!3m2!1sen!2sin!4v1700000000000"
          }
          width="100%"
          height="250"
          className="rounded"
          allowFullScreen=""
          loading="lazy"
          title="event-map"
        />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-xl mb-2">Added by</h3>
        <div className="flex items-center gap-4">
          <img src={logo1} alt="host" className="w-15 h-15 rounded-full" />
          <div>
            <p className="font-medium">Eventora System</p>
            <div
              className="text-sm text-blue-600 cursor-pointer"
              onClick={() => navigate("/contact")}
            >
              Contact
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsTemplate;
