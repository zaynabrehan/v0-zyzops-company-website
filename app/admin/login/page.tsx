'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { GlowButton } from '@/components/glow-button';
import { SUPER_ADMIN_EMAIL } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user?.email) {
      // Check if user is authorized
      const email = user.email.toLowerCase();
      const isSuperAdmin = email === SUPER_ADMIN_EMAIL.toLowerCase();
      
      if (isSuperAdmin) {
        router.replace('/admin/dashboard');
        return;
      }
      
      // Check if regular admin
      const { data: adminRecord } = await supabase
        .from('admins')
        .select('is_active')
        .eq('email', email)
        .eq('is_active', true)
        .single();
        
      if (adminRecord) {
        router.replace('/admin/dashboard');
        return;
      }
    }
    
    setIsCheckingAuth(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Sign in with Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (authError) {
        setError(authError.message);
        setIsLoading(false);
        return;
      }

      if (!data.user?.email) {
        setError('Authentication failed. Please try again.');
        setIsLoading(false);
        return;
      }

      const userEmail = data.user.email.toLowerCase();
      
      // Check if super admin
      if (userEmail === SUPER_ADMIN_EMAIL.toLowerCase()) {
        router.push('/admin/dashboard');
        return;
      }

      // Check if regular admin
      const { data: adminRecord, error: adminError } = await supabase
        .from('admins')
        .select('is_active')
        .eq('email', userEmail)
        .single();

      if (adminError || !adminRecord) {
        // User exists in auth but not in admins table
        await supabase.auth.signOut();
        setError('You are not authorized to access the admin panel.');
        setIsLoading(false);
        return;
      }

      if (!adminRecord.is_active) {
        await supabase.auth.signOut();
        setError('Your admin account has been deactivated.');
        setIsLoading(false);
        return;
      }

      router.push('/admin/dashboard');
    } catch {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
          <p className="text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Techvix.org</span>
          </h1>
          <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
          <p className="text-gray-300">Sign in with your admin credentials</p>
        </div>

        <div className="glass rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <GlowButton
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </GlowButton>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Admin access only. Contact the super admin if you need access.
          </p>
        </div>
      </div>
    </div>
  );
}
