"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useState } from "react";
import { useProjects, useProjectMutations } from "@/app/lib/hooks/useProjects";
import { toast } from "react-toastify";

const Page = () => {
  const { projects, loading, error, refetch } = useProjects();
  const { deleteProject } = useProjectMutations();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filters = [
    { text: "all", value: "all" },
    { text: "completed", value: "completed" },
    { text: "pending", value: "pending" },
    { text: "in_progress", value: "in_progress" },
  ];

  // Filter projects
  const filteredProjects = projects?.filter((project) => {
    const matchesSearch =
      searchTerm === "" ||
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || project.status === filter;

    return matchesSearch && matchesFilter;
  }) || [];

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteProject(id);
      toast.success("Project deleted successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to delete project");
    }
  };

  return (
    <div className="mt-3">
      <h3 className="text-white text-[1.4rem] font-bold">Project manage</h3>
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center px-4 justify-start gap-3 flex-row-reverse rounded w-[300px] h-max bg-white/5 border border-stroke">
            <input
              type="text"
              placeholder="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border-none outline-none text-textColor bg-transparent p-2"
            />
            <Icon className="text-body" icon="ep:search" width="18" height="18" />
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-stroke rounded p-2">
            {filters.map((data, index) => (
              <button
                key={index}
                onClick={() => setFilter(data.value)}
                className={`text-[0.8rem] px-5 py-1 hover:text-white hover:bg-background duration-200 ${
                  filter === data.value ? "text-white bg-background" : "text-body"
                }`}
              >
                {data.text}
              </button>
            ))}
          </div>
        </div>
        <Link
          href="/admin/projects/add"
          className="flex items-center gap-3 py-2 px-4 rounded text-black bg-main hover-main duration-500 border border-main"
        >
          <Icon icon="ic:sharp-add" width="18" height="18" />
          <span>Add new project</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-white text-lg">Loading projects...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-20">
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
            <p>Error loading projects. Please try again later.</p>
          </div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-body text-lg">No projects found</p>
        </div>
      ) : null}

      {!loading && !error && filteredProjects.length > 0 && (
        <div className="mt-7 flex items-center flex-wrap gap-4">
          {filteredProjects.map((data, index) => (
            <div
              key={data.id}
              className="flex-1 min-w-[300px] py-5 px-3 border bg-background2 border-stroke rounded-lg"
            >
              <span
                className={`${
                  data.status === "completed"
                    ? "bg-[#3952AA] border-[#3952AA]"
                    : data.status === "pending"
                    ? "bg-[#BAA219] border-[#BAA219] !text-textColor"
                    : data.status === "in_progress" &&
                      "bg-[#6CAF80] !bg-opacity-100 border-[#2F8E4C]"
                } bg-opacity-80 capitalize px-6 py-1 text-[0.7rem] font-medium text-white rounded-3xl border`}
              >
                {data.status}
              </span>
              <h4 className="text-white text-base font-medium mt-4">{data.title}</h4>
              <p className="mt-4 text-[0.85rem] font-medium text-white">
                Client: {data.client_name || "N/A"}
              </p>
              <p className="text-[0.85rem] font-medium mt-2 text-white">
                Start: {data.start_date || "N/A"}
              </p>
              <p className="text-[0.85rem] font-medium mt-2 text-white">
                Deadline: {data.end_date || "N/A"}
              </p>
              <p className="mt-5 text-body text-[0.75rem] font-light max-w-[215px]">
                {data.description || data.title}
              </p>
              <div className="mt-5 flex items-center justify-between gap-4">
                <Link
                  href={`/admin/projects/view/${data.slug}`}
                  className="flex items-center justify-center gap-3 hover-main hover:bg-main hover:border-main hover:text-white/5 p-2 hover:shadow-light duration-300 bg-transparent rounded-sm border border-stroke px-10 w-max"
                >
                  <span className="text-white text-[0.8rem] font-medium">View details</span>
                </Link>
                <button
                  onClick={() => handleDelete(data.id)}
                  className="flex items-center justify-center gap-3 hover:bg-red-500 hover:border-red-500 p-2 hover:shadow-light duration-300 bg-transparent rounded-sm border border-stroke px-6 w-max"
                >
                  <Icon icon="mdi:delete" width="18" height="18" className="text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
