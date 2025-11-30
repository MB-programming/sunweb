import React from "react";
import { Icon } from "@iconify/react";

const RecentActivity = ({ activities = [], loading = false }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'project': 'mdi:folder',
      'service': 'mdi:cog',
      'client': 'mdi:account',
      'booking': 'mdi:calendar-check',
      'article': 'mdi:file-document',
      'inquiry': 'mdi:email'
    };
    return icons[type] || 'mdi:bell';
  };

  const getActivityColor = (type) => {
    const colors = {
      'project': 'bg-blue-500/20 text-blue-400',
      'service': 'bg-green-500/20 text-green-400',
      'client': 'bg-purple-500/20 text-purple-400',
      'booking': 'bg-yellow-500/20 text-yellow-400',
      'article': 'bg-pink-500/20 text-pink-400',
      'inquiry': 'bg-orange-500/20 text-orange-400'
    };
    return colors[type] || 'bg-gray-500/20 text-gray-400';
  };

  if (loading) {
    return (
      <div className="bg-background2 rounded-lg p-6">
        <h3 className="text-white text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-3 animate-pulse">
              <div className="bg-gray-700 rounded-full p-2 w-10 h-10"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background2 rounded-lg p-6 animate-slideUp">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">Recent Activity</h3>
        <Icon icon="mdi:refresh" className="text-body hover:text-main cursor-pointer transition-colors" width="20" />
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Icon icon="mdi:history" className="mx-auto text-body mb-2" width="48" />
            <p className="text-body">No recent activity</p>
          </div>
        ) : (
          activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 group hover:bg-white/5 p-2 rounded-lg transition-colors">
              <div className={`rounded-full p-2 ${getActivityColor(activity.type)}`}>
                <Icon icon={getActivityIcon(activity.type)} width="20" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium line-clamp-2">
                  {activity.title}
                </p>
                <p className="text-body text-xs mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
