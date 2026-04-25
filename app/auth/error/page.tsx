'use client';

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="glass border border-red-500/30 rounded-2xl p-8 text-center">
          <AlertCircle size={48} className="mx-auto text-red-400 mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Authentication Error</h1>
          <p className="text-gray-300 mb-6">
            Something went wrong during authentication. Please try again.
          </p>
          <Link
            href="/signin"
            className="inline-block px-6 py-3 bg-purple-500/30 border border-purple-500/50 text-white rounded-lg hover:bg-purple-500/40 transition-colors"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
