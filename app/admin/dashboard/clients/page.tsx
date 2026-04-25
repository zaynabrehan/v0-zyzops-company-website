import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { ClientsManagement } from '@/components/admin/clients-management';

export default async function ClientsPage() {
  const user = await getAuthenticatedUser();

  if (!user || user.role !== 'super_admin') {
    redirect('/admin/dashboard');
  }

  const supabase = await createClient();

  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });

  return <ClientsManagement clients={clients || []} superAdminEmail={user.email} />;
}
