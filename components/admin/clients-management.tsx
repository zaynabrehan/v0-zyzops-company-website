'use client';

import { useState } from 'react';
import { Users, Plus, Trash2, Edit, X, Loader2, Search } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { GlowButton } from '@/components/glow-button';
import type { Client } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ClientsManagementProps {
  clients: Client[];
  superAdminEmail: string;
}

export function ClientsManagement({ clients: initialClients, superAdminEmail }: ClientsManagementProps) {
  const [clients, setClients] = useState(initialClients);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Form state
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [notes, setNotes] = useState('');
  
  const supabase = createClient();

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const clientData = {
      name: name.trim(),
      company: company.trim() || null,
      contact: contact.trim() || null,
      email: email.trim() || null,
      service: service.trim() || null,
      notes: notes.trim() || null,
    };

    try {
      if (editingClient) {
        // Update existing client
        const { data, error: updateError } = await supabase
          .from('clients')
          .update(clientData)
          .eq('id', editingClient.id)
          .select()
          .single();

        if (updateError) throw updateError;

        setClients(clients.map((c) => (c.id === editingClient.id ? data : c)));

        await supabase.from('activity_log').insert({
          admin_email: superAdminEmail,
          action: `Updated client: ${name}`,
        });
      } else {
        // Create new client
        const { data, error: insertError } = await supabase
          .from('clients')
          .insert(clientData)
          .select()
          .single();

        if (insertError) throw insertError;

        setClients([data, ...clients]);

        await supabase.from('activity_log').insert({
          admin_email: superAdminEmail,
          action: `Added new client: ${name}`,
        });
      }

      closeModal();
    } catch {
      setError('Failed to save client. Please try again.');
    }

    setIsLoading(false);
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setName(client.name);
    setCompany(client.company || '');
    setContact(client.contact || '');
    setEmail(client.email || '');
    setService(client.service || '');
    setNotes(client.notes || '');
    setShowModal(true);
  };

  const handleDelete = async (client: Client) => {
    if (!confirm(`Are you sure you want to delete ${client.name}?`)) return;

    const { error } = await supabase.from('clients').delete().eq('id', client.id);

    if (!error) {
      setClients(clients.filter((c) => c.id !== client.id));

      await supabase.from('activity_log').insert({
        admin_email: superAdminEmail,
        action: `Deleted client: ${client.name}`,
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingClient(null);
    setName('');
    setCompany('');
    setContact('');
    setEmail('');
    setService('');
    setNotes('');
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Clients</h1>
          <p className="text-gray-400 mt-2">Manage your client information</p>
        </div>
        <GlowButton onClick={() => setShowModal(true)} className="flex items-center gap-2">
          <Plus size={18} />
          Add Client
        </GlowButton>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search clients..."
          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
        />
      </div>

      {/* Clients Table */}
      {filteredClients.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            {searchQuery ? 'No Clients Found' : 'No Clients Yet'}
          </h3>
          <p className="text-gray-400 mb-4">
            {searchQuery ? 'Try a different search term.' : 'Add your first client to get started.'}
          </p>
          {!searchQuery && (
            <GlowButton onClick={() => setShowModal(true)} className="inline-flex items-center gap-2">
              <Plus size={18} />
              Add Client
            </GlowButton>
          )}
        </div>
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-purple-500/20 hover:bg-transparent">
                <TableHead className="text-gray-400">Name</TableHead>
                <TableHead className="text-gray-400">Company</TableHead>
                <TableHead className="text-gray-400">Contact</TableHead>
                <TableHead className="text-gray-400">Email</TableHead>
                <TableHead className="text-gray-400">Service</TableHead>
                <TableHead className="text-gray-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id} className="border-purple-500/20 hover:bg-white/5">
                  <TableCell className="font-medium text-white">{client.name}</TableCell>
                  <TableCell className="text-gray-300">{client.company || '-'}</TableCell>
                  <TableCell className="text-gray-300">{client.contact || '-'}</TableCell>
                  <TableCell className="text-gray-300">{client.email || '-'}</TableCell>
                  <TableCell className="text-gray-300">{client.service || '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(client)}
                        className="p-2 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(client)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="glass border-purple-500/30 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingClient ? 'Edit Client' : 'Add New Client'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingClient ? 'Update client information.' : 'Add a new client to your database.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-white mb-2">Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Client name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Contact</label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="client@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Service</label>
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Service type"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-white mb-2">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  placeholder="Additional notes..."
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 px-4 py-3 bg-gray-500/20 border border-gray-500/50 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors"
              >
                Cancel
              </button>
              <GlowButton type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </span>
                ) : editingClient ? (
                  'Update Client'
                ) : (
                  'Add Client'
                )}
              </GlowButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
