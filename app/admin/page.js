"use client";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import StatsCard from "../Components/UI/StatsCard";
import QuickActions from "../Components/Dashboard/QuickActions";
import RecentActivity from "../Components/Dashboard/RecentActivity";
import { useProjects } from "../lib/hooks/useProjects";
import { useClients } from "../lib/hooks/useClients";
import { useServices } from "../lib/hooks/useServices";
import { useArticles } from "../lib/hooks/useArticles";

const Page = () => {
  const { projects, loading: projectsLoading } = useProjects();
  const { clients, loading: clientsLoading } = useClients();
  const { services, loading: servicesLoading } = useServices();
  const { articles, loading: articlesLoading } = useArticles();

  // Calculate stats
  const totalProjects = projects?.length || 0;
  const totalClients = clients?.length || 0;
  const totalServices = services?.length || 0;
  const totalArticles = articles?.length || 0;

  const completedProjects = projects?.filter(p => p.status === 'completed')?.length || 0;
  const activeClients = clients?.filter(c => c.status === 'active')?.length || 0;
  const activeServices = services?.filter(s => s.status === 'active')?.length || 0;
  const publishedArticles = articles?.filter(a => a.status === 'published')?.length || 0;

  return (
    <div className="mt-4 animate-fadeIn">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-body text-sm mt-1">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <StatsCard
          title="Total Projects"
          value={totalProjects}
          icon="carbon:ibm-cloud-projects"
          iconColor="blue"
          trend="up"
          trendValue={`${completedProjects} completed`}
          loading={projectsLoading}
        />
        <StatsCard
          title="Total Clients"
          value={totalClients}
          icon="iconoir:user"
          iconColor="purple"
          trend="up"
          trendValue={`${activeClients} active`}
          loading={clientsLoading}
        />
        <StatsCard
          title="Services"
          value={totalServices}
          icon="mdi:cog"
          iconColor="green"
          trend="up"
          trendValue={`${activeServices} active`}
          loading={servicesLoading}
        />
        <StatsCard
          title="Articles"
          value={totalArticles}
          icon="mdi:post-it-note-edit-outline"
          iconColor="yellow"
          trend="up"
          trendValue={`${publishedArticles} published`}
          loading={articlesLoading}
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <QuickActions />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-background2 rounded-lg p-6 animate-slideUp">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Icon className="text-main" icon="carbon:ibm-cloud-projects" width="24" height="24" />
              <h3 className="text-white text-lg font-semibold">Recent Projects</h3>
            </div>
            <Link href="/admin/projects" className="text-main text-sm hover:underline">
              View All
            </Link>
          </div>

          {projectsLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-700 rounded animate-pulse"></div>
              ))}
            </div>
          ) : projects && projects.length > 0 ? (
            <div className="space-y-3">
              {projects.slice(0, 3).map((project) => (
                <Link
                  key={project.id}
                  href={`/admin/projects/view/${project.slug}`}
                  className="block p-4 rounded-lg border border-stroke hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-medium group-hover:text-main transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-body text-sm mt-1">Client: {project.client_name || 'N/A'}</p>
                    </div>
                    <span className={`badge ${
                      project.status === 'completed' ? 'badge-success' :
                      project.status === 'in_progress' ? 'badge-info' :
                      'badge-warning'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon icon="carbon:ibm-cloud-projects" className="text-body mx-auto mb-2" width="48" />
              <p className="text-body">No projects yet</p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </div>

      {/* Recent Articles */}
      <div className="mt-6 bg-background2 rounded-lg p-6 animate-slideUp">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon className="text-main" icon="mdi:post-it-note-edit-outline" width="24" height="24" />
            <h3 className="text-white text-lg font-semibold">Recent Articles</h3>
          </div>
          <Link href="/admin/articles" className="text-main text-sm hover:underline">
            View All
          </Link>
        </div>

        {articlesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        ) : articles && articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.slice(0, 3).map((article) => (
              <Link
                key={article.id}
                href={`/admin/articles/view/${article.id}`}
                className="block p-4 rounded-lg border border-stroke hover:bg-white/5 transition-all group card-hover"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-medium text-sm line-clamp-2 group-hover:text-main transition-colors">
                    {article.name || article.title}
                  </h4>
                </div>
                <p className="text-body text-xs line-clamp-2 mb-3">
                  {article.description || article.content}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-body text-xs">
                    {article.author || 'Admin'}
                  </span>
                  <span className={`badge ${
                    article.status === 'published' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {article.status || 'draft'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Icon icon="mdi:post-it-note-edit-outline" className="text-body mx-auto mb-2" width="48" />
            <p className="text-body">No articles yet</p>
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slideUp">
        <div className="bg-background2 rounded-lg p-6 border border-stroke">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sm">Server Status</p>
              <p className="text-white text-lg font-semibold mt-1">Operational</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="bg-background2 rounded-lg p-6 border border-stroke">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sm">API Status</p>
              <p className="text-white text-lg font-semibold mt-1">Connected</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="bg-background2 rounded-lg p-6 border border-stroke">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body text-sm">Database</p>
              <p className="text-white text-lg font-semibold mt-1">Active</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
