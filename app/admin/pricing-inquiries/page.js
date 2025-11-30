"use client";
import React, { useState } from "react";
import { usePricingInquiries, usePricingInquiryMutations } from "@/app/lib/hooks/usePricingInquiries";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import Link from "next/link";
import PageHeader from "@/app/Components/UI/PageHeader";
import StatsCard from "@/app/Components/UI/StatsCard";
import SearchBar from "@/app/Components/UI/SearchBar";
import ConfirmDialog from "@/app/Components/UI/ConfirmDialog";
import EmptyState from "@/app/Components/UI/EmptyState";
import Pagination from "@/app/Components/UI/Pagination";
import TableSkeleton from "@/app/Components/UI/TableSkeleton";

const Page = () => {
  const { inquiries, loading, error, refetch } = usePricingInquiries();
  const { deleteInquiry, loading: deleteLoading } = usePricingInquiryMutations();

  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, inquiryId: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter inquiries
  const filteredInquiries = inquiries?.filter((inquiry) => {
    const matchesSearch = searchTerm === "" ||
      inquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.company?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  }) || [];

  // Pagination
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInquiries = filteredInquiries.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = async () => {
    try {
      await deleteInquiry(deleteDialog.inquiryId);
      toast.success("Inquiry deleted successfully!");
      setDeleteDialog({ isOpen: false, inquiryId: null });
      refetch();
    } catch (error) {
      toast.error("Failed to delete inquiry");
    }
  };

  const openDeleteDialog = (id) => {
    setDeleteDialog({ isOpen: true, inquiryId: id });
  };

  // Calculate stats
  const totalInquiries = inquiries?.length || 0;
  const todayInquiries = inquiries?.filter(i => {
    const today = new Date().toISOString().split('T')[0];
    return i.date === today;
  })?.length || 0;

  const thisWeekInquiries = inquiries?.filter(i => {
    if (!i.date) return false;
    const inquiryDate = new Date(i.date);
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return inquiryDate >= weekAgo && inquiryDate <= today;
  })?.length || 0;

  return (
    <div className="mt-3 animate-fadeIn">
      <PageHeader
        title="Pricing Inquiries"
        description="Manage pricing plan inquiries from potential customers"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin", icon: "mdi:view-dashboard" },
          { label: "Pricing Inquiries" }
        ]}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <StatsCard
          title="Total Inquiries"
          value={totalInquiries}
          icon="mdi:file-document-outline"
          iconColor="main"
          loading={loading}
        />
        <StatsCard
          title="Today's Inquiries"
          value={todayInquiries}
          icon="mdi:calendar-today"
          iconColor="blue"
          loading={loading}
        />
        <StatsCard
          title="This Week"
          value={thisWeekInquiries}
          icon="mdi:calendar-week"
          iconColor="green"
          loading={loading}
        />
      </div>

      {/* Table Container */}
      <div className="mt-6 bg-background2 rounded-lg p-6">
        {/* Search */}
        <div className="mb-6">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm("")}
            placeholder="Search inquiries by name, email, or company..."
          />
        </div>

        {/* Loading State */}
        {loading && <TableSkeleton rows={5} columns={5} />}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
            Error loading inquiries: {error.message || "Unknown error"}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredInquiries.length === 0 && (
          <EmptyState
            icon="mdi:file-document-outline"
            title="No inquiries found"
            description={searchTerm ? "Try adjusting your search terms" : "No pricing inquiries have been submitted yet"}
          />
        )}

        {/* Table */}
        {!loading && !error && paginatedInquiries.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background">
                  <tr>
                    <th className="text-left p-4 text-body text-sm font-medium">Customer Info</th>
                    <th className="text-left p-4 text-body text-sm font-medium">Contact</th>
                    <th className="text-left p-4 text-body text-sm font-medium">Message</th>
                    <th className="text-left p-4 text-body text-sm font-medium">Date & Time</th>
                    <th className="text-center p-4 text-body text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="border-t border-stroke hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-main/20 flex items-center justify-center">
                            <Icon icon="mdi:account" className="text-main" width="20" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{inquiry.name}</p>
                            {inquiry.company && (
                              <p className="text-body text-xs">{inquiry.company}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="text-body text-sm hover:text-main transition-colors block"
                        >
                          {inquiry.email}
                        </a>
                        {inquiry.phone && (
                          <a
                            href={`tel:${inquiry.phone}`}
                            className="text-body text-xs hover:text-main transition-colors block mt-1"
                          >
                            {inquiry.phone}
                          </a>
                        )}
                      </td>
                      <td className="p-4">
                        <p className="text-body text-sm line-clamp-2 max-w-xs">
                          {inquiry.description || "No message"}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="text-body text-sm">
                          {inquiry.date ? new Date(inquiry.date).toLocaleDateString() : "N/A"}
                        </p>
                        <p className="text-body text-xs mt-1">
                          {inquiry.time || ""}
                        </p>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <Link
                            href={`/admin/pricing-inquiries/view/${inquiry.id}`}
                            className="p-2 rounded-lg border border-stroke text-white hover:bg-main hover:border-main hover:text-black transition-all"
                            title="View Details"
                          >
                            <Icon icon="mdi:eye" width="18" />
                          </Link>
                          <button
                            onClick={() => openDeleteDialog(inquiry.id)}
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
                  totalItems={filteredInquiries.length}
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
        onClose={() => setDeleteDialog({ isOpen: false, inquiryId: null })}
        onConfirm={handleDelete}
        title="Delete Inquiry"
        message="Are you sure you want to delete this pricing inquiry? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        loading={deleteLoading}
      />
    </div>
  );
};

export default Page;
