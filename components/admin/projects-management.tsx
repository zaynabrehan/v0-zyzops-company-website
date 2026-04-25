'use client';

import { useState } from 'react';
import { FolderKanban, Plus, Trash2, Edit, Clock, CheckCircle, Pause, Loader2, Search } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { GlowButton } from '@/components/glow-button';
import type { Project, Client, Admin } from '@/lib/types';
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

interface ProjectWithRelations extends Project {
  client?: { id: string; name: string; company: string | null };
  assigned_admin?: { id: string; name: string; email: string };
}

interface ProjectsManagementProps {
  projects: ProjectWithRelations[];
  clients: { id: string; name: string; company: string | null }[];
  admins: { id: string; name: string; email: string }[];
  superAdminEmail: string;
}

const statusConfig = {
  in_progress: { label: 'In Progress', icon: Clock, color: 'cyan' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'green' },
  on_hold: { label: 'On Hold', icon: Pause, color: 'yellow' },
};

export function ProjectsManagement({
  projects: initialProjects,
  clients,
  admins,
  superAdminEmail,
}: ProjectsManagementProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectWithRelations | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Form state
  const [name, setName] = useState('');
  const [clientId, setClientId] = useState('');
  const [assignedAdminId, setAssignedAdminId] = useState('');
  const [status, setStatus] = useState<Project['status']>('in_progress');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');

  const supabase = createClient();

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const projectData = {
      name: name.trim(),
      client_id: clientId || null,
      assigned_admin_id: assignedAdminId || null,
      status,
      budget: budget ? parseFloat(budget) : null,
      deadline: deadline || null,
      description: description.trim() || null,
      notes: notes.trim() || null,
    };

    try {
      if (editingProject) {
        const { data, error: updateError } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id)
          .select(`
            *,
            client:clients(id, name, company),
            assigned_admin:admins(id, name, email)
          `)
          .single();

        if (updateError) throw updateError;

        setProjects(projects.map((p) => (p.id === editingProject.id ? data : p)));

        await supabase.from('activity_log').insert({
          admin_email: superAdminEmail,
          action: `Updated project: ${name}`,
        });
      } else {
        const { data, error: insertError } = await supabase
          .from('projects')
          .insert(projectData)
          .select(`
            *,
            client:clients(id, name, company),
            assigned_admin:admins(id, name, email)
          `)
          .single();

        if (insertError) throw insertError;

        setProjects([data, ...projects]);

        await supabase.from('activity_log').insert({
          admin_email: superAdminEmail,
          action: `Created new project: ${name}`,
        });
      }

      closeModal();
    } catch {
      setError('Failed to save project. Please try again.');
    }

    setIsLoading(false);
  };

  const handleEdit = (project: ProjectWithRelations) => {
    setEditingProject(project);
    setName(project.name);
    setClientId(project.client_id || '');
    setAssignedAdminId(project.assigned_admin_id || '');
    setStatus(project.status);
    setBudget(project.budget?.toString() || '');
    setDeadline(project.deadline || '');
    setDescription(project.description || '');
    setNotes(project.notes || '');
    setShowModal(true);
  };

  const handleDelete = async (project: ProjectWithRelations) => {
    if (!confirm(`Are you sure you want to delete "${project.name}"?`)) return;

    const { error } = await supabase.from('projects').delete().eq('id', project.id);

    if (!error) {
      setProjects(projects.filter((p) => p.id !== project.id));

      await supabase.from('activity_log').insert({
        admin_email: superAdminEmail,
        action: `Deleted project: ${project.name}`,
      });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setName('');
    setClientId('');
    setAssignedAdminId('');
    setStatus('in_progress');
    setBudget('');
    setDeadline('');
    setDescription('');
    setNotes('');
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 mt-2">Manage all projects and assignments</p>
        </div>
        <GlowButton onClick={() => setShowModal(true)} className="flex items-center gap-2">
          <Plus size={18} />
          New Project
        </GlowButton>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-white/5 border-purple-500/30 text-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-card border-purple-500/30">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on_hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <FolderKanban size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            {searchQuery || statusFilter !== 'all' ? 'No Projects Found' : 'No Projects Yet'}
          </h3>
          <p className="text-gray-400 mb-4">
            {searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your filters.'
              : 'Create your first project to get started.'}
          </p>
          {!searchQuery && statusFilter === 'all' && (
            <GlowButton onClick={() => setShowModal(true)} className="inline-flex items-center gap-2">
              <Plus size={18} />
              New Project
            </GlowButton>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const statusInfo = statusConfig[project.status];
            return (
              <div key={project.id} className="glass rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">{project.name}</h3>
                    <p className="text-sm text-gray-400 truncate">
                      {project.client?.name || 'No client'}
                    </p>
                  </div>
                  <span
                    className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-${statusInfo.color}-500/20 text-${statusInfo.color}-400`}
                  >
                    <statusInfo.icon size={12} />
                    {statusInfo.label}
                  </span>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  {project.assigned_admin && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Assigned to</span>
                      <span className="text-white">{project.assigned_admin.name}</span>
                    </div>
                  )}
                  {project.budget && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Budget</span>
                      <span className="text-white">${Number(project.budget).toLocaleString()}</span>
                    </div>
                  )}
                  {project.deadline && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Deadline</span>
                      <span className="text-white">{new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-purple-500/20">
                  <button
                    onClick={() => handleEdit(project)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={showModal} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="glass border-purple-500/30 max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingProject ? 'Update project details.' : 'Fill in the project information.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white mb-2">Project Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="Project name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Client</label>
                <Select value={clientId} onValueChange={setClientId}>
                  <SelectTrigger className="w-full bg-white/5 border-purple-500/30 text-white">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-purple-500/30">
                    <SelectItem value="">No client</SelectItem>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Assign To</label>
                <Select value={assignedAdminId} onValueChange={setAssignedAdminId}>
                  <SelectTrigger className="w-full bg-white/5 border-purple-500/30 text-white">
                    <SelectValue placeholder="Select admin" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-purple-500/30">
                    <SelectItem value="">Unassigned</SelectItem>
                    {admins.map((admin) => (
                      <SelectItem key={admin.id} value={admin.id}>
                        {admin.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Status</label>
                <Select value={status} onValueChange={(v) => setStatus(v as Project['status'])}>
                  <SelectTrigger className="w-full bg-white/5 border-purple-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-purple-500/30">
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="on_hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Budget ($)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  min="0"
                  step="0.01"
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                placeholder="Project description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                placeholder="Internal notes..."
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
                ) : editingProject ? (
                  'Update Project'
                ) : (
                  'Create Project'
                )}
              </GlowButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
