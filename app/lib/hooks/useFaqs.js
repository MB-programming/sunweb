'use client';

import { useState, useEffect } from 'react';
import * as faqsApi from '../services/faqsApi';

export const useFaqs = (params = {}) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await faqsApi.getAllFaqs(params);
      setFaqs(result?.data || []);
    } catch (err) {
      setError(err?.response?.data || err.message);
      console.error('Error fetching FAQs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, [JSON.stringify(params)]);

  return { faqs, loading, error, refetch: fetchFaqs };
};

export const useFaq = (id) => {
  const [faq, setFaq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchFaq = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await faqsApi.getFaqById(id);
        setFaq(result?.data);
      } catch (err) {
        setError(err?.response?.data || err.message);
        console.error('Error fetching FAQ:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaq();
  }, [id]);

  return { faq, loading, error };
};

export const useFaqMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createFaq = async (faqData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await faqsApi.createFaq(faqData);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateFaq = async (id, faqData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await faqsApi.updateFaq(id, faqData);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteFaq = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const result = await faqsApi.deleteFaq(id);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createFaq, updateFaq, deleteFaq, loading, error };
};
