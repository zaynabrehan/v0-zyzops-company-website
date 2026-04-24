'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Home } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const endpoint = userType === 'admin' ? '/api/admin/login' : '/api/user/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (userType === 'admin') {
          localStorage.setItem('adminToken', data.token);
          localStorage.setItem('adminEmail', data.email);
          localStorage.setItem('adminName', data.name);
          localStorage.setItem('userType', 'admin');
          router.push('/admin/dashboard');
        } else {
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('userEmail', data.email);
          localStorage.setItem('userName', data.name);
          localStorage.setItem('userType', 'user');
          router.push('/notifications');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1428] via-[#1a3654] to-[#0a1428] flex items-center justify-center px-4">
      <div className="absolute top-6 left-6">
        <button
          onClick={handleBackHome}
          className="flex items-center gap-2 px-4 py-2 text-white hover:text-cyan-400 transition-colors font-semibold"
        >
          <Home size={20} />
          Back to Home
        </button>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-[#162543] border border-[#264563] rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <LogIn size={32} className="text-cyan-400" />
              <h1 className="text-3xl font-bold text-white">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Sign In
                </span>
              </h1>
            </div>
            <p className="text-gray-300 text-sm">Access your account</p>
          </div>

          {/* User Type Selection */}
          <div className="flex gap-4 mb-8">
            <button
              type="button"
              onClick={() => setUserType('user')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                userType === 'user'
                  ? 'bg-cyan-400 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setUserType('admin')}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                userType === 'admin'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              Admin
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

            {/* Demo Credentials Info */}
            {userType === 'user' && (
              <div className="bg-blue-500/20 border border-blue-500/50 text-blue-300 p-4 rounded-lg text-sm">
                Demo User: user@example.com | Password: user123
              </div>
            )}
            {userType === 'admin' && (
              <div className="bg-purple-500/20 border border-purple-500/50 text-purple-300 p-4 rounded-lg text-sm">
                Admin: zaynabrehann@gmail.com | Password: admin123
              </div>
            )}

            {/* Email Input */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full bg-[#1a3654] border border-[#264563] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full bg-[#1a3654] border border-[#264563] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
