import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const PageHeader = ({
  title,
  description,
  actions,
  breadcrumbs
}) => {
  return (
    <div className="mb-6">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="inline-flex items-center">
                {index > 0 && (
                  <Icon
                    icon="mdi:chevron-right"
                    className="w-5 h-5 text-body mx-2"
                  />
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="inline-flex items-center text-sm font-medium text-body hover:text-main transition-colors"
                  >
                    {crumb.icon && (
                      <Icon icon={crumb.icon} className="w-4 h-4 mr-2" />
                    )}
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="inline-flex items-center text-sm font-medium text-white">
                    {crumb.icon && (
                      <Icon icon={crumb.icon} className="w-4 h-4 mr-2" />
                    )}
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {title}
          </h1>
          {description && (
            <p className="text-body text-sm md:text-base mt-2">
              {description}
            </p>
          )}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex items-center gap-3 flex-wrap">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
