'use client';

import { useState } from 'react';
import { FolderKanban, Clock, CheckCircle, Pause, Plus, Send } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { GlowButton } from '@/components/glow-button';
import type { Project, ProjectUpdate } from '@/lib/types';

interface ProjectWithUpdates extends Project {
  client?: { id: string; name: string; company: string | null };
  project_updates?: ProjectUpdate[];
}

interface AdminProjectsViewProps {
  projects: ProjectWithUpdates[];
  adminId: string;
  adminName: string;
}

const statusConfig = {
  in_progress: { label: 'In Progress', icon: Clock, color: 'cyan' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'green' },
  on_hold: { label: 'On Hold', icon: Pause, color: 'yellow' },
};

export function AdminProjectsView({ projects, adminId, adminName }: AdminProjectsViewProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectWithUpdates | null>(null);
  const [newUpdate, setNewUpdate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localProjects, setLocalProjects] = useState(projects);
  const supabase = createClient();

  const handleAddUpdate = async () => {
    if (!selectedProject || !newUpdate.trim()) return;

    setIsSubmitting(true);

    const { data: update, error } = await supabase
      .from('project_updates')
      .insert({
        project_id: selectedProject.id,
        admin_id: adminId,
        content: newUpdate.trim(),
      })
      .select()
      .single();

    if (!error && update) {
      // Log activity
      await supabase.from('activity_log').insert({
        admin_email: adminName,
        admin_name: adminName,
        action: `Added update to project "${selectedProject.name}"`,
        details: newUpdate.trim().substring(0, 100),
      });

      // Update local state
      setLocalProjects((prev) =>
        prev.map((p) =>
          p.id === selectedProject.id
            ? {
                ...p,
                project_updates: [update, ...(p.project_updates || [])],
              }
            : p
        )
      );
      setSelectedProject((prev) =>
        prev
          ? {
              ...prev,
              project_updates: [update, ...(prev.project_updates || [])],
            }
          : null
      );
      setNewUpdate('');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">My Projects</h1>
        <p className="text-gray-400 mt-2">Manage and update your assigned projects</p>
      </div>

      {localProjects.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <FolderKanban size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Projects Assigned</h3>
          <p className="text-gray-400">You don&apos;t have any projects assigned to you yet.</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Projects List */}
          <div className="lg:col-span-1 space-y-3">
            {localProjects.map((project) => {
              const status = statusConfig[project.status];
              const isSelected = selectedProject?.id === project.id;

              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    isSelected
                      ? 'bg-purple-500/30 border border-purple-500/50'
                      : 'glass hover:border-cyan-400/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{project.name}</h3>
                      <p className="text-sm text-gray-400 truncate">
                        {project.client?.name || 'No client'}
                      </p>
                    </div>
                    <span
                      className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-${status.color}-500/20 text-${status.color}-400`}
                    >
                      <status.icon size={12} />
                      {status.label}
                    </span>
                  </div>
                  {project.deadline && (
                    <p className="text-xs text-gray-500 mt-2">
                      Due: {new Date(project.deadline).toLocaleDateString()}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {/* Project Details */}
          <div className="lg:col-span-2">
            {selectedProject ? (
              <div className="glass rounded-xl p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedProject.name}</h2>
                    <p className="text-gray-400">
                      {selectedProject.client?.name}
                      {selectedProject.client?.company && ` - ${selectedProject.client.company}`}
                    </p>
                  </div>
                  <span
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full bg-${
                      statusConfig[selectedProject.status].color
                    }-500/20 text-${statusConfig[selectedProject.status].color}-400`}
                  >
                    {statusConfig[selectedProject.status].label}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {selectedProject.budget && (
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-xs text-gray-400 uppercase">Budget</p>
                      <p className="text-lg font-semibold text-white">
                        ${Number(selectedProject.budget).toLocaleString()}
                      </p>
                    </div>
                  )}
                  {selectedProject.deadline && (
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="text-xs text-gray-400 uppercase">Deadline</p>
                      <p className="text-lg font-semibold text-white">
                        {new Date(selectedProject.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                {selectedProject.description && (
                  <div className="mb-6">
                    <p className="text-xs text-gray-400 uppercase mb-2">Description</p>
                    <p className="text-gray-300">{selectedProject.description}</p>
                  </div>
                )}

                {/* Add Update */}
                <div className="border-t border-purple-500/20 pt-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Plus size={18} />
                    Add Progress Update
                  </h3>
                  <div className="flex gap-3">
                    <textarea
                      value={newUpdate}
                      onChange={(e) => setNewUpdate(e.target.value)}
                      placeholder="Describe your progress..."
                      rows={3}
                      className="flex-1 bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>
                  <div className="flex justify-end mt-3">
                    <GlowButton
                      onClick={handleAddUpdate}
                      disabled={!newUpdate.trim() || isSubmitting}
                      className="flex items-center gap-2"
                    >
                      <Send size={16} />
                      {isSubmitting ? 'Submitting...' : 'Submit Update'}
                    </GlowButton>
                  </div>
                </div>

                {/* Updates History */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Updates History</h3>
                  {selectedProject.project_updates?.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">No updates yet</p>
                  ) : (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {selectedProject.project_updates?.map((update) => (
                        <div key={update.id} className="bg-white/5 rounded-lg p-4">
                          <p className="text-gray-300">{update.content}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(update.created_at).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="glass rounded-xl p-12 text-center">
                <FolderKanban size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-300">Select a project to view details and add updates</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
