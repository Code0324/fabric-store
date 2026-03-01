'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { productsAPI } from '@/lib/api';
import { useCartStore } from '@/lib/store';
import { formatPKR, getDiscountPercentage, isOnSale } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { ChevronLeft, ShoppingCart, Plus, Minus, CheckCircle, AlertCircle, Tag } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await productsAPI.get(params.id as string);
        setProduct(res.data);
      } catch (err: any) {
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product || product.stock === 0) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <AlertCircle className="w-12 h-12 text-danger" />
        <p className="text-cream text-lg">{error || 'Product not found'}</p>
        <Link href="/products" className="btn btn-primary">Back to Products</Link>
      </div>
    );
  }

  const onSale = isOnSale(product.compare_price);
  const discount = getDiscountPercentage(product.price, product.compare_price);
  const categorySlug = product.category?.toLowerCase().replace(/\s+/g, '-');
  const brandSlug = product.brand?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="min-h-screen py-10">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link href="/" className="hover:text-gold transition">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gold transition">Products</Link>
          {product.category && (
            <>
              <span>/</span>
              <Link href={`/products/category/${categorySlug}`} className="hover:text-gold transition capitalize">
                {product.category}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-cream truncate max-w-[180px]">{product.name}</span>
        </nav>

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition mb-8 text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square bg-surface rounded-2xl overflow-hidden border border-border">
              <img
                src={product.image_url || `https://picsum.photos/seed/${product.id}/600/600`}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${product.id}/600/600`;
                }}
              />
            </div>
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {onSale && (
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  -{discount}% OFF
                </span>
              )}
              {product.is_featured && (
                <span className="bg-gold text-charcoal text-xs font-bold px-3 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Brand & Category */}
            <div className="flex items-center gap-3 mb-3">
              {product.brand && (
                <Link
                  href={`/products/brand/${brandSlug}`}
                  className="text-xs font-bold text-gold uppercase tracking-widest hover:text-gold-light transition"
                >
                  {product.brand}
                </Link>
              )}
              {product.category && (
                <>
                  <span className="text-border">|</span>
                  <Link
                    href={`/products/category/${categorySlug}`}
                    className="text-xs text-muted hover:text-gold transition capitalize"
                  >
                    {product.category}
                  </Link>
                </>
              )}
            </div>

            {/* Name */}
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-cream mb-4 leading-snug">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold text-gold">{formatPKR(product.price)}</span>
              {product.compare_price && product.compare_price > product.price && (
                <span className="text-lg text-muted line-through">{formatPKR(product.compare_price)}</span>
              )}
            </div>

            {/* Savings callout */}
            {onSale && product.compare_price && (
              <p className="text-sm text-green-400 flex items-center gap-1 mb-4">
                <Tag className="w-3.5 h-3.5" />
                You save {formatPKR(product.compare_price - product.price)}
              </p>
            )}

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              {product.stock > 0 ? (
                <span className="text-sm text-success flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-sm text-danger flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-muted leading-relaxed mb-6 text-sm border-t border-border pt-6">
                {product.description}
              </p>
            )}

            {/* Quantity + Add to Cart */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-4 mt-auto">
                {/* Quantity Selector */}
                <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-gold hover:text-gold-light transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-cream font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="text-gold hover:text-gold-light transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 btn flex items-center justify-center gap-2 text-base transition-all ${
                    added
                      ? 'bg-success text-white'
                      : 'btn-primary'
                  }`}
                >
                  {added ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            )}

            <Link
              href="/cart"
              className="btn btn-secondary text-center text-sm"
            >
              View Cart
            </Link>

            {/* SKU */}
            {product.sku && (
              <p className="text-xs text-muted mt-4">SKU: {product.sku}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
