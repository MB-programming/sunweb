"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useArticle } from "@/app/lib/hooks/useArticles";
import LoadingPage from "@/app/Components/Loader/Loader";
import { Icon } from "@iconify/react";
import Link from "next/link";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { article, loading, error } = useArticle(id);

  if (loading) {
    return <LoadingPage />;
  }

  if (error || !article) {
    return (
      <div className="mt-3">
        <div className="bg-red-500/20 border border-red-500 rounded p-4 text-red-400">
          Error loading article: {error?.message || "Article not found"}
        </div>
        <button
          onClick={() => router.push("/admin/articles")}
          className="mt-4 bg-main text-black px-6 py-2 rounded font-medium hover-main duration-300"
        >
          Back to Articles
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-white text-[1.3rem] font-bold">View Article</h3>
        <div className="flex gap-3">
          <Link
            href={`/admin/articles/edit/${id}`}
            className="bg-main text-black px-6 py-2 rounded font-medium hover-main duration-300"
          >
            <Icon icon="mdi:pencil" className="inline mr-2" />
            Edit
          </Link>
          <button
            onClick={() => router.push("/admin/articles")}
            className="bg-white/5 border border-stroke text-white px-6 py-2 rounded font-medium hover:border-main duration-300"
          >
            Back
          </button>
        </div>
      </div>

      {/* Article Details */}
      <div className="mt-6 bg-background2 rounded p-6">
        <div className="border-b border-stroke pb-4">
          <h2 className="text-white text-2xl font-semibold">{article.name}</h2>
          <div className="flex gap-4 mt-3 text-sm text-body">
            {article.created_at && (
              <span>
                <Icon icon="mdi:calendar" className="inline mr-1" />
                Created: {new Date(article.created_at).toLocaleDateString()}
              </span>
            )}
            {article.updated_at && (
              <span>
                <Icon icon="mdi:update" className="inline mr-1" />
                Updated: {new Date(article.updated_at).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <h4 className="text-white font-semibold mb-2">Description</h4>
            <p className="text-body">{article.description || "No description provided"}</p>
          </div>

          {article.id && (
            <div>
              <h4 className="text-white font-semibold mb-2">Article ID</h4>
              <p className="text-body font-mono">{article.id}</p>
            </div>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 bg-background2 rounded p-6">
        <h4 className="text-white font-semibold mb-4">Additional Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-body text-sm">Status</p>
            <p className="text-white mt-1">
              {article.status || "Published"}
            </p>
          </div>
          <div>
            <p className="text-body text-sm">Type</p>
            <p className="text-white mt-1">Article / Blog Post</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
