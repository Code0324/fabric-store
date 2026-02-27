'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore, useCartStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, LogOut, LogIn } from 'lucide-react';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuthStore();
  const cartItems = useCartStore((state) => state.items);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
    setMobileMenuOpen(false);
  };

  if (!mounted) return null;

  const megaMenuCategories = [
    {
      name: 'Mens Wear',
      items: ['Stitched', 'Unstitched', 'Wash & Wear', 'Summer Collection', 'Sale'],
      href: '/products/category/mens',
    },
    {
      name: 'Womens Wear',
      items: ['Stitched', 'Unstitched', 'Lawn', 'Chiffon', 'Linen', 'Party Wear', 'Sale'],
      href: '/products/category/womens',
    },
    {
      name: 'Seasonal',
      items: ['Summer 2025', 'Winter 2025'],
      href: '/products',
    },
    {
      name: 'Shop',
      items: ['New Arrivals', 'Best Sellers', 'Sale Items', 'All Products'],
      href: '/products',
    },
  ];

  return (
    <header className="bg-charcoal border-b border-border sticky top-0 z-50">
      <div className="container py-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-3xl font-serif font-bold gradient-gold hover:opacity-80 transition">
            AL Imran
          </Link>

          {/* Mega Menu */}
          <nav className="flex gap-8 items-center">
            {megaMenuCategories.map((category) => (
              <div
                key={category.name}
                className="relative group"
                onMouseEnter={() => setActiveMegaMenu(category.name)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <button className="text-cream hover:text-gold transition py-2 font-medium">
                  {category.name}
                </button>
                {activeMegaMenu === category.name && (
                  <MegaMenu category={category} />
                )}
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex gap-4 items-center">
            {/* Cart Icon */}
            <Link href="/cart" className="relative hover:text-gold transition">
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-charcoal text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Auth Links */}
            {isLoggedIn && user ? (
              <div className="flex gap-3 items-center border-l border-border pl-4">
                <span className="text-sm text-cream">
                  <span className="text-gold font-medium">{user.name}</span>
                </span>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="text-xs bg-gold text-charcoal px-2 py-1 rounded hover:bg-gold-light transition font-medium"
                  >
                    Admin
                  </Link>
                )}
                <Link href="/orders" className="text-sm text-cream hover:text-gold transition">
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-cream hover:text-gold transition flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2 border-l border-border pl-4">
                <Link href="/login" className="btn btn-secondary text-sm">
                  <LogIn className="w-4 h-4 inline mr-1" />
                  Login
                </Link>
                <Link href="/register" className="btn btn-primary text-sm">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold gradient-gold">
            AL Imran
          </Link>

          <div className="flex gap-3 items-center">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-charcoal text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-cream hover:text-gold transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <MobileMenu
            isLoggedIn={isLoggedIn}
            user={user}
            onLogout={handleLogout}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </div>
    </header>
  );
}
