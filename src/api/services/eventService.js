import useApi from '../hooks/useApi';

export const useEventService = () => {
  const api = useApi();

  const getEvents = async (params = {}) => {
    return api.get('/events', { params });
  };

  const getEventById = async (id) => {
    return api.get(`/events/${id}`);
  };

  const createEvent = async (eventData) => {
    return api.post('/events', eventData);
  };

  const updateEvent = async (id, eventData) => {
    return api.put(`/events/${id}`, eventData);
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
  };
}; 