'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, Shirt, Briefcase, Award, Shield, Coffee, BookOpen } from 'lucide-react';
import { ProductCard } from '@/components/shared/ProductCard';
import type { Product } from '@/lib/types';

const MEN_CATEGORIES = [
  { icon: Shirt,     label: 'Shalwar Kameez', href: '/products/category/shalwar-kameez' },
  { icon: BookOpen,  label: 'Kurtas',          href: '/products/category/kurtas' },
  { icon: Briefcase, label: 'Suits',           href: '/products/category/suits' },
  { icon: Award,     label: 'Sherwanis',       href: '/products/category/sherwanis' },
  { icon: Coffee,    label: 'Casual Wear',     href: '/products/category/casual' },
  { icon: Shield,    label: 'Formal Wear',     href: '/products/category/formal' },
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
    <section className="bg-gray-50">
      {/* ── Banner ─────────────────────────────────────────────────────── */}
      <div
        className="relative h-64 md:h-80 flex items-center justify-end overflow-hidden"
        style={{
          backgroundImage: 'url(/images/men-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#0f1a2e',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-black/75 via-black/40 to-transparent" />
        <div className="relative z-10 px-8 md:px-16 lg:px-24 text-right">
          <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.25em] mb-2">
            New Arrivals
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Men Collection
          </h2>
          <Link
            href="/products/category/mens"
            className="inline-block px-7 py-3 bg-white text-gray-900 text-sm font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
          >
            View All →
          </Link>
        </div>
      </div>

      {/* ── Category Icons ─────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="container px-4 py-6">
          <div className="flex items-center justify-center gap-6 md:gap-10 overflow-x-auto scrollbar-hide">
            {MEN_CATEGORIES.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex flex-col items-center gap-2 group flex-shrink-0"
              >
                <div className="w-14 h-14 rounded-full bg-gray-50 border-2 border-gray-200 group-hover:border-[#C9A84C] flex items-center justify-center transition-all shadow-sm group-hover:shadow-md">
                  <Icon className="w-6 h-6 text-gray-400 group-hover:text-[#C9A84C] transition-colors" />
                </div>
                <span className="text-xs font-semibold text-gray-500 group-hover:text-[#C9A84C] transition-colors whitespace-nowrap">
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
            <h3 className="text-2xl font-bold text-gray-800">Featured for Men</h3>
            <p className="text-gray-400 text-sm mt-1">Premium quality menswear for every occasion</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border-2 border-gray-200 text-gray-500 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border-2 border-gray-200 text-gray-500 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-12 h-12 border-4 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
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
            href="/products/category/mens"
            className="inline-block px-10 py-3 border-2 border-gray-800 text-gray-800 font-bold rounded-lg hover:bg-gray-800 hover:text-white transition-all"
          >
            View All Men&apos;s Products
          </Link>
        </div>
      </div>
    </section>
  );
};
