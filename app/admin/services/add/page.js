"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useServices } from "@/app/lib/hooks/useServices";
import { useServiceMutations } from "@/app/lib/hooks/useServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifcation from "@/app/Components/Notification";
import LoadingPage from "@/app/Components/Loader/Loader";

const Page = () => {
  const router = useRouter();
  const { services: allServices, loading: servicesLoading } = useServices();
  const { createService, loading } = useServiceMutations();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parent_id: "",
    status: "active",
    icon: ""
  });

  const handleInputChange = (e) => {
    const { id, name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id || name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      return toast.error("Service name is required!");
    }

    try {
      const submitData = {
        name: formData.name,
        description: formData.description,
        status: formData.status,
        icon: formData.icon || null
      };

      // Add parent_id only if selected
      if (formData.parent_id) {
        submitData.parent_id = formData.parent_id;
      }

      await createService(submitData);
      toast.success("Service added successfully!");
      router.push("/admin/services");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add service");
    }
  };

  // Get parent services (top-level services only)
  const parentServices = allServices?.filter(s => !s.parent_id) || [];

  return (
    <div className="mt-3">
      {loading && <LoadingPage />}
      <Notifcation />

      <h3 className="text-white mt-5 text-[1.2rem] font-bold">
        Add new service
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mt-4 w-full p-5 bg-background2 rounded">
          <div>
            <label
              htmlFor="name"
              className="text-white text-base font-semibold"
            >
              Service name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter service name"
              className="w-full py-3 px-5 text-white rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main placeholder:text-body placeholder:font-light"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="description"
              className="text-white text-base font-semibold"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter service description"
              className="w-full py-3 px-5 text-white h-32 rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main placeholder:text-body placeholder:font-light"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="icon"
              className="text-white text-base font-semibold"
            >
              Icon (optional)
            </label>
            <input
              type="text"
              id="icon"
              value={formData.icon}
              onChange={handleInputChange}
              placeholder="e.g., mdi:application-cog-outline"
              className="w-full py-3 px-5 text-white rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main placeholder:text-body placeholder:font-light"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="parent_id"
              className="text-white text-base font-semibold"
            >
              Parent Service (optional)
            </label>
            <select
              id="parent_id"
              value={formData.parent_id}
              onChange={handleInputChange}
              className="w-full py-3 px-5 text-white rounded border border-stroke bg-white/5 mt-3 outline-none focus:border-main"
            >
              <option value="">None (Top-level service)</option>
              {servicesLoading ? (
                <option disabled>Loading...</option>
              ) : (
                parentServices?.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="mt-4">
            <label
              className="text-white text-base font-semibold"
              htmlFor="status"
            >
              Status
            </label>
            <div className="flex mt-4 items-center gap-2">
              <input
                type="radio"
                name="status"
                id="active"
                value="active"
                checked={formData.status === "active"}
                onChange={handleInputChange}
                className="accent-main"
              />
              <label htmlFor="active" className="text-base text-body font-light">
                Active
              </label>
            </div>
            <div className="flex mt-4 items-center gap-2">
              <input
                type="radio"
                name="status"
                id="inactive"
                value="inactive"
                checked={formData.status === "inactive"}
                onChange={handleInputChange}
                className="accent-main"
              />
              <label htmlFor="inactive" className="text-base text-body font-light">
                Inactive
              </label>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 bg-main text-black font-medium rounded hover-main duration-300 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Service"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/services")}
              className="px-8 py-2 bg-white/5 text-white font-medium rounded border border-stroke hover:border-main duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
