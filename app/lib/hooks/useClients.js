'use client';

import { useState, useEffect } from 'react';
import * as clientsApi from '../services/clientsApi';

export const useClients = (params = {}) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await clientsApi.getAllClients(params);
      setClients(result?.data || []);
    } catch (err) {
      setError(err?.response?.data || err.message);
      console.error('Error fetching clients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [JSON.stringify(params)]);

  return { clients, loading, error, refetch: fetchClients };
};

export const useClient = (id) => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchClient = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await clientsApi.getClientById(id);
        setClient(result?.data);
      } catch (err) {
        setError(err?.response?.data || err.message);
        console.error('Error fetching client:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  return { client, loading, error };
};

export const useClientMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createClient = async (clientData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await clientsApi.createClient(clientData);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async (id, clientData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await clientsApi.updateClient(id, clientData);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const result = await clientsApi.deleteClient(id);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createClient, updateClient, deleteClient, loading, error };
};
