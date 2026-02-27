'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPKR, getDiscountPercentage, isOnSale } from '@/lib/utils';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
}

export default function ProductCard({ product, showActions = true }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const discountPercent = getDiscountPercentage(product.price, product.compare_price);
  const onSale = isOnSale(product.compare_price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="card group h-full hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-lg mb-4 bg-surface h-64 flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="text-muted text-center">No image available</div>
          )}

          {/* Badges */}
          <div className="absolute top-3 right-3 flex gap-2">
            {onSale && (
              <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                -{discountPercent}%
              </div>
            )}
            {product.is_featured && (
              <div className="bg-gold text-charcoal px-3 py-1 rounded-full text-xs font-bold">
                Featured
              </div>
            )}
          </div>

          {/* Stock Status */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-3">
            {product.stock > 0 ? (
              <span className="text-xs text-success font-medium">In Stock ({product.stock})</span>
            ) : (
              <span className="text-xs text-danger font-medium">Out of Stock</span>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          {/* Brand & Category */}
          <div className="mb-2">
            <p className="text-xs text-muted uppercase tracking-wider">{product.brand}</p>
            <p className="text-xs text-gold/70">{product.category}</p>
          </div>

          {/* Name */}
          <h3 className="text-sm font-serif font-bold text-cream mb-3 group-hover:text-gold transition line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mb-4 mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gold">{formatPKR(product.price)}</span>
              {product.compare_price && (
                <span className="text-xs text-muted line-through">{formatPKR(product.compare_price)}</span>
              )}
            </div>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex gap-2">
              <div className="flex-1 bg-gold/10 border border-gold/20 rounded-lg overflow-hidden flex">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 py-2 flex items-center justify-center gap-2 font-medium transition-colors ${
                    product.stock > 0
                      ? 'text-gold hover:bg-gold/20 active:bg-gold/30'
                      : 'text-muted cursor-not-allowed opacity-50'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Add</span>
                </button>
              </div>
              <div className="px-3 py-2 bg-surface border border-border rounded-lg text-center text-sm text-cream hover:bg-charcoal transition">
                View
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
