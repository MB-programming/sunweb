"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useArticleMutations } from "@/app/lib/hooks/useArticles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifcation from "@/app/Components/Notification";
import LoadingPage from "@/app/Components/Loader/Loader";

const Page = () => {
  const router = useRouter();
  const { createArticle, loading } = useArticleMutations();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    content: "",
    author: "",
    tags: ""
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      return toast.error("Article title is required!");
    }

    if (!formData.description) {
      return toast.error("Article description is required!");
    }

    try {
      const articleData = {
        name: formData.name,
        description: formData.description,
        // Store additional data in description field as JSON if needed
        // Or use separate fields if API supports them
      };

      await createArticle(articleData);
      toast.success("Article created successfully!");
      router.push("/admin/articles");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create article");
    }
  };

  return (
    <div className="mt-3">
      {loading && <LoadingPage />}
      <Notifcation />

      <h3 className="text-white mt-5 text-[1.2rem] font-bold">
        Add New Article
      </h3>
      <p className="text-body text-sm mt-2">
        Create a new blog post or article
      </p>

      <form onSubmit={handleSubmit} className="mt-5">
        <div className="bg-background2 rounded px-4 pb-6 pt-4">
          <div className="mt-5">
            <label htmlFor="name" className="text-base text-white font-semibold">
              Article Title *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter article title"
              className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="description" className="text-base text-white font-semibold">
              Short Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter a brief description of the article"
              rows="3"
              className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="content" className="text-base text-white font-semibold">
              Article Content
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your article content here..."
              rows="10"
              className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
            />
            <p className="text-body text-xs mt-1">
              Full content can be added here or managed separately
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div>
              <label htmlFor="author" className="text-base text-white font-semibold">
                Author
              </label>
              <input
                type="text"
                id="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Author name"
                className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
              />
            </div>

            <div>
              <label htmlFor="tags" className="text-base text-white font-semibold">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="e.g., web design, development, SEO"
                className="p-3 w-full border focus:border-main border-stroke rounded mt-2 outline-none text-white bg-white/5"
              />
              <p className="text-body text-xs mt-1">
                Separate tags with commas
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-main p-3 px-8 text-[1rem] font-medium rounded hover-main duration-300 text-black disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Article"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/articles")}
              className="bg-white/5 p-3 px-8 text-[1rem] font-medium rounded border border-stroke text-white hover:border-main duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>

      {/* Preview Section */}
      <div className="mt-8 bg-background2 rounded px-4 py-6">
        <h4 className="text-white text-lg font-semibold mb-4">Preview</h4>
        <div className="bg-background rounded p-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            {formData.name || "Article title will appear here..."}
          </h2>
          {formData.author && (
            <p className="text-body text-sm mb-4">
              By {formData.author}
            </p>
          )}
          <p className="text-body text-base mb-4">
            {formData.description || "Article description will appear here..."}
          </p>
          {formData.tags && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.split(',').map((tag, index) => (
                <span key={index} className="bg-main/20 text-main px-3 py-1 rounded-full text-sm">
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
