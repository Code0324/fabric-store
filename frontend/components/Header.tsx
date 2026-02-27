'use client';

import Link from 'next/link';
import { useAuthStore, useCartStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuthStore();
  const cartItems = useCartStore((state) => state.items);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="container py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-amber-500">
          AL Imran
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-amber-500 transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-amber-500 transition">
            Products
          </Link>
        </nav>

        <div className="flex gap-4 items-center">
          <Link href="/cart" className="relative hover:text-amber-500 transition">
            🛒
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {isLoggedIn && user ? (
            <div className="flex gap-4 items-center">
              <span className="text-sm">Hi, {user.name}</span>
              {user.role === 'admin' && (
                <Link href="/admin" className="text-amber-500 hover:text-amber-600">
                  Admin
                </Link>
              )}
              <Link href="/orders" className="text-sm hover:text-amber-500 transition">
                Orders
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-secondary text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="btn btn-secondary text-sm">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary text-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
