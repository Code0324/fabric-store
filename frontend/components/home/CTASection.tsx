'use client';

import Link from 'next/link';

export const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2E2E2E] mb-6">
          Ready to Elevate Your Wardrobe?
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Discover premium Pakistani fashion with Al Imran Fabrics. Quality guaranteed, fast delivery assured.
        </p>
        <Link href="/products" className="inline-block px-10 py-4 bg-[#E6007E] text-white font-bold rounded-lg hover:bg-[#C80066] transition-all text-lg">
          Shop Full Collection
        </Link>
      </div>
    </section>
  );
};