'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, Star, Scissors, Heart, Gem, Crown } from 'lucide-react';
import { ProductCard } from '@/components/shared/ProductCard';
import type { Product } from '@/lib/types';

const WOMEN_CATEGORIES = [
  { icon: Sparkles, label: 'Dresses',     href: '/products/category/dresses' },
  { icon: Star,     label: 'Lawn Suits',  href: '/products/category/lawn' },
  { icon: Scissors, label: 'Unstitched',  href: '/products/category/unstitched' },
  { icon: Heart,    label: 'Chiffon',     href: '/products/category/chiffon' },
  { icon: Gem,      label: 'Embroidered', href: '/products/category/embroidered' },
  { icon: Crown,    label: 'Bridal',      href: '/products/category/bridal' },
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
    <section className="bg-white">
      {/* ── Banner ─────────────────────────────────────────────────────── */}
      <div
        className="relative h-64 md:h-80 flex items-center justify-start overflow-hidden"
        style={{
          backgroundImage: 'url(/images/women-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#3d0020',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <p className="text-[#E6007E] text-xs font-bold uppercase tracking-[0.25em] mb-2">
            New Season
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Women Collection
          </h2>
          <Link
            href="/products/category/womens"
            className="inline-block px-7 py-3 bg-[#E6007E] text-white text-sm font-bold rounded-lg hover:bg-[#C80066] transition-all shadow-lg"
          >
            View All →
          </Link>
        </div>
      </div>

      {/* ── Category Icons ─────────────────────────────────────────────── */}
      <div className="bg-[#FFF5F9] border-b border-pink-100">
        <div className="container px-4 py-6">
          <div className="flex items-center justify-center gap-6 md:gap-10 overflow-x-auto scrollbar-hide">
            {WOMEN_CATEGORIES.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center gap-2 group flex-shrink-0"
              >
                <div className="w-14 h-14 rounded-full bg-white border-2 border-pink-100 group-hover:border-[#E6007E] flex items-center justify-center transition-all shadow-sm group-hover:shadow-md">
                  <Icon className="w-6 h-6 text-gray-400 group-hover:text-[#E6007E] transition-colors" />
                </div>
                <span className="text-xs font-semibold text-gray-500 group-hover:text-[#E6007E] transition-colors whitespace-nowrap">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Product Grid ───────────────────────────────────────────────── */}
      <div className="container px-4 py-10">
        <div className="flex items-center justify-between mb-7">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Featured for Women</h3>
            <p className="text-gray-400 text-sm mt-1">Handpicked premium dresses for every occasion</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border-2 border-gray-200 text-gray-500 hover:border-[#E6007E] hover:text-[#E6007E] transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border-2 border-gray-200 text-gray-500 hover:border-[#E6007E] hover:text-[#E6007E] transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-12 h-12 border-4 border-[#E6007E] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : visible.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {visible.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={carouselIndex + idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400 text-lg">Products coming soon</div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/products/category/womens"
            className="inline-block px-10 py-3 border-2 border-[#E6007E] text-[#E6007E] font-bold rounded-lg hover:bg-[#E6007E] hover:text-white transition-all"
          >
            View All Women&apos;s Products
          </Link>
        </div>
      </div>
    </section>
  );
};
