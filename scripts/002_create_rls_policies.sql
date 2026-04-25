-- RLS Policies for Techvix Admin Dashboard
-- Super Admin email: zaynabrehan@gmail.com has full access
-- Regular admins can only see their assigned data

-- Helper function to check if current user is super admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (SELECT auth.jwt() ->> 'email') = 'zaynabrehan@gmail.com';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is an active admin
CREATE OR REPLACE FUNCTION is_active_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins 
    WHERE email = (SELECT auth.jwt() ->> 'email') 
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get current admin's ID
CREATE OR REPLACE FUNCTION get_current_admin_id()
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT id FROM admins 
    WHERE email = (SELECT auth.jwt() ->> 'email')
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- ADMINS TABLE POLICIES
-- ============================================
DROP POLICY IF EXISTS "Super admin can do everything with admins" ON admins;
CREATE POLICY "Super admin can do everything with admins" ON admins
  FOR ALL USING (is_super_admin());

DROP POLICY IF EXISTS "Regular admins can view all admins" ON admins;
CREATE POLICY "Regular admins can view all admins" ON admins
  FOR SELECT USING (is_active_admin() OR is_super_admin());

-- ============================================
-- CLIENTS TABLE POLICIES
-- ============================================
DROP POLICY IF EXISTS "Super admin full access to clients" ON clients;
CREATE POLICY "Super admin full access to clients" ON clients
  FOR ALL USING (is_super_admin());

DROP POLICY IF EXISTS "Regular admins can view clients for their projects" ON clients;
CREATE POLICY "Regular admins can view clients for their projects" ON clients
  FOR SELECT USING (
    is_active_admin() AND (
      id IN (
        SELECT client_id FROM projects 
        WHERE assigned_admin_id = get_current_admin_id()
      )
    )
  );

DROP POLICY IF EXISTS "Regular admins can update client notes" ON clients;
CREATE POLICY "Regular admins can update client notes" ON clients
  FOR UPDATE USING (
    is_active_admin() AND (
      id IN (
        SELECT client_id FROM projects 
        WHERE assigned_admin_id = get_current_admin_id()
      )
    )
  );

-- ============================================
-- PROJECTS TABLE POLICIES
-- ============================================
DROP POLICY IF EXISTS "Super admin full access to projects" ON projects;
CREATE POLICY "Super admin full access to projects" ON projects
  FOR ALL USING (is_super_admin());

DROP POLICY IF EXISTS "Regular admins can view their assigned projects" ON projects;
CREATE POLICY "Regular admins can view their assigned projects" ON projects
  FOR SELECT USING (
    is_active_admin() AND assigned_admin_id = get_current_admin_id()
  );

DROP POLICY IF EXISTS "Regular admins can update their assigned projects" ON projects;
CREATE POLICY "Regular admins can update their assigned projects" ON projects
  FOR UPDATE USING (
    is_active_admin() AND assigned_admin_id = get_current_admin_id()
  );

-- ============================================
-- PAYMENTS TABLE POLICIES (Super Admin Only)
-- ============================================
DROP POLICY IF EXISTS "Super admin full access to payments" ON payments;
CREATE POLICY "Super admin full access to payments" ON payments
  FOR ALL USING (is_super_admin());

-- ============================================
-- ACTIVITY LOG POLICIES
-- ============================================
DROP POLICY IF EXISTS "Super admin full access to activity log" ON activity_log;
CREATE POLICY "Super admin full access to activity log" ON activity_log
  FOR ALL USING (is_super_admin());

DROP POLICY IF EXISTS "Admins can insert activity logs" ON activity_log;
CREATE POLICY "Admins can insert activity logs" ON activity_log
  FOR INSERT WITH CHECK (is_active_admin() OR is_super_admin());

DROP POLICY IF EXISTS "Regular admins can view their own activity" ON activity_log;
CREATE POLICY "Regular admins can view their own activity" ON activity_log
  FOR SELECT USING (
    is_active_admin() AND admin_email = (SELECT auth.jwt() ->> 'email')
  );

-- ============================================
-- PROJECT UPDATES POLICIES
-- ============================================
DROP POLICY IF EXISTS "Super admin full access to project updates" ON project_updates;
CREATE POLICY "Super admin full access to project updates" ON project_updates
  FOR ALL USING (is_super_admin());

DROP POLICY IF EXISTS "Regular admins can view updates for their projects" ON project_updates;
CREATE POLICY "Regular admins can view updates for their projects" ON project_updates
  FOR SELECT USING (
    is_active_admin() AND (
      project_id IN (
        SELECT id FROM projects 
        WHERE assigned_admin_id = get_current_admin_id()
      )
    )
  );

DROP POLICY IF EXISTS "Regular admins can insert updates for their projects" ON project_updates;
CREATE POLICY "Regular admins can insert updates for their projects" ON project_updates
  FOR INSERT WITH CHECK (
    is_active_admin() AND (
      project_id IN (
        SELECT id FROM projects 
        WHERE assigned_admin_id = get_current_admin_id()
      )
    )
  );
