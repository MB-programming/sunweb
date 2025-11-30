import Axios from "../Axios";

// Settings API using attributes endpoint
// We'll use attributes to store settings like hero section, pricing plans, etc.

// Get all settings
export const getAllSettings = async (params = {}) => {
  try {
    const response = await Axios.get('/attributes', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get setting by ID
export const getSettingById = async (id) => {
  try {
    const response = await Axios.get(`/attributes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get setting by key (name)
export const getSettingByKey = async (key) => {
  try {
    const response = await Axios.get('/attributes', {
      params: { name: key }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new setting
export const createSetting = async (data) => {
  try {
    const response = await Axios.post('/attributes', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update setting
export const updateSetting = async (id, data) => {
  try {
    const response = await Axios.put(`/attributes/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete setting
export const deleteSetting = async (id) => {
  try {
    const response = await Axios.delete(`/attributes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Specific helper functions for hero section
export const getHeroSection = async () => {
  try {
    const response = await Axios.get('/attributes', {
      params: { name: 'hero_section' }
    });

    // If hero section exists, return it, otherwise return default
    if (response.data?.data && response.data.data.length > 0) {
      const heroData = response.data.data.find(attr => attr.name === 'hero_section');
      return heroData ? JSON.parse(heroData.value || '{}') : getDefaultHeroSection();
    }

    return getDefaultHeroSection();
  } catch (error) {
    return getDefaultHeroSection();
  }
};

export const saveHeroSection = async (heroData) => {
  try {
    // First, check if hero_section exists
    const existing = await Axios.get('/attributes', {
      params: { name: 'hero_section' }
    });

    const data = {
      name: 'hero_section',
      value: JSON.stringify(heroData),
      description: 'Hero section configuration'
    };

    if (existing.data?.data && existing.data.data.length > 0) {
      const heroAttr = existing.data.data.find(attr => attr.name === 'hero_section');
      if (heroAttr) {
        // Update existing
        return await Axios.put(`/attributes/${heroAttr.id}`, data);
      }
    }

    // Create new
    return await Axios.post('/attributes', data);
  } catch (error) {
    throw error;
  }
};

// Default hero section
export const getDefaultHeroSection = () => ({
  title: "Building Digital Solutions That Drive Growth",
  description: "From web design to development and marketing we craft solutions that help your business stand out",
  primaryButton: {
    text: "our Services",
    link: "/services"
  },
  secondaryButton: {
    text: "Get Started",
    link: "/book"
  }
});

// Pricing plans helpers
export const getPricingPlans = async () => {
  try {
    const response = await Axios.get('/attributes', {
      params: { name: 'pricing_plans' }
    });

    if (response.data?.data && response.data.data.length > 0) {
      const pricingData = response.data.data.find(attr => attr.name === 'pricing_plans');
      return pricingData ? JSON.parse(pricingData.value || '[]') : getDefaultPricingPlans();
    }

    return getDefaultPricingPlans();
  } catch (error) {
    return getDefaultPricingPlans();
  }
};

export const savePricingPlans = async (plans) => {
  try {
    const existing = await Axios.get('/attributes', {
      params: { name: 'pricing_plans' }
    });

    const data = {
      name: 'pricing_plans',
      value: JSON.stringify(plans),
      description: 'Pricing plans configuration'
    };

    if (existing.data?.data && existing.data.data.length > 0) {
      const pricingAttr = existing.data.data.find(attr => attr.name === 'pricing_plans');
      if (pricingAttr) {
        return await Axios.put(`/attributes/${pricingAttr.id}`, data);
      }
    }

    return await Axios.post('/attributes', data);
  } catch (error) {
    throw error;
  }
};

export const getDefaultPricingPlans = () => ({
  basic: {
    title: "Basic Plan (Starter)",
    desc: "Suitable for small businesses or startups",
    priceFrom: 300,
    priceTo: 500,
    includes: [
      "1–3 Pages Website (Landing Page / Portfolio).",
      "Custom UI/UX Design.",
      "Basic SEO Optimization.",
      "Speed Optimization.",
      "Delivery: 5–7 days.",
    ],
  },
  standard: {
    title: "Standard Plan (Business)",
    desc: "Suitable for medium-sized companies that want a complete website",
    priceFrom: 800,
    priceTo: 1200,
    includes: [
      "Up to 7–10 Pages Website.",
      "Custom UI/UX Design.",
      "CMS Integration (WordPress / Custom CMS).",
      "Basic E-Commerce (Products Catalog + Cart + Checkout).",
      "SEO Optimization (On-Page).",
      "Speed Optimization.",
      "Delivery: 10–14 days.",
    ],
  },
  premium: {
    title: "Premium Plan (Enterprise)",
    desc: "Suitable for large companies that need advanced web solutions",
    priceFrom: 2000,
    priceTo: 3000,
    includes: [
      "Unlimited Pages.",
      "Advanced Custom Design & Development.",
      "Full E-Commerce Platform (Payment Gateway + User Accounts).",
      "API Integrations.",
      "Advanced SEO + Analytics Integration.",
      "Maintenance & Support (1–3 months).",
      "Delivery: 20–30 days.",
    ],
  },
});

export default {
  getAllSettings,
  getSettingById,
  getSettingByKey,
  createSetting,
  updateSetting,
  deleteSetting,
  getHeroSection,
  saveHeroSection,
  getPricingPlans,
  savePricingPlans,
};
