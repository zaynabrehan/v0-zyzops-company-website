'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Bell, Home } from 'lucide-react';

export default function NotificationsPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const name = localStorage.getItem('userName');
    const email = localStorage.getItem('userEmail');

    if (!token) {
      router.push('/signin');
      return;
    }

    setUserName(name || 'User');
    setUserEmail(email || '');
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userType');
    router.push('/');
  };

  const handleBackHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1428] via-[#1a3654] to-[#0a1428]">
      {/* Header */}
      <div className="bg-[#162543] border-b border-[#264563] py-6 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Bell className="text-cyan-400" size={28} />
            <div>
              <h1 className="text-3xl font-bold text-white">Notifications</h1>
              <p className="text-gray-300">Welcome, {userName}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleBackHome}
              className="flex items-center gap-2 px-6 py-3 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors font-semibold"
            >
              <Home size={20} />
              Home
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors font-semibold"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="bg-[#162543] border border-[#264563] rounded-xl p-8">
          <div className="text-center py-12">
            <Bell size={48} className="text-cyan-400 mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-white mb-2">No Notifications Yet</h2>
            <p className="text-gray-300">
              You&apos;re all caught up! Check back later for updates.
            </p>
            <p className="text-gray-400 text-sm mt-4">
              Logged in as: <span className="text-cyan-400">{userEmail}</span>
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-[#162543] border border-[#264563] rounded-xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">About Your Account</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-400 text-sm mb-2">Account Name</p>
              <p className="text-white font-semibold">{userName}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Email Address</p>
              <p className="text-white font-semibold">{userEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
