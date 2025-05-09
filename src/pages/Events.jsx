import React, { useEffect, useState } from "react";
import { EventsTemplate } from "../components";
import { useEventService } from "../api/services";

const Events = () => {
  const [events, setEvents] = useState([]);
  const { getEvents, loading, error } = useEventService();
  const [filters, setFilters] = useState({
    category: [],
    minPrice: "",
    maxPrice: "",
    search: "",
  });

  const removeAllFilters = () => {
    setFilters({
      category: [],
      minPrice: "",
      maxPrice: "",
      search: "",
    });
    fetchEvents();
  };

  useEffect(() => {
    document.title = "Eventora - Events";
    fetchEvents();
  }, []); // Only fetch on initial load

  const fetchEvents = async () => {
    try {
      // Convert filters to API parameters
      const params = {
        category: filters.category,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        search: filters.search,
      };

      // Remove empty parameters
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

  const handleApplyFilters = () => {
    fetchEvents();
  };

  return (
    <EventsTemplate
      events={events}
      loading={loading}
      error={error}
      filters={filters}
      onFilterChange={handleFilterChange}
      onSearch={handleSearch}
      onApplyFilters={handleApplyFilters}
      removeAllFilters={removeAllFilters}
    />
  );
};

export default Events;
