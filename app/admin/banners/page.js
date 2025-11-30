"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useBanners, useBannerMutations } from "@/app/lib/hooks/useBanners";
import { toast } from "react-toastify";
import PageHeader from "@/app/Components/UI/PageHeader";
import StatsCard from "@/app/Components/UI/StatsCard";
import SearchBar from "@/app/Components/UI/SearchBar";
import ConfirmDialog from "@/app/Components/UI/ConfirmDialog";
import EmptyState from "@/app/Components/UI/EmptyState";

const Page = () => {
  const { banners, loading, error, refetch } = useBanners();
  const { deleteBanner, toggleBannerStatus, loading: mutationLoading } = useBannerMutations();

  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, bannerId: null });

  // Filter banners
  const filteredBanners = banners?.filter((banner) => {
    const matchesSearch = searchTerm === "" ||
      banner.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banner.link?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  }) || [];

  // Calculate stats
  const totalBanners = banners?.length || 0;
  const activeBanners = banners?.filter(b => b.status === 'active')?.length || 0;
  const inactiveBanners = banners?.filter(b => b.status === 'inactive')?.length || 0;

  const handleDelete = async () => {
    try {
      await deleteBanner(deleteDialog.bannerId);
      toast.success("Banner deleted successfully!");
      setDeleteDialog({ isOpen: false, bannerId: null });
      refetch();
    } catch (err) {
      toast.error("Failed to delete banner");
    }
  };

  const openDeleteDialog = (id) => {
    setDeleteDialog({ isOpen: true, bannerId: id });
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleBannerStatus(id);
      toast.success("Banner status updated successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to update banner status");
    }
  };

  return (
    <div className="mt-3 animate-fadeIn">
      <PageHeader
        title="Banners Management"
        description="Manage advertising banners displayed on your website"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin", icon: "mdi:view-dashboard" },
          { label: "Banners" }
        ]}
        actions={
          <Link
            href="/admin/banners/add"
            className="flex items-center gap-2 py-2 px-4 rounded-lg text-black bg-main hover:shadow-lg transition-all"
          >
            <Icon icon="mdi:plus" width="20" />
            <span>Add Banner</span>
          </Link>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <StatsCard
          title="Total Banners"
          value={totalBanners}
          icon="mdi:image-multiple"
          iconColor="main"
          loading={loading}
        />
        <StatsCard
          title="Active"
          value={activeBanners}
          icon="mdi:check-circle"
          iconColor="green"
          loading={loading}
        />
        <StatsCard
          title="Inactive"
          value={inactiveBanners}
          icon="mdi:close-circle"
          iconColor="red"
          loading={loading}
        />
      </div>

      {/* Banners List */}
      <div className="mt-6 bg-background2 rounded-lg p-6">
        {/* Search */}
        <div className="mb-6">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm("")}
            placeholder="Search banners..."
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-700 rounded-lg animate-pulse"></div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
            <p>Error loading banners. Please try again later.</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredBanners.length === 0 && (
          <EmptyState
            icon="mdi:image-multiple"
            title="No banners found"
            description={searchTerm ? "Try adjusting your search terms" : "Get started by adding your first banner"}
            actionLabel={searchTerm ? undefined : "Add Banner"}
            actionHref={searchTerm ? undefined : "/admin/banners/add"}
          />
        )}

        {/* Banners Grid */}
        {!loading && !error && filteredBanners.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBanners.map((banner) => (
              <div
                key={banner.id}
                className="bg-background border border-stroke rounded-lg overflow-hidden hover:border-main transition-all group card-hover"
              >
                {/* Banner Image */}
                <div className="relative h-48 bg-gray-800">
                  {banner.image ? (
                    <Image
                      src={banner.image}
                      alt={banner.title || "Banner"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon icon="mdi:image" className="text-gray-600" width="48" />
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`badge ${
                      banner.status === 'active' ? 'badge-success' : 'badge-error'
                    }`}>
                      {banner.status || 'inactive'}
                    </span>
                  </div>
                </div>

                {/* Banner Info */}
                <div className="p-4">
                  <h4 className="text-white font-semibold text-base mb-2 line-clamp-1">
                    {banner.title || "Untitled Banner"}
                  </h4>

                  {banner.link && (
                    <div className="flex items-center gap-2 text-sm text-body mb-3">
                      <Icon icon="mdi:link" width="16" />
                      <span className="line-clamp-1">{banner.link}</span>
                    </div>
                  )}

                  {banner.description && (
                    <p className="text-body text-sm line-clamp-2 mb-4">
                      {banner.description}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => handleToggleStatus(banner.id)}
                      disabled={mutationLoading}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border transition-all ${
                        banner.status === 'active'
                          ? 'border-yellow-500 text-yellow-500 hover:bg-yellow-500/10'
                          : 'border-green-500 text-green-500 hover:bg-green-500/10'
                      }`}
                      title={banner.status === 'active' ? 'Deactivate' : 'Activate'}
                    >
                      <Icon
                        icon={banner.status === 'active' ? 'mdi:eye-off' : 'mdi:eye'}
                        width="18"
                      />
                    </button>

                    <Link
                      href={`/admin/banners/edit/${banner.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-stroke text-white hover:bg-blue-500 hover:border-blue-500 transition-all"
                    >
                      <Icon icon="mdi:pencil" width="18" />
                    </Link>

                    <button
                      onClick={() => openDeleteDialog(banner.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-stroke text-white hover:bg-red-500 hover:border-red-500 transition-all"
                    >
                      <Icon icon="mdi:delete" width="18" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, bannerId: null })}
        onConfirm={handleDelete}
        title="Delete Banner"
        message="Are you sure you want to delete this banner? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        loading={mutationLoading}
      />
    </div>
  );
};

export default Page;
