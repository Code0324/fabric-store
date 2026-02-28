'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ordersAPI } from '@/lib/api';
import { useAuthStore, useCartStore } from '@/lib/store';
import { formatPKR, generateWhatsAppURL } from '@/lib/utils';
import { ChevronLeft, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import type { Order } from '@/lib/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoggedIn, token } = useAuthStore();
  const { items, total, customerName, phone, address, city, notes, clear } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState(3);
  const cartTotal = total();

  // Route protection: redirect if cart empty, customer info incomplete, or not authenticated
  useEffect(() => {
    if (!isLoggedIn || !token) {
      router.replace('/login?redirect=/checkout');
      return;
    }
    if (items.length === 0) {
      router.replace('/cart');
      return;
    }
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      router.replace('/cart');
      return;
    }
  }, [isLoggedIn, token, items.length, customerName, phone, address, router]);

  // 3-second countdown redirect after order is confirmed
  useEffect(() => {
    if (!confirmedOrder) return;
    if (redirectCountdown <= 0) {
      router.push('/orders');
      return;
    }
    const timer = setTimeout(() => setRedirectCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [confirmedOrder, redirectCountdown, router]);

  const handleCODCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const orderData = {
        items: items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
        customer_name: customerName,
        customer_phone: phone,
        customer_address: address,
        customer_city: city,
        customer_notes: notes,
        payment_method: 'cod' as const,
      };

      const response = await ordersAPI.create(orderData);
      const placedOrder: Order = response.data;

      // Send WhatsApp notification
      const waURL = generateWhatsAppURL({
        items,
        totalAmount: cartTotal,
        customerName,
        phone,
        address,
        city,
        notes,
      });
      window.open(waURL, '_blank');

      // Clear cart from Zustand
      clear();

      // Show confirmation state; countdown to /orders redirect starts via useEffect
      setConfirmedOrder(placedOrder);
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      if (typeof detail === 'string') {
        setError(detail);
      } else if (Array.isArray(detail)) {
        setError(detail.map((d: any) => d.msg).join(', '));
      } else {
        setError('Failed to place order. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Show order confirmation screen
  if (confirmedOrder) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-cream mb-4">Order Placed!</h1>
            <p className="text-muted mb-6">
              Your order has been received and is being processed. A WhatsApp confirmation has been sent.
            </p>

            <div className="card text-left mb-8">
              <div className="mb-4 pb-4 border-b border-border">
                <p className="text-xs text-muted uppercase mb-1">Order ID</p>
                <p className="font-mono text-gold font-bold text-lg">
                  #{confirmedOrder.id.substring(0, 8).toUpperCase()}
                </p>
              </div>
              <div className="mb-4 pb-4 border-b border-border">
                <p className="text-xs text-muted uppercase mb-1">Payment Method</p>
                <p className="text-cream font-medium">Cash on Delivery (COD)</p>
              </div>
              <div className="mb-4 pb-4 border-b border-border">
                <p className="text-xs text-muted uppercase mb-1">Total Amount</p>
                <p className="text-gold font-bold text-xl">{formatPKR(confirmedOrder.total_amount)}</p>
              </div>
              <div>
                <p className="text-xs text-muted uppercase mb-1">Status</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-900 text-yellow-200">
                  Pending
                </span>
              </div>
            </div>

            <p className="text-sm text-muted mb-6">
              Redirecting to your orders in{' '}
              <span className="text-gold font-bold">{redirectCountdown}</span> second{redirectCountdown !== 1 ? 's' : ''}...
            </p>

            <button
              onClick={() => router.push('/orders')}
              className="btn btn-primary"
            >
              View My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Guard: while route protection useEffect is running, show nothing to avoid flash
  if (!isLoggedIn || items.length === 0 || !customerName) {
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <Link href="/cart" className="inline-flex items-center gap-2 text-gold mb-12">
          <ChevronLeft className="w-5 h-5" />
          Back to Cart
        </Link>

        <div className="max-w-4xl">
          <h1 className="text-4xl font-serif font-bold text-cream mb-12">Checkout</h1>

          {error && (
            <div className="flex items-start gap-3 bg-danger/20 border border-danger text-danger px-4 py-3 rounded-lg mb-8">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Order Failed</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleCODCheckout} className="space-y-8">
                {/* Order Items Summary */}
                <div className="card">
                  <h2 className="font-serif font-bold text-cream mb-6">Order Items</h2>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-center border-b border-border pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          {item.product.image_url && (
                            <img
                              src={item.product.image_url}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          )}
                          <div>
                            <h3 className="font-medium text-cream text-sm">{item.product.name}</h3>
                            <p className="text-xs text-muted">{item.product.brand}</p>
                            <p className="text-xs text-muted">Qty: {item.quantity} × {formatPKR(item.product.price)}</p>
                          </div>
                        </div>
                        <p className="text-gold font-bold whitespace-nowrap">{formatPKR(item.product.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Subtotal and total inside items card */}
                  <div className="mt-4 pt-4 border-t border-border space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})</span>
                      <span className="text-cream">{formatPKR(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Shipping</span>
                      <span className="text-success font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
                      <span className="text-cream">Total</span>
                      <span className="text-gold">{formatPKR(cartTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif font-bold text-cream">Delivery Information</h2>
                    <Link href="/cart" className="text-sm text-gold hover:text-gold-light transition">
                      Edit
                    </Link>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          value={customerName}
                          disabled
                          className="input opacity-60 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="form-label">Phone</label>
                        <input
                          type="tel"
                          value={phone}
                          disabled
                          className="input opacity-60 cursor-not-allowed"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        value={address}
                        disabled
                        className="input opacity-60 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        value={city}
                        disabled
                        className="input opacity-60 cursor-not-allowed"
                      />
                    </div>
                    {notes && (
                      <div>
                        <label className="form-label">Special Notes</label>
                        <textarea value={notes} disabled className="input opacity-60 cursor-not-allowed" rows={3} />
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="card">
                  <h2 className="font-serif font-bold text-cream mb-6">Payment Method</h2>
                  <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <input type="radio" name="payment" id="cod" defaultChecked className="mt-1" />
                      <div className="flex-1">
                        <label htmlFor="cod" className="font-medium text-cream cursor-pointer">
                          Cash on Delivery (COD)
                        </label>
                        <p className="text-sm text-muted mt-1">
                          Pay when your order is delivered. Free delivery on all orders.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      'Place Order (COD)'
                    )}
                  </button>

                  {loading && (
                    <p className="text-center text-sm text-muted mt-3">
                      Please wait while we process your order...
                    </p>
                  )}
                </div>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h2 className="font-serif font-bold text-cream mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-muted truncate mr-2">
                        {item.product.name} <span className="text-gold">×{item.quantity}</span>
                      </span>
                      <span className="text-cream whitespace-nowrap">{formatPKR(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-border mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Subtotal</span>
                    <span className="text-cream">{formatPKR(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Shipping</span>
                    <span className="text-success font-medium">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-lg text-gold pt-4 border-t border-border mb-6">
                  <span>Total</span>
                  <span>{formatPKR(cartTotal)}</span>
                </div>

                <div className="text-xs text-muted space-y-2">
                  <p className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-success" /> Secure checkout
                  </p>
                  <p className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-success" /> Free delivery on all orders
                  </p>
                  <p className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-success" /> WhatsApp order confirmation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
