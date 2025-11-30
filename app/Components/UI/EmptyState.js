import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const EmptyState = ({
  icon = "mdi:inbox",
  title = "No data found",
  description,
  action,
  actionLabel,
  actionHref
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-background2 p-6 rounded-full mb-4">
        <Icon icon={icon} width="64" height="64" className="text-body" />
      </div>

      <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>

      {description && (
        <p className="text-body text-center max-w-md mb-6">{description}</p>
      )}

      {action && (
        <div onClick={action}>
          {action}
        </div>
      )}

      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="bg-main text-black px-6 py-3 rounded-lg font-medium hover-main duration-300 inline-flex items-center"
        >
          <Icon icon="mdi:plus" className="mr-2" width="20" />
          {actionLabel}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
