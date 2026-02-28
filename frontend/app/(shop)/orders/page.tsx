'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ordersAPI, productsAPI } from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { formatPKR, formatDate, getStatusColor } from '@/lib/utils';
import { ShoppingBag, AlertCircle, Package } from 'lucide-react';
import type { Order, Product } from '@/lib/types';

export default function OrdersPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<{ [key: string]: Product }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Route protection: redirect to /login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login?redirect=/orders');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const [ordersRes, productsRes] = await Promise.all([
          ordersAPI.list(1, 50),
          productsAPI.getAll(),
        ]);

        // Handle both paginated and plain array responses
        const ordersData = Array.isArray(ordersRes.data)
          ? ordersRes.data
          : (ordersRes.data as any).items ?? [];
        setOrders(ordersData);

        const productMap: { [key: string]: Product } = {};
        productsRes.forEach((p: Product) => {
          productMap[p.id] = p;
        });
        setProducts(productMap);
      } catch (err: any) {
        console.error('Failed to load orders:', err);
        if (err.response?.status === 401) {
          // 401 is handled globally by the interceptor; don't set local error
          return;
        }
        setError(err.response?.data?.detail || 'Failed to load your orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn, router]);

  // While auth check is resolving, show nothing (interceptor handles redirect)
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <h1 className="text-4xl font-serif font-bold text-cream mb-12">My Orders</h1>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="loading" />
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="bg-danger/20 border border-danger text-danger px-6 py-5 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium mb-1">Could not load orders</p>
              <p className="text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 text-sm underline hover:no-underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && orders.length === 0 && (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-serif font-bold text-cream mb-4">No Orders Yet</h2>
            <p className="text-muted mb-8">Start shopping to place your first order</p>
            <Link href="/products" className="btn btn-primary">
              Shop Now
            </Link>
          </div>
        )}

        {/* Orders list */}
        {!loading && !error && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="card">
                {/* Order header */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-border">
                  <div>
                    <p className="text-xs text-muted uppercase mb-1">Order ID</p>
                    <p className="font-mono text-sm text-cream">#{order.id.substring(0, 8).toUpperCase()}</p>
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
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${getStatusColor(order.status)}`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Order items */}
                <div>
                  <p className="text-sm font-semibold text-cream mb-3 flex items-center gap-2">
                    <Package className="w-4 h-4 text-gold" />
                    Items ({order.items.length})
                  </p>
                  <div className="space-y-3">
                    {order.items.map((item, idx) => {
                      const product = products[item.product_id];
                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-sm border-b border-border/50 pb-3 last:border-0 last:pb-0"
                        >
                          <div className="flex items-center gap-3">
                            {product?.image_url ? (
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-10 h-10 rounded object-cover border border-border"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded border border-border bg-surface flex items-center justify-center">
                                <ShoppingBag className="w-4 h-4 text-muted" />
                              </div>
                            )}
                            <div>
                              <p className="text-cream font-medium">
                                {product?.name || 'Product'}
                              </p>
                              <p className="text-muted text-xs">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="text-gold font-semibold">
                            {formatPKR(item.price * item.quantity)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Delivery address (if available) */}
                {order.customer_address && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted uppercase mb-1">Delivery Address</p>
                    <p className="text-sm text-cream">
                      {[order.customer_name, order.customer_address, order.customer_city]
                        .filter(Boolean)
                        .join(', ')}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
