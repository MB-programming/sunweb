"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useServices } from "@/app/lib/hooks/useServices";
import LoadingPage from "@/app/Components/Loader/Loader";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Axios from "@/app/lib/Axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await Axios.get(`/services/${id}`);
        setService(response.data?.data);
      } catch (err) {
        setError(err);
        toast.error("Failed to load service");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error || !service) {
    return (
      <div className="mt-3">
        <div className="bg-red-500/20 border border-red-500 rounded p-4 text-red-400">
          Error loading service: {error?.message || "Service not found"}
        </div>
        <button
          onClick={() => router.push("/admin/services")}
          className="mt-4 bg-main text-black px-6 py-2 rounded font-medium hover-main duration-300"
        >
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-white text-[1.3rem] font-bold">Service Overview</h3>
        <div className="flex gap-3">
          <Link
            href={`/admin/services/edit/${id}`}
            className="bg-main text-black px-6 py-2 rounded font-medium hover-main duration-300"
          >
            <Icon icon="mdi:pencil" className="inline mr-2" />
            Edit
          </Link>
          <button
            onClick={() => router.push("/admin/services")}
            className="bg-white/5 border border-stroke text-white px-6 py-2 rounded font-medium hover:border-main duration-300"
          >
            Back
          </button>
        </div>
      </div>

      {/* Service Details */}
      <div className="mt-6 bg-background2 rounded px-5 py-5">
        <p className="text-body text-base font-light">
          <span className="text-white font-medium">Service Name: </span>
          {service.name || "N/A"}
        </p>

        <p className="mt-5 text-body text-base font-light">
          <span className="text-white font-medium">Description: </span>
          {service.description || "No description provided"}
        </p>

        {service.icon && (
          <p className="mt-5 text-body text-base font-light">
            <span className="text-white font-medium">Icon: </span>
            {service.icon}
          </p>
        )}

        {service.parent_id && (
          <p className="mt-5 text-body text-base font-light">
            <span className="text-white font-medium">Parent Service ID: </span>
            {service.parent_id}
          </p>
        )}

        <p className="mt-5 text-body text-base font-light">
          <span className="text-white font-medium">Status: </span>
          <span className={service.status === "active" ? "text-green-400" : "text-gray-400"}>
            {service.status || "N/A"}
          </span>
        </p>

        {service.created_at && (
          <p className="mt-5 text-body text-base font-light">
            <span className="text-white font-medium">Creation Date: </span>
            {new Date(service.created_at).toLocaleDateString()}
          </p>
        )}

        {service.updated_at && (
          <p className="mt-5 text-body text-base font-light">
            <span className="text-white font-medium">Last Updated: </span>
            {new Date(service.updated_at).toLocaleDateString()}
          </p>
        )}

        <p className="mt-5 text-body text-base font-light">
          <span className="text-white font-medium">Service ID: </span>
          <span className="font-mono">{service.id}</span>
        </p>
      </div>
    </div>
  );
};

export default Page;
