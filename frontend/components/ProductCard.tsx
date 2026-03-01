'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { formatPKR, getDiscountPercentage } from '@/lib/utils';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  showActions?: boolean;
}

export default function ProductCard({ product, showActions = true }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [wishlisted, setWishlisted] = useState(false);
  const discountPercent = getDiscountPercentage(product.price, product.compare_price);
  const inStock = product.stock > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;
    addItem(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((v) => !v);
  };

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <div
        className="product-card-hover"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E0D8CC',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {/* ── Image ── */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            background: '#F5F0E8',
            aspectRatio: '3/4',
          }}
        >
          <img
            src={product.image_url || `https://picsum.photos/seed/${product.id}/300/400`}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
            className="group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${product.id}/300/400`;
            }}
          />

          {/* Badges */}
          <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {discountPercent > 0 && (
              <span
                style={{
                  background: '#B8963E',
                  color: '#FFFFFF',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                }}
              >
                -{discountPercent}%
              </span>
            )}
            {product.is_new_arrival && (
              <span
                style={{
                  background: '#1A1A1A',
                  color: '#FFFFFF',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  padding: '3px 8px',
                }}
              >
                NEW
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            aria-label="Add to wishlist"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '32px',
              height: '32px',
              background: '#FFFFFF',
              border: '1px solid #E0D8CC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              opacity: 0,
              transition: 'opacity 0.2s ease',
            }}
            className="group-hover:opacity-100"
          >
            <Heart
              className="w-3.5 h-3.5"
              style={{
                fill: wishlisted ? '#B8963E' : 'transparent',
                color: wishlisted ? '#B8963E' : '#6B6560',
                transition: 'fill 0.2s ease, color 0.2s ease',
                transform: wishlisted ? 'scale(1.15)' : 'scale(1)',
              }}
            />
          </button>

          {/* Out of Stock overlay */}
          {!inStock && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(250,247,242,0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#6B6560',
                  border: '1px solid #E0D8CC',
                  padding: '5px 14px',
                  background: '#FFFFFF',
                }}
              >
                Out of Stock
              </span>
            </div>
          )}

          {/* Add to Cart — slides up on hover */}
          {showActions && inStock && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                transform: 'translateY(100%)',
                transition: 'transform 0.3s ease',
              }}
              className="group-hover:translate-y-0"
            >
              <button
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  background: '#1A1A1A',
                  color: '#FFFFFF',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding: '11px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#B8963E';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#1A1A1A';
                }}
                aria-label="Add to cart"
              >
                <ShoppingCart style={{ width: '13px', height: '13px' }} />
                Add to Cart
              </button>
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '14px' }}>
          {/* Collection label */}
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: '#B8963E',
              marginBottom: '5px',
            }}
          >
            {product.brand || 'AL Imran'}
          </p>

          {/* Product name */}
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '17px',
              fontWeight: 400,
              color: '#1A1A1A',
              lineHeight: 1.3,
              marginBottom: '10px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              transition: 'color 0.2s ease',
            }}
            className="group-hover:text-gold"
          >
            {product.name}
          </h3>

          {/* Price — pushed to bottom */}
          <div style={{ marginTop: 'auto' }}>
            {product.stock > 0 && product.stock <= 10 && (
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '10px',
                  color: '#B8963E',
                  letterSpacing: '0.5px',
                  marginBottom: '4px',
                }}
              >
                Only {product.stock} left
              </p>
            )}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#1A1A1A',
                }}
              >
                {formatPKR(product.price)}
              </span>
              {product.compare_price && product.compare_price > product.price && (
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '12px',
                    color: '#6B6560',
                    textDecoration: 'line-through',
                  }}
                >
                  {formatPKR(product.compare_price)}
                </span>
              )}
            </div>

            {/* View detail link (no add-to-cart button — it's on image hover) */}
            {showActions && !inStock && (
              <Link
                href={`/products/${product.id}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  marginTop: '10px',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: '#6B6560',
                }}
              >
                <Eye style={{ width: '12px', height: '12px' }} />
                View
              </Link>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
