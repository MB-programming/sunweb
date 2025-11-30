"use client";
import React, { useState } from "react";
import { useArticles, useArticleMutations } from "@/app/lib/hooks/useArticles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifcation from "@/app/Components/Notification";
import { Icon } from "@iconify/react";
import Link from "next/link";

// New UI Components
import PageHeader from "@/app/Components/UI/PageHeader";
import StatsCard from "@/app/Components/UI/StatsCard";
import SearchBar from "@/app/Components/UI/SearchBar";
import EmptyState from "@/app/Components/UI/EmptyState";
import TableSkeleton from "@/app/Components/UI/TableSkeleton";
import ConfirmDialog from "@/app/Components/UI/ConfirmDialog";
import Pagination from "@/app/Components/UI/Pagination";

const Page = () => {
  const { articles, loading, error, refetch } = useArticles();
  const { deleteArticle } = useArticleMutations();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, articleId: null });
  const [deleting, setDeleting] = useState(false);

  const itemsPerPage = 10;

  // Filter articles
  const filteredArticles = articles?.filter((article) => {
    const matchesSearch = searchTerm === "" ||
      article.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  }) || [];

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteArticle(deleteDialog.articleId);
      toast.success("Article deleted successfully!");
      refetch();
      setDeleteDialog({ isOpen: false, articleId: null });
    } catch (error) {
      toast.error("Failed to delete article");
    } finally {
      setDeleting(false);
    }
  };

  const totalArticles = articles?.length || 0;

  return (
    <div className="mt-3 animate-fadeIn">
      <Notifcation />

      {/* Page Header */}
      <PageHeader
        title="Articles Management"
        description="Manage blog posts and articles"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin", icon: "mdi:view-dashboard" },
          { label: "Articles" }
        ]}
        actions={
          <Link
            href="/admin/articles/add"
            className="bg-main text-black px-6 py-3 rounded-lg font-medium hover-main duration-300 inline-flex items-center"
          >
            <Icon icon="mdi:plus" className="mr-2" width="20" />
            Add New Article
          </Link>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCard
          title="Total Articles"
          value={totalArticles}
          icon="mdi:file-document-outline"
          iconColor="main"
          loading={loading}
        />
        <StatsCard
          title="Published"
          value={articles?.filter(a => a.status === 'published')?.length || 0}
          icon="mdi:check-circle"
          iconColor="green"
          loading={loading}
        />
        <StatsCard
          title="Drafts"
          value={articles?.filter(a => a.status === 'draft')?.length || 0}
          icon="mdi:file-edit"
          iconColor="yellow"
          loading={loading}
        />
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          onClear={() => setSearchTerm("")}
          placeholder="Search articles by title or description..."
        />
      </div>

      {/* Articles Table */}
      {loading ? (
        <TableSkeleton rows={5} columns={4} />
      ) : error ? (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 text-red-400">
          <Icon icon="mdi:alert-circle" className="inline mr-2" width="24" />
          Error loading articles: {error.message || "Unknown error"}
        </div>
      ) : filteredArticles.length === 0 ? (
        <EmptyState
          icon={searchTerm ? "mdi:magnify" : "mdi:file-document-outline"}
          title={searchTerm ? "No articles found" : "No articles yet"}
          description={searchTerm ? "Try adjusting your search criteria" : "Create your first article to get started"}
          actionLabel={!searchTerm ? "Create Article" : undefined}
          actionHref={!searchTerm ? "/admin/articles/add" : undefined}
        />
      ) : (
        <>
          <div className="bg-background2 rounded-lg overflow-hidden animate-slideUp">
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
                  {paginatedArticles.map((article) => (
                    <tr key={article.id} className="border-t border-stroke hover:bg-white/5 transition-colors">
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
                            className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all card-hover"
                            title="View"
                          >
                            <Icon icon="mdi:eye" width="20" height="20" />
                          </Link>
                          <Link
                            href={`/admin/articles/edit/${article.id}`}
                            className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all card-hover"
                            title="Edit"
                          >
                            <Icon icon="mdi:pencil" width="20" height="20" />
                          </Link>
                          <button
                            onClick={() => setDeleteDialog({ isOpen: true, articleId: article.id })}
                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all card-hover"
                            title="Delete"
                          >
                            <Icon icon="mdi:delete" width="20" height="20" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredArticles.length}
          />
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, articleId: null })}
        onConfirm={handleDelete}
        title="Delete Article"
        message="Are you sure you want to delete this article? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        loading={deleting}
      />
    </div>
  );
};

export default Page;
