'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { LogIn } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  // If already logged in, redirect immediately
  useEffect(() => {
    if (isLoggedIn) {
      const redirectTo = searchParams.get('redirect') || '/products';
      router.replace(redirectTo);
    }
  }, [isLoggedIn, router, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login({
        email: formData.email,
        password: formData.password,
      });

      // Store auth state in Zustand (persisted to localStorage)
      setToken(response.data.access_token);
      setUser(response.data.user);

      // Redirect to previous page if specified, otherwise go to products
      const redirectTo = searchParams.get('redirect') || '/products';
      router.push(redirectTo);
    } catch (err: any) {
      // Clear only the password field on error, keep email
      setFormData((prev) => ({ ...prev, password: '' }));

      const detail = err.response?.data?.detail;
      if (err.response?.status === 401) {
        setError('Invalid email or password. Please try again.');
      } else if (typeof detail === 'string') {
        setError(detail);
      } else if (Array.isArray(detail)) {
        setError(detail.map((d: any) => d.msg).join(', '));
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-8">
            <LogIn className="w-12 h-12 text-gold mx-auto mb-4" />
            <h1 className="text-3xl font-serif font-bold text-cream mb-2">Welcome Back</h1>
            <p className="text-muted">Sign in to your AL Imran Fabrics account</p>
          </div>

          {error && (
            <div className="bg-danger/20 border border-danger text-danger px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="ali@example.com"
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="form-label mb-0">Password</label>
                <span
                  className="text-xs text-muted cursor-not-allowed"
                  title="Coming soon"
                >
                  Forgot password?
                </span>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                required
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-muted mb-6">
            Don't have an account?{' '}
            <Link href="/register" className="text-gold hover:text-gold-light transition font-medium">
              Create one
            </Link>
          </p>

          <Link href="/" className="block text-center text-sm text-gold hover:text-gold-light transition">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-12 flex items-center justify-center">
          <div className="loading" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
