'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CreditCard,
  Shield,
  Activity,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface AdminSidebarProps {
  isSuperAdmin: boolean;
  userName: string;
  userEmail: string;
}

const superAdminNavItems = [
  { href: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/dashboard/admins', label: 'Admins', icon: Shield },
  { href: '/admin/dashboard/clients', label: 'Clients', icon: Users },
  { href: '/admin/dashboard/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/dashboard/payments', label: 'Payments', icon: CreditCard },
  { href: '/admin/dashboard/activity', label: 'Activity Log', icon: Activity },
];

const adminNavItems = [
  { href: '/admin/dashboard', label: 'My Projects', icon: FolderKanban },
];

export function AdminSidebar({ isSuperAdmin, userName, userEmail }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = isSuperAdmin ? superAdminNavItems : adminNavItems;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const NavContent = () => (
    <>
      {/* Header */}
      <div className="p-6 border-b border-purple-500/20">
        <Link href="/admin/dashboard" className="block">
          <h1 className="text-xl font-bold gradient-text">Techvix Admin</h1>
        </Link>
        <div className="mt-4">
          <p className="text-sm font-medium text-white truncate">{userName}</p>
          <p className="text-xs text-gray-400 truncate">{userEmail}</p>
          {isSuperAdmin && (
            <span className="inline-block mt-2 text-xs bg-purple-500/30 text-purple-300 px-2 py-1 rounded-full">
              Super Admin
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-purple-500/30 border border-purple-500/50 text-white'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-purple-500/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 glass border-b border-purple-500/20">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold gradient-text">Techvix Admin</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:bg-white/10 rounded-lg"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 glass flex flex-col pt-14">
            <NavContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 glass border-r border-purple-500/20">
        <NavContent />
      </aside>
    </>
  );
}
