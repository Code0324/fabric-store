'use client';

import { useEffect, useState } from 'react';
import { ordersAPI, productsAPI, usersAPI } from '@/lib/api';
import { formatPKR } from '@/lib/utils';
import { ShoppingBag, Package, Users, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, products: 0, users: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [orders, products, users] = await Promise.all([
          ordersAPI.list(0, 1),
          productsAPI.list(0, 1),
          usersAPI.list(0, 1),
        ]);

        let totalRevenue = 0;
        let orderCount = 0;

        // For demonstration, using limited data
        if (orders.data && Array.isArray(orders.data)) {
          orderCount = orders.data.length || 0;
          totalRevenue = orders.data.reduce((sum: number, order: any) => sum + (order.total_amount || 0), 0);
        }

        setStats({
          orders: orderCount,
          products: products.data?.length || 0,
          users: users.data?.length || 0,
          revenue: totalRevenue,
        });
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const StatCard = ({ icon: Icon, label, value }: any) => (
    <div className="card">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-gold/10">
          <Icon className="w-6 h-6 text-gold" />
        </div>
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="text-2xl font-bold text-cream">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-cream mb-8">Dashboard Overview</h1>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="loading"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard icon={ShoppingBag} label="Total Orders" value={stats.orders} />
          <StatCard icon={Package} label="Products" value={stats.products} />
          <StatCard icon={Users} label="Users" value={stats.users} />
          <StatCard icon={TrendingUp} label="Revenue" value={formatPKR(stats.revenue)} />
        </div>
      )}

      <div className="mt-12 p-6 rounded-lg bg-surface border border-border text-center">
        <p className="text-muted">More detailed analytics coming soon</p>
      </div>
    </div>
  );
}
