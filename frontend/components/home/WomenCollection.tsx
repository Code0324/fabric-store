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
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '28px',
            color: '#B8963E',
          }}
        >
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

const WOMEN_CATEGORIES = [
  { image: '/images/categories/cat-lawn.jpg',       label: 'Lawn',        href: '/products?category=Women+Lawn+Unstitched',               pos: 'center 15%' },
  { image: '/images/categories/cat-stitched.jpg',   label: 'Stitched',    href: '/products?category=Women+Stitched+Pret',                 pos: 'center 10%' },
  { image: '/images/categories/cat-unstitched.jpg', label: 'Unstitched',  href: '/products?category=Women+Lawn+Unstitched',               pos: 'center 10%' },
  { image: '/images/categories/cat-embroidered.jpg',label: 'Embroidered', href: '/products?category=Women%27s+Embroidered+Unstitched',    pos: 'center 10%' },
  { image: '/images/categories/cat-printed.jpg',    label: 'Printed',     href: '/products',                                              pos: 'center 10%' },
  { image: '/images/categories/cat-luxury.jpg',     label: 'Luxury',      href: '/products?category=Luxury+Formal',                       pos: 'center 10%' },
  { image: '/images/categories/chiffon.jpg',        label: 'Chiffon',     href: '/products',                                              pos: 'center 10%' },
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
      {/* Banner — Limelight Silk editorial, 2400×750 */}
      <div
        className="relative flex items-center justify-end overflow-hidden"
        style={{
          height: '500px',
          backgroundImage: 'url(/images/women-banner-silk.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#F5E8D8',
        }}
      >
        {/* Right overlay — lighter, more vibrant, lets the image breathe */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to left, rgba(250,247,242,0.85) 0%, rgba(250,247,242,0.55) 30%, rgba(250,247,242,0.10) 65%, rgba(0,0,0,0) 100%)',
          }}
        />

        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <p className="section-label" style={{ marginBottom: '10px' }}>
            New Season
          </p>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(40px, 6vw, 64px)',
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

          <div className="ornament-divider" style={{ maxWidth: '200px', marginBottom: '20px' }}>
            ✦
          </div>

          <Link href="/products" className="btn btn-secondary" style={{ padding: '12px 32px' }}>
            View All
          </Link>
        </div>
      </div>

      {/* Category Images with extra top margin */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E0D8CC', marginTop: '2rem' }}>
        <div className="container px-4 py-8 mt-12"> {/* Added mt-12 for extra space */}
          <div className="flex items-start justify-start gap-4 overflow-x-auto scrollbar-hide pb-1">
            {WOMEN_CATEGORIES.map(({ image, label, href, pos }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center gap-3 group flex-shrink-0"
              >
                <div
                  className="relative overflow-hidden rounded-full transition-all duration-300"
                  style={{
                    width: '110px',
                    height: '110px',
                    border: '2px solid #E0D8CC',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#B8963E';
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      '0 6px 20px rgba(184,150,62,0.25)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = '#E0D8CC';
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      '0 4px 14px rgba(0,0,0,0.08)';
                  }}
                >
                  <CategoryImage src={image} alt={label} pos={pos} />
                </div>

                <span
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: '#6B6560',
                    whiteSpace: 'nowrap',
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

      {/* Product Grid remains unchanged */}
      <div className="container px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="section-label" style={{ marginBottom: '6px' }}>
              Featured for Her
            </p>
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
              className="w-[38px] h-[38px] border border-[#E0D8CC] flex items-center justify-center text-[#6B6560]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={products.length <= ITEMS_PER_PAGE}
              className="w-[38px] h-[38px] border border-[#E0D8CC] flex items-center justify-center text-[#6B6560]"
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
            {visible.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted">
            No women&apos;s products yet
          </div>
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