'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-cream">Products Management</h1>
        <Link href="/admin/products/new" className="btn btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      <div className="card text-center py-12">
        <p className="text-muted mb-4">Product management interface coming soon</p>
        <p className="text-sm text-muted">Full CRUD functionality with filtering and sorting</p>
      </div>
    </div>
  );
}
