'use client';

import { useState } from 'react';
import { Shield, Plus, Trash2, ToggleLeft, ToggleRight, X, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { GlowButton } from '@/components/glow-button';
import type { Admin } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface AdminsManagementProps {
  admins: Admin[];
  superAdminEmail: string;
}

export function AdminsManagement({ admins: initialAdmins, superAdminEmail }: AdminsManagementProps) {
  const [admins, setAdmins] = useState(initialAdmins);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [roleTitle, setRoleTitle] = useState('Team Member');
  
  const supabase = createClient();

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Check if email already exists
    if (admins.some((a) => a.email.toLowerCase() === email.toLowerCase())) {
      setError('This email is already an admin.');
      setIsLoading(false);
      return;
    }

    try {
      // Create Supabase Auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: email.toLowerCase(),
        password,
        email_confirm: true,
      });

      // If admin API fails (not available client-side), try signUp
      if (authError) {
        // Use regular signUp - user will need to confirm email
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.toLowerCase(),
          password,
          options: {
            emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
              `${window.location.origin}/auth/callback`,
          },
        });

        if (signUpError) {
          setError(signUpError.message);
          setIsLoading(false);
          return;
        }
      }

      // Add to admins table
      const { data: newAdmin, error: dbError } = await supabase
        .from('admins')
        .insert({
          email: email.toLowerCase(),
          name: name.trim() || email.split('@')[0],
          role_title: roleTitle,
          is_active: true,
        })
        .select()
        .single();

      if (dbError) {
        setError('Failed to add admin to database.');
        setIsLoading(false);
        return;
      }

      // Log activity
      await supabase.from('activity_log').insert({
        admin_email: superAdminEmail,
        action: `Added new admin: ${email}`,
        details: `Role: ${roleTitle}`,
      });

      setAdmins([...admins, newAdmin]);
      setShowAddModal(false);
      resetForm();
    } catch {
      setError('An error occurred. Please try again.');
    }

    setIsLoading(false);
  };

  const handleToggleActive = async (admin: Admin) => {
    const { error } = await supabase
      .from('admins')
      .update({ is_active: !admin.is_active })
      .eq('id', admin.id);

    if (!error) {
      setAdmins(admins.map((a) =>
        a.id === admin.id ? { ...a, is_active: !a.is_active } : a
      ));

      await supabase.from('activity_log').insert({
        admin_email: superAdminEmail,
        action: `${admin.is_active ? 'Deactivated' : 'Activated'} admin: ${admin.email}`,
      });
    }
  };

  const handleDeleteAdmin = async (admin: Admin) => {
    if (!confirm(`Are you sure you want to permanently delete ${admin.name}? This cannot be undone.`)) {
      return;
    }

    const { error } = await supabase
      .from('admins')
      .delete()
      .eq('id', admin.id);

    if (!error) {
      setAdmins(admins.filter((a) => a.id !== admin.id));

      await supabase.from('activity_log').insert({
        admin_email: superAdminEmail,
        action: `Deleted admin: ${admin.email}`,
      });
    }
  };

  const resetForm = () => {
    setEmail('');
    setName('');
    setPassword('');
    setRoleTitle('Team Member');
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Management</h1>
          <p className="text-gray-400 mt-2">Add and manage team members</p>
        </div>
        <GlowButton onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
          <Plus size={18} />
          Add Admin
        </GlowButton>
      </div>

      {/* Admins Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {admins.map((admin) => (
          <div key={admin.id} className="glass rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{admin.name}</h3>
                  <p className="text-sm text-gray-400">{admin.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-400">{admin.role_title}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  admin.is_active
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {admin.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2 pt-4 border-t border-purple-500/20">
              <button
                onClick={() => handleToggleActive(admin)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  admin.is_active
                    ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20'
                    : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                }`}
              >
                {admin.is_active ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                {admin.is_active ? 'Deactivate' : 'Activate'}
              </button>
              <button
                onClick={() => handleDeleteAdmin(admin)}
                className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}

        {admins.length === 0 && (
          <div className="col-span-full glass rounded-xl p-12 text-center">
            <Shield size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Team Members</h3>
            <p className="text-gray-400 mb-4">Add your first team member to get started.</p>
            <GlowButton onClick={() => setShowAddModal(true)} className="inline-flex items-center gap-2">
              <Plus size={18} />
              Add Admin
            </GlowButton>
          </div>
        )}
      </div>

      {/* Add Admin Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="glass border-purple-500/30">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Admin</DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a new team member account. They will receive an email to confirm their account.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddAdmin} className="space-y-4 mt-4">
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white mb-2">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="Min 6 characters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Role Title</label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="e.g., Project Manager"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="flex-1 px-4 py-3 bg-gray-500/20 border border-gray-500/50 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors"
              >
                Cancel
              </button>
              <GlowButton type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding...
                  </span>
                ) : (
                  'Add Admin'
                )}
              </GlowButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
