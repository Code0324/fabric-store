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
    <section className="bg-charcoal">
      {/* Banner */}
      <div
        className="relative h-56 md:h-72 flex items-center justify-start overflow-hidden"
        style={{
          backgroundImage: 'url(/images/women-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#3d0020',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <p className="text-[#E6007E] text-xs font-bold uppercase tracking-[0.25em] mb-2">
            New Season
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight font-serif">
            Women&apos;s Collection
          </h2>
          <Link
            href="/products"
            className="inline-block px-7 py-3 bg-[#E6007E] text-white text-sm font-bold rounded-lg hover:bg-[#C80066] transition-all shadow-lg"
          >
            View All →
          </Link>
        </div>
      </div>

      {/* Category Icons */}
      <div className="bg-surface border-b border-border">
        <div className="container px-4 py-5">
          <div className="flex items-center justify-center gap-6 md:gap-10 overflow-x-auto scrollbar-hide">
            {WOMEN_CATEGORIES.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center gap-2 group flex-shrink-0"
              >
                <div className="w-13 h-13 w-[52px] h-[52px] rounded-full bg-charcoal border-2 border-border group-hover:border-[#E6007E] flex items-center justify-center transition-all shadow-sm">
                  <Icon className="w-5 h-5 text-muted group-hover:text-[#E6007E] transition-colors" />
                </div>
                <span className="text-xs font-medium text-muted group-hover:text-[#E6007E] transition-colors whitespace-nowrap">
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
            <h3 className="text-2xl font-serif font-bold text-cream">Featured for Women</h3>
            <p className="text-muted text-sm mt-1">Handpicked premium styles for every occasion</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={products.length <= ITEMS_PER_PAGE}
              className="p-2.5 rounded-full border border-border text-muted hover:border-[#E6007E] hover:text-[#E6007E] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={products.length <= ITEMS_PER_PAGE}
              className="p-2.5 rounded-full border border-border text-muted hover:border-[#E6007E] hover:text-[#E6007E] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-[#E6007E] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : visible.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted">No women&apos;s products yet</div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="inline-block px-10 py-3 border border-[#E6007E] text-[#E6007E] font-bold rounded-lg hover:bg-[#E6007E] hover:text-white transition-all"
          >
            View All Women&apos;s Products
          </Link>
        </div>
      </div>
    </section>
  );
};
