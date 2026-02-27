'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { productsAPI } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { filterByBrand } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import type { Product } from '@/lib/types';

export default function BrandPage({ params }: { params: { slug: string } }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const brandName = params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const all = await productsAPI.getAll();
        const filtered = filterByBrand(all, brandName);
        setProducts(filtered);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [brandName]);

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <Link href="/products" className="inline-flex items-center gap-2 text-gold mb-12">
          <ChevronLeft className="w-5 h-5" />
          Back to All Products
        </Link>

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-4 capitalize">{brandName}</h1>
        <p className="text-muted mb-12">Discover all {brandName} products</p>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="loading"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted text-lg">No products found for this brand</p>
            <Link href="/products" className="btn btn-primary mt-6">
              View All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
