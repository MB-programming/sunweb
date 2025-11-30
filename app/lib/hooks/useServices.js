'use client';

import { useState, useEffect } from 'react';
import * as servicesApi from '../services/servicesApi';

export const useServices = (params = {}) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await servicesApi.getAllServices(params);
      setServices(result?.data || []);
    } catch (err) {
      setError(err?.response?.data || err.message);
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [JSON.stringify(params)]);

  return { services, loading, error, refetch: fetchServices };
};

export const useService = (id) => {
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await servicesApi.getServiceById(id);
        setService(result?.data);
      } catch (err) {
        setError(err?.response?.data || err.message);
        console.error('Error fetching service:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  return { service, loading, error };
};

export const useServiceMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createService = async (serviceData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await servicesApi.createService(serviceData);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (id, serviceData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await servicesApi.updateService(id, serviceData);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const result = await servicesApi.deleteService(id);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createService, updateService, deleteService, loading, error };
};
