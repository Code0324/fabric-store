'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, LogOut, LogIn } from 'lucide-react';
import type { User } from '@/lib/types';

interface MobileMenuProps {
  isLoggedIn: boolean;
  user: User | null;
  onLogout: () => void;
  onClose: () => void;
}

interface MenuItem {
  label: string;
  href?: string;
  subItems?: { label: string; href: string }[];
}

const menuItems: MenuItem[] = [
  {
    label: "Men's Wear",
    subItems: [
      { label: 'Stitched',        href: '/products/category/stitched' },
      { label: 'Unstitched',      href: '/products/category/unstitched' },
      { label: 'Wash & Wear',     href: '/products/category/wash-wear' },
      { label: 'Shalwar Kameez',  href: '/products/category/shalwar-kameez' },
      { label: 'Kurtas',          href: '/products/category/kurtas' },
      { label: 'All Mens',        href: '/products/category/mens' },
    ],
  },
  {
    label: "Women's Wear",
    subItems: [
      { label: 'Stitched',        href: '/products/category/stitched' },
      { label: 'Unstitched',      href: '/products/category/unstitched' },
      { label: 'Lawn',            href: '/products/category/lawn' },
      { label: 'Chiffon',         href: '/products/category/chiffon' },
      { label: 'Embroidered',     href: '/products/category/embroidered' },
      { label: 'All Womens',      href: '/products/category/womens' },
    ],
  },
  {
    label: 'Brands',
    subItems: [
      { label: 'Khaadi',          href: '/products/brand/khaadi' },
      { label: 'Sapphire',        href: '/products/brand/sapphire' },
      { label: 'Gul Ahmed',       href: '/products/brand/gul-ahmed' },
      { label: 'Maria.B',         href: '/products/brand/maria-b' },
      { label: 'Alkaram',         href: '/products/brand/alkaram' },
    ],
  },
  {
    label: 'Shop',
    subItems: [
      { label: 'All Products',    href: '/products' },
      { label: 'Sale Items',      href: '/products/category/sale' },
      { label: 'Eid Collection',  href: '/products/category/eid' },
      { label: 'New Arrivals',    href: '/products' },
    ],
  },
];

export default function MobileMenu({ isLoggedIn, user, onLogout, onClose }: MobileMenuProps) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const handleLinkClick = () => {
    setExpandedMenu(null);
    onClose();
  };

  return (
    <div className="md:hidden bg-surface border-t border-border py-4 mt-4">
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <div key={item.label}>
            <button
              onClick={() => setExpandedMenu(expandedMenu === item.label ? null : item.label)}
              className="w-full px-4 py-3 flex items-center justify-between text-cream hover:text-gold transition hover:bg-charcoal rounded-lg"
            >
              <span className="font-medium">{item.label}</span>
              {item.subItems && (
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    expandedMenu === item.label ? 'rotate-180' : ''
                  }`}
                />
              )}
            </button>

            {item.subItems && expandedMenu === item.label && (
              <div className="bg-charcoal rounded-lg ml-4 mt-1 border-l-2 border-gold">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.label}
                    href={subItem.href}
                    onClick={handleLinkClick}
                    className="block px-4 py-2.5 text-sm text-muted hover:text-gold transition"
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="border-t border-border my-4" />

      <div className="px-4 space-y-2">
        {isLoggedIn && user ? (
          <>
            <p className="text-sm text-muted px-2 mb-3">
              Logged in as <span className="text-gold font-medium">{user.name}</span>
            </p>
            {user.role === 'admin' && (
              <Link
                href="/admin"
                onClick={handleLinkClick}
                className="block px-4 py-2 bg-gold text-charcoal rounded-lg font-medium hover:bg-gold-light transition text-center"
              >
                Admin Dashboard
              </Link>
            )}
            <Link
              href="/orders"
              onClick={handleLinkClick}
              className="block px-4 py-2 text-cream hover:text-gold transition text-center"
            >
              My Orders
            </Link>
            <button
              onClick={() => { onLogout(); handleLinkClick(); }}
              className="w-full px-4 py-2 text-cream hover:text-gold transition flex items-center justify-center gap-2 border border-border rounded-lg hover:bg-charcoal"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              onClick={handleLinkClick}
              className="block px-4 py-2 text-cream hover:text-gold transition border border-border rounded-lg hover:bg-charcoal text-center flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              href="/register"
              onClick={handleLinkClick}
              className="block px-4 py-2 bg-gold text-charcoal rounded-lg font-medium hover:bg-gold-light transition text-center"
            >
              Create Account
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
