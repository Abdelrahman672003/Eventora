import { useState, useCallback } from 'react';
import axiosInstance from '../axios.config';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const get = useCallback(async (url, config = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(url, config);
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const post = useCallback(async (url, data, config = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.post(url, data, config);
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const put = useCallback(async (url, data, config = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.put(url, data, config);
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const del = useCallback(async (url, config = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.delete(url, config);
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    get,
    post,
    put,
    delete: del,
  };
};

export default useApi; 