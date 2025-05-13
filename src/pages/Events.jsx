import React, { useEffect, useState } from "react";
import { EventsTemplate } from "../components";
import { useEventService } from "../api/services";
import { useLocation } from "react-router-dom";

const Events = () => {
  const { getEvents, loading, error } = useEventService();
  const location = useLocation();

  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    minPrice: "",
    maxPrice: "",
    search: "",
  });

  useEffect(() => {
    document.title = "Eventora - Events";
  }, []);

  useEffect(() => {
    if (location?.state) {
      if (location?.state?.category)
        setFilters((prev) => ({
          ...prev,
          category: [location?.state?.category],
        }));
      if (location?.state?.search)
        setFilters((prev) => ({
          ...prev,
          search: location?.state?.search,
        }));
      fetchEvents({
        category: [location?.state?.category],
        search: location?.state?.search,
      });
    } else {
      fetchEvents();
    }
  }, [location]);

  const removeAllFilters = () => {
    setFilters({
      category: [],
      minPrice: "",
      maxPrice: "",
      search: "",
    });

    fetchEvents({
      category: [],
      minPrice: "",
      maxPrice: "",
      search: "",
    });
  };

  const fetchEvents = async (state) => {
    try {
      const params = state
        ? {
            category: state?.category,
            minPrice: state?.minPrice,
            maxPrice: state?.maxPrice,
            search: state?.search,
          }
        : {
            category: filters?.category,
            minPrice: filters?.minPrice,
            maxPrice: filters?.maxPrice,
            search: filters?.search,
          };

      Object.keys(params).forEach((key) => {
        if (!params[key]) {
          delete params[key];
        }
      });

      const data = await getEvents(params);
      setEvents(data?.events);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleSearch = (value) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
    }));
  };

  return (
    <EventsTemplate
      events={events}
      loading={loading}
      error={error}
      filters={filters}
      onFilterChange={handleFilterChange}
      onSearch={handleSearch}
      onApplyFilters={fetchEvents}
      removeAllFilters={removeAllFilters}
    />
  );
};

export default Events;
