"use client";
import React, { useState } from "react";
import { useClientMutations } from "@/app/lib/hooks/useClients";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { createClient, loading } = useClientMutations();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createClient(formData);
      toast.success("Client added successfully!");
      router.push("/admin/clients");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add client");
      console.error(err);
    }
  };

  return (
    <div className="mt-3">
      <h3 className="text-white text-[1.2rem] font-bold">Add new client</h3>
      <form onSubmit={handleSubmit} className="mt-5 bg-background2 rounded px-4 pb-6 pt-1">
        <div className="mt-5">
          <label htmlFor="name" className="text-base text-white font-light">
            Full name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
            required
          />
        </div>
        <div className="mt-5">
          <label htmlFor="email" className="text-base text-white font-light">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
            required
          />
        </div>
        <div className="mt-5">
          <label htmlFor="phone" className="text-base text-white font-light">
            Phone number *
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
            required
          />
        </div>
        <div className="mt-5">
          <label htmlFor="company" className="text-base text-white font-light">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="p-2 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
          />
        </div>
        <div className="mt-5">
          <label htmlFor="status" className="text-base text-white font-light">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="p-2 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-10 bg-main p-2 w-full text-[1rem] font-medium rounded hover-main duration-300 text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default Page;
