'use client';

import { useEffect, useState, useCallback } from 'react';
import { ordersAPI } from '@/lib/api';
import { formatPKR } from '@/lib/utils';
import {
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Package,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  X,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import type { Order } from '@/lib/types';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const API_BASE =
  (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1').replace('/api/v1', '');

type PaymentStatusFilter = 'all' | 'Pending Verification' | 'Paid' | 'Pending' | 'Rejected';
type OrderStatusFilter = 'all' | 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  cod: 'COD',
  easypaisa: 'Easypaisa',
  jazzcash: 'JazzCash',
};

// ---------------------------------------------------------------------------
// Badge helpers
// ---------------------------------------------------------------------------

function PaymentStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    'Pending Verification': 'bg-blue-900/60 text-blue-300 border-blue-700',
    Paid:                   'bg-green-900/60 text-green-300 border-green-700',
    Pending:                'bg-yellow-900/60 text-yellow-300 border-yellow-700',
    Rejected:               'bg-red-900/60 text-red-300 border-red-700',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${styles[status] ?? 'bg-surface text-muted border-border'}`}>
      {status}
    </span>
  );
}

function OrderStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending:   'bg-yellow-900/60 text-yellow-300 border-yellow-700',
    confirmed: 'bg-blue-900/60 text-blue-300 border-blue-700',
    shipped:   'bg-purple-900/60 text-purple-300 border-purple-700',
    delivered: 'bg-green-900/60 text-green-300 border-green-700',
    cancelled: 'bg-red-900/60 text-red-300 border-red-700',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border capitalize ${styles[status] ?? 'bg-surface text-muted border-border'}`}>
      {status}
    </span>
  );
}

function MethodBadge({ method }: { method: string }) {
  const styles: Record<string, string> = {
    cod:       'bg-surface text-muted border-border',
    easypaisa: 'bg-green-950/60 text-green-400 border-green-800',
    jazzcash:  'bg-red-950/60 text-red-400 border-red-800',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${styles[method] ?? 'bg-surface text-muted border-border'}`}>
      {PAYMENT_METHOD_LABELS[method] ?? method}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Screenshot modal
// ---------------------------------------------------------------------------

function ScreenshotModal({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-surface border border-border rounded-xl overflow-hidden max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <p className="text-sm font-medium text-cream">Payment Screenshot</p>
          <button onClick={onClose} className="text-muted hover:text-cream transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 flex justify-center">
          <img
            src={url}
            alt="Payment screenshot"
            className="max-h-[70vh] w-auto rounded-lg object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '';
              (e.target as HTMLImageElement).alt = 'Image not found';
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatusFilter>('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState<OrderStatusFilter>('all');

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const LIMIT = 15;

  // Actions
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
  const [actionError, setActionError] = useState<Record<string, string>>({});

  // Screenshot modal
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // Fetch
  // ---------------------------------------------------------------------------

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params: Record<string, any> = { page, limit: LIMIT };
      if (paymentFilter !== 'all') params.payment_status = paymentFilter;
      if (orderStatusFilter !== 'all') params.status = orderStatusFilter;

      const res = await ordersAPI.listAll(params);
      const data = res.data as any;
      setOrders(data.items ?? []);
      setTotal(data.total ?? 0);
      setTotalPages(data.pages ?? 1);
    } catch (err: any) {
      setError(err.response?.data?.detail ?? 'Failed to load orders.');
    } finally {
      setLoading(false);
    }
  }, [page, paymentFilter, orderStatusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [paymentFilter, orderStatusFilter]);

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  const setLoaderFor = (orderId: string, val: boolean) =>
    setActionLoading((prev) => ({ ...prev, [orderId]: val }));

  const setErrorFor = (orderId: string, msg: string) =>
    setActionError((prev) => ({ ...prev, [orderId]: msg }));

  const handleVerifyPayment = async (orderId: string, decision: 'Paid' | 'Rejected') => {
    setLoaderFor(orderId, true);
    setErrorFor(orderId, '');
    try {
      const res = await ordersAPI.verifyPayment(orderId, decision);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? (res.data as Order) : o)));
    } catch (err: any) {
      setErrorFor(orderId, err.response?.data?.detail ?? 'Action failed.');
    } finally {
      setLoaderFor(orderId, false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    setLoaderFor(orderId, true);
    setErrorFor(orderId, '');
    try {
      const res = await ordersAPI.updateStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? (res.data as Order) : o)));
    } catch (err: any) {
      setErrorFor(orderId, err.response?.data?.detail ?? 'Action failed.');
    } finally {
      setLoaderFor(orderId, false);
    }
  };

  // ---------------------------------------------------------------------------
  // Derived stats (from current page — summary only)
  // ---------------------------------------------------------------------------

  const pendingVerificationCount = orders.filter(
    (o) => o.payment_status === 'Pending Verification',
  ).length;

  // ---------------------------------------------------------------------------
  // Filter tabs
  // ---------------------------------------------------------------------------

  const PAYMENT_TABS: { label: string; value: PaymentStatusFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Pending Verification', value: 'Pending Verification' },
    { label: 'Paid', value: 'Paid' },
    { label: 'COD Pending', value: 'Pending' },
    { label: 'Rejected', value: 'Rejected' },
  ];

  const ORDER_STATUS_TABS: { label: string; value: OrderStatusFilter }[] = [
    { label: 'All statuses', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  // ---------------------------------------------------------------------------
  // Render helpers
  // ---------------------------------------------------------------------------

  function OrderActions({ order }: { order: Order }) {
    const busy = actionLoading[order.id];
    const err = actionError[order.id];

    const statusActions: { label: string; next: string; icon: React.ReactNode }[] = [];
    if (order.status === 'pending')   statusActions.push({ label: 'Confirm',   next: 'confirmed', icon: <CheckCircle className="w-3.5 h-3.5" /> });
    if (order.status === 'confirmed') statusActions.push({ label: 'Ship',       next: 'shipped',   icon: <Truck className="w-3.5 h-3.5" /> });
    if (order.status === 'shipped')   statusActions.push({ label: 'Delivered',  next: 'delivered', icon: <Package className="w-3.5 h-3.5" /> });
    if (!['delivered', 'cancelled'].includes(order.status))
      statusActions.push({ label: 'Cancel', next: 'cancelled', icon: <XCircle className="w-3.5 h-3.5" /> });

    return (
      <div className="flex flex-col gap-1.5">
        {/* Payment verification actions */}
        {order.payment_status === 'Pending Verification' && (
          <div className="flex gap-1">
            <button
              disabled={busy}
              onClick={() => handleVerifyPayment(order.id, 'Paid')}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-900/50 text-green-300 hover:bg-green-800/70 border border-green-700 disabled:opacity-50 transition"
            >
              {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
              Verify
            </button>
            <button
              disabled={busy}
              onClick={() => handleVerifyPayment(order.id, 'Rejected')}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-red-900/50 text-red-300 hover:bg-red-800/70 border border-red-700 disabled:opacity-50 transition"
            >
              <XCircle className="w-3 h-3" />
              Reject
            </button>
          </div>
        )}

        {/* Order status advancement */}
        <div className="flex flex-wrap gap-1">
          {statusActions.map((action) => (
            <button
              key={action.next}
              disabled={busy}
              onClick={() => handleUpdateStatus(order.id, action.next)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border disabled:opacity-50 transition ${
                action.next === 'cancelled'
                  ? 'bg-red-950/40 text-red-400 border-red-800 hover:bg-red-900/60'
                  : 'bg-charcoal text-gold border-gold/30 hover:bg-gold/10'
              }`}
            >
              {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : action.icon}
              {action.label}
            </button>
          ))}
        </div>

        {err && (
          <p className="text-red-400 text-xs mt-0.5">{err}</p>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // JSX
  // ---------------------------------------------------------------------------

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-cream">Orders Management</h1>
          <p className="text-muted text-sm mt-1">{total} total order{total !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 text-sm text-gold hover:text-gold/80 transition"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Alert: pending verifications on this page */}
      {pendingVerificationCount > 0 && (
        <div className="flex items-center gap-3 bg-blue-950/40 border border-blue-700/40 rounded-lg px-4 py-3 mb-6">
          <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <p className="text-blue-300 text-sm">
            <strong>{pendingVerificationCount}</strong> order{pendingVerificationCount !== 1 ? 's' : ''} on this page{' '}
            waiting for payment verification.
          </p>
        </div>
      )}

      {/* Payment status filter tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {PAYMENT_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setPaymentFilter(tab.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition border ${
              paymentFilter === tab.value
                ? 'bg-gold text-charcoal border-gold'
                : 'border-border text-muted hover:border-gold/50 hover:text-cream'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Order status filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ORDER_STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setOrderStatusFilter(tab.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition border ${
              orderStatusFilter === tab.value
                ? 'bg-gold/20 text-gold border-gold/50'
                : 'border-border text-muted hover:border-gold/30 hover:text-cream'
            }`}
          >
            {tab.label === 'All statuses' ? 'All statuses' : tab.label}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-950/40 border border-red-700/40 text-red-300 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      ) : orders.length === 0 ? (
        <div className="card text-center py-16">
          <Package className="w-12 h-12 text-muted mx-auto mb-4" />
          <p className="text-muted">No orders found for the selected filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-left">
                <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Order</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Items / Total</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Payment</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Screenshot</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Order Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => {
                const screenshotFullUrl = order.payment_screenshot
                  ? `${API_BASE}/${order.payment_screenshot}`
                  : null;

                return (
                  <tr
                    key={order.id}
                    className={`hover:bg-surface/50 transition ${
                      order.payment_status === 'Pending Verification'
                        ? 'bg-blue-950/10'
                        : ''
                    }`}
                  >
                    {/* Order ID + date */}
                    <td className="px-4 py-3">
                      <p className="font-mono text-gold font-bold text-xs">
                        #{order.id.substring(0, 8).toUpperCase()}
                      </p>
                      <p className="text-muted text-xs mt-0.5">
                        {new Date(order.created_at).toLocaleDateString('en-PK', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })}
                      </p>
                      <p className="text-muted text-xs">
                        {new Date(order.created_at).toLocaleTimeString('en-PK', {
                          hour: '2-digit', minute: '2-digit',
                        })}
                      </p>
                    </td>

                    {/* Customer */}
                    <td className="px-4 py-3">
                      <p className="text-cream font-medium">{order.customer_name}</p>
                      <p className="text-muted text-xs mt-0.5">{order.customer_phone}</p>
                      <p className="text-muted text-xs truncate max-w-[140px]">{order.customer_city}</p>
                    </td>

                    {/* Items / total */}
                    <td className="px-4 py-3">
                      <p className="text-cream font-bold">{formatPKR(order.total_amount)}</p>
                      <p className="text-muted text-xs mt-0.5">
                        {order.items?.length ?? 0} item{(order.items?.length ?? 0) !== 1 ? 's' : ''}
                      </p>
                    </td>

                    {/* Payment method + status */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1.5">
                        <MethodBadge method={order.payment_method} />
                        <PaymentStatusBadge status={order.payment_status} />
                      </div>
                    </td>

                    {/* Screenshot */}
                    <td className="px-4 py-3">
                      {screenshotFullUrl ? (
                        <button
                          onClick={() => setScreenshotUrl(screenshotFullUrl)}
                          className="flex items-center gap-1.5 text-xs text-gold hover:text-gold/70 transition border border-gold/30 rounded px-2 py-1 hover:bg-gold/10"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          View
                        </button>
                      ) : (
                        <span className="text-muted text-xs">—</span>
                      )}
                    </td>

                    {/* Order status badge */}
                    <td className="px-4 py-3">
                      <OrderStatusBadge status={order.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <OrderActions order={order} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-xs text-muted">
            Page {page} of {totalPages} · {total} orders
          </p>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-border text-muted text-xs hover:border-gold/50 hover:text-cream disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="flex items-center gap-1 px-3 py-1.5 rounded border border-border text-muted text-xs hover:border-gold/50 hover:text-cream disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Next
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Screenshot modal */}
      {screenshotUrl && (
        <ScreenshotModal
          url={screenshotUrl}
          onClose={() => setScreenshotUrl(null)}
        />
      )}
    </div>
  );
}
