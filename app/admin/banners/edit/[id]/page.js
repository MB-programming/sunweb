"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useBanner, useBannerMutations } from "@/app/lib/hooks/useBanners";
import { toast } from "react-toastify";
import PageHeader from "@/app/Components/UI/PageHeader";
import LoadingPage from "@/app/Components/Loader/Loader";
import Image from "next/image";

const Page = ({ params }) => {
  const router = useRouter();
  const { banner, loading: fetchLoading } = useBanner(params.id);
  const { updateBanner, loading } = useBannerMutations();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    status: "active",
    order: 0
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (banner) {
      setFormData({
        title: banner.title || "",
        description: banner.description || "",
        link: banner.link || "",
        status: banner.status || "active",
        order: banner.order || 0
      });
      if (banner.image) {
        setImagePreview(banner.image);
      }
    }
  }, [banner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bannerData = {
        ...formData,
      };

      if (imageFile) {
        bannerData.image = imageFile;
      }

      await updateBanner(params.id, bannerData);
      toast.success("Banner updated successfully!");
      router.push("/admin/banners");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update banner");
    }
  };

  if (fetchLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="mt-3 animate-fadeIn">
      <PageHeader
        title="Edit Banner"
        description="Update banner information"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin", icon: "mdi:view-dashboard" },
          { label: "Banners", href: "/admin/banners" },
          { label: "Edit Banner" }
        ]}
      />

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Fields */}
          <div className="lg:col-span-2 bg-background2 rounded-lg p-6">
            <h3 className="text-white text-lg font-semibold mb-4">Banner Information</h3>

            <div className="space-y-5">
              <div>
                <label htmlFor="title" className="text-base text-white font-semibold">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter banner title"
                  className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
                />
              </div>

              <div>
                <label htmlFor="description" className="text-base text-white font-semibold">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter banner description"
                  rows="3"
                  className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
                />
              </div>

              <div>
                <label htmlFor="link" className="text-base text-white font-semibold">
                  Link URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  required
                  className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="text-base text-white font-semibold">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="order" className="text-base text-white font-semibold">
                    Display Order
                  </label>
                  <input
                    type="number"
                    id="order"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    min="0"
                    className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
                  />
                </div>
              </div>

              <div>
                <label className="text-base text-white font-semibold">
                  Banner Image
                </label>
                <div className="mt-2">
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-stroke rounded-lg cursor-pointer hover:border-main transition-colors bg-white/5"
                  >
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Icon icon="mdi:cloud-upload" className="text-body mb-3" width="48" />
                        <p className="text-sm text-body">Click to upload new image</p>
                      </div>
                    )}
                    <input
                      id="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="mt-2 text-red-500 text-sm hover:underline"
                    >
                      Remove image
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-main text-black px-8 py-3 rounded-lg font-medium hover-main transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Banner"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/admin/banners")}
                className="bg-white/5 border border-stroke text-white px-8 py-3 rounded-lg font-medium hover:border-main transition-all"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-1">
            <div className="bg-background2 rounded-lg p-6 sticky top-4">
              <h3 className="text-white text-lg font-semibold mb-4">Preview</h3>
              <div className="bg-background rounded-lg p-4 border border-stroke">
                <div className="relative h-48 bg-gray-800 rounded-lg overflow-hidden mb-4">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon icon="mdi:image" className="text-gray-600" width="48" />
                    </div>
                  )}
                </div>

                <h4 className="text-white font-medium text-base mb-2">
                  {formData.title || "Banner Title"}
                </h4>

                {formData.description && (
                  <p className="text-body text-sm mb-3 line-clamp-2">
                    {formData.description}
                  </p>
                )}

                {formData.link && (
                  <div className="flex items-center gap-2 text-sm text-main">
                    <Icon icon="mdi:link" width="16" />
                    <span className="line-clamp-1">{formData.link}</span>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <span className={`badge ${
                    formData.status === 'active' ? 'badge-success' : 'badge-error'
                  }`}>
                    {formData.status}
                  </span>
                  {formData.order > 0 && (
                    <span className="text-body text-xs">Order: {formData.order}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;
