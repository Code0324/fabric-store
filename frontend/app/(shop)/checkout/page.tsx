'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ordersAPI } from '@/lib/api';
import { useAuthStore, useCartStore } from '@/lib/store';
import { formatPKR, generateWhatsAppURL } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { items, total, customerName, phone, address, city, notes, clear } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const cartTotal = total();

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <Link href="/cart" className="inline-flex items-center gap-2 text-gold mb-8">
            <ChevronLeft className="w-5 h-5" />
            Back to Cart
          </Link>
          <div className="text-center py-20">
            <p className="text-lg text-muted mb-4">Your cart is empty. Add items before checkout.</p>
            <Link href="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

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

      clear();
      router.push('/orders');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

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
            <div className="bg-danger/20 border border-danger text-danger px-4 py-3 rounded-lg mb-8">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleCODCheckout} className="space-y-8">
                {/* Order Summary */}
                <div className="card">
                  <h2 className="font-serif font-bold text-cream mb-6">Order Items</h2>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-center border-b border-border pb-4">
                        <div>
                          <h3 className="font-medium text-cream">{item.product.name}</h3>
                          <p className="text-sm text-muted">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-gold font-bold">{formatPKR(item.product.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="card">
                  <h2 className="font-serif font-bold text-cream mb-6">Delivery Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        value={customerName}
                        disabled
                        className="input opacity-60 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="form-label">Phone *</label>
                      <input
                        type="tel"
                        value={phone}
                        disabled
                        className="input opacity-60 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="form-label">Address *</label>
                      <input
                        type="text"
                        value={address}
                        disabled
                        className="input opacity-60 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="form-label">City *</label>
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
                    <Link href="/cart" className="text-sm text-gold hover:text-gold-light transition">
                      ← Edit delivery information
                    </Link>
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
                          Pay when your order is delivered. Free delivery on orders above PKR 5,000.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Processing...' : 'Complete Order'}
                  </button>
                </div>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h2 className="font-serif font-bold text-cream mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Subtotal ({items.length} items)</span>
                    <span className="text-cream">{formatPKR(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Shipping</span>
                    <span className="text-success font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Tax (est.)</span>
                    <span className="text-cream">TBD</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-lg text-gold mb-6">
                  <span>Total</span>
                  <span>{formatPKR(cartTotal)}</span>
                </div>

                <div className="text-xs text-muted space-y-2">
                  <p>✓ Secure checkout</p>
                  <p>✓ Free delivery above PKR 5,000</p>
                  <p>✓ Easy returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
