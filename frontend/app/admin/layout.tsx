'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { useAdminStore } from '@/lib/adminStore';
import ToastContainer from '@/components/admin/Toast';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
  Bell,
  Store,
  AlertTriangle,
} from 'lucide-react';

// ─── Nav items ────────────────────────────────────────────────────────────────

const NAV = [
  { href: '/admin',           label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/admin/products',  label: 'Products',   icon: Package         },
  { href: '/admin/orders',    label: 'Orders',     icon: ShoppingCart    },
  { href: '/admin/customers', label: 'Customers',  icon: Users           },
  { href: '/admin/inventory', label: 'Inventory',  icon: BarChart3       },
  { href: '/admin/settings',  label: 'Settings',   icon: Settings        },
];

function NavItem({
  href,
  label,
  icon: Icon,
  collapsed,
  active,
  badge,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  collapsed: boolean;
  active: boolean;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
        active
          ? 'bg-gold text-white shadow-sm'
          : 'text-muted hover:bg-ivory hover:text-cream'
      }`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : 'text-muted group-hover:text-cream'}`} />
      {!collapsed && <span className="flex-1 truncate">{label}</span>}
      {!collapsed && badge !== undefined && badge > 0 && (
        <span className="ml-auto flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-red-500 text-white">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
      {collapsed && badge !== undefined && badge > 0 && (
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
      )}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, isLoggedIn, token } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useAdminStore();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!isLoggedIn || !token) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else if (user?.role !== 'admin') {
      router.replace('/');
    }
  }, [isLoggedIn, token, user?.role, router, mounted]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  if (!mounted || !isLoggedIn || !token || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
          <p className="text-muted text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => { logout(); router.push('/'); };

  const SidebarContent = ({ collapsed }: { collapsed: boolean }) => (
    <>
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-border ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center flex-shrink-0">
          <Store className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-bold text-cream leading-tight">AL Imran</p>
            <p className="text-xs text-muted">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="text-xs font-semibold text-muted/60 uppercase tracking-wider px-3 mb-2">
            Main Menu
          </p>
        )}
        {NAV.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            collapsed={collapsed}
            active={
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href)
            }
          />
        ))}
      </nav>

      {/* User */}
      <div className={`border-t border-border p-3 ${collapsed ? 'flex justify-center' : ''}`}>
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-ivory mb-2">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-cream truncate">{user?.name}</p>
              <p className="text-xs text-muted truncate">{user?.email}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
          className={`flex items-center gap-2 text-sm text-muted hover:text-red-600 transition px-3 py-2 rounded-lg hover:bg-red-50 w-full ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && 'Sign out'}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-charcoal overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col flex-shrink-0 bg-surface border-r border-border transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-[68px]'
        }`}
      >
        <SidebarContent collapsed={!sidebarOpen} />
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border flex flex-col lg:hidden">
            <SidebarContent collapsed={false} />
          </aside>
        </>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex-shrink-0 h-16 bg-surface border-b border-border flex items-center px-4 sm:px-6 gap-4">
          <button
            className="lg:hidden p-2 text-muted hover:text-cream transition rounded-lg hover:bg-ivory"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            className="hidden lg:flex p-2 text-muted hover:text-cream transition rounded-lg hover:bg-ivory"
            onClick={toggleSidebar}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted">
            <Link href="/admin" className="hover:text-cream transition">Admin</Link>
            {pathname !== '/admin' && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-cream capitalize">
                  {pathname.split('/').filter(Boolean).slice(1).join(' › ')}
                </span>
              </>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              href="/admin/inventory"
              className="p-2 text-muted hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
              title="Inventory alerts"
            >
              <AlertTriangle className="w-5 h-5" />
            </Link>
            <button className="relative p-2 text-muted hover:text-cream hover:bg-ivory rounded-lg transition">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center ml-1">
              <span className="text-white text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
