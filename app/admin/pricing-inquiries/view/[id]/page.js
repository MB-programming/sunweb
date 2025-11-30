"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { usePricingInquiry } from "@/app/lib/hooks/usePricingInquiries";
import LoadingPage from "@/app/Components/Loader/Loader";
import { Icon } from "@iconify/react";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { inquiry, loading, error } = usePricingInquiry(id);

  if (loading) {
    return <LoadingPage />;
  }

  if (error || !inquiry) {
    return (
      <div className="mt-3">
        <div className="bg-red-500/20 border border-red-500 rounded p-4 text-red-400">
          Error loading inquiry: {error?.message || "Inquiry not found"}
        </div>
        <button
          onClick={() => router.push("/admin/pricing-inquiries")}
          className="mt-4 bg-main text-black px-6 py-2 rounded font-medium hover-main duration-300"
        >
          Back to Inquiries
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-white text-[1.3rem] font-bold">Pricing Inquiry Details</h3>
        <button
          onClick={() => router.push("/admin/pricing-inquiries")}
          className="bg-white/5 border border-stroke text-white px-6 py-2 rounded font-medium hover:border-main duration-300"
        >
          <Icon icon="mdi:arrow-left" className="inline mr-2" />
          Back
        </button>
      </div>

      {/* Customer Info */}
      <div className="mt-6 bg-background2 rounded p-6">
        <h4 className="text-white font-semibold mb-4 flex items-center">
          <Icon icon="mdi:account" className="mr-2" width="20" />
          Customer Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-body text-sm">Full Name</p>
            <p className="text-white mt-1 font-medium">{inquiry.name}</p>
          </div>
          <div>
            <p className="text-body text-sm">Email Address</p>
            <p className="text-white mt-1">
              <a href={`mailto:${inquiry.email}`} className="hover:text-main transition">
                {inquiry.email}
              </a>
            </p>
          </div>
          {inquiry.phone && (
            <div>
              <p className="text-body text-sm">Phone Number</p>
              <p className="text-white mt-1">
                <a href={`tel:${inquiry.phone}`} className="hover:text-main transition">
                  {inquiry.phone}
                </a>
              </p>
            </div>
          )}
          {inquiry.company && (
            <div>
              <p className="text-body text-sm">Company Name</p>
              <p className="text-white mt-1">{inquiry.company}</p>
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Details */}
      <div className="mt-6 bg-background2 rounded p-6">
        <h4 className="text-white font-semibold mb-4 flex items-center">
          <Icon icon="mdi:message-text" className="mr-2" width="20" />
          Inquiry Details
        </h4>
        <div className="space-y-4">
          <div>
            <p className="text-body text-sm">Message / Requirements</p>
            <div className="mt-2 p-4 bg-background rounded border border-stroke">
              <p className="text-white whitespace-pre-wrap">
                {inquiry.description || "No message provided"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {inquiry.date && (
              <div>
                <p className="text-body text-sm">Date Submitted</p>
                <p className="text-white mt-1">
                  <Icon icon="mdi:calendar" className="inline mr-2" />
                  {new Date(inquiry.date).toLocaleDateString()}
                </p>
              </div>
            )}
            {inquiry.time && (
              <div>
                <p className="text-body text-sm">Time Submitted</p>
                <p className="text-white mt-1">
                  <Icon icon="mdi:clock" className="inline mr-2" />
                  {inquiry.time}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Service Info */}
      {inquiry.service_id && (
        <div className="mt-6 bg-background2 rounded p-6">
          <h4 className="text-white font-semibold mb-4 flex items-center">
            <Icon icon="mdi:shopping" className="mr-2" width="20" />
            Requested Service
          </h4>
          <div>
            <p className="text-body text-sm">Service ID</p>
            <p className="text-white mt-1">{inquiry.service_id}</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 bg-background2 rounded p-6">
        <h4 className="text-white font-semibold mb-4">Quick Actions</h4>
        <div className="flex gap-3 flex-wrap">
          <a
            href={`mailto:${inquiry.email}?subject=Re: Pricing Inquiry`}
            className="bg-main text-black px-6 py-2 rounded font-medium hover-main duration-300 inline-flex items-center"
          >
            <Icon icon="mdi:email" className="mr-2" width="20" />
            Send Email
          </a>
          {inquiry.phone && (
            <a
              href={`tel:${inquiry.phone}`}
              className="bg-green-500 text-white px-6 py-2 rounded font-medium hover:bg-green-600 duration-300 inline-flex items-center"
            >
              <Icon icon="mdi:phone" className="mr-2" width="20" />
              Call Customer
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
