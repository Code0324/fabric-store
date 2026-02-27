'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface MegaMenuProps {
  category: {
    name: string;
    items: string[];
    href: string;
  };
}

export default function MegaMenu({ category }: MegaMenuProps) {
  const categoryMap: { [key: string]: string } = {
    Stitched: 'stitched',
    Unstitched: 'unstitched',
    'Wash & Wear': 'wash-wear',
    'Summer Collection': 'summer',
    Sale: 'sale',
    Lawn: 'lawn',
    Chiffon: 'chiffon',
    Linen: 'linen',
    'Party Wear': 'party-wear',
    'Summer 2025': 'summer-2025',
    'Winter 2025': 'winter-2025',
    'New Arrivals': 'new-arrivals',
    'Best Sellers': 'best-sellers',
    'Sale Items': 'sale',
    'All Products': 'all',
  };

  return (
    <div className="absolute left-0 top-full mt-0 bg-surface border border-border rounded-lg shadow-lg py-6 px-8 min-w-max animate-in fade-in slide-up">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-serif font-bold text-gold mb-1">{category.name}</h3>
        <div className="w-12 h-1 bg-gold-light rounded"></div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 gap-4">
        {category.items.map((item) => {
          const slug = categoryMap[item] || item.toLowerCase().replace(/\s+/g, '-');
          return (
            <Link
              key={item}
              href={`${category.href}/${slug}`}
              className="group flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-charcoal transition"
            >
              <span className="text-cream group-hover:text-gold transition">{item}</span>
              <ChevronRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition" />
            </Link>
          );
        })}
      </div>

      {/* Promo */}
      <div className="mt-6 pt-6 border-t border-border">
        <Link
          href={category.href}
          className="text-gold font-medium hover:text-gold-light transition inline-flex items-center gap-2"
        >
          View All {category.name}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
