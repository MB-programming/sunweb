"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useState } from "react";
import { useProjects, useProjectMutations } from "@/app/lib/hooks/useProjects";
import { toast } from "react-toastify";
import PageHeader from "@/app/Components/UI/PageHeader";
import StatsCard from "@/app/Components/UI/StatsCard";
import SearchBar from "@/app/Components/UI/SearchBar";
import ConfirmDialog from "@/app/Components/UI/ConfirmDialog";
import EmptyState from "@/app/Components/UI/EmptyState";
import Pagination from "@/app/Components/UI/Pagination";

const Page = () => {
  const { projects, loading, error, refetch } = useProjects();
  const { deleteProject, loading: deleteLoading } = useProjectMutations();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, projectId: null });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filters = [
    { text: "All Projects", value: "all" },
    { text: "Completed", value: "completed" },
    { text: "In Progress", value: "in_progress" },
    { text: "Pending", value: "pending" },
  ];

  // Calculate stats
  const totalProjects = projects?.length || 0;
  const completedProjects = projects?.filter(p => p.status === 'completed')?.length || 0;
  const inProgressProjects = projects?.filter(p => p.status === 'in_progress')?.length || 0;
  const pendingProjects = projects?.filter(p => p.status === 'pending')?.length || 0;

  // Filter projects
  const filteredProjects = projects?.filter((project) => {
    const matchesSearch =
      searchTerm === "" ||
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || project.status === filter;

    return matchesSearch && matchesFilter;
  }) || [];

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = async () => {
    try {
      await deleteProject(deleteDialog.projectId);
      toast.success("Project deleted successfully!");
      setDeleteDialog({ isOpen: false, projectId: null });
      refetch();
    } catch (err) {
      toast.error("Failed to delete project");
    }
  };

  const openDeleteDialog = (id) => {
    setDeleteDialog({ isOpen: true, projectId: id });
  };

  return (
    <div className="mt-3 animate-fadeIn">
      <PageHeader
        title="Projects Management"
        description="Manage and track all your projects in one place"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin", icon: "mdi:view-dashboard" },
          { label: "Projects" }
        ]}
        actions={
          <Link
            href="/admin/projects/add"
            className="flex items-center gap-2 py-2 px-4 rounded-lg text-black bg-main hover:shadow-lg transition-all"
          >
            <Icon icon="mdi:plus" width="20" />
            <span>Add Project</span>
          </Link>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        <StatsCard
          title="Total Projects"
          value={totalProjects}
          icon="carbon:ibm-cloud-projects"
          iconColor="main"
          loading={loading}
        />
        <StatsCard
          title="Completed"
          value={completedProjects}
          icon="mdi:check-circle"
          iconColor="green"
          loading={loading}
        />
        <StatsCard
          title="In Progress"
          value={inProgressProjects}
          icon="mdi:progress-clock"
          iconColor="blue"
          loading={loading}
        />
        <StatsCard
          title="Pending"
          value={pendingProjects}
          icon="mdi:clock-outline"
          iconColor="yellow"
          loading={loading}
        />
      </div>

      {/* Filters and Search */}
      <div className="mt-6 bg-background2 rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="w-full md:w-96">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              onClear={() => setSearchTerm("")}
              placeholder="Search projects or clients..."
            />
          </div>

          <div className="flex items-center gap-2 bg-background rounded-lg p-1">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => {
                  setFilter(f.value);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f.value
                    ? "bg-main text-black"
                    : "text-body hover:text-white"
                }`}
              >
                {f.text}
              </button>
            ))}
          </div>
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
            <p>Error loading projects. Please try again later.</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <EmptyState
            icon="carbon:ibm-cloud-projects"
            title="No projects found"
            description={searchTerm ? "Try adjusting your search terms" : "Get started by creating your first project"}
            actionLabel={searchTerm ? undefined : "Add Project"}
            actionHref={searchTerm ? undefined : "/admin/projects/add"}
          />
        )}

        {/* Projects Grid */}
        {!loading && !error && paginatedProjects.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-background border border-stroke rounded-lg p-5 hover:border-main transition-all group card-hover"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className={`badge ${
                        project.status === "completed"
                          ? "badge-success"
                          : project.status === "in_progress"
                          ? "badge-info"
                          : "badge-warning"
                      }`}
                    >
                      {project.status?.replace('_', ' ')}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/projects/edit/${project.slug}`}
                        className="text-body hover:text-main transition-colors"
                      >
                        <Icon icon="mdi:pencil" width="18" />
                      </Link>
                      <button
                        onClick={() => openDeleteDialog(project.id)}
                        className="text-body hover:text-red-500 transition-colors"
                      >
                        <Icon icon="mdi:delete" width="18" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-white text-base font-semibold mb-2 line-clamp-1 group-hover:text-main transition-colors">
                    {project.title}
                  </h4>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon icon="mdi:account" className="text-body" width="16" />
                      <span className="text-body">{project.client_name || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon icon="mdi:calendar-start" className="text-body" width="16" />
                      <span className="text-body">{project.start_date || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon icon="mdi:calendar-end" className="text-body" width="16" />
                      <span className="text-body">{project.end_date || "N/A"}</span>
                    </div>
                  </div>

                  <p className="text-body text-sm line-clamp-2 mb-4">
                    {project.description || project.title}
                  </p>

                  <Link
                    href={`/admin/projects/view/${project.slug}`}
                    className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg border border-stroke text-white hover:bg-main hover:border-main hover:text-black transition-all"
                  >
                    <Icon icon="mdi:eye" width="18" />
                    <span className="text-sm font-medium">View Details</span>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalItems={filteredProjects.length}
                  itemsPerPage={itemsPerPage}
                  startIndex={startIndex}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, projectId: null })}
        onConfirm={handleDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        loading={deleteLoading}
      />
    </div>
  );
};

export default Page;
