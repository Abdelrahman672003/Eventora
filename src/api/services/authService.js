import useApi from "../hooks/useApi";

export const useAuthService = () => {
  const api = useApi();

  const login = async (credentials) => {
    return api.post("/auth/login", credentials);
  };

  const signup = async (userData) => {
    return api.post("/auth/signup", userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return {
    loading: api.loading,
    error: api.error,
    login,
    signup,
    logout,
  };
};
