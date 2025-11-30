"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useArticle, useArticleMutations } from "@/app/lib/hooks/useArticles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifcation from "@/app/Components/Notification";
import LoadingPage from "@/app/Components/Loader/Loader";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();
  const { article, loading: fetchLoading } = useArticle(id);
  const { updateArticle, loading: updateLoading } = useArticleMutations();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    content: "",
    author: "",
    tags: ""
  });

  useEffect(() => {
    if (article) {
      setFormData({
        name: article.name || "",
        description: article.description || "",
        content: "",
        author: "",
        tags: ""
      });
    }
  }, [article]);

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

    try {
      const articleData = {
        name: formData.name,
        description: formData.description,
      };

      await updateArticle(id, articleData);
      toast.success("Article updated successfully!");
      router.push("/admin/articles");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update article");
    }
  };

  if (fetchLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="mt-3">
      {updateLoading && <LoadingPage />}
      <Notifcation />

      <h3 className="text-white mt-5 text-[1.2rem] font-bold">
        Edit Article
      </h3>

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
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={updateLoading}
              className="bg-main p-3 px-8 text-[1rem] font-medium rounded hover-main duration-300 text-black disabled:opacity-50"
            >
              {updateLoading ? "Updating..." : "Update Article"}
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
    </div>
  );
};

export default Page;
