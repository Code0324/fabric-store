'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { UserPlus, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.passwordConfirm) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        password: formData.password,
      });

      // Store auth state in Zustand (persisted to localStorage)
      setToken(response.data.token.access_token);
      setUser(response.data.user);

      // Show brief success message before redirecting
      setSuccess(true);
      setTimeout(() => {
        router.push('/products');
      }, 1200);
    } catch (err: any) {
      // Keep all form values except password fields on error
      setFormData((prev) => ({ ...prev, password: '', passwordConfirm: '' }));
      const detail = err.response?.data?.detail;
      if (typeof detail === 'string') {
        setError(detail);
      } else if (Array.isArray(detail)) {
        // FastAPI validation errors are an array of objects
        setError(detail.map((d: any) => d.msg).join(', '));
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="card text-center">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-cream mb-2">Account Created!</h2>
            <p className="text-muted">Welcome to AL Imran Fabrics. Redirecting you to our collection…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-8">
            <UserPlus className="w-12 h-12 text-gold mx-auto mb-4" />
            <h1 className="text-3xl font-serif font-bold text-cream mb-2">Create Account</h1>
            <p className="text-muted">Join AL Imran Fabrics today</p>
          </div>

          {error && (
            <div className="bg-danger/20 border border-danger text-danger px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                placeholder="Ali Hassan"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="ali@example.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input"
                placeholder="+92 300 1234567"
                disabled={loading}
              />
            </div>

            <div>
              <label className="form-label">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                placeholder="Min. 8 characters"
                required
                minLength={8}
                disabled={loading}
              />
            </div>

            <div>
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                className="input"
                placeholder="Repeat your password"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account…' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-muted mb-6">
            Already have an account?{' '}
            <Link href="/login" className="text-gold hover:text-gold-light transition font-medium">
              Sign in
            </Link>
          </p>

          <Link href="/" className="block text-center text-sm text-gold hover:text-gold-light transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
