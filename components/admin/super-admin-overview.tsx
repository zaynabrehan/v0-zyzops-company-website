'use client';

import Link from 'next/link';
import { Users, FolderKanban, CreditCard, Shield, ArrowRight } from 'lucide-react';
import type { ActivityLog } from '@/lib/types';

interface SuperAdminOverviewProps {
  stats: {
    adminCount: number;
    clientCount: number;
    projectCount: number;
    pendingPayments: number;
  };
  recentActivity: ActivityLog[];
}

export function SuperAdminOverview({ stats, recentActivity }: SuperAdminOverviewProps) {
  const statCards = [
    {
      label: 'Team Members',
      value: stats.adminCount,
      icon: Shield,
      href: '/admin/dashboard/admins',
      color: 'purple',
    },
    {
      label: 'Clients',
      value: stats.clientCount,
      icon: Users,
      href: '/admin/dashboard/clients',
      color: 'cyan',
    },
    {
      label: 'Projects',
      value: stats.projectCount,
      icon: FolderKanban,
      href: '/admin/dashboard/projects',
      color: 'purple',
    },
    {
      label: 'Pending Payments',
      value: `$${stats.pendingPayments.toLocaleString()}`,
      icon: CreditCard,
      href: '/admin/dashboard/payments',
      color: 'cyan',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-gray-400 mt-2">Welcome back! Here&apos;s what&apos;s happening with your business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`glass rounded-xl p-6 hover-glow-${stat.color} group`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-500/20`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-400`} />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm text-gray-400 group-hover:text-white transition-colors">
              View details
              <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/admin/dashboard/admins?action=add"
              className="flex items-center gap-3 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition-colors"
            >
              <Shield size={20} className="text-purple-400" />
              <span className="text-sm text-white">Add Admin</span>
            </Link>
            <Link
              href="/admin/dashboard/clients?action=add"
              className="flex items-center gap-3 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-colors"
            >
              <Users size={20} className="text-cyan-400" />
              <span className="text-sm text-white">Add Client</span>
            </Link>
            <Link
              href="/admin/dashboard/projects?action=add"
              className="flex items-center gap-3 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition-colors"
            >
              <FolderKanban size={20} className="text-purple-400" />
              <span className="text-sm text-white">New Project</span>
            </Link>
            <Link
              href="/admin/dashboard/payments?action=add"
              className="flex items-center gap-3 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition-colors"
            >
              <CreditCard size={20} className="text-cyan-400" />
              <span className="text-sm text-white">Record Payment</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            <Link
              href="/admin/dashboard/activity"
              className="text-sm text-cyan-400 hover:text-cyan-300"
            >
              View all
            </Link>
          </div>
          
          {recentActivity.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No recent activity</p>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 bg-white/5 rounded-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{activity.action}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.admin_name || activity.admin_email} -{' '}
                      {new Date(activity.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
