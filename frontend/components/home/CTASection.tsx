'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="py-16 md:py-20 bg-surface border-t border-border">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            Start Shopping
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-4">
            Ready to Elevate Your Wardrobe?
          </h2>
          <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
            Discover 33+ premium Pakistani fabric styles — stitched, unstitched, formal, and casual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="btn btn-primary px-10 py-3 text-base inline-flex items-center gap-2"
            >
              Shop Full Collection
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/923000000000?text=Hello%20AL%20Imran%20Fabrics!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline px-10 py-3 text-base"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
