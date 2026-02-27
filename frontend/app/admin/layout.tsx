'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, logout, isLoggedIn } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!isLoggedIn || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isLoggedIn, user?.role, router, mounted]);

  if (!mounted || !isLoggedIn || user?.role !== 'admin') {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-charcoal">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-surface border-r border-border transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b border-border">
          <h1 className={`font-serif font-bold text-gold text-xl ${!sidebarOpen && 'text-sm'}`}>
            {sidebarOpen ? 'AL Imran Admin' : 'AIA'}
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <NavLink href="/admin" label="Dashboard" sidebarOpen={sidebarOpen} />
          <NavLink href="/admin/products" label="Products" sidebarOpen={sidebarOpen} />
          <NavLink href="/admin/orders" label="Orders" sidebarOpen={sidebarOpen} />
          <NavLink href="/admin/users" label="Users" sidebarOpen={sidebarOpen} />
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full p-2 text-muted hover:text-gold transition text-center"
          >
            {sidebarOpen ? <X className="w-5 h-5 mx-auto" /> : <Menu className="w-5 h-5 mx-auto" />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-surface border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold text-cream">Admin Dashboard</h2>
          <div className="flex items-center gap-6">
            <span className="text-sm text-muted">
              Welcome, <span className="text-gold font-medium">{user?.name}</span>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-danger hover:text-red-400 transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  );
}

function NavLink({
  href,
  label,
  sidebarOpen,
}: {
  href: string;
  label: string;
  sidebarOpen: boolean;
}) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 rounded-lg text-cream hover:bg-charcoal hover:text-gold transition text-sm"
      title={label}
    >
      {sidebarOpen ? label : label.substring(0, 2)}
    </Link>
  );
}
