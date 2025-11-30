'use client';

import React, { useState } from 'react';
import { useServices, useServiceMutations } from '../../lib/hooks/useServices';
import { toast } from 'react-toastify';

const ServicesExamplePage = () => {
  const { services, loading, error, refetch } = useServices();
  const { createService, updateService, deleteService } = useServiceMutations();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parent_id: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingService) {
        await updateService(editingService.id, formData);
        toast.success('Service updated successfully!');
      } else {
        await createService(formData);
        toast.success('Service created successfully!');
      }

      setIsModalOpen(false);
      setEditingService(null);
      setFormData({ name: '', slug: '', description: '', parent_id: null });
      refetch();
    } catch (err) {
      toast.error('Failed to save service');
      console.error(err);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      slug: service.slug,
      description: service.description || '',
      parent_id: service.parent_id,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      await deleteService(id);
      toast.success('Service deleted successfully!');
      refetch();
    } catch (err) {
      toast.error('Failed to delete service');
      console.error(err);
    }
  };

  const handleAdd = () => {
    setEditingService(null);
    setFormData({ name: '', slug: '', description: '', parent_id: null });
    setIsModalOpen(true);
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Services Management</h1>
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-main text-black rounded-lg font-semibold hover:bg-main/90 transition"
          >
            Add New Service
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-white text-lg">Loading services...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
            <p>Error loading services: {error.message || 'Unknown error'}</p>
          </div>
        ) : (
          <div className="bg-background2 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-glass border-b border-stroke">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {services?.map((service) => (
                  <tr key={service.id} className="border-b border-stroke hover:bg-glass/50">
                    <td className="px-6 py-4 text-sm text-body">{service.id}</td>
                    <td className="px-6 py-4 text-sm text-white">{service.name}</td>
                    <td className="px-6 py-4 text-sm text-body">{service.slug}</td>
                    <td className="px-6 py-4 text-sm text-body max-w-md truncate">
                      {service.description || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-background2 rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 bg-glass text-white rounded-lg outline-none border border-stroke focus:border-main"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Slug *
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full p-3 bg-glass text-white rounded-lg outline-none border border-stroke focus:border-main"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-3 bg-glass text-white rounded-lg outline-none border border-stroke focus:border-main h-32"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Parent Service
                    </label>
                    <select
                      value={formData.parent_id || ''}
                      onChange={(e) => setFormData({ ...formData, parent_id: e.target.value || null })}
                      className="w-full p-3 bg-glass text-white rounded-lg outline-none border border-stroke focus:border-main"
                    >
                      <option value="">None (Top Level)</option>
                      {services?.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-main text-black rounded-lg font-semibold hover:bg-main/90 transition"
                  >
                    {editingService ? 'Update Service' : 'Create Service'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 bg-glass text-white rounded-lg font-semibold hover:bg-glass/80 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesExamplePage;
