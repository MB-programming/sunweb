'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Generic API hook for handling API calls with loading, error, and data states
 * @param {Function} apiFunction - The API function to call
 * @param {boolean} immediate - Whether to call the API immediately on mount
 */
export const useApi = (apiFunction, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...params) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...params);
      setData(result);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return { data, loading, error, execute, setData };
};

/**
 * Hook for fetching a list of items
 */
export const useList = (apiFunction, params = {}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(params);
      setItems(result?.data || []);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [apiFunction, params]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refetch: fetchItems };
};

/**
 * Hook for CRUD operations
 */
export const useCrud = (apiService) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.create(data);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, data) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.update(id, data);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.delete(id);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, update, remove, loading, error };
};
