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

  const [homeFilterDone, setHomeFilterDone] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    document.title = "Eventora - Events";
  }, []);

  useEffect(() => {
    if (location?.state && !homeFilterDone) {
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
      fetchEvents(
        {
          category: [location?.state?.category],
          search: location?.state?.search,
        },
        page > 1
      );
      setHomeFilterDone(true);
    } else {
      fetchEvents(null, page > 1);
    }
  }, [location, page]);

  const removeAllFilters = () => {
    setFilters({
      category: [],
      minPrice: "",
      maxPrice: "",
      search: "",
    });

    setPage(1);
    fetchEvents({
      category: [],
      minPrice: "",
      maxPrice: "",
      search: "",
    });
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  const fetchEvents = async (state, loadMore = false) => {
    if (loadMore) setIsLoadingMore(true);
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

      const data = await getEvents({
        ...params,
        page: page,
        limit: itemsPerPage,
      });
      if (loadMore) {
        setEvents([...events, ...data?.events]);
      } else {
        setEvents(data?.events);
      }
      setTotalPages(data?.totalPages);
      setTotalEvents(data?.totalEvents);
      if (loadMore) setIsLoadingMore(false);
    } catch (err) {
      console.error("Error fetching events:", err);
      if (loadMore) setIsLoadingMore(false);
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

  const onApplyFilters = () => {
    if (page == 1) fetchEvents(filters);
    else setPage(1);
    // fetchEvents(filters);
  };

  return (
    <EventsTemplate
      events={events}
      loading={loading}
      error={error}
      filters={filters}
      onFilterChange={handleFilterChange}
      onSearch={handleSearch}
      onApplyFilters={onApplyFilters}
      removeAllFilters={removeAllFilters}
      handleLoadMore={handleLoadMore}
      isLoadingMore={isLoadingMore}
      page={page}
      totalPages={totalPages}
      totalEvents={totalEvents}
    />
  );
};

export default Events;
