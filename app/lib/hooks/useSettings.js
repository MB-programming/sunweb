import { useState, useEffect } from 'react';
import * as settingsApi from '../services/settingsApi';

// Hook to get all settings
export const useSettings = (params = {}) => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await settingsApi.getAllSettings(params);
      setSettings(result?.data || []);
    } catch (err) {
      setError(err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [JSON.stringify(params)]);

  return { settings, loading, error, refetch: fetchSettings };
};

// Hook to get hero section
export const useHeroSection = () => {
  const [heroSection, setHeroSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHeroSection = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await settingsApi.getHeroSection();
      setHeroSection(result);
    } catch (err) {
      setError(err?.response?.data || err.message);
      setHeroSection(settingsApi.getDefaultHeroSection());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroSection();
  }, []);

  return { heroSection, loading, error, refetch: fetchHeroSection };
};

// Hook to get pricing plans
export const usePricingPlans = () => {
  const [pricingPlans, setPricingPlans] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPricingPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await settingsApi.getPricingPlans();
      setPricingPlans(result);
    } catch (err) {
      setError(err?.response?.data || err.message);
      setPricingPlans(settingsApi.getDefaultPricingPlans());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricingPlans();
  }, []);

  return { pricingPlans, loading, error, refetch: fetchPricingPlans };
};

// Hook for settings mutations
export const useSettingsMutations = () => {
  const [loading, setLoading] = useState(false);

  const createSetting = async (data) => {
    try {
      setLoading(true);
      const result = await settingsApi.createSetting(data);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (id, data) => {
    try {
      setLoading(true);
      const result = await settingsApi.updateSetting(id, data);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteSetting = async (id) => {
    try {
      setLoading(true);
      const result = await settingsApi.deleteSetting(id);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const saveHeroSection = async (data) => {
    try {
      setLoading(true);
      const result = await settingsApi.saveHeroSection(data);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const savePricingPlans = async (data) => {
    try {
      setLoading(true);
      const result = await settingsApi.savePricingPlans(data);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createSetting,
    updateSetting,
    deleteSetting,
    saveHeroSection,
    savePricingPlans,
    loading,
  };
};
