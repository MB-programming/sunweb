"use client";
import React, { useState } from "react";
import { usePricingInquiries, usePricingInquiryMutations } from "@/app/lib/hooks/usePricingInquiries";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifcation from "@/app/Components/Notification";
import LoadingPage from "@/app/Components/Loader/Loader";
import { Icon } from "@iconify/react";
import Link from "next/link";

const Page = () => {
  const { inquiries, loading, error, refetch } = usePricingInquiries();
  const { deleteInquiry } = usePricingInquiryMutations();

  const [searchTerm, setSearchTerm] = useState("");

  // Filter inquiries
  const filteredInquiries = inquiries?.filter((inquiry) => {
    const matchesSearch = searchTerm === "" ||
      inquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.company?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  }) || [];

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await deleteInquiry(id);
        toast.success("Inquiry deleted successfully!");
        refetch();
      } catch (error) {
        toast.error("Failed to delete inquiry");
      }
    }
  };

  const totalInquiries = inquiries?.length || 0;
  const todayInquiries = inquiries?.filter(i => {
    const today = new Date().toISOString().split('T')[0];
    return i.date === today;
  })?.length || 0;

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="mt-3">
      <Notifcation />

      {/* Header */}
      <div>
        <h3 className="text-white text-[1.3rem] font-bold">Pricing Inquiries</h3>
        <p className="text-body text-sm mt-1">Manage pricing plan inquiries from customers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-background2 rounded p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sm">Total Inquiries</p>
              <p className="text-white text-2xl font-bold mt-1">{totalInquiries}</p>
            </div>
            <div className="bg-main/20 p-3 rounded-full">
              <Icon icon="mdi:file-document-outline" width="24" height="24" className="text-main" />
            </div>
          </div>
        </div>

        <div className="bg-background2 rounded p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sm">Today's Inquiries</p>
              <p className="text-white text-2xl font-bold mt-1">{todayInquiries}</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-full">
              <Icon icon="mdi:calendar-today" width="24" height="24" className="text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Search inquiries by name, email, or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded border border-stroke bg-white/5 text-white outline-none focus:border-main"
        />
      </div>

      {/* Inquiries Table */}
      <div className="mt-6 bg-background2 rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="text-left p-4 text-white font-semibold">Customer Info</th>
                <th className="text-left p-4 text-white font-semibold">Contact</th>
                <th className="text-left p-4 text-white font-semibold">Details</th>
                <th className="text-left p-4 text-white font-semibold">Date & Time</th>
                <th className="text-center p-4 text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-body">
                    {searchTerm ? "No inquiries found matching your search" : "No pricing inquiries yet"}
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-t border-stroke hover:bg-white/5">
                    <td className="p-4">
                      <p className="text-white font-medium">{inquiry.name}</p>
                      {inquiry.company && (
                        <p className="text-body text-sm">{inquiry.company}</p>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="text-body text-sm">{inquiry.email}</p>
                      {inquiry.phone && (
                        <p className="text-body text-sm">{inquiry.phone}</p>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="text-body text-sm line-clamp-2">
                        {inquiry.description || "No message"}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="text-body text-sm">
                        {inquiry.date ? new Date(inquiry.date).toLocaleDateString() : "N/A"}
                      </p>
                      <p className="text-body text-xs">
                        {inquiry.time || ""}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/pricing-inquiries/view/${inquiry.id}`}
                          className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition"
                          title="View"
                        >
                          <Icon icon="mdi:eye" width="20" height="20" />
                        </Link>
                        <button
                          onClick={() => handleDelete(inquiry.id)}
                          className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition"
                          title="Delete"
                        >
                          <Icon icon="mdi:delete" width="20" height="20" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded text-red-400">
          Error loading inquiries: {error.message || "Unknown error"}
        </div>
      )}
    </div>
  );
};

export default Page;
