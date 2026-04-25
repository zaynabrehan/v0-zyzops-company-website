-- Create admins table to track admin users
-- The super_admin flag indicates the main owner (zaynabrehann@gmail.com)
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  is_super_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES public.admins(id) ON DELETE SET NULL
);

-- Create clients table to track signed in clients
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_signin_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contact_messages table (migrating from localStorage)
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Admin policies: Only admins can read/write admin data
CREATE POLICY "admins_select" ON public.admins FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.admins a 
      WHERE a.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "admins_insert" ON public.admins FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admins a 
      WHERE a.email = (SELECT email FROM auth.users WHERE id = auth.uid()) 
      AND a.is_super_admin = TRUE
    )
  );

CREATE POLICY "admins_delete" ON public.admins FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.admins a 
      WHERE a.email = (SELECT email FROM auth.users WHERE id = auth.uid()) 
      AND a.is_super_admin = TRUE
    )
    AND is_super_admin = FALSE -- Cannot delete super admin
  );

-- Client policies: Admins can read all clients
CREATE POLICY "clients_select" ON public.clients FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.admins a 
      WHERE a.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "clients_insert_own" ON public.clients FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "clients_update_own" ON public.clients FOR UPDATE 
  USING (auth.uid() = user_id);

-- Contact messages policies: Admins can read/update/delete
CREATE POLICY "messages_select" ON public.contact_messages FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.admins a 
      WHERE a.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "messages_insert" ON public.contact_messages FOR INSERT 
  WITH CHECK (TRUE); -- Anyone can submit a contact message

CREATE POLICY "messages_update" ON public.contact_messages FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.admins a 
      WHERE a.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

CREATE POLICY "messages_delete" ON public.contact_messages FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.admins a 
      WHERE a.email = (SELECT email FROM auth.users WHERE id = auth.uid())
    )
  );

-- Insert the super admin (zaynabrehann@gmail.com)
INSERT INTO public.admins (email, name, is_super_admin)
VALUES ('zaynabrehann@gmail.com', 'Zaynab', TRUE)
ON CONFLICT (email) DO NOTHING;
