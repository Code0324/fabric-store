'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function NewProductPage() {
  return (
    <div>
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-gold mb-8">
        <ChevronLeft className="w-5 h-5" />
        Back to Products
      </Link>

      <div className="card max-w-2xl">
        <h1 className="text-3xl font-serif font-bold text-cream mb-8">Add New Product</h1>
        <p className="text-muted">Product creation form coming soon</p>
      </div>
    </div>
  );
}
