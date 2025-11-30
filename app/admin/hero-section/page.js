"use client";
import React, { useState, useEffect } from "react";
import { useHeroSection, useSettingsMutations } from "@/app/lib/hooks/useSettings";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifcation from "@/app/Components/Notification";
import LoadingPage from "@/app/Components/Loader/Loader";
import PageHeader from "@/app/Components/UI/PageHeader";

const Page = () => {
  const { heroSection, loading: fetchLoading, refetch } = useHeroSection();
  const { saveHeroSection, loading: saveLoading } = useSettingsMutations();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    primaryButtonText: "",
    primaryButtonLink: "",
    secondaryButtonText: "",
    secondaryButtonLink: ""
  });

  useEffect(() => {
    if (heroSection) {
      setFormData({
        title: heroSection.title || "",
        description: heroSection.description || "",
        primaryButtonText: heroSection.primaryButton?.text || "",
        primaryButtonLink: heroSection.primaryButton?.link || "",
        secondaryButtonText: heroSection.secondaryButton?.text || "",
        secondaryButtonLink: heroSection.secondaryButton?.link || ""
      });
    }
  }, [heroSection]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title) {
      return toast.error("Title is required!");
    }

    try {
      const heroData = {
        title: formData.title,
        description: formData.description,
        primaryButton: {
          text: formData.primaryButtonText,
          link: formData.primaryButtonLink
        },
        secondaryButton: {
          text: formData.secondaryButtonText,
          link: formData.secondaryButtonLink
        }
      };

      await saveHeroSection(heroData);
      toast.success("Hero section updated successfully!");
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update hero section");
    }
  };

  if (fetchLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="mt-3 animate-fadeIn">
      {saveLoading && <LoadingPage />}
      <Notifcation />

      <PageHeader
        title="Hero Section Management"
        description="Edit the hero section content that appears on the homepage"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin", icon: "mdi:view-dashboard" },
          { label: "Hero Section" }
        ]}
      />

      <form onSubmit={handleSubmit} className="mt-5">
        <div className="bg-background2 rounded px-4 pb-6 pt-4">
          <div className="mt-5">
            <label htmlFor="title" className="text-base text-white font-semibold">
              Main Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Building Digital Solutions That Drive Growth"
              className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="description" className="text-base text-white font-semibold">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter hero section description"
              rows="4"
              className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div>
              <label htmlFor="primaryButtonText" className="text-base text-white font-semibold">
                Primary Button Text
              </label>
              <input
                type="text"
                id="primaryButtonText"
                value={formData.primaryButtonText}
                onChange={handleInputChange}
                placeholder="e.g., our Services"
                className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
              />
            </div>

            <div>
              <label htmlFor="primaryButtonLink" className="text-base text-white font-semibold">
                Primary Button Link
              </label>
              <input
                type="text"
                id="primaryButtonLink"
                value={formData.primaryButtonLink}
                onChange={handleInputChange}
                placeholder="e.g., /services"
                className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div>
              <label htmlFor="secondaryButtonText" className="text-base text-white font-semibold">
                Secondary Button Text
              </label>
              <input
                type="text"
                id="secondaryButtonText"
                value={formData.secondaryButtonText}
                onChange={handleInputChange}
                placeholder="e.g., Get Started"
                className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
              />
            </div>

            <div>
              <label htmlFor="secondaryButtonLink" className="text-base text-white font-semibold">
                Secondary Button Link
              </label>
              <input
                type="text"
                id="secondaryButtonLink"
                value={formData.secondaryButtonLink}
                onChange={handleInputChange}
                placeholder="e.g., /book"
                className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
              />
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={saveLoading}
              className="bg-main p-3 px-8 text-[1rem] font-medium rounded hover-main duration-300 text-black disabled:opacity-50"
            >
              {saveLoading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => refetch()}
              className="bg-white/5 p-3 px-8 text-[1rem] font-medium rounded border border-stroke text-white hover:border-main duration-300"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {/* Preview Section */}
      <div className="mt-8 bg-background2 rounded px-4 py-6">
        <h4 className="text-white text-lg font-semibold mb-4">Preview</h4>
        <div className="bg-background rounded p-8 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            {formData.title || "Your title here..."}
          </h2>
          <p className="text-body text-lg mb-6">
            {formData.description || "Your description here..."}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            {formData.primaryButtonText && (
              <div className="px-6 py-2 bg-white text-black rounded font-semibold">
                {formData.primaryButtonText}
              </div>
            )}
            {formData.secondaryButtonText && (
              <div className="px-6 py-2 bg-transparent border border-white text-white rounded font-semibold">
                {formData.secondaryButtonText}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
