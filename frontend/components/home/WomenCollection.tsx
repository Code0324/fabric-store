'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, Star, Scissors, Heart, Gem, Crown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/types';

const WOMEN_CATEGORIES = [
  { icon: Sparkles, label: 'Lawn Suits',  href: '/products?category=Women+Lawn+Unstitched' },
  { icon: Star,     label: 'Pret',        href: '/products?category=Women+Stitched+Pret' },
  { icon: Scissors, label: 'Unstitched',  href: '/products?category=Women+Lawn+Unstitched' },
  { icon: Heart,    label: 'Embroidered', href: '/products?category=Women%27s+Embroidered+Unstitched' },
  { icon: Gem,      label: 'Luxury',      href: '/products?category=Luxury+Formal' },
  { icon: Crown,    label: 'Bridal',      href: '/products?category=Bridal+%26+Wedding' },
];

const ITEMS_PER_PAGE = 8;

interface WomenCollectionProps {
  products: Product[];
  loading: boolean;
  carouselIndex: number;
  handleNext: () => void;
  handlePrev: () => void;
}

export const WomenCollection = ({
  products,
  loading,
  carouselIndex,
  handleNext,
  handlePrev,
}: WomenCollectionProps) => {
  const visible = products.slice(carouselIndex, carouselIndex + ITEMS_PER_PAGE);

  return (
    <section style={{ background: '#FAF7F2' }}>
      {/* Banner */}
      <div
        className="relative flex items-center justify-start overflow-hidden"
        style={{
          height: '280px',
          backgroundImage: 'url(/images/women-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#F5F0E8',
        }}
      >
        {/* Cream gradient overlay — text side */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(250,247,242,0.92) 0%, rgba(250,247,242,0.70) 40%, rgba(250,247,242,0.15) 100%)',
          }}
        />
        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <p className="section-label" style={{ marginBottom: '10px' }}>
            New Season
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#1A1A1A',
              lineHeight: 1.1,
              marginBottom: '20px',
              letterSpacing: '1px',
            }}
          >
            Women&apos;s Collection
          </h2>
          {/* Gold rule ornament */}
          <div className="ornament-divider" style={{ maxWidth: '200px', marginBottom: '20px' }}>✦</div>
          <Link href="/products" className="btn btn-secondary" style={{ padding: '10px 28px' }}>
            View All
          </Link>
        </div>
      </div>

      {/* Category Icons */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E0D8CC' }}>
        <div className="container px-4 py-5">
          <div className="flex items-center justify-center gap-6 md:gap-10 overflow-x-auto scrollbar-hide">
            {WOMEN_CATEGORIES.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center gap-2 group flex-shrink-0"
              >
                <div
                  className="flex items-center justify-center transition-all"
                  style={{
                    width: '52px',
                    height: '52px',
                    border: '1px solid #E0D8CC',
                    background: '#FFFFFF',
                    transition: 'border-color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#B8963E';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#E0D8CC';
                  }}
                >
                  <Icon className="w-5 h-5 text-muted group-hover:text-gold transition-colors" />
                </div>
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '10px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: '#6B6560',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.2s ease',
                  }}
                  className="group-hover:text-gold"
                >
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-label" style={{ marginBottom: '6px' }}>Featured for Her</p>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '28px',
                fontWeight: 300,
                color: '#1A1A1A',
              }}
            >
              Women&apos;s Picks
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={products.length <= ITEMS_PER_PAGE}
              style={{
                width: '38px',
                height: '38px',
                border: '1px solid #E0D8CC',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, color 0.2s ease',
                color: '#6B6560',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#B8963E';
                (e.currentTarget as HTMLButtonElement).style.color = '#B8963E';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#E0D8CC';
                (e.currentTarget as HTMLButtonElement).style.color = '#6B6560';
              }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={products.length <= ITEMS_PER_PAGE}
              style={{
                width: '38px',
                height: '38px',
                border: '1px solid #E0D8CC',
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, color 0.2s ease',
                color: '#6B6560',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#B8963E';
                (e.currentTarget as HTMLButtonElement).style.color = '#B8963E';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#E0D8CC';
                (e.currentTarget as HTMLButtonElement).style.color = '#6B6560';
              }}
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="loading" />
          </div>
        ) : visible.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {visible.map((product, i) => (
              <div key={product.id} className={`fade-up stagger-${Math.min(i + 1, 8)}`} style={{ opacity: 0, animationFillMode: 'forwards' }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted">No women&apos;s products yet</div>
        )}

        <div className="text-center mt-12">
          <Link href="/products" className="btn btn-outline" style={{ padding: '12px 40px' }}>
            View All Women&apos;s Products
          </Link>
        </div>
      </div>
    </section>
  );
};
