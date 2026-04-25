import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { ProjectsManagement } from '@/components/admin/projects-management';

export default async function ProjectsPage() {
  const user = await getAuthenticatedUser();

  if (!user || user.role !== 'super_admin') {
    redirect('/admin/dashboard');
  }

  const supabase = await createClient();

  const [{ data: projects }, { data: clients }, { data: admins }] = await Promise.all([
    supabase
      .from('projects')
      .select(`
        *,
        client:clients(id, name, company),
        assigned_admin:admins(id, name, email)
      `)
      .order('created_at', { ascending: false }),
    supabase.from('clients').select('id, name, company').order('name'),
    supabase.from('admins').select('id, name, email').eq('is_active', true).order('name'),
  ]);

  return (
    <ProjectsManagement
      projects={projects || []}
      clients={clients || []}
      admins={admins || []}
      superAdminEmail={user.email}
    />
  );
}
