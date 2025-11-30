"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useServices, useServiceMutations } from "@/app/lib/hooks/useServices";
import { toast } from "react-toastify";

// UI Components
import PageHeader from "@/app/Components/UI/PageHeader";
import StatsCard from "@/app/Components/UI/StatsCard";
import SearchBar from "@/app/Components/UI/SearchBar";
import EmptyState from "@/app/Components/UI/EmptyState";
import TableSkeleton from "@/app/Components/UI/TableSkeleton";
import ConfirmDialog from "@/app/Components/UI/ConfirmDialog";
import Pagination from "@/app/Components/UI/Pagination";

const Page = () => {
  const { services, loading, error, refetch } = useServices();
  const { deleteService } = useServiceMutations();

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, serviceId: null });
  const [deleting, setDeleting] = useState(false);

  const itemsPerPage = 10;

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

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServices = filteredServices.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteService(deleteDialog.serviceId);
      toast.success("Service deleted successfully!");
      refetch();
      setDeleteDialog({ isOpen: false, serviceId: null });
    } catch (err) {
      toast.error("Failed to delete service");
    } finally {
      setDeleting(false);
    }
  };

  // Calculate stats
  const totalServices = services?.length || 0;
  const topLevelServices = services?.filter((s) => !s.parent_id)?.length || 0;
  const subServices = services?.filter((s) => s.parent_id)?.length || 0;
  const activeServices = services?.filter((s) => s.status === 'active')?.length || 0;

  const filters = [
    { text: "All", value: "all" },
    { text: "Top Level", value: "top" },
    { text: "Sub Services", value: "sub" },
  ];

  return (
    <div className="mt-3 animate-fadeIn">
      {/* Page Header */}
      <PageHeader
        title="Services Management"
        description="Manage your services and sub-services"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin", icon: "mdi:view-dashboard" },
          { label: "Services" }
        ]}
        actions={
          <Link
            href="/admin/services/add"
            className="bg-main text-black px-6 py-3 rounded-lg font-medium hover-main duration-300 inline-flex items-center"
          >
            <Icon icon="mdi:plus" className="mr-2" width="20" />
            Add New Service
          </Link>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Services"
          value={totalServices}
          icon="mdi:cog"
          iconColor="main"
          loading={loading}
        />
        <StatsCard
          title="Top Level"
          value={topLevelServices}
          icon="mdi:folder"
          iconColor="blue"
          loading={loading}
        />
        <StatsCard
          title="Sub Services"
          value={subServices}
          icon="mdi:folder-open"
          iconColor="purple"
          loading={loading}
        />
        <StatsCard
          title="Active"
          value={activeServices}
          icon="mdi:check-circle"
          iconColor="green"
          loading={loading}
        />
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm("")}
            placeholder="Search services by name or slug..."
          />
        </div>

        <div className="flex items-center gap-2 bg-background2 rounded-lg p-1">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === f.value
                  ? "bg-main text-black"
                  : "text-body hover:text-white"
              }`}
            >
              {f.text}
            </button>
          ))}
        </div>
      </div>

      {/* Services Table */}
      {loading ? (
        <TableSkeleton rows={5} columns={6} />
      ) : error ? (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 text-red-400">
          <Icon icon="mdi:alert-circle" className="inline mr-2" width="24" />
          Error loading services: {error.message || "Unknown error"}
        </div>
      ) : filteredServices.length === 0 ? (
        <EmptyState
          icon={searchTerm ? "mdi:magnify" : "mdi:cog"}
          title={searchTerm ? "No services found" : "No services yet"}
          description={searchTerm ? "Try adjusting your search or filter" : "Create your first service to get started"}
          actionLabel={!searchTerm ? "Create Service" : undefined}
          actionHref={!searchTerm ? "/admin/services/add" : undefined}
        />
      ) : (
        <>
          <div className="bg-background2 rounded-lg overflow-hidden animate-slideUp">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background">
                  <tr>
                    <th className="text-left p-4 text-white font-semibold">Service Name</th>
                    <th className="text-left p-4 text-white font-semibold">Slug</th>
                    <th className="text-left p-4 text-white font-semibold">Parent</th>
                    <th className="text-left p-4 text-white font-semibold">Status</th>
                    <th className="text-left p-4 text-white font-semibold">Created</th>
                    <th className="text-center p-4 text-white font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedServices.map((service) => (
                    <tr key={service.id} className="border-t border-stroke hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {service.icon && (
                            <Icon icon={service.icon} width="20" className="text-main" />
                          )}
                          <span className="text-white font-medium">{service.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-body text-sm font-mono">{service.slug || 'N/A'}</span>
                      </td>
                      <td className="p-4">
                        {service.parent_id ? (
                          <span className="badge badge-info">Sub Service</span>
                        ) : (
                          <span className="badge badge-success">Top Level</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`badge ${
                          service.status === 'active' ? 'badge-success' : 'badge-warning'
                        }`}>
                          {service.status || 'N/A'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-body text-sm">
                          {service.created_at ? new Date(service.created_at).toLocaleDateString() : 'N/A'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/admin/services/view/${service.id}`}
                            className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all card-hover"
                            title="View"
                          >
                            <Icon icon="mdi:eye" width="20" height="20" />
                          </Link>
                          <Link
                            href={`/admin/services/edit/${service.id}`}
                            className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all card-hover"
                            title="Edit"
                          >
                            <Icon icon="mdi:pencil" width="20" height="20" />
                          </Link>
                          <button
                            onClick={() => setDeleteDialog({ isOpen: true, serviceId: service.id })}
                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all card-hover"
                            title="Delete"
                          >
                            <Icon icon="mdi:delete" width="20" height="20" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredServices.length}
          />
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, serviceId: null })}
        onConfirm={handleDelete}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        loading={deleting}
      />
    </div>
  );
};

export default Page;
