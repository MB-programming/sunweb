'use client';

import { useState, useEffect } from 'react';
import * as booksApi from '../services/booksApi';

export const useBookings = (params = {}) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await booksApi.getAllBookings(params);
      setBookings(result?.data || []);
    } catch (err) {
      setError(err?.response?.data || err.message);
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [JSON.stringify(params)]);

  return { bookings, loading, error, refetch: fetchBookings };
};

export const useBooking = (id) => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchBooking = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await booksApi.getBookingById(id);
        setBooking(result?.data);
      } catch (err) {
        setError(err?.response?.data || err.message);
        console.error('Error fetching booking:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  return { booking, loading, error };
};

export const useBookingMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createBooking = async (bookingData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const result = await booksApi.createBooking(bookingData);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (id, bookingData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await booksApi.updateBooking(id, bookingData);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const result = await booksApi.deleteBooking(id);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, updateBooking, deleteBooking, loading, error, success };
};
