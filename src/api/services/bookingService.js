import useApi from "../hooks/useApi";

export const useBookingService = () => {
  const api = useApi();

  const getUserBookings = async () => {
    return api.get("/bookings/my-bookings");
  };

  const getBookingDetails = async (eventId) => {
    return api.get(`/bookings/${eventId}`);
  };

  const createNewBooking = async (eventId) => {
    return api.post(`/bookings`, { eventId, quantity: 1 });
  };

  const cancelBooking = async (ticketId) => {
    return api.put(`/bookings/${ticketId}/cancel`);
  };

  return {
    loading: api.loading,
    error: api.error,
    getUserBookings,
    getBookingDetails,
    createNewBooking,
    cancelBooking,
  };
};
