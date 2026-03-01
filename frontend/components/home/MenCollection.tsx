'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, Shirt, Briefcase, Award, Shield, Coffee, BookOpen } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/types';

const MEN_CATEGORIES = [
  { icon: Shirt,     label: 'Shalwar Kameez', href: '/products?category=Men+Shalwar+Kameez' },
  { icon: BookOpen,  label: 'Kurtas',          href: '/products?category=Men+Kurta' },
  { icon: Briefcase, label: 'Wash & Wear',     href: '/products?category=Men+Shalwar+Kameez' },
  { icon: Award,     label: 'Khaddar',         href: '/products?category=Winter+Khaddar' },
  { icon: Coffee,    label: 'Casual',          href: '/products?category=Men+Kurta' },
  { icon: Shield,    label: 'Formal',          href: '/products?category=Luxury+Formal' },
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
    <section className="bg-surface">
      {/* Banner */}
      <div
        className="relative h-56 md:h-72 flex items-center justify-end overflow-hidden"
        style={{
          backgroundImage: 'url(/images/men-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#0f1a2e',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 lg:px-24 text-right">
          <p className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-2">
            New Arrivals
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight font-serif">
            Men&apos;s Collection
          </h2>
          <Link
            href="/products"
            className="inline-block px-7 py-3 bg-gold text-charcoal text-sm font-bold rounded-lg hover:bg-gold-light transition-all shadow-lg"
          >
            View All →
          </Link>
        </div>
      </div>

      {/* Category Icons */}
      <div className="bg-charcoal border-b border-border">
        <div className="container px-4 py-5">
          <div className="flex items-center justify-center gap-6 md:gap-10 overflow-x-auto scrollbar-hide">
            {MEN_CATEGORIES.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center gap-2 group flex-shrink-0"
              >
                <div className="w-[52px] h-[52px] rounded-full bg-surface border-2 border-border group-hover:border-gold flex items-center justify-center transition-all shadow-sm">
                  <Icon className="w-5 h-5 text-muted group-hover:text-gold transition-colors" />
                </div>
                <span className="text-xs font-medium text-muted group-hover:text-gold transition-colors whitespace-nowrap">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container px-4 py-10">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h3 className="text-2xl font-serif font-bold text-cream">Featured for Men</h3>
            <p className="text-muted text-sm mt-1">Premium quality menswear for every occasion</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={products.length <= ITEMS_PER_PAGE}
              className="p-2.5 rounded-full border border-border text-muted hover:border-gold hover:text-gold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={products.length <= ITEMS_PER_PAGE}
              className="p-2.5 rounded-full border border-border text-muted hover:border-gold hover:text-gold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : visible.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted">No men&apos;s products yet</div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block px-10 py-3 border border-gold text-gold font-bold rounded-lg hover:bg-gold hover:text-charcoal transition-all"
          >
            View All Men&apos;s Products
          </Link>
        </div>
      </div>
    </section>
  );
};
