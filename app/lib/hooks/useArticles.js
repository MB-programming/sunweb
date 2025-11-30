import { useState, useEffect } from 'react';
import * as articlesApi from '../services/articlesApi';

// Hook to get all articles
export const useArticles = (params = {}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await articlesApi.getAllArticles(params);
      setArticles(result?.data || []);
    } catch (err) {
      setError(err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [JSON.stringify(params)]);

  return { articles, loading, error, refetch: fetchArticles };
};

// Hook to get single article
export const useArticle = (id) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await articlesApi.getArticleById(id);
      setArticle(result?.data);
    } catch (err) {
      setError(err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  return { article, loading, error, refetch: fetchArticle };
};

// Hook for article mutations
export const useArticleMutations = () => {
  const [loading, setLoading] = useState(false);

  const createArticle = async (data) => {
    try {
      setLoading(true);
      const result = await articlesApi.createArticle(data);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateArticle = async (id, data) => {
    try {
      setLoading(true);
      const result = await articlesApi.updateArticle(id, data);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id) => {
    try {
      setLoading(true);
      const result = await articlesApi.deleteArticle(id);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    createArticle,
    updateArticle,
    deleteArticle,
    loading,
  };
};
