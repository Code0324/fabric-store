'use client';

import { useEffect, useState, useMemo } from 'react';
import { ordersAPI, productsAPI, usersAPI } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import {
  ShoppingBag, Package, Users, TrendingUp,
  Clock, CheckCircle, Truck, XCircle,
  RefreshCw, ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import StatCard from '@/components/admin/StatCard';
import SalesChart from '@/components/admin/SalesChart';
import OrderChart from '@/components/admin/OrderChart';
import CategoryChart from '@/components/admin/CategoryChart';
import type { Order, Product } from '@/lib/types';

interface SalesPoint { label: string; revenue: number; orders: number; }

function buildLast30Days(orders: Order[]): SalesPoint[] {
  const today = new Date();
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (29 - i));
    const key = d.toISOString().split('T')[0];
    const label = d.toLocaleDateString('en-PK', { month: 'short', day: 'numeric' });
    const dayOrders = orders.filter((o) => o.created_at?.split('T')[0] === key);
    return { label, revenue: dayOrders.reduce((s, o) => s + (o.total_amount || 0), 0), orders: dayOrders.length };
  });
}

function buildStatusData(orders: Order[]) {
  const counts: Record<string, number> = {};
  orders.forEach((o) => { counts[o.status] = (counts[o.status] || 0) + 1; });
  return Object.entries(counts).map(([status, count]) => ({ status, count, color: '' }));
}

function buildCategoryData(products: Product[]) {
  const counts: Record<string, number> = {};
  products.forEach((p) => { if (p.category) counts[p.category] = (counts[p.category] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, value]) => ({ name, value }));
}

const STATUS_ICON: Record<string, React.ReactNode> = {
  pending:   <Clock className="w-3.5 h-3.5 text-amber-500" />,
  confirmed: <CheckCircle className="w-3.5 h-3.5 text-blue-500" />,
  shipped:   <Truck className="w-3.5 h-3.5 text-purple-500" />,
  delivered: <CheckCircle className="w-3.5 h-3.5 text-green-500" />,
  cancelled: <XCircle className="w-3.5 h-3.5 text-red-500" />,
};

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      const [ordersRes, productsData, usersRes] = await Promise.allSettled([
        ordersAPI.listAll({ limit: 500 }),
        productsAPI.getAll(500),
        usersAPI.list(0, 500),
      ]);
      if (ordersRes.status === 'fulfilled') {
        const data = ordersRes.value.data as any;
        setOrders(data?.items ?? []);
      }
      if (productsData.status === 'fulfilled') {
        setProducts(Array.isArray(productsData.value) ? productsData.value : []);
      }
      if (usersRes.status === 'fulfilled') {
        const users = usersRes.value.data;
        setCustomerCount(Array.isArray(users) ? users.filter((u: any) => u.role === 'customer').length : 0);
      }
    } catch (e) {
      console.error('Dashboard fetch error:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const stats = useMemo(() => ({
    totalOrders: orders.length,
    totalRevenue: orders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + (o.total_amount || 0), 0),
    totalProducts: products.length,
    totalCustomers: customerCount,
    pendingOrders: orders.filter((o) => o.status === 'pending').length,
    shippedOrders: orders.filter((o) => o.status === 'shipped').length,
    deliveredOrders: orders.filter((o) => o.status === 'delivered').length,
    cancelledOrders: orders.filter((o) => o.status === 'cancelled').length,
  }), [orders, products, customerCount]);

  const salesData = useMemo(() => buildLast30Days(orders), [orders]);
  const statusData = useMemo(() => buildStatusData(orders), [orders]);
  const categoryData = useMemo(() => buildCategoryData(products), [products]);
  const recentOrders = useMemo(
    () => [...orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 8),
    [orders]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-cream">Dashboard Overview</h1>
          <p className="text-sm text-muted mt-0.5">
            {new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className="self-start flex items-center gap-2 px-4 py-2 text-sm text-muted border border-border rounded-lg hover:bg-ivory hover:text-cream transition disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value={formatCurrency(stats.totalRevenue)} icon={TrendingUp} iconColor="bg-gold/10" iconTextColor="text-gold" loading={loading} />
        <StatCard label="Total Orders" value={stats.totalOrders} icon={ShoppingBag} iconColor="bg-blue-50" iconTextColor="text-blue-600" loading={loading} />
        <StatCard label="Products" value={stats.totalProducts} icon={Package} iconColor="bg-purple-50" iconTextColor="text-purple-600" loading={loading} />
        <StatCard label="Customers" value={stats.totalCustomers} icon={Users} iconColor="bg-green-50" iconTextColor="text-green-600" loading={loading} />
      </div>

      {/* Order Status Quick View */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Pending',   value: stats.pendingOrders,   cls: 'bg-amber-50 border-amber-200 text-amber-700' },
          { label: 'Shipped',   value: stats.shippedOrders,   cls: 'bg-purple-50 border-purple-200 text-purple-700' },
          { label: 'Delivered', value: stats.deliveredOrders, cls: 'bg-green-50 border-green-200 text-green-700' },
          { label: 'Cancelled', value: stats.cancelledOrders, cls: 'bg-red-50 border-red-200 text-red-700' },
        ].map((s) => (
          <Link key={s.label} href="/admin/orders" className={`flex items-center justify-between px-4 py-3 rounded-lg border ${s.cls} hover:opacity-90 transition`}>
            <span className="text-sm font-medium">{s.label}</span>
            <span className="text-xl font-bold">{loading ? '—' : s.value}</span>
          </Link>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <SalesChart data={salesData} loading={loading} />
        </div>
        <div>
          <OrderChart data={statusData} loading={loading} />
        </div>
      </div>

      {/* Charts Row 2 + Recent Orders */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <CategoryChart data={categoryData} loading={loading} />

        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-surface border border-border rounded-lg shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div>
              <h3 className="font-semibold text-cream">Recent Orders</h3>
              <p className="text-muted text-sm">Latest customer orders</p>
            </div>
            <Link href="/admin/orders" className="flex items-center gap-1.5 text-sm text-gold hover:text-gold-dark transition">
              View all <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-4 bg-border/50 rounded animate-pulse w-20" />
                  <div className="h-4 bg-border/30 rounded animate-pulse flex-1" />
                  <div className="h-4 bg-border/50 rounded animate-pulse w-16" />
                </div>
              ))}
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="p-12 text-center text-muted text-sm">No orders yet</div>
          ) : (
            <div className="divide-y divide-border">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-4 px-6 py-3 hover:bg-ivory/50 transition">
                  <div className="flex-shrink-0">{STATUS_ICON[order.status] ?? <Clock className="w-3.5 h-3.5 text-muted" />}</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-cream truncate">{order.customer_name || 'Customer'}</p>
                    <p className="text-xs text-muted">
                      #{order.id.substring(0, 8).toUpperCase()} · {new Date(order.created_at).toLocaleDateString('en-PK', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-semibold text-cream">{formatCurrency(order.total_amount)}</p>
                    <p className="text-xs text-muted capitalize">{order.payment_method}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
