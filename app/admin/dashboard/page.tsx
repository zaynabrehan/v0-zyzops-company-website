'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Trash2, CheckCircle, Mail } from 'lucide-react';
import { GlowButton } from '@/components/glow-button';
import { GradientText } from '@/components/gradient-text';

interface Message {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Fetch messages
    fetchMessages();
  }, [router]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/admin/login');
        }
        return;
      }

      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setMessages(messages.filter((msg) => msg.id !== id));
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/admin/messages/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const updatedMessages = messages.map((msg) =>
          msg.id === id ? { ...msg, isRead: true } : msg
        );
        setMessages(updatedMessages);
        if (selectedMessage?.id === id) {
          setSelectedMessage({ ...selectedMessage, isRead: true });
        }
      }
    } catch (error) {
      console.error('Failed to update message:', error);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              <span className="gradient-text">Techvix.org</span> Admin
            </h1>
            <p className="text-gray-300 mt-2">Manage contact messages</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Messages Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="lg:col-span-2">
            <div className="glass rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Messages</h2>

              {isLoading ? (
                <div className="text-center py-12">
                  <p className="text-gray-300">Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12">
                  <Mail size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-300">No messages yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => {
                        setSelectedMessage(msg);
                        if (!msg.isRead) {
                          handleMarkAsRead(msg.id);
                        }
                      }}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedMessage?.id === msg.id
                          ? 'bg-purple-500/30 border border-purple-500/50'
                          : 'glass hover:border-cyan-400/50'
                      } ${!msg.isRead ? 'border-l-4 border-l-cyan-400' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{msg.name}</h3>
                          <p className="text-sm text-gray-400">{msg.email}</p>
                          <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                            {msg.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(msg.timestamp).toLocaleString()}
                          </p>
                        </div>
                        {!msg.isRead && (
                          <div className="w-3 h-3 bg-cyan-400 rounded-full ml-2 flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Message Details */}
          <div>
            {selectedMessage ? (
              <div className="glass rounded-xl p-6 sticky top-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">Details</h3>
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase">Name</p>
                    <p className="text-white font-semibold">
                      {selectedMessage.name}
                    </p>
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
                      {selectedMessage.service.replace(/-/g, ' ')}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 uppercase">Date</p>
                    <p className="text-white text-sm">
                      {new Date(selectedMessage.timestamp).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 uppercase">Message</p>
                    <p className="text-gray-300 text-sm mt-2 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>

                  {!selectedMessage.isRead && (
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
      </div>
    </div>
  );
}
