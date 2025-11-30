import { useState, useEffect } from 'react';
import {
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
  toggleBannerStatus
} from '../services/bannersApi';

// Hook to get all banners
export const useBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const data = await getAllBanners();
      setBanners(data);
      setError(null);
    } catch (err) {
      setError(err);
      console.error('Error fetching banners:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return { banners, loading, error, refetch: fetchBanners };
};

// Hook to get single banner
export const useBanner = (id) => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBanner = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await getBannerById(id);
      setBanner(data);
      setError(null);
    } catch (err) {
      setError(err);
      console.error('Error fetching banner:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, [id]);

  return { banner, loading, error, refetch: fetchBanner };
};

// Hook for banner mutations (create, update, delete)
export const useBannerMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (bannerData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await createBanner(bannerData);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, bannerData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await updateBanner(id, bannerData);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      setLoading(true);
      setError(null);
      await deleteBanner(id);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const result = await toggleBannerStatus(id);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createBanner: create,
    updateBanner: update,
    deleteBanner: remove,
    toggleBannerStatus: toggleStatus,
    loading,
    error
  };
};
