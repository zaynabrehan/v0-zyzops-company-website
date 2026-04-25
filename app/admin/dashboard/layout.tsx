import { redirect } from 'next/navigation';
import { getAuthenticatedUser } from '@/lib/auth';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect('/admin/login');
  }

  if (user.role === 'unauthorized') {
    redirect('/admin/login?error=unauthorized');
  }

  const userName = user.adminRecord?.name || user.email.split('@')[0];
  const isSuperAdmin = user.role === 'super_admin';

  return (
    <div className="min-h-screen">
      <AdminSidebar
        isSuperAdmin={isSuperAdmin}
        userName={userName}
        userEmail={user.email}
      />
      
      {/* Main Content */}
      <main className="lg:pl-64 pt-14 lg:pt-0">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
