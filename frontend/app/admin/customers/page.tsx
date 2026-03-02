'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { usersAPI, ordersAPI } from '@/lib/api';
import { formatCurrency, generateWhatsAppLink } from '@/lib/utils';
import { useToast } from '@/lib/adminStore';
import {
  Users, Search, RefreshCw, MessageCircle, Mail, Phone,
  ShoppingBag, Loader2, ChevronLeft, ChevronRight, UserCheck,
} from 'lucide-react';
import type { User, Order } from '@/lib/types';

interface CustomerRow extends User {
  orderCount: number;
  totalSpent: number;
  lastOrderAt?: string;
  phone?: string;
}

export default function AdminCustomersPage() {
  const toast = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;

  const fetchData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      const [usersRes, ordersRes] = await Promise.allSettled([
        usersAPI.list(0, 500),
        ordersAPI.listAll({ limit: 1000 }),
      ]);
      if (usersRes.status === 'fulfilled') {
        const data = usersRes.value.data;
        setUsers(Array.isArray(data) ? data : []);
      }
      if (ordersRes.status === 'fulfilled') {
        const data = ordersRes.value.data as any;
        setOrders(data?.items ?? []);
      }
    } catch (e: any) {
      toast.error('Failed to load customers.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  // Build enriched customer rows
  const customers = useMemo<CustomerRow[]>(() => {
    return users
      .filter((u) => u.role === 'customer')
      .map((u) => {
        const userOrders = orders.filter((o) => o.user_id === u.id);
        const totalSpent = userOrders
          .filter((o) => o.status !== 'cancelled')
          .reduce((s, o) => s + (o.total_amount || 0), 0);
        const sorted = [...userOrders].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        // Try to get phone from most recent order
        const phone = sorted[0]?.customer_phone;
        return {
          ...u,
          orderCount: userOrders.length,
          totalSpent,
          lastOrderAt: sorted[0]?.created_at,
          phone,
        };
      });
  }, [users, orders]);

  const filtered = useMemo(() => {
    if (!search) return customers;
    const q = search.toLowerCase();
    return customers.filter(
      (c) =>
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.toLowerCase().includes(q)
    );
  }, [customers, search]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  useEffect(() => { setPage(1); }, [search]);

  const handleWhatsApp = (customer: CustomerRow) => {
    if (!customer.phone) {
      toast.warning('No phone number on file for this customer.');
      return;
    }
    const msg = `Hi ${customer.name || 'there'}! This is AL Imran Fabrics. How can we help you today?`;
    window.open(generateWhatsAppLink(customer.phone, msg), '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-cream">Customers</h1>
          <p className="text-sm text-muted mt-0.5">{filtered.length} customers</p>
        </div>
        <button
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className="self-start p-2 text-muted border border-border rounded-lg hover:bg-ivory hover:text-cream transition disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-surface border border-border rounded-lg px-4 py-3">
          <p className="text-xl font-bold text-cream">{customers.length}</p>
          <p className="text-xs text-muted mt-0.5">Total Customers</p>
        </div>
        <div className="bg-surface border border-border rounded-lg px-4 py-3">
          <p className="text-xl font-bold text-cream">
            {customers.filter((c) => c.orderCount > 0).length}
          </p>
          <p className="text-xs text-muted mt-0.5">With Orders</p>
        </div>
        <div className="bg-surface border border-border rounded-lg px-4 py-3">
          <p className="text-xl font-bold text-cream">
            {formatCurrency(customers.reduce((s, c) => s + c.totalSpent, 0))}
          </p>
          <p className="text-xs text-muted mt-0.5">Total Revenue</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
        <input
          type="text"
          placeholder="Search by name, email, phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm bg-surface border border-border rounded-lg text-cream placeholder-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-gold" /></div>
      ) : filtered.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-16 text-center">
          <Users className="w-12 h-12 text-muted mx-auto mb-4" />
          <p className="text-muted font-medium">No customers found</p>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ivory border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider hidden sm:table-cell">Contact</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Orders</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider hidden md:table-cell">Total Spent</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider hidden lg:table-cell">Last Order</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginated.map((customer) => (
                  <tr key={customer.id} className="hover:bg-ivory/50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-gold font-semibold text-sm">
                            {customer.name?.charAt(0).toUpperCase() || '?'}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-medium text-cream">{customer.name}</p>
                            {customer.is_active && <UserCheck className="w-3 h-3 text-green-500" />}
                          </div>
                          <p className="text-xs text-muted">
                            {new Date(customer.created_at).toLocaleDateString('en-PK', { month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <p className="text-sm text-cream">{customer.email}</p>
                      {customer.phone && <p className="text-xs text-muted">{customer.phone}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <ShoppingBag className="w-3.5 h-3.5 text-muted" />
                        <span className="text-sm font-medium text-cream">{customer.orderCount}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm font-semibold text-cream">{formatCurrency(customer.totalSpent)}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-sm text-muted">
                        {customer.lastOrderAt
                          ? new Date(customer.lastOrderAt).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' })
                          : '—'}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`mailto:${customer.email}`}
                          className="p-1.5 text-muted hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Send email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleWhatsApp(customer)}
                          className="p-1.5 text-muted hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <p className="text-xs text-muted">
                Page {page} of {totalPages} · {filtered.length} customers
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded border border-border text-muted text-xs hover:border-gold/50 hover:text-cream disabled:opacity-40 transition"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />Prev
                </button>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded border border-border text-muted text-xs hover:border-gold/50 hover:text-cream disabled:opacity-40 transition"
                >
                  Next<ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
