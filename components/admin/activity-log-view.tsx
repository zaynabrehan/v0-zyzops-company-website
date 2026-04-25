'use client';

import { useState } from 'react';
import { Activity, Search, Calendar } from 'lucide-react';
import type { ActivityLog } from '@/lib/types';

interface ActivityLogViewProps {
  activities: ActivityLog[];
}

export function ActivityLogView({ activities }: ActivityLogViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.admin_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.admin_name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDate = !dateFilter || activity.created_at.startsWith(dateFilter);
    
    return matchesSearch && matchesDate;
  });

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = new Date(activity.created_at).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, ActivityLog[]>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Activity Log</h1>
        <p className="text-gray-400 mt-2">Track all admin actions and changes</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activity..."
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full sm:w-48 pl-10 pr-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* Activity Timeline */}
      {Object.keys(groupedActivities).length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <Activity size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Activity Found</h3>
          <p className="text-gray-400">
            {searchQuery || dateFilter
              ? 'Try adjusting your filters.'
              : 'Activity will appear here as admins take actions.'}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedActivities).map(([date, dayActivities]) => (
            <div key={date}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <h3 className="text-lg font-semibold text-white">{date}</h3>
                <div className="flex-1 h-px bg-purple-500/20" />
              </div>

              <div className="space-y-3 ml-6 pl-6 border-l border-purple-500/20">
                {dayActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="glass rounded-lg p-4 relative before:absolute before:left-[-27px] before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-3 before:rounded-full before:bg-cyan-400 before:border-2 before:border-background"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-white font-medium">{activity.action}</p>
                        {activity.details && (
                          <p className="text-sm text-gray-400 mt-1">{activity.details}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          by {activity.admin_name || activity.admin_email}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 whitespace-nowrap">
                        {new Date(activity.created_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
