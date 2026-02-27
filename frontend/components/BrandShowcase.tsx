'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { productsAPI } from '@/lib/api';
import { getUniqueBrands } from '@/lib/utils';

export default function BrandShowcase() {
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const products = await productsAPI.getAll(200);
        const uniqueBrands = getUniqueBrands(products);
        setBrands(uniqueBrands.slice(0, 10)); // Show first 10 brands
      } catch (err) {
        console.error('Failed to fetch brands:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-surface border-y border-border">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-gold font-medium tracking-widest uppercase mb-4">Trusted by Many</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-4">Featured Brands</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Partnering with the finest brands to bring you authentic, premium fabrics.
          </p>
        </div>

        {/* Brands Grid / Carousel */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="loading"></div>
          </div>
        ) : brands.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {brands.map((brand) => (
              <Link
                key={brand}
                href={`/products/brand/${brand.toLowerCase().replace(/\s+/g, '-')}`}
                className="group flex items-center justify-center p-6 rounded-xl border border-border hover:border-gold bg-charcoal hover:bg-charcoal/50 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🏷️</div>
                  <h3 className="text-sm md:text-base font-serif font-bold text-cream group-hover:text-gold transition">
                    {brand}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted">
            <p>No brands available yet</p>
          </div>
        )}

        {/* View All Brands */}
        {brands.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/products" className="text-gold hover:text-gold-light transition font-medium inline-flex items-center gap-2">
              View All Brands & Collections →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
