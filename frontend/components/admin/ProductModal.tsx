'use client';

import { useState, useEffect } from 'react';
import { X, Package, Loader2, ImageIcon } from 'lucide-react';
import type { Product } from '@/lib/types';
import { generateSKU } from '@/lib/utils';

interface ProductModalProps {
  open: boolean;
  product?: Product | null;
  onClose: () => void;
  onSave: (data: Partial<Product>) => Promise<void>;
}

const CATEGORIES = [
  'Unstitched', 'Stitched', 'Lawn', 'Chiffon', 'Silk',
  'Linen', 'Khaddar', 'Embroidered', 'Formal', 'Casual',
  'Bridal', 'Party Wear', 'Winter Collection', 'Summer Collection',
];

const BRANDS = [
  'AL Imran Fabrics', 'Sana Safinaz', 'Gul Ahmed', 'Khaadi',
  'Sapphire', 'Zara Shahjahan', 'Rang Rasiya', 'Cross Stitch',
  'Maria B', 'Asim Jofa', 'Zellbury', 'Bonanza Satrangi',
];

interface FormState {
  name: string;
  sku: string;
  brand: string;
  category: string;
  description: string;
  price: string;
  compare_price: string;
  stock: string;
  image_url: string;
  is_featured: boolean;
  is_bestseller: boolean;
  is_new_arrival: boolean;
  is_active: boolean;
}

const DEFAULT_FORM: FormState = {
  name: '',
  sku: '',
  brand: 'AL Imran Fabrics',
  category: 'Unstitched',
  description: '',
  price: '',
  compare_price: '',
  stock: '',
  image_url: '',
  is_featured: false,
  is_bestseller: false,
  is_new_arrival: true,
  is_active: true,
};

export default function ProductModal({ open, product, onClose, onSave }: ProductModalProps) {
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const isEdit = !!product;

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name ?? '',
        sku: product.sku ?? '',
        brand: product.brand ?? 'AL Imran Fabrics',
        category: product.category ?? 'Unstitched',
        description: product.description ?? '',
        price: String(product.price ?? ''),
        compare_price: product.compare_price ? String(product.compare_price) : '',
        stock: String(product.stock ?? 0),
        image_url: product.image_url ?? '',
        is_featured: product.is_featured ?? false,
        is_bestseller: product.is_bestseller ?? false,
        is_new_arrival: product.is_new_arrival ?? false,
        is_active: product.is_active ?? true,
      });
    } else {
      setForm({ ...DEFAULT_FORM, sku: generateSKU() });
    }
    setErrors({});
  }, [product, open]);

  const set = (field: keyof FormState, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) errs.name = 'Product name is required';
    if (!form.sku.trim()) errs.sku = 'SKU is required';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      errs.price = 'Valid price is required';
    if (form.compare_price && (isNaN(Number(form.compare_price)) || Number(form.compare_price) <= 0))
      errs.compare_price = 'Compare price must be a positive number';
    if (form.stock !== '' && (isNaN(Number(form.stock)) || Number(form.stock) < 0))
      errs.stock = 'Stock must be 0 or more';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      await onSave({
        name: form.name.trim(),
        sku: form.sku.trim(),
        brand: form.brand,
        category: form.category,
        description: form.description.trim() || undefined,
        price: Number(form.price),
        compare_price: form.compare_price ? Number(form.compare_price) : undefined,
        stock: Number(form.stock || 0),
        image_url: form.image_url.trim() || undefined,
        is_featured: form.is_featured,
        is_bestseller: form.is_bestseller,
        is_new_arrival: form.is_new_arrival,
        is_active: form.is_active,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface border border-border rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-gold" />
            </div>
            <h2 className="text-lg font-semibold text-cream">
              {isEdit ? 'Edit Product' : 'Add New Product'}
            </h2>
          </div>
          <button onClick={onClose} className="text-muted hover:text-cream transition p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image preview */}
          {form.image_url && (
            <div className="flex justify-center">
              <div className="relative w-32 h-32 rounded-lg border border-border overflow-hidden bg-ivory">
                <img
                  src={form.image_url}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            </div>
          )}

          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Field label="Product Name *" error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set('name', e.target.value)}
                    placeholder="e.g. Embroidered Lawn 3-Piece"
                    className={inputCls(!!errors.name)}
                  />
                </Field>
              </div>

              <Field label="SKU *" error={errors.sku}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.sku}
                    onChange={(e) => set('sku', e.target.value)}
                    className={`flex-1 ${inputCls(!!errors.sku)}`}
                  />
                  <button
                    type="button"
                    onClick={() => set('sku', generateSKU())}
                    className="px-3 py-2 text-xs border border-border rounded-lg text-muted hover:text-cream hover:border-gold transition whitespace-nowrap"
                  >
                    Generate
                  </button>
                </div>
              </Field>

              <Field label="Brand *">
                <select value={form.brand} onChange={(e) => set('brand', e.target.value)} className={inputCls(false)}>
                  {BRANDS.map((b) => <option key={b}>{b}</option>)}
                </select>
              </Field>

              <Field label="Category *">
                <select value={form.category} onChange={(e) => set('category', e.target.value)} className={inputCls(false)}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>

              <Field label="Image URL">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={form.image_url}
                    onChange={(e) => set('image_url', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className={`flex-1 ${inputCls(false)}`}
                  />
                  <div className="flex-shrink-0 w-10 h-10 border border-border rounded-lg flex items-center justify-center bg-ivory overflow-hidden">
                    {form.image_url ? (
                      <img src={form.image_url} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-muted" />
                    )}
                  </div>
                </div>
              </Field>

              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  rows={3}
                  placeholder="Product description..."
                  className={`${inputCls(false)} resize-none sm:col-span-2`}
                />
              </Field>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">Pricing & Inventory</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Price (PKR) *" error={errors.price}>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">₨</span>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => set('price', e.target.value)}
                    min="0"
                    step="50"
                    placeholder="0"
                    className={`pl-8 ${inputCls(!!errors.price)}`}
                  />
                </div>
              </Field>

              <Field label="Compare Price (PKR)" error={errors.compare_price}>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">₨</span>
                  <input
                    type="number"
                    value={form.compare_price}
                    onChange={(e) => set('compare_price', e.target.value)}
                    min="0"
                    step="50"
                    placeholder="0"
                    className={`pl-8 ${inputCls(!!errors.compare_price)}`}
                  />
                </div>
              </Field>

              <Field label="Stock Qty" error={errors.stock}>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => set('stock', e.target.value)}
                  min="0"
                  step="1"
                  placeholder="0"
                  className={inputCls(!!errors.stock)}
                />
              </Field>
            </div>
          </div>

          {/* Flags */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">Product Flags</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {([
                ['is_active', 'Active'],
                ['is_featured', 'Featured'],
                ['is_bestseller', 'Bestseller'],
                ['is_new_arrival', 'New Arrival'],
              ] as [keyof FormState, string][]).map(([field, label]) => (
                <label key={field} className="flex items-center gap-2 cursor-pointer group">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                      form[field]
                        ? 'bg-gold border-gold'
                        : 'border-border group-hover:border-gold/50'
                    }`}
                    onClick={() => set(field, !form[field])}
                  >
                    {form[field] && (
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                        <path d="M10 3L5 8L2 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-muted group-hover:text-cream transition select-none">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-5 py-2.5 text-sm font-medium text-muted border border-border rounded-lg hover:bg-ivory hover:text-cream transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-gold text-white rounded-lg hover:bg-gold-dark transition disabled:opacity-50"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEdit ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full px-3 py-2 text-sm bg-charcoal border rounded-lg text-cream placeholder-muted/60 focus:outline-none focus:ring-2 transition ${
    hasError
      ? 'border-red-400 focus:ring-red-200'
      : 'border-border focus:border-gold focus:ring-gold/20'
  }`;
}
