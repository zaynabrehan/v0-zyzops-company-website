'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Trash2, CheckCircle, Mail, Users, Shield, UserPlus, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { GlowButton } from '@/components/glow-button';

interface Message {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

interface Admin {
  id: string;
  email: string;
  name: string;
  is_super_admin: boolean;
  created_at: string;
  password?: string;
}

interface Client {
  id: string;
  email: string;
  name: string;
  created_at: string;
  last_signin_at: string;
}

type TabType = 'messages' | 'admins' | 'clients';

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('messages');
  const [currentUser, setCurrentUser] = useState<Admin | null>(null);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [addingAdmin, setAddingAdmin] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    // Check localStorage for admin session
    const sessionStr = localStorage.getItem('admin_session');
    
    if (!sessionStr) {
      router.push('/admin/login');
      return;
    }

    try {
      const session = JSON.parse(sessionStr);
      
      // Verify session is still valid by checking database
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('id', session.id)
        .single();

      if (adminError || !adminData) {
        localStorage.removeItem('admin_session');
        router.push('/admin/login');
        return;
      }

      setCurrentUser(adminData);
      fetchAllData();
    } catch {
      localStorage.removeItem('admin_session');
      router.push('/admin/login');
    }
  };

  const fetchAllData = async () => {
    setIsLoading(true);
    await Promise.all([
      fetchMessages(),
      fetchAdmins(),
      fetchClients(),
    ]);
    setIsLoading(false);
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
  };

  const fetchAdmins = async () => {
    const { data, error } = await supabase
      .from('admins')
      .select('id, email, name, is_super_admin, created_at')
      .order('created_at', { ascending: true });

    if (!error && data) {
      setAdmins(data);
    }
  };

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('last_signin_at', { ascending: false });

    if (!error && data) {
      setClients(data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    router.push('/admin/login');
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (!error) {
      setMessages(messages.filter((msg) => msg.id !== id));
      setSelectedMessage(null);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id);

    if (!error) {
      setMessages(messages.map((msg) =>
        msg.id === id ? { ...msg, is_read: true } : msg
      ));
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, is_read: true });
      }
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setAddingAdmin(true);

    if (!newAdminEmail.trim()) {
      setError('Email is required');
      setAddingAdmin(false);
      return;
    }

    if (!newAdminPassword.trim()) {
      setError('Password is required');
      setAddingAdmin(false);
      return;
    }

    // Check if already an admin
    const exists = admins.some(a => a.email.toLowerCase() === newAdminEmail.toLowerCase());
    if (exists) {
      setError('This email is already an admin');
      setAddingAdmin(false);
      return;
    }

    const { error } = await supabase
      .from('admins')
      .insert({
        email: newAdminEmail.toLowerCase(),
        name: newAdminName || null,
        password: newAdminPassword,
        is_super_admin: false,
        created_by: currentUser?.id,
      });

    if (error) {
      setError('Failed to add admin.');
    } else {
      setShowAddAdmin(false);
      setNewAdminEmail('');
      setNewAdminName('');
      setNewAdminPassword('');
      fetchAdmins();
    }
    setAddingAdmin(false);
  };

  const handleRemoveAdmin = async (admin: Admin) => {
    if (admin.is_super_admin) {
      alert('Cannot remove super admin');
      return;
    }

    if (!confirm(`Are you sure you want to remove ${admin.email} as admin?`)) return;

    const { error } = await supabase
      .from('admins')
      .delete()
      .eq('id', admin.id);

    if (!error) {
      fetchAdmins();
    }
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="gradient-text">Techvix.org</span> Admin
            </h1>
            <p className="text-gray-300 mt-2">
              Welcome, {currentUser?.name || currentUser?.email}
              {currentUser?.is_super_admin && (
                <span className="ml-2 text-xs bg-purple-500/30 text-purple-300 px-2 py-1 rounded-full">
                  Super Admin
                </span>
              )}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'messages'
                ? 'bg-purple-500/30 border border-purple-500/50 text-white'
                : 'glass text-gray-300 hover:text-white'
            }`}
          >
            <Mail size={20} />
            Messages
            {unreadCount > 0 && (
              <span className="bg-cyan-400 text-black text-xs px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('admins')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'admins'
                ? 'bg-purple-500/30 border border-purple-500/50 text-white'
                : 'glass text-gray-300 hover:text-white'
            }`}
          >
            <Shield size={20} />
            Admins
            <span className="text-xs text-gray-400">({admins.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'clients'
                ? 'bg-purple-500/30 border border-purple-500/50 text-white'
                : 'glass text-gray-300 hover:text-white'
            }`}
          >
            <Users size={20} />
            Clients
            <span className="text-xs text-gray-400">({clients.length})</span>
          </button>
        </div>

        {isLoading ? (
          <div className="glass rounded-xl p-12 text-center">
            <p className="text-gray-300">Loading...</p>
          </div>
        ) : (
          <>
            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="glass rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Contact Messages</h2>

                    {messages.length === 0 ? (
                      <div className="text-center py-12">
                        <Mail size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-300">No messages yet</p>
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-[600px] overflow-y-auto">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            onClick={() => {
                              setSelectedMessage(msg);
                              if (!msg.is_read) {
                                handleMarkAsRead(msg.id);
                              }
                            }}
                            className={`p-4 rounded-lg cursor-pointer transition-all ${
                              selectedMessage?.id === msg.id
                                ? 'bg-purple-500/30 border border-purple-500/50'
                                : 'glass hover:border-cyan-400/50'
                            } ${!msg.is_read ? 'border-l-4 border-l-cyan-400' : ''}`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-white truncate">{msg.name}</h3>
                                <p className="text-sm text-gray-400 truncate">{msg.email}</p>
                                <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                                  {msg.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                  {new Date(msg.created_at).toLocaleString()}
                                </p>
                              </div>
                              {!msg.is_read && (
                                <div className="w-3 h-3 bg-cyan-400 rounded-full ml-2 flex-shrink-0 mt-1" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {selectedMessage ? (
                    <div className="glass rounded-xl p-6 sticky top-8">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white">Details</h3>
                        <button
                          onClick={() => handleDeleteMessage(selectedMessage.id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-400 uppercase">Name</p>
                          <p className="text-white font-semibold">{selectedMessage.name}</p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-400 uppercase">Email</p>
                          <a
                            href={`mailto:${selectedMessage.email}`}
                            className="text-cyan-400 hover:text-cyan-300 break-all"
                          >
                            {selectedMessage.email}
                          </a>
                        </div>

                        <div>
                          <p className="text-xs text-gray-400 uppercase">Service</p>
                          <p className="text-white capitalize">
                            {selectedMessage.service?.replace(/-/g, ' ') || 'N/A'}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-400 uppercase">Date</p>
                          <p className="text-white text-sm">
                            {new Date(selectedMessage.created_at).toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-400 uppercase">Message</p>
                          <p className="text-gray-300 text-sm mt-2 whitespace-pre-wrap">
                            {selectedMessage.message}
                          </p>
                        </div>

                        {!selectedMessage.is_read && (
                          <button
                            onClick={() => handleMarkAsRead(selectedMessage.id)}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-lg hover:bg-cyan-500/30 transition-colors"
                          >
                            <CheckCircle size={18} />
                            Mark as Read
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="glass rounded-xl p-6 text-center py-12">
                      <Mail size={48} className="mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-300">Select a message to view details</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Admins Tab */}
            {activeTab === 'admins' && (
              <div className="glass rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Admin Management</h2>
                  {currentUser?.is_super_admin && (
                    <GlowButton
                      onClick={() => setShowAddAdmin(true)}
                      className="flex items-center gap-2"
                    >
                      <UserPlus size={18} />
                      Add Admin
                    </GlowButton>
                  )}
                </div>

                {/* Add Admin Modal */}
                {showAddAdmin && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="glass rounded-xl p-6 w-full max-w-md">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">Add New Admin</h3>
                        <button
                          onClick={() => setShowAddAdmin(false)}
                          className="p-2 text-gray-400 hover:text-white"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <form onSubmit={handleAddAdmin} className="space-y-4">
                        {error && (
                          <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                            {error}
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={newAdminEmail}
                            onChange={(e) => setNewAdminEmail(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                            placeholder="admin@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Name (optional)
                          </label>
                          <input
                            type="text"
                            value={newAdminName}
                            onChange={(e) => setNewAdminName(e.target.value)}
                            className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Password *
                          </label>
                          <input
                            type="password"
                            value={newAdminPassword}
                            onChange={(e) => setNewAdminPassword(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                            placeholder="••••••••"
                          />
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setShowAddAdmin(false)}
                            className="flex-1 px-4 py-3 bg-gray-500/20 border border-gray-500/50 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors"
                          >
                            Cancel
                          </button>
                          <GlowButton
                            type="submit"
                            disabled={addingAdmin}
                            className="flex-1"
                          >
                            {addingAdmin ? 'Adding...' : 'Add Admin'}
                          </GlowButton>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {admins.map((admin) => (
                    <div
                      key={admin.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-purple-500/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center">
                          <Shield size={24} className={admin.is_super_admin ? 'text-yellow-400' : 'text-purple-300'} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white">
                              {admin.name || admin.email}
                            </h3>
                            {admin.is_super_admin && (
                              <span className="text-xs bg-yellow-500/30 text-yellow-300 px-2 py-0.5 rounded-full">
                                Super Admin
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{admin.email}</p>
                          <p className="text-xs text-gray-500">
                            Added {new Date(admin.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {currentUser?.is_super_admin && !admin.is_super_admin && (
                        <button
                          onClick={() => handleRemoveAdmin(admin)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          title="Remove admin"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clients Tab */}
            {activeTab === 'clients' && (
              <div className="glass rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Registered Clients</h2>

                {clients.length === 0 ? (
                  <div className="text-center py-12">
                    <Users size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-300">No clients have signed up yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-purple-500/30">
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Registered</th>
                          <th className="text-left py-3 px-4 text-gray-400 font-medium">Last Signin</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clients.map((client) => (
                          <tr
                            key={client.id}
                            className="border-b border-purple-500/10 hover:bg-white/5"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-cyan-500/30 flex items-center justify-center">
                                  <Users size={18} className="text-cyan-300" />
                                </div>
                                <span className="text-white">{client.name || 'N/A'}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-300">{client.email}</td>
                            <td className="py-3 px-4 text-gray-400 text-sm">
                              {new Date(client.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-gray-400 text-sm">
                              {new Date(client.last_signin_at).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
