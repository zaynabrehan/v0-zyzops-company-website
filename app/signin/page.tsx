'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogIn, UserPlus } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { ParticleBackground } from '@/components/particle-background';

export default function SignInPage() {
  const router = useRouter();
  const supabase = createClient();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Sign up new user
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
              `${window.location.origin}/auth/callback`,
            data: {
              name: name,
            },
          },
        });

        if (signUpError) {
          setError(signUpError.message);
          return;
        }

        // Check if email confirmation is needed
        if (data.user && !data.session) {
          setSuccess('Please check your email to confirm your account.');
          return;
        }

        // If session exists, add to clients table
        if (data.session && data.user) {
          await supabase.from('clients').upsert({
            user_id: data.user.id,
            email: data.user.email,
            name: name || null,
            last_signin_at: new Date().toISOString(),
          }, { onConflict: 'email' });

          router.push('/');
          router.refresh();
        }
      } else {
        // Sign in existing user
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError(signInError.message);
          return;
        }

        // Check if user is an admin
        const { data: adminData } = await supabase
          .from('admins')
          .select('*')
          .eq('email', email)
          .single();

        if (adminData) {
          // Redirect admin to admin dashboard
          router.push('/admin/dashboard');
          router.refresh();
          return;
        }

        // Update client last signin time
        if (data.user) {
          await supabase.from('clients').upsert({
            user_id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.name || null,
            last_signin_at: new Date().toISOString(),
          }, { onConflict: 'email' });
        }

        router.push('/');
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <ParticleBackground />
      <div className="w-full max-w-md relative z-10">
        <div className="glass border border-purple-500/30 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              {isSignUp ? (
                <UserPlus size={32} className="text-purple-400" />
              ) : (
                <LogIn size={32} className="text-purple-400" />
              )}
              <h1 className="text-3xl font-bold text-white">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-300 bg-clip-text text-transparent">
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </span>
              </h1>
            </div>
            <p className="text-gray-300 text-sm">
              {isSignUp
                ? 'Create an account to get started'
                : 'Welcome back! Sign in to continue'}
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex mb-6 bg-white/5 rounded-lg p-1">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-2 rounded-md transition-colors text-sm font-medium ${
                !isSignUp
                  ? 'bg-purple-500/30 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setError('');
                setSuccess('');
              }}
              className={`flex-1 py-2 rounded-md transition-colors text-sm font-medium ${
                isSignUp
                  ? 'bg-purple-500/30 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-lg text-sm">
                {success}
              </div>
            )}

            {/* Name Input (Sign Up only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Your name"
                />
              </div>
            )}

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder="your@email.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder={isSignUp ? 'Create a password (min 6 characters)' : 'Enter your password'}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-[length:200%_100%] animate-gradient-shift text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                isSignUp ? 'Creating account...' : 'Signing in...'
              ) : (
                isSignUp ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          {/* Admin Link */}
          <div className="mt-6 pt-6 border-t border-purple-500/20 text-center">
            <Link
              href="/admin/login"
              className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
            >
              Admin Login
            </Link>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-sm text-cyan-400 hover:text-purple-400 transition-colors"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
