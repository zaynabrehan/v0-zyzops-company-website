import { createClient } from '@/lib/supabase/server';
import { SUPER_ADMIN_EMAIL, type AuthenticatedUser, type UserRole } from '@/lib/types';

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user?.email) {
    return null;
  }

  const email = user.email.toLowerCase();
  
  // Check if super admin
  if (email === SUPER_ADMIN_EMAIL.toLowerCase()) {
    return {
      email,
      role: 'super_admin',
    };
  }

  // Check if regular admin in database
  const { data: adminRecord } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email)
    .eq('is_active', true)
    .single();

  if (adminRecord) {
    return {
      email,
      role: 'admin',
      adminRecord,
    };
  }

  // User is authenticated but not authorized as admin
  return {
    email,
    role: 'unauthorized',
  };
}

export function isSuperAdmin(email: string): boolean {
  return email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
}
