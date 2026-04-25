// Techvix Admin Dashboard Types

// Super Admin is hardcoded - this email has full access
export const SUPER_ADMIN_EMAIL = 'zaynabrehan@gmail.com';

export interface Admin {
  id: string;
  email: string;
  name: string;
  role_title: string;
  is_active: boolean;
  created_at: string;
}

export interface Client {
  id: string;
  name: string;
  company: string | null;
  contact: string | null;
  email: string | null;
  service: string | null;
  notes: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  client_id: string | null;
  assigned_admin_id: string | null;
  status: 'in_progress' | 'completed' | 'on_hold';
  budget: number | null;
  deadline: string | null;
  description: string | null;
  notes: string | null;
  created_at: string;
  // Joined data
  client?: Client;
  assigned_admin?: Admin;
}

export interface Payment {
  id: string;
  client_id: string;
  project_id: string | null;
  amount: number;
  status: 'pending' | 'completed' | 'overdue';
  date: string;
  description: string | null;
  created_at: string;
  // Joined data
  client?: Client;
  project?: Project;
}

export interface ActivityLog {
  id: string;
  admin_email: string;
  admin_name: string | null;
  action: string;
  details: string | null;
  created_at: string;
}

export interface ProjectUpdate {
  id: string;
  project_id: string;
  admin_id: string | null;
  content: string;
  created_at: string;
  admin?: Admin;
}

export type UserRole = 'super_admin' | 'admin' | 'unauthorized';

export interface AuthenticatedUser {
  email: string;
  role: UserRole;
  adminRecord?: Admin;
}
