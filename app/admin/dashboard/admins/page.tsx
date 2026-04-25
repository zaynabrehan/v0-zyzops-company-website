import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { AdminsManagement } from '@/components/admin/admins-management';

export default async function AdminsPage() {
  const user = await getAuthenticatedUser();

  if (!user || user.role !== 'super_admin') {
    redirect('/admin/dashboard');
  }

  const supabase = await createClient();

  const { data: admins } = await supabase
    .from('admins')
    .select('*')
    .order('created_at', { ascending: true });

  return <AdminsManagement admins={admins || []} superAdminEmail={user.email} />;
}
