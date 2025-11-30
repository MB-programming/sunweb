"use client"
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useClients, useClientMutations } from "@/app/lib/hooks/useClients";
import { toast } from "react-toastify";
import PageHeader from "@/app/Components/UI/PageHeader";
import StatsCard from "@/app/Components/UI/StatsCard";
import SearchBar from "@/app/Components/UI/SearchBar";
import ConfirmDialog from "@/app/Components/UI/ConfirmDialog";
import EmptyState from "@/app/Components/UI/EmptyState";
import Pagination from "@/app/Components/UI/Pagination";
import TableSkeleton from "@/app/Components/UI/TableSkeleton";

const Page = () => {
  const { clients, loading, error, refetch } = useClients();
  const { deleteClient, loading: deleteLoading } = useClientMutations();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, clientId: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filters = [
    { text: "All", value: "all" },
    { text: "Active", value: "active" },
    { text: "Inactive", value: "inactive" },
    { text: "Pending", value: "pending" },
  ];

  // Calculate stats from actual data
  const totalClients = clients?.length || 0;
  const activeClients = clients?.filter(c => c.status === 'active')?.length || 0;
  const inactiveClients = clients?.filter(c => c.status === 'inactive')?.length || 0;
  const pendingClients = clients?.filter(c => c.status === 'pending')?.length || 0;

  // Filter clients based on search and filter
  const filteredClients = clients?.filter(client => {
    const matchesSearch = searchTerm === "" ||
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone?.includes(searchTerm) ||
      client.company?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || client.status === filter;

    return matchesSearch && matchesFilter;
  }) || [];

  // Pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = async () => {
    try {
      await deleteClient(deleteDialog.clientId);
      toast.success('Client deleted successfully!');
      setDeleteDialog({ isOpen: false, clientId: null });
      refetch();
    } catch (err) {
      toast.error('Failed to delete client');
    }
  };

  const openDeleteDialog = (id) => {
    setDeleteDialog({ isOpen: true, clientId: id });
  };

  return (
    <div className="mt-3 animate-fadeIn">
      <PageHeader
        title="Clients Management"
        description="Manage your clients and their information"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin", icon: "mdi:view-dashboard" },
          { label: "Clients" }
        ]}
        actions={
          <Link
            href="/admin/clients/add"
            className="flex items-center gap-2 py-2 px-4 rounded-lg text-black bg-main hover:shadow-lg transition-all"
          >
            <Icon icon="mdi:plus" width="20" />
            <span>Add Client</span>
          </Link>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        <StatsCard
          title="Total Clients"
          value={totalClients}
          icon="iconoir:user"
          iconColor="main"
          loading={loading}
        />
        <StatsCard
          title="Active"
          value={activeClients}
          icon="mdi:check-circle"
          iconColor="green"
          loading={loading}
        />
        <StatsCard
          title="Inactive"
          value={inactiveClients}
          icon="mdi:close-circle"
          iconColor="red"
          loading={loading}
        />
        <StatsCard
          title="Pending"
          value={pendingClients}
          icon="mdi:clock-outline"
          iconColor="yellow"
          loading={loading}
        />
      </div>

      {/* Table Container */}
      <div className="mt-6 bg-background2 rounded-lg p-6">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="w-full md:w-96">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              onClear={() => setSearchTerm("")}
              placeholder="Search clients..."
            />
          </div>

          <div className="flex items-center gap-2 bg-background rounded-lg p-1">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => {
                  setFilter(f.value);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f.value
                    ? 'bg-main text-black'
                    : 'text-body hover:text-white'
                }`}
              >
                {f.text}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && <TableSkeleton rows={5} columns={6} />}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
            <p>Error loading clients: {error.message || 'Unknown error'}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredClients.length === 0 && (
          <EmptyState
            icon="iconoir:user"
            title="No clients found"
            description={searchTerm ? "Try adjusting your search terms" : "Get started by adding your first client"}
            actionLabel={searchTerm ? undefined : "Add Client"}
            actionHref={searchTerm ? undefined : "/admin/clients/add"}
          />
        )}

        {/* Table */}
        {!loading && !error && paginatedClients.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background">
                  <tr>
                    <th className="p-4 text-left text-body text-sm font-medium">Name</th>
                    <th className="p-4 text-left text-body text-sm font-medium">Email</th>
                    <th className="p-4 text-left text-body text-sm font-medium">Phone</th>
                    <th className="p-4 text-left text-body text-sm font-medium">Company</th>
                    <th className="p-4 text-left text-body text-sm font-medium">Status</th>
                    <th className="p-4 text-left text-body text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedClients.map((client) => (
                    <tr
                      key={client.id}
                      className="border-t border-stroke hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-main/20 flex items-center justify-center">
                            <Icon icon="iconoir:user" className="text-main" width="20" />
                          </div>
                          <span className="text-white font-medium">{client.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <a href={`mailto:${client.email}`} className="text-body hover:text-main transition-colors">
                          {client.email}
                        </a>
                      </td>
                      <td className="p-4">
                        <a href={`tel:${client.phone}`} className="text-body hover:text-main transition-colors">
                          {client.phone || 'N/A'}
                        </a>
                      </td>
                      <td className="p-4">
                        <span className="text-body">{client.company || 'N/A'}</span>
                      </td>
                      <td className="p-4">
                        <span className={`badge ${
                          client.status === 'active' ? 'badge-success' :
                          client.status === 'inactive' ? 'badge-error' :
                          'badge-warning'
                        }`}>
                          {client.status || 'pending'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/clients/view/${client.id}`}
                            className="p-2 rounded-lg border border-stroke text-white hover:bg-main hover:border-main hover:text-black transition-all"
                            title="View"
                          >
                            <Icon icon="mdi:eye" width="18" />
                          </Link>
                          <Link
                            href={`/admin/clients/edit/${client.id}`}
                            className="p-2 rounded-lg border border-stroke text-white hover:bg-blue-500 hover:border-blue-500 transition-all"
                            title="Edit"
                          >
                            <Icon icon="mdi:pencil" width="18" />
                          </Link>
                          <button
                            onClick={() => openDeleteDialog(client.id)}
                            className="p-2 rounded-lg border border-stroke text-white hover:bg-red-500 hover:border-red-500 transition-all"
                            title="Delete"
                          >
                            <Icon icon="mdi:delete" width="18" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={filteredClients.length}
                  itemsPerPage={itemsPerPage}
                  startIndex={startIndex}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, clientId: null })}
        onConfirm={handleDelete}
        title="Delete Client"
        message="Are you sure you want to delete this client? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        loading={deleteLoading}
      />
    </div>
  );
};

export default Page;
