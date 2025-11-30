import { useState, useEffect } from 'react';
import * as pricingInquiriesApi from '../services/pricingInquiriesApi';

// Hook to get all pricing inquiries
export const usePricingInquiries = (params = {}) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await pricingInquiriesApi.getAllPricingInquiries(params);
      setInquiries(result?.data || []);
    } catch (err) {
      setError(err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [JSON.stringify(params)]);

  return { inquiries, loading, error, refetch: fetchInquiries };
};

// Hook to get single pricing inquiry
export const usePricingInquiry = (id) => {
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInquiry = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await pricingInquiriesApi.getPricingInquiryById(id);
      setInquiry(result?.data);
    } catch (err) {
      setError(err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchInquiry();
    }
  }, [id]);

  return { inquiry, loading, error, refetch: fetchInquiry };
};

// Hook for pricing inquiry mutations
export const usePricingInquiryMutations = () => {
  const [loading, setLoading] = useState(false);

  const createInquiry = async (data) => {
    try {
      setLoading(true);
      const result = await pricingInquiriesApi.createPricingInquiry(data);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateInquiry = async (id, data) => {
    try {
      setLoading(true);
      const result = await pricingInquiriesApi.updatePricingInquiry(id, data);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteInquiry = async (id) => {
    try {
      setLoading(true);
      const result = await pricingInquiriesApi.deletePricingInquiry(id);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createInquiry,
    updateInquiry,
    deleteInquiry,
    loading,
  };
};
