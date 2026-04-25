import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { ActivityLogView } from '@/components/admin/activity-log-view';

export default async function ActivityPage() {
  const user = await getAuthenticatedUser();

  if (!user || user.role !== 'super_admin') {
    redirect('/admin/dashboard');
  }

  const supabase = await createClient();

  const { data: activities } = await supabase
    .from('activity_log')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);

  return <ActivityLogView activities={activities || []} />;
}
