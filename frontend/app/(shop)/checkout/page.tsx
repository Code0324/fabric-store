'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ordersAPI } from '@/lib/api';
import { useAuthStore, useCartStore } from '@/lib/store';
import { formatPKR, generateWhatsAppURL } from '@/lib/utils';
import { ChevronLeft, CheckCircle, Loader2, AlertCircle, Upload, X } from 'lucide-react';
import type { Order } from '@/lib/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PaymentMethod = 'cod' | 'easypaisa' | 'jazzcash';

interface PaymentDetails {
  label: string;
  accountTitle: string;
  number: string;
}

const PAYMENT_INFO: Record<'easypaisa' | 'jazzcash', PaymentDetails> = {
  easypaisa: {
    label: 'Easypaisa',
    accountTitle: 'Al Imran Fabrics',
    number: '03XX-XXXXXXX',  // Replace with real number
  },
  jazzcash: {
    label: 'JazzCash',
    accountTitle: 'Al Imran Fabrics',
    number: '03XX-XXXXXXX',  // Replace with real number
  },
};

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  cod: 'Cash on Delivery (COD)',
  easypaisa: 'Easypaisa',
  jazzcash: 'JazzCash',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoggedIn, token } = useAuthStore();
  const { items, total, customerName, phone, address, city, notes, clear } = useCartStore();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [screenshotError, setScreenshotError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  const cartTotal = total();

  // Route protection
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

  // Countdown redirect after order is confirmed
  useEffect(() => {
    if (!confirmedOrder) return;
    if (redirectCountdown <= 0) {
      router.push('/orders');
      return;
    }
    const timer = setTimeout(() => setRedirectCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [confirmedOrder, redirectCountdown, router]);

  // Clear screenshot when switching to COD
  useEffect(() => {
    if (paymentMethod === 'cod') {
      setScreenshot(null);
      setScreenshotPreview(null);
      setScreenshotError('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [paymentMethod]);

  // ---------------------------------------------------------------------------
  // File handling
  // ---------------------------------------------------------------------------

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setScreenshotError('');

    if (!file) {
      setScreenshot(null);
      setScreenshotPreview(null);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setScreenshotError('Only image files are accepted (JPEG, PNG, WebP, etc.).');
      setScreenshot(null);
      setScreenshotPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setScreenshotError('File size must be under 5 MB.');
      setScreenshot(null);
      setScreenshotPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setScreenshot(file);
    setScreenshotPreview(URL.createObjectURL(file));
  };

  const removeScreenshot = () => {
    setScreenshot(null);
    setScreenshotPreview(null);
    setScreenshotError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ---------------------------------------------------------------------------
  // Submit
  // ---------------------------------------------------------------------------

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate screenshot requirement
    if (paymentMethod !== 'cod' && !screenshot) {
      setScreenshotError('Please upload a payment screenshot to continue.');
      return;
    }

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
        payment_method: paymentMethod,
        screenshot: screenshot ?? undefined,
      };

      const response = await ordersAPI.createWithPayment(orderData);
      const placedOrder: Order = response.data;

      // WhatsApp notification
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

  // ---------------------------------------------------------------------------
  // Order confirmation screen
  // ---------------------------------------------------------------------------

  if (confirmedOrder) {
    const isManual = confirmedOrder.payment_method !== 'cod';
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-lg mx-auto text-center py-16">
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-cream mb-4">Order Placed!</h1>
            <p className="text-muted mb-6">
              {isManual
                ? 'Your order has been received. We will verify your payment screenshot and confirm your order shortly.'
                : 'Your order has been received and is being processed. A WhatsApp confirmation has been sent.'}
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
                <p className="text-cream font-medium">
                  {PAYMENT_LABELS[confirmedOrder.payment_method as PaymentMethod] ?? confirmedOrder.payment_method}
                </p>
              </div>
              <div className="mb-4 pb-4 border-b border-border">
                <p className="text-xs text-muted uppercase mb-1">Payment Status</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  confirmedOrder.payment_status === 'Pending Verification'
                    ? 'bg-blue-900 text-blue-200'
                    : 'bg-yellow-900 text-yellow-200'
                }`}>
                  {confirmedOrder.payment_status}
                </span>
              </div>
              <div className="mb-4 pb-4 border-b border-border">
                <p className="text-xs text-muted uppercase mb-1">Total Amount</p>
                <p className="text-gold font-bold text-xl">{formatPKR(confirmedOrder.total_amount)}</p>
              </div>
              <div>
                <p className="text-xs text-muted uppercase mb-1">Order Status</p>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-900 text-yellow-200">
                  Pending
                </span>
              </div>
            </div>

            {isManual && (
              <div className="bg-blue-950/40 border border-blue-700/30 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-blue-300">
                  <strong>Next step:</strong> Our team will review your payment screenshot within 1–2 hours
                  and confirm your order via WhatsApp.
                </p>
              </div>
            )}

            <p className="text-sm text-muted mb-6">
              Redirecting to your orders in{' '}
              <span className="text-gold font-bold">{redirectCountdown}</span>{' '}
              second{redirectCountdown !== 1 ? 's' : ''}...
            </p>

            <button onClick={() => router.push('/orders')} className="btn btn-primary">
              View My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Guard while route-protection useEffect runs
  if (!isLoggedIn || items.length === 0 || !customerName) {
    return null;
  }

  const needsScreenshot = paymentMethod !== 'cod';
  const paymentInfo = paymentMethod !== 'cod' ? PAYMENT_INFO[paymentMethod] : null;

  // ---------------------------------------------------------------------------
  // Checkout form
  // ---------------------------------------------------------------------------

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
              <form onSubmit={handleCheckout} className="space-y-8">

                {/* Order Items Summary */}
                <div className="card">
                  <h2 className="font-serif font-bold text-cream mb-6">Order Items</h2>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex justify-between items-center border-b border-border pb-4 last:border-0 last:pb-0"
                      >
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
                            <p className="text-xs text-muted">
                              Qty: {item.quantity} × {formatPKR(item.product.price)}
                            </p>
                          </div>
                        </div>
                        <p className="text-gold font-bold whitespace-nowrap">
                          {formatPKR(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-border space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">
                        Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})
                      </span>
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
                        <textarea
                          value={notes}
                          disabled
                          className="input opacity-60 cursor-not-allowed"
                          rows={3}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="card">
                  <h2 className="font-serif font-bold text-cream mb-6">Payment Method</h2>

                  <div className="space-y-3 mb-6">
                    {/* COD */}
                    <label
                      className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition ${
                        paymentMethod === 'cod'
                          ? 'border-gold bg-gold/10'
                          : 'border-border hover:border-gold/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="mt-1 accent-gold"
                      />
                      <div>
                        <p className="font-medium text-cream">Cash on Delivery (COD)</p>
                        <p className="text-sm text-muted mt-0.5">
                          Pay when your order is delivered. No advance payment needed.
                        </p>
                      </div>
                    </label>

                    {/* Easypaisa */}
                    <label
                      className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition ${
                        paymentMethod === 'easypaisa'
                          ? 'border-gold bg-gold/10'
                          : 'border-border hover:border-gold/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value="easypaisa"
                        checked={paymentMethod === 'easypaisa'}
                        onChange={() => setPaymentMethod('easypaisa')}
                        className="mt-1 accent-gold"
                      />
                      <div>
                        <p className="font-medium text-cream">Easypaisa</p>
                        <p className="text-sm text-muted mt-0.5">
                          Transfer to our Easypaisa account and upload proof of payment.
                        </p>
                      </div>
                    </label>

                    {/* JazzCash */}
                    <label
                      className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition ${
                        paymentMethod === 'jazzcash'
                          ? 'border-gold bg-gold/10'
                          : 'border-border hover:border-gold/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_method"
                        value="jazzcash"
                        checked={paymentMethod === 'jazzcash'}
                        onChange={() => setPaymentMethod('jazzcash')}
                        className="mt-1 accent-gold"
                      />
                      <div>
                        <p className="font-medium text-cream">JazzCash</p>
                        <p className="text-sm text-muted mt-0.5">
                          Transfer to our JazzCash account and upload proof of payment.
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Payment details card (Easypaisa / JazzCash) */}
                  {paymentInfo && (
                    <div className="bg-charcoal border border-gold/30 rounded-lg p-5 mb-6">
                      <h3 className="font-semibold text-gold mb-3">
                        {paymentInfo.label} Transfer Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted">Account Title</span>
                          <span className="text-cream font-medium">{paymentInfo.accountTitle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">Account Number</span>
                          <span className="text-gold font-bold font-mono">{paymentInfo.number}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">Amount to Transfer</span>
                          <span className="text-gold font-bold">{formatPKR(cartTotal)}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted mt-4">
                        Please transfer the exact amount and upload the payment screenshot below.
                        Your order will be confirmed after verification.
                      </p>
                    </div>
                  )}

                  {/* Screenshot upload (Easypaisa / JazzCash only) */}
                  {needsScreenshot && (
                    <div className="mb-6">
                      <label className="form-label mb-2">
                        Payment Screenshot <span className="text-danger">*</span>
                      </label>

                      {!screenshotPreview ? (
                        <div
                          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                            screenshotError
                              ? 'border-danger bg-danger/5'
                              : 'border-border hover:border-gold/50 hover:bg-gold/5'
                          }`}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="w-8 h-8 text-muted mx-auto mb-2" />
                          <p className="text-sm text-cream font-medium">Click to upload screenshot</p>
                          <p className="text-xs text-muted mt-1">JPEG, PNG, WebP — max 5 MB</p>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </div>
                      ) : (
                        <div className="relative inline-block">
                          <img
                            src={screenshotPreview}
                            alt="Payment screenshot preview"
                            className="max-h-48 rounded-lg border border-border object-contain"
                          />
                          <button
                            type="button"
                            onClick={removeScreenshot}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-danger rounded-full flex items-center justify-center"
                          >
                            <X className="w-3.5 h-3.5 text-white" />
                          </button>
                          <p className="text-xs text-success mt-2 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> {screenshot?.name}
                          </p>
                        </div>
                      )}

                      {screenshotError && (
                        <p className="text-danger text-xs mt-2 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {screenshotError}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading || (needsScreenshot && !screenshot)}
                    className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      `Place Order — ${PAYMENT_LABELS[paymentMethod]}`
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
                        {item.product.name}{' '}
                        <span className="text-gold">×{item.quantity}</span>
                      </span>
                      <span className="text-cream whitespace-nowrap">
                        {formatPKR(item.product.price * item.quantity)}
                      </span>
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
