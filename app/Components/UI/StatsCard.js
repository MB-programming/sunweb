import React from "react";
import { Icon } from "@iconify/react";

const StatsCard = ({
  title,
  value,
  icon,
  iconColor = "main",
  trend,
  trendValue,
  loading = false
}) => {
  const iconBgColors = {
    main: "bg-main/20",
    blue: "bg-blue-500/20",
    green: "bg-green-500/20",
    yellow: "bg-yellow-500/20",
    red: "bg-red-500/20",
    purple: "bg-purple-500/20"
  };

  const iconColors = {
    main: "text-main",
    blue: "text-blue-400",
    green: "text-green-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
    purple: "text-purple-400"
  };

  if (loading) {
    return (
      <div className="bg-background2 rounded-lg p-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-700 rounded w-20 mb-3"></div>
            <div className="h-8 bg-gray-700 rounded w-16"></div>
          </div>
          <div className="bg-gray-700 p-3 rounded-full w-12 h-12"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background2 rounded-lg p-6 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-stroke">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-body text-sm font-medium mb-1">{title}</p>
          <p className="text-white text-2xl md:text-3xl font-bold">
            {value}
          </p>

          {/* Trend */}
          {trend && trendValue && (
            <div className={`flex items-center mt-2 text-sm ${
              trend === 'up' ? 'text-green-400' :
              trend === 'down' ? 'text-red-400' :
              'text-body'
            }`}>
              <Icon
                icon={
                  trend === 'up' ? 'mdi:trending-up' :
                  trend === 'down' ? 'mdi:trending-down' :
                  'mdi:minus'
                }
                className="w-4 h-4 mr-1"
              />
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        {/* Icon */}
        {icon && (
          <div className={`${iconBgColors[iconColor]} p-3 rounded-full`}>
            <Icon
              icon={icon}
              width="28"
              height="28"
              className={iconColors[iconColor]}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
