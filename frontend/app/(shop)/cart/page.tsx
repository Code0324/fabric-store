'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { formatPKR } from '@/lib/utils';
import { Trash2, ShoppingCart, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clear, total, setCustomerInfo, customerName, phone, address, city } = useCartStore();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: customerName || '',
    phone: phone || '',
    address: address || '',
    city: city || '',
    notes: '',
  });

  const cartTotal = total();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerInfo({
      name: formData.customerName,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      notes: formData.notes,
    });
    // Proceed to checkout page
    window.location.href = '/checkout';
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <div className="text-center py-20">
            <ShoppingCart className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
            <h1 className="text-3xl font-serif font-bold text-cream mb-4">Your Cart is Empty</h1>
            <p className="text-muted mb-8">Discover our premium fabric collection and add items to your cart.</p>
            <Link href="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <h1 className="text-4xl font-serif font-bold text-cream mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="card flex gap-4">
                  {item.product.image && (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-cream mb-2">{item.product.name}</h3>
                    <p className="text-sm text-muted mb-3">{item.product.brand}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-surface rounded-lg p-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="text-gold hover:text-gold-light"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium text-cream">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="text-gold hover:text-gold-light"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-gold font-bold">{formatPKR(item.product.price * item.quantity)}</p>
                        <p className="text-xs text-muted">{formatPKR(item.product.price)} each</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-danger hover:text-red-400 transition mt-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <button
                onClick={() => clear()}
                className="mt-6 text-sm text-muted hover:text-danger transition underline"
              >
                Clear Cart
              </button>
            )}
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="font-serif font-bold text-cream mb-6 text-lg">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span className="text-cream">{formatPKR(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Shipping</span>
                  <span className="text-success text-xs">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Tax (est.)</span>
                  <span className="text-cream">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg text-gold mb-6">
                <span>Total</span>
                <span>{formatPKR(cartTotal)}</span>
              </div>

              <button
                onClick={() => setShowCheckoutForm(!showCheckoutForm)}
                className="btn btn-primary w-full mb-3"
              >
                Proceed to Checkout
              </button>

              <Link href="/products" className="btn btn-secondary w-full text-center text-sm">
                Continue Shopping
              </Link>

              {/* Checkout Form */}
              {showCheckoutForm && (
                <form onSubmit={handleCheckout} className="mt-6 pt-6 border-t border-border space-y-4">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Special Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="input"
                      rows={3}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-full">
                    Continue to Payment
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
