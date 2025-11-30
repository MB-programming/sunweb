"use client"
import Table from "@/app/Components/Table/Table";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useState } from "react";
import { useClients, useClientMutations } from "@/app/lib/hooks/useClients";
import { toast } from "react-toastify";

const Page = () => {
  const { clients, loading, error, refetch } = useClients();
  const { deleteClient } = useClientMutations();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const headers = [
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Email",
      key: "email",
    },
    {
      title: "Phone",
      key: "phone",
    },
    {
      title: "Company",
      key: "company",
    },
    {
      title: "Status",
      key: "status",
    },
  ];

  const filters = [
    {
      text: "All",
      value: "all",
    },
    {
      text: "Active",
      value: "active",
    },
    {
      text: "Inactive",
      value: "inactive",
    },
  ];

  // Calculate stats from actual data
  const totalClients = clients?.length || 0;
  const activeClients = clients?.filter(c => c.status === 'active')?.length || 0;
  const pendingRequests = clients?.filter(c => c.status === 'pending')?.length || 0;

  const cards = [
    {
      title: "Total Clients",
      value: totalClients,
    },
    {
      title: "Active Clients",
      value: activeClients,
    },
    {
      title: "Pending Requests",
      value: pendingRequests,
    },
  ];

  // Filter clients based on search and filter
  const filteredClients = clients?.filter(client => {
    const matchesSearch = searchTerm === "" ||
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone?.includes(searchTerm);

    const matchesFilter = filter === "all" || client.status === filter;

    return matchesSearch && matchesFilter;
  }) || [];

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this client?')) return;

    try {
      await deleteClient(id);
      toast.success('Client deleted successfully!');
      refetch();
    } catch (err) {
      toast.error('Failed to delete client');
    }
  };

  return (
    <div className="mt-3">
      <h3 className="text-white text-[1.2rem] font-bold">Clients management</h3>

      {/* Stats Cards */}
      <div className="mt-5 flex items-center gap-5">
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

      <h3 className="text-white mt-5 text-[1.2rem] font-bold">Clients list</h3>

      {/* Table Container */}
      <div className="mt-4 bg-background2 rounded-lg p-5">
        {/* Search and Filters */}
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
              <Icon
                className="text-body"
                icon="ep:search"
                width="18"
                height="18"
              />
            </div>
            <div className="flex items-center gap-2 border border-stroke bg-white/5 rounded p-1">
              {filters.map((data, index) => (
                <button
                  key={index}
                  onClick={() => setFilter(data.value)}
                  className={`text-[0.8rem] px-8 py-2 hover:text-white hover:bg-background2 duration-200 ${
                    filter === data.value ? 'text-white bg-background2' : 'text-body'
                  }`}
                >
                  {data.text}
                </button>
              ))}
            </div>
          </div>
          <Link
            href="/admin/clients/add"
            className="flex items-center gap-3 py-2 px-4 rounded text-white hover:bg-main hover:text-white duration-500 hover:shadow-light border border-main"
          >
            <Icon icon="ic:sharp-add" width="18" height="18" />
            <span>add new client</span>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <p className="text-white text-lg">Loading clients...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mt-4">
            <p>Error loading clients: {error.message || 'Unknown error'}</p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <Table
            headers={headers}
            data={filteredClients}
            action
            editLink="/admin/clients/edit"
            viewLink="/admin/clients/view"
            onDelete={handleDelete}
          />
        )}

        {/* Empty State */}
        {!loading && !error && filteredClients.length === 0 && (
          <div className="flex justify-center items-center py-20">
            <p className="text-body text-lg">No clients found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
