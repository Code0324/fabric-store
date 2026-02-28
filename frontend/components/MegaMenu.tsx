'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { NavCategory } from './Navbar';

interface MegaMenuProps {
  category: NavCategory;
}

export default function MegaMenu({ category }: MegaMenuProps) {
  return (
    <div className="absolute left-0 top-full mt-0 bg-surface border border-border rounded-lg shadow-lg py-6 px-8 min-w-max z-50">
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-lg font-serif font-bold text-gold mb-1">{category.name}</h3>
        <div className="w-12 h-0.5 bg-gold-light rounded" />
      </div>

      {/* Items */}
      <div className="grid grid-cols-2 gap-2">
        {category.items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-charcoal transition"
          >
            <span className="text-cream group-hover:text-gold transition text-sm">{item.label}</span>
            <ChevronRight className="w-3.5 h-3.5 text-gold opacity-0 group-hover:opacity-100 transition ml-auto" />
          </Link>
        ))}
      </div>

      {/* View All */}
      <div className="mt-5 pt-5 border-t border-border">
        <Link
          href={category.href}
          className="text-gold font-medium hover:text-gold-light transition inline-flex items-center gap-2 text-sm"
        >
          View All {category.name}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
