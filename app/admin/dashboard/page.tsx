import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { SuperAdminOverview } from '@/components/admin/super-admin-overview';
import { AdminProjectsView } from '@/components/admin/admin-projects-view';

export default async function DashboardPage() {
  const user = await getAuthenticatedUser();

  if (!user || user.role === 'unauthorized') {
    redirect('/admin/login');
  }

  const supabase = await createClient();

  if (user.role === 'super_admin') {
    // Fetch overview stats for super admin
    const [
      { count: adminCount },
      { count: clientCount },
      { count: projectCount },
      { data: pendingPayments },
      { data: recentActivity },
    ] = await Promise.all([
      supabase.from('admins').select('*', { count: 'exact', head: true }),
      supabase.from('clients').select('*', { count: 'exact', head: true }),
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase
        .from('payments')
        .select('amount')
        .eq('status', 'pending'),
      supabase
        .from('activity_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5),
    ]);

    const pendingAmount = pendingPayments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;

    return (
      <SuperAdminOverview
        stats={{
          adminCount: adminCount || 0,
          clientCount: clientCount || 0,
          projectCount: projectCount || 0,
          pendingPayments: pendingAmount,
        }}
        recentActivity={recentActivity || []}
      />
    );
  }

  // Regular admin - show their assigned projects
  const { data: projects } = await supabase
    .from('projects')
    .select(`
      *,
      client:clients(id, name, company),
      project_updates(id, content, created_at)
    `)
    .eq('assigned_admin_id', user.adminRecord?.id)
    .order('created_at', { ascending: false });

  return (
    <AdminProjectsView 
      projects={projects || []} 
      adminId={user.adminRecord?.id || ''}
      adminName={user.adminRecord?.name || user.email}
    />
  );
}
