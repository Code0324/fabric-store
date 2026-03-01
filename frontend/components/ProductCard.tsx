'use client';

import Link from 'next/link';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPKR, getDiscountPercentage } from '@/lib/utils';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
}

export default function ProductCard({ product, showActions = true }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const discountPercent = getDiscountPercentage(product.price, product.compare_price);
  const inStock = product.stock > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;
    addItem(product, 1);
  };

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <div className="bg-surface rounded-xl border border-border hover:border-gold/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/10 flex flex-col h-full overflow-hidden">

        {/* Image */}
        <div className="relative overflow-hidden bg-charcoal aspect-[3/4]">
          <img
            src={product.image_url || `https://picsum.photos/seed/${product.id}/300/400`}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${product.id}/300/400`;
            }}
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {discountPercent > 0 && (
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                -{discountPercent}%
              </span>
            )}
            {product.is_new_arrival && (
              <span className="bg-gold text-charcoal text-[10px] font-bold px-2 py-0.5 rounded-full">
                NEW
              </span>
            )}
            {product.is_featured && !product.is_new_arrival && (
              <span className="bg-gold/20 border border-gold/40 text-gold text-[10px] font-bold px-2 py-0.5 rounded-full">
                FEATURED
              </span>
            )}
          </div>

          {/* Stock overlay */}
          {!inStock && (
            <div className="absolute inset-0 bg-charcoal/70 flex items-center justify-center">
              <span className="text-muted text-sm font-medium border border-border px-3 py-1 rounded-full bg-surface/80">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 p-3.5">
          {/* Brand & Category */}
          <div className="flex items-center justify-between mb-1.5 min-h-[16px]">
            <span className="text-[10px] font-bold text-gold uppercase tracking-wider truncate">
              {product.brand || 'AL Imran'}
            </span>
            {product.stock > 0 && product.stock <= 10 && (
              <span className="text-[10px] text-amber-400 font-medium whitespace-nowrap ml-1">
                {product.stock} left
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="text-sm font-serif font-semibold text-cream line-clamp-2 mb-3 group-hover:text-gold transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Price — pinned to bottom of card */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-base font-bold text-gold">
                {formatPKR(product.price)}
              </span>
              {product.compare_price && product.compare_price > product.price && (
                <span className="text-xs text-muted line-through">
                  {formatPKR(product.compare_price)}
                </span>
              )}
            </div>

            {/* Actions */}
            {showActions && (
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    inStock
                      ? 'bg-gold text-charcoal hover:bg-gold-light active:bg-gold-dark'
                      : 'bg-border text-muted cursor-not-allowed'
                  }`}
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                <Link
                  href={`/products/${product.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 rounded-lg border border-border text-muted hover:border-gold hover:text-gold transition-colors"
                  aria-label="View product"
                >
                  <Eye className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
