import React, { useEffect, useState } from "react";
import { EventsTemplate } from "../components";
import { useEventService } from "../api/services";

const Events = () => {
  const { getEvents, loading, error } = useEventService();

  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    minPrice: "",
    maxPrice: "",
    search: "",
  });

  const removeAllFilters = () => {
    fetchEvents(true);
  };

  useEffect(() => {
    document.title = "Eventora - Events";
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const params = {
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
