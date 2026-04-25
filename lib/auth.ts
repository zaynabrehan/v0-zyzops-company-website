import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { SUPER_ADMIN_EMAIL, type AuthenticatedUser, type UserRole } from '@/lib/types';

const ADMIN_EMAIL_COOKIE = 'admin_email';

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const cookieStore = await cookies();
  const adminEmail = cookieStore.get(ADMIN_EMAIL_COOKIE)?.value;

  if (!adminEmail) {
    return null;
  }

  const email = adminEmail.toLowerCase();
  const supabase = await createClient();

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

  // Email is not authorized
  return null;
}

export function isSuperAdmin(email: string): boolean {
  return email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();
}
