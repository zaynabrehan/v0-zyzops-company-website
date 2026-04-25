'use client';

import { useState } from 'react';
import { CreditCard, Plus, Trash2, Edit, Clock, CheckCircle, AlertTriangle, Loader2, Search } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { GlowButton } from '@/components/glow-button';
import type { Payment } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PaymentWithRelations extends Payment {
  client?: { id: string; name: string };
  project?: { id: string; name: string };
}

interface PaymentsManagementProps {
  payments: PaymentWithRelations[];
  clients: { id: string; name: string }[];
  projects: { id: string; name: string }[];
  superAdminEmail: string;
}

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'yellow' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'green' },
  overdue: { label: 'Overdue', icon: AlertTriangle, color: 'red' },
};

export function PaymentsManagement({
  payments: initialPayments,
  clients,
  projects,
  superAdminEmail,
}: PaymentsManagementProps) {
  const [payments, setPayments] = useState(initialPayments);
  const [showModal, setShowModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState<PaymentWithRelations | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Form state
  const [clientId, setClientId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<Payment['status']>('pending');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');

  const supabase = createClient();

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.client?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.project?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totals = {
    pending: payments.filter((p) => p.status === 'pending').reduce((sum, p) => sum + Number(p.amount), 0),
    completed: payments.filter((p) => p.status === 'completed').reduce((sum, p) => sum + Number(p.amount), 0),
    overdue: payments.filter((p) => p.status === 'overdue').reduce((sum, p) => sum + Number(p.amount), 0),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!clientId) {
      setError('Please select a client.');
      setIsLoading(false);
      return;
    }

    const paymentData = {
      client_id: clientId,
      project_id: projectId || null,
      amount: parseFloat(amount),
      status,
      date,
      description: description.trim() || null,
    };

    try {
      if (editingPayment) {
        const { data, error: updateError } = await supabase
          .from('payments')
          .update(paymentData)
          .eq('id', editingPayment.id)
          .select(`
            *,
            client:clients(id, name),
            project:projects(id, name)
          `)
          .single();

        if (updateError) throw updateError;

        setPayments(payments.map((p) => (p.id === editingPayment.id ? data : p)));

        await supabase.from('activity_log').insert({
          admin_email: superAdminEmail,
          action: `Updated payment of $${amount}`,
        });
      } else {
        const { data, error: insertError } = await supabase
          .from('payments')
          .insert(paymentData)
          .select(`
            *,
            client:clients(id, name),
            project:projects(id, name)
          `)
          .single();

        if (insertError) throw insertError;

        setPayments([data, ...payments]);

        await supabase.from('activity_log').insert({
          admin_email: superAdminEmail,
          action: `Recorded new payment of $${amount}`,
        });
      }

      closeModal();
    } catch {
      setError('Failed to save payment. Please try again.');
    }

    setIsLoading(false);
  };

  const handleEdit = (payment: PaymentWithRelations) => {
    setEditingPayment(payment);
    setClientId(payment.client_id);
    setProjectId(payment.project_id || '');
    setAmount(payment.amount.toString());
    setStatus(payment.status);
    setDate(payment.date);
    setDescription(payment.description || '');
    setShowModal(true);
  };

  const handleDelete = async (payment: PaymentWithRelations) => {
    if (!confirm('Are you sure you want to delete this payment record?')) return;

    const { error } = await supabase.from('payments').delete().eq('id', payment.id);

    if (!error) {
      setPayments(payments.filter((p) => p.id !== payment.id));

      await supabase.from('activity_log').insert({
        admin_email: superAdminEmail,
        action: `Deleted payment of $${payment.amount}`,
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPayment(null);
    setClientId('');
    setProjectId('');
    setAmount('');
    setStatus('pending');
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Payments</h1>
          <p className="text-gray-400 mt-2">Track and manage payments</p>
        </div>
        <GlowButton onClick={() => setShowModal(true)} className="flex items-center gap-2">
          <Plus size={18} />
          Record Payment
        </GlowButton>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.entries(statusConfig).map(([key, config]) => (
          <div key={key} className="glass rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{config.label}</p>
                <p className="text-2xl font-bold text-white">
                  ${totals[key as keyof typeof totals].toLocaleString()}
                </p>
              </div>
              <div className={`p-3 rounded-lg bg-${config.color}-500/20`}>
                <config.icon className={`h-6 w-6 text-${config.color}-400`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search payments..."
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-white/5 border-purple-500/30 text-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-card border-purple-500/30">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Payments Table */}
      {filteredPayments.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <CreditCard size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            {searchQuery || statusFilter !== 'all' ? 'No Payments Found' : 'No Payments Yet'}
          </h3>
          <p className="text-gray-400 mb-4">
            {searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your filters.'
              : 'Record your first payment to get started.'}
          </p>
          {!searchQuery && statusFilter === 'all' && (
            <GlowButton onClick={() => setShowModal(true)} className="inline-flex items-center gap-2">
              <Plus size={18} />
              Record Payment
            </GlowButton>
          )}
        </div>
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-purple-500/20 hover:bg-transparent">
                <TableHead className="text-gray-400">Date</TableHead>
                <TableHead className="text-gray-400">Client</TableHead>
                <TableHead className="text-gray-400">Project</TableHead>
                <TableHead className="text-gray-400">Amount</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => {
                const statusInfo = statusConfig[payment.status];
                return (
                  <TableRow key={payment.id} className="border-purple-500/20 hover:bg-white/5">
                    <TableCell className="text-gray-300">
                      {new Date(payment.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium text-white">
                      {payment.client?.name || '-'}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {payment.project?.name || '-'}
                    </TableCell>
                    <TableCell className="font-medium text-white">
                      ${Number(payment.amount).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-${statusInfo.color}-500/20 text-${statusInfo.color}-400`}
                      >
                        <statusInfo.icon size={12} />
                        {statusInfo.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(payment)}
                          className="p-2 text-cyan-400 hover:bg-cyan-500/20 rounded-lg transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(payment)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="glass border-purple-500/30 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingPayment ? 'Edit Payment' : 'Record Payment'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingPayment ? 'Update payment details.' : 'Record a new payment.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Client *</label>
                <Select value={clientId} onValueChange={setClientId}>
                  <SelectTrigger className="w-full bg-white/5 border-purple-500/30 text-white">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-purple-500/30">
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Project</label>
                <Select value={projectId} onValueChange={setProjectId}>
                  <SelectTrigger className="w-full bg-white/5 border-purple-500/30 text-white">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-purple-500/30">
                    <SelectItem value="">No project</SelectItem>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Amount ($) *</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Status</label>
                <Select value={status} onValueChange={(v) => setStatus(v as Payment['status'])}>
                  <SelectTrigger className="w-full bg-white/5 border-purple-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-purple-500/30">
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                placeholder="Payment description..."
              />
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
                ) : editingPayment ? (
                  'Update Payment'
                ) : (
                  'Record Payment'
                )}
              </GlowButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
