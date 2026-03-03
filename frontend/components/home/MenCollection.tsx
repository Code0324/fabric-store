'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/types';

function CategoryImage({ src, alt, pos = 'center 15%' }: { src: string; alt: string; pos?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center" style={{ background: '#F5EDD8' }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', color: '#B8963E' }}>
          {alt[0]}
        </span>
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="110px"
      className="object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
      style={{ objectPosition: pos }}
      onError={() => setFailed(true)}
    />
  );
}

const MEN_CATEGORIES = [
  { image: '/images/categories/cat-men-stitched.jpg',   label: 'Shalwar Kameez', href: '/products?category=Men+Shalwar+Kameez', pos: 'center 15%' },
  { image: '/images/categories/cat-men-kurta.jpg',      label: 'Kurta',          href: '/products?category=Men+Kurta',          pos: 'center 15%' },
  { image: '/images/categories/cat-men-unstitched.jpg', label: 'Unstitched',     href: '/products?category=Men+Shalwar+Kameez', pos: 'center 10%' },
  { image: '/images/categories/cat-men-formal.jpg',     label: 'Formal',         href: '/products?category=Men+Shalwar+Kameez', pos: 'center 15%' },
];

const ITEMS_PER_PAGE = 8;

interface MenCollectionProps {
  products: Product[];
  loading: boolean;
  carouselIndex: number;
  handleNext: () => void;
  handlePrev: () => void;
}

export const MenCollection = ({
  products,
  loading,
  carouselIndex,
  handleNext,
  handlePrev,
}: MenCollectionProps) => {
  const visible = products.slice(carouselIndex, carouselIndex + ITEMS_PER_PAGE);

  return (
    <section style={{ background: '#FFFFFF' }}>
      {/* Banner — Limelight Men Kurta editorial, 1200×330 */}
      <div
        className="relative flex items-center justify-start overflow-hidden"
        style={{
          height: '460px',
          backgroundImage: 'url(/images/men-banner-new.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundColor: '#1A1A1A',
        }}
      >
        {/* Dark left overlay so right side shows model clearly */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(15,12,8,0.88) 0%, rgba(15,12,8,0.60) 35%, rgba(15,12,8,0.15) 70%, rgba(0,0,0,0) 100%)',
          }}
        />
        <div className="relative z-10 px-8 md:px-16 lg:px-24 text-left">
          <p className="section-label" style={{ marginBottom: '10px', color: '#D4AF5A', borderColor: '#D4AF5A' }}>
            New Arrivals
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#F5F0E8',
              lineHeight: 1.1,
              marginBottom: '20px',
              letterSpacing: '2px',
              textShadow: '0 2px 12px rgba(0,0,0,0.4)',
            }}
          >
            Men&apos;s Collection
          </h2>
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '13px',
            letterSpacing: '1.5px',
            color: 'rgba(245,240,232,0.75)',
            marginBottom: '28px',
            maxWidth: '360px',
          }}>
            Premium Shalwar Kameez — Stitched & Unstitched
          </p>
          <div className="ornament-divider" style={{ maxWidth: '200px', marginBottom: '24px', color: '#D4AF5A' }}>✦</div>
          <Link href="/products" className="btn btn-primary" style={{ padding: '12px 36px' }}>
            View All
          </Link>
        </div>
      </div>

       {/* Category Images with extra top margin */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E0D8CC', marginTop: '2rem' }}>
        <div className="container px-4 py-8 mt-12"> {/* Added mt-12 for extra space */}
          <div className="flex items-start justify-start gap-4 overflow-x-auto scrollbar-hide pb-1">
            {MEN_CATEGORIES.map(({ image, label, href, pos }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center gap-2.5 group flex-shrink-0"
              >
                <div
                  className="relative overflow-hidden rounded-full transition-all duration-300"
                  style={{
                    width: '100px',
                    height: '100px',
                    border: '2px solid #E0D8CC',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#B8963E';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(184,150,62,0.25)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#E0D8CC';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                  }}
                >
                  <CategoryImage src={image} alt={label} pos={pos} />
                </div>
                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '10px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: '#6B6560',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.2s ease',
                  }}
                  className="group-hover:text-gold transition-colors"
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
            <p className="section-label" style={{ marginBottom: '6px' }}>Featured for Him</p>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '28px',
                fontWeight: 300,
                color: '#1A1A1A',
              }}
            >
              Men&apos;s Picks
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
                color: '#6B6560',
                transition: 'border-color 0.2s ease, color 0.2s ease',
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
                color: '#6B6560',
                transition: 'border-color 0.2s ease, color 0.2s ease',
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
          <div className="text-center py-16 text-muted">No men&apos;s products yet</div>
        )}

        <div className="text-center mt-12">
          <Link href="/products" className="btn btn-outline" style={{ padding: '12px 40px' }}>
            View All Men&apos;s Products
          </Link>
        </div>
      </div>
    </section>
  );
};
