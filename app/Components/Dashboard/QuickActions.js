import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const QuickActions = () => {
  const actions = [
    {
      title: "Add Project",
      description: "Create a new project",
      icon: "mdi:folder-plus",
      href: "/admin/projects/add",
      color: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
    },
    {
      title: "Add Service",
      description: "Add new service",
      icon: "mdi:cog-plus",
      href: "/admin/services/add",
      color: "bg-green-500/20 text-green-400 hover:bg-green-500/30"
    },
    {
      title: "Add Client",
      description: "Register new client",
      icon: "mdi:account-plus",
      href: "/admin/clients/add",
      color: "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
    },
    {
      title: "Add Article",
      description: "Write new article",
      icon: "mdi:file-document-plus",
      href: "/admin/articles/add",
      color: "bg-pink-500/20 text-pink-400 hover:bg-pink-500/30"
    },
    {
      title: "Hero Section",
      description: "Edit homepage hero",
      icon: "mdi:home-edit",
      href: "/admin/hero-section",
      color: "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
    },
    {
      title: "Pricing Plans",
      description: "Manage pricing",
      icon: "mdi:currency-usd",
      href: "/admin/pricing-plans",
      color: "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
    }
  ];

  return (
    <div className="bg-background2 rounded-lg p-6 animate-slideUp">
      <h3 className="text-white text-lg font-semibold mb-4">Quick Actions</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className={`${action.color} p-4 rounded-lg transition-all card-hover group`}
          >
            <div className="flex flex-col items-center text-center gap-2">
              <Icon icon={action.icon} width="32" className="group-hover:scale-110 transition-transform" />
              <div>
                <p className="font-semibold text-sm">{action.title}</p>
                <p className="text-xs opacity-75 mt-1">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
