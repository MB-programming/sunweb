"use client";
import React, { useState } from "react";
import { useArticles, useArticleMutations } from "@/app/lib/hooks/useArticles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifcation from "@/app/Components/Notification";
import LoadingPage from "@/app/Components/Loader/Loader";
import { Icon } from "@iconify/react";
import Link from "next/link";

const Page = () => {
  const { articles, loading, error, refetch } = useArticles();
  const { deleteArticle } = useArticleMutations();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Filter articles
  const filteredArticles = articles?.filter((article) => {
    const matchesSearch = searchTerm === "" ||
      article.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  }) || [];

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteArticle(id);
        toast.success("Article deleted successfully!");
        refetch();
      } catch (error) {
        toast.error("Failed to delete article");
      }
    }
  };

  const totalArticles = articles?.length || 0;

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="mt-3">
      <Notifcation />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-white text-[1.3rem] font-bold">Articles Management</h3>
          <p className="text-body text-sm mt-1">Manage blog posts and articles</p>
        </div>
        <Link
          href="/admin/articles/add"
          className="bg-main text-black px-6 py-2 rounded font-medium hover-main duration-300"
        >
          <Icon icon="mdi:plus" className="inline mr-2" />
          Add New Article
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-background2 rounded p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sm">Total Articles</p>
              <p className="text-white text-2xl font-bold mt-1">{totalArticles}</p>
            </div>
            <div className="bg-main/20 p-3 rounded-full">
              <Icon icon="mdi:file-document-outline" width="24" height="24" className="text-main" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded border border-stroke bg-white/5 text-white outline-none focus:border-main"
          />
        </div>
      </div>

      {/* Articles Table */}
      <div className="mt-6 bg-background2 rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="text-left p-4 text-white font-semibold">Title</th>
                <th className="text-left p-4 text-white font-semibold">Description</th>
                <th className="text-left p-4 text-white font-semibold">Created</th>
                <th className="text-center p-4 text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-body">
                    {searchTerm ? "No articles found matching your search" : "No articles yet. Create your first article!"}
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article) => (
                  <tr key={article.id} className="border-t border-stroke hover:bg-white/5">
                    <td className="p-4">
                      <p className="text-white font-medium">{article.name}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-body text-sm line-clamp-2">
                        {article.description || "No description"}
                      </p>
                    </td>
                    <td className="p-4">
                      <p className="text-body text-sm">
                        {article.created_at ? new Date(article.created_at).toLocaleDateString() : "N/A"}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/articles/view/${article.id}`}
                          className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition"
                          title="View"
                        >
                          <Icon icon="mdi:eye" width="20" height="20" />
                        </Link>
                        <Link
                          href={`/admin/articles/edit/${article.id}`}
                          className="p-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition"
                          title="Edit"
                        >
                          <Icon icon="mdi:pencil" width="20" height="20" />
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id)}
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
          Error loading articles: {error.message || "Unknown error"}
        </div>
      )}
    </div>
  );
};

export default Page;
