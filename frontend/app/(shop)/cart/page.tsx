'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import { formatPKR } from '@/lib/utils';
import { Trash2, ShoppingCart, Plus, Minus, AlertCircle } from 'lucide-react';

interface FormErrors {
  customerName?: string;
  phone?: string;
  address?: string;
  city?: string;
}

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clear, total, setCustomerInfo, customerName, phone, address, city, notes } = useCartStore();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: customerName || '',
    phone: phone || '',
    address: address || '',
    city: city || '',
    notes: notes || '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const cartTotal = total();

  const validate = (data: typeof formData): FormErrors => {
    const newErrors: FormErrors = {};
    if (!data.customerName.trim()) {
      newErrors.customerName = 'Full name is required';
    }
    if (!data.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+92|0)[0-9]{9,10}$/.test(data.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid Pakistani phone number (e.g. 03001234567)';
    }
    if (!data.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }
    if (!data.city.trim()) {
      newErrors.city = 'City is required';
    }
    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    // Re-validate touched fields live
    if (touched[name]) {
      const newErrors = validate(updated);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all fields as touched
    setTouched({ customerName: true, phone: true, address: true, city: true });
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setCustomerInfo({
      name: formData.customerName,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      notes: formData.notes,
    });
    router.push('/checkout');
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
                  {item.product.image_url && (
                    <img
                      src={item.product.image_url}
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
                {showCheckoutForm ? 'Hide Details' : 'Proceed to Checkout'}
              </button>

              <Link href="/products" className="btn btn-secondary w-full text-center text-sm">
                Continue Shopping
              </Link>

              {/* Checkout Form */}
              {showCheckoutForm && (
                <form onSubmit={handleCheckout} noValidate className="mt-6 pt-6 border-t border-border space-y-4">
                  <p className="text-sm text-muted mb-4">
                    Enter your delivery details to continue.
                  </p>

                  {/* Full Name */}
                  <div>
                    <label className="form-label">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`input ${errors.customerName ? 'border-danger focus:border-danger' : ''}`}
                      placeholder="e.g. Ahmed Khan"
                    />
                    {errors.customerName && (
                      <p className="flex items-center gap-1 text-danger text-xs mt-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.customerName}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="form-label">
                      Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`input ${errors.phone ? 'border-danger focus:border-danger' : ''}`}
                      placeholder="e.g. 03001234567"
                    />
                    {errors.phone && (
                      <p className="flex items-center gap-1 text-danger text-xs mt-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="form-label">
                      Delivery Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`input ${errors.address ? 'border-danger focus:border-danger' : ''}`}
                      placeholder="House no., Street, Area"
                    />
                    {errors.address && (
                      <p className="flex items-center gap-1 text-danger text-xs mt-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="form-label">
                      City <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`input ${errors.city ? 'border-danger focus:border-danger' : ''}`}
                      placeholder="e.g. Lahore"
                    />
                    {errors.city && (
                      <p className="flex items-center gap-1 text-danger text-xs mt-1">
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        {errors.city}
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="form-label">Special Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="input"
                      rows={3}
                      placeholder="Any special instructions for delivery..."
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
