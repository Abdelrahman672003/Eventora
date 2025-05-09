import useApi from "../hooks/useApi";

export const useEventService = () => {
  const api = useApi();

  const getEvents = async (params = {}) => {
    return api.get("/events", { params });
  };

  const getEventById = async (id) => {
    return api.get(`/events/${id}`);
  };

  const makeFavoriteEvent = async (eventId) => {
    return api.post(`/events/${eventId}/favorite`);
  };

  const removeFavoriteEvent = async (eventId) => {
    return api.delete(`/events/${eventId}/favorite`);
  };

  const getFavoriteEvents = async () => {
    return api.get("/events/favorites");
  };

  const createEvent = async (eventData) => {
    return api.post("/events", eventData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  };

  const updateEvent = async (id, eventData) => {
    return api.put(`/events/${id}`, eventData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  };

  const deleteEvent = async (id) => {
    return api.delete(`/events/${id}`);
  };

  return {
    loading: api.loading,
    error: api.error,
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    makeFavoriteEvent,
    getFavoriteEvents,
    removeFavoriteEvent,
  };
};
