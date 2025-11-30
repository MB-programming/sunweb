"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useClientMutations } from "@/app/lib/hooks/useClients";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifcation from "@/app/Components/Notification";
import LoadingPage from "@/app/Components/Loader/Loader";
import Axios from "@/app/lib/Axios";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const { updateClient, loading: updateLoading } = useClientMutations();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });

  // Fetch client data
  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        const response = await Axios.get(`/clients/${id}`);
        const client = response.data?.data;

        if (client) {
          setFormData({
            name: client.name || "",
            email: client.email || "",
            phone: client.phone || "",
            company: client.company || ""
          });
        }
      } catch (error) {
        toast.error("Failed to load client data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClient();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      return toast.error("Full name is required!");
    }
    if (!formData.email) {
      return toast.error("Email is required!");
    }

    try {
      await updateClient(id, formData);
      toast.success("Client updated successfully!");
      router.push("/admin/clients");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update client");
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="mt-3">
      {updateLoading && <LoadingPage />}
      <Notifcation />

      <h3 className="text-white text-[1.2rem] font-bold">
        Edit client
      </h3>

      <form onSubmit={handleSubmit} className="mt-5 bg-background2 rounded px-4 pb-6 pt-1">
        <div className="mt-5">
          <label htmlFor="name" className="text-base text-white font-light">
            Full name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-2 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="email" className="text-base text-white font-light">
            Email *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-2 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="phone" className="text-base text-white font-light">
            Phone number
          </label>
          <input
            type="text"
            id="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="p-2 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
          />
        </div>

        <div className="mt-5">
          <label htmlFor="company" className="text-base text-white font-light">
            Company
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={handleInputChange}
            className="p-2 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
          />
        </div>

        <div className="mt-10 flex gap-4">
          <button
            type="submit"
            disabled={updateLoading}
            className="bg-main p-2 px-8 text-[1rem] font-medium rounded hover-main duration-300 text-black disabled:opacity-50"
          >
            {updateLoading ? "Updating..." : "Update Client"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/clients")}
            className="bg-white/5 p-2 px-8 text-[1rem] font-medium rounded border border-stroke text-white hover:border-main duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
