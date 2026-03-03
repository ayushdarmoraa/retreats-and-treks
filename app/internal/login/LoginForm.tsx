'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const redirectTo = searchParams.get('from') || '/internal/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/internal/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Login failed');
        return;
      }

      router.push(redirectTo);
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
        <h1 className="text-lg font-bold text-gray-900 mb-1">Internal Access</h1>
        <p className="text-sm text-gray-500 mb-6">Enter operator password to continue.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            autoFocus
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          />

          {error && (
            <p className="text-red-600 text-sm mt-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full mt-4 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        Set ADMIN_PASSWORD in environment variables.
      </p>
    </div>
  );
}
