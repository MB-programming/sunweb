'use client';

import { useState, useEffect } from 'react';
import * as projectsApi from '../services/projectsApi';

export const useProjects = (params = {}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await projectsApi.getAllProjects(params);
      setProjects(result?.data || []);
    } catch (err) {
      setError(err?.response?.data || err.message);
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [JSON.stringify(params)]);

  return { projects, loading, error, refetch: fetchProjects };
};

export const useProject = (id) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await projectsApi.getProjectById(id);
        setProject(result?.data);
      } catch (err) {
        setError(err?.response?.data || err.message);
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  return { project, loading, error };
};

export const useProjectMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProject = async (projectData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await projectsApi.createProject(projectData);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id, projectData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await projectsApi.updateProject(id, projectData);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const result = await projectsApi.deleteProject(id);
      return result;
    } catch (err) {
      setError(err?.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createProject, updateProject, deleteProject, loading, error };
};
