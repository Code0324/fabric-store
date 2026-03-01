'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { productsAPI } from '@/lib/api';
import { getUniqueBrands } from '@/lib/utils';

export default function BrandShowcase() {
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsAPI.getAll(200)
      .then((products) => setBrands(getUniqueBrands(products).slice(0, 10)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 md:py-24 bg-surface border-y border-border">
      <div className="container px-4">
        <div className="text-center mb-12">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            Trusted by Many
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-3">
            Featured Brands
          </h2>
          <p className="text-muted max-w-xl mx-auto text-sm">
            Partnering with Pakistan&apos;s finest brands to bring you authentic, premium fabrics.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="loading" />
          </div>
        ) : brands.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {brands.map((brand) => {
                const initials = brand
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase();
                return (
                  <Link
                    key={brand}
                    href={`/products/brand/${brand.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group flex flex-col items-center justify-center gap-2.5 p-5 rounded-xl border border-border hover:border-gold bg-charcoal hover:bg-gold/5 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                      <span className="text-sm font-bold text-gold">{initials}</span>
                    </div>
                    <h3 className="text-sm font-serif font-semibold text-cream group-hover:text-gold transition-colors text-center leading-tight">
                      {brand}
                    </h3>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/products"
                className="text-gold hover:text-gold-light transition font-medium text-sm inline-flex items-center gap-1.5"
              >
                Browse all brands &amp; collections →
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-muted">No brands available yet.</div>
        )}
      </div>
    </section>
  );
}
