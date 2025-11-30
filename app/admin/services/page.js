"use client";
import Table from "@/app/Components/Table/Table";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useState } from "react";
import { useServices, useServiceMutations } from "@/app/lib/hooks/useServices";
import { toast } from "react-toastify";

const Page = () => {
  const { services, loading, error, refetch } = useServices();
  const { deleteService } = useServiceMutations();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const headers = [
    { title: "ID", key: "id" },
    { title: "Name", key: "name" },
    { title: "Slug", key: "slug" },
    { title: "Description", key: "description" },
    { title: "Parent", key: "parent_id" },
  ];

  const filters = [
    { text: "All", value: "all" },
    { text: "Top Level", value: "top" },
    { text: "Sub Services", value: "sub" },
  ];

  // Filter services
  const filteredServices = services?.filter((service) => {
    const matchesSearch =
      searchTerm === "" ||
      service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.slug?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "top" && !service.parent_id) ||
      (filter === "sub" && service.parent_id);

    return matchesSearch && matchesFilter;
  }) || [];

  // Calculate stats
  const totalServices = services?.length || 0;
  const topLevelServices = services?.filter((s) => !s.parent_id)?.length || 0;
  const subServices = services?.filter((s) => s.parent_id)?.length || 0;

  const cards = [
    { title: "Total Services", value: totalServices },
    { title: "Top Level Services", value: topLevelServices },
    { title: "Sub Services", value: subServices },
  ];

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      await deleteService(id);
      toast.success("Service deleted successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to delete service");
    }
  };

  return (
    <div className="mt-3">
      {/* Stats Cards */}
      <div className="flex items-center gap-5">
        {cards.map((data, index) => (
          <div
            key={index}
            className="bg-background2 hover:shadow-inner duration-200 overflow-hidden relative rounded px-4 py-8 flex-1"
          >
            <p className="text-white text-[1.2rem] font-light">{data.title}</p>
            <p className="text-[1.4rem] font-medium text-white mt-2">
              {loading ? "..." : data.value}
            </p>
          </div>
        ))}
      </div>

      <h3 className="text-white mt-5 text-[1.2rem] font-bold">Services</h3>
      <div className="mt-4 bg-background2 rounded-lg p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center px-4 bg-white/5 justify-start gap-3 flex-row-reverse border rounded w-[230px] h-max border-stroke">
              <input
                type="text"
                placeholder="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-none outline-none text-white bg-transparent p-2"
              />
              <Icon className="text-body" icon="ep:search" width="18" height="18" />
            </div>
            <div className="flex items-center gap-2 border border-stroke bg-white/5 rounded p-1">
              {filters.map((data, index) => (
                <button
                  key={index}
                  onClick={() => setFilter(data.value)}
                  className={`text-[0.8rem] px-8 py-2 hover:text-white hover:bg-background2 duration-200 ${
                    filter === data.value ? "text-white bg-background2" : "text-body"
                  }`}
                >
                  {data.text}
                </button>
              ))}
            </div>
          </div>
          <Link
            href="/admin/services/add"
            className="flex items-center gap-3 py-2 px-4 rounded text-white hover:bg-main hover:text-white duration-500 hover:shadow-light border border-main"
          >
            <Icon icon="ic:sharp-add" width="18" height="18" />
            <span>Add new service</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-white text-lg">Loading services...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mt-4">
            <p>Error loading services: {error.message || "Unknown error"}</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-body text-lg">No services found</p>
          </div>
        ) : (
          <Table
            headers={headers}
            data={filteredServices}
            action
            editLink="/admin/services/edit"
            viewLink="/admin/services/view"
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
