import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { PaymentsManagement } from '@/components/admin/payments-management';

export default async function PaymentsPage() {
  const user = await getAuthenticatedUser();

  if (!user || user.role !== 'super_admin') {
    redirect('/admin/dashboard');
  }

  const supabase = await createClient();

  const [{ data: payments }, { data: clients }, { data: projects }] = await Promise.all([
    supabase
      .from('payments')
      .select(`
        *,
        client:clients(id, name),
        project:projects(id, name)
      `)
      .order('date', { ascending: false }),
    supabase.from('clients').select('id, name').order('name'),
    supabase.from('projects').select('id, name').order('name'),
  ]);

  return (
    <PaymentsManagement
      payments={payments || []}
      clients={clients || []}
      projects={projects || []}
      superAdminEmail={user.email}
    />
  );
}
