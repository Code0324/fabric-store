'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ordersAPI, productsAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { formatPKR, formatDate, getStatusColor } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';
import type { Order, Product } from '@/lib/types';

export default function OrdersPage() {
  const { isLoggedIn } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<{ [key: string]: Product }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          ordersAPI.list(0, 20),
          productsAPI.getAll(),
        ]);

        setOrders(ordersRes.data);

        const productMap: { [key: string]: Product } = {};
        productsRes.forEach((p) => {
          productMap[p.id] = p;
        });
        setProducts(productMap);
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-12">
        <div className="container text-center py-20">
          <p className="text-lg text-muted mb-4">Please login to view your orders</p>
          <Link href="/login" className="btn btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <h1 className="text-4xl font-serif font-bold text-cream mb-12">My Orders</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="loading"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-serif font-bold text-cream mb-4">No Orders Yet</h2>
            <p className="text-muted mb-8">Start shopping to place your first order</p>
            <Link href="/products" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="card">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-border">
                  <div>
                    <p className="text-xs text-muted uppercase mb-1">Order ID</p>
                    <p className="font-mono text-sm text-cream">{order.id.substring(0, 8)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase mb-1">Date</p>
                    <p className="text-sm text-cream">{formatDate(order.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase mb-1">Total</p>
                    <p className="text-lg font-bold text-gold">{formatPKR(order.total_amount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase mb-1">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-cream mb-3">Items:</p>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => {
                      const product = products[item.product_id];
                      return (
                        <p key={idx} className="text-sm text-muted">
                          {product?.name || 'Product'} × {item.quantity} = {formatPKR(item.price * item.quantity)}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
