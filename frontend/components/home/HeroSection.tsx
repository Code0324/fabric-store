'use client';

import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section
      className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/images/hero-eid.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundColor: '#1a0010',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 container text-center px-4">
        <p className="text-[#E6007E] font-semibold tracking-[0.3em] uppercase mb-4 text-sm md:text-base">
          Limited Time Offer
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
          EID MEGA SALE
        </h1>
        <p className="text-3xl md:text-4xl text-white font-semibold mb-3 drop-shadow">
          UP TO{' '}
          <span className="text-[#E6007E]">70% OFF</span>
        </p>
        <p className="text-base md:text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Celebrate Eid in style — exclusive stitched &amp; unstitched collections at irresistible prices
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="px-10 py-4 bg-[#E6007E] text-white font-bold rounded-lg hover:bg-[#C80066] transition-all text-lg shadow-lg"
          >
            Shop Now
          </Link>
          <Link
            href="/products"
            className="px-10 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#E6007E] transition-all text-lg"
          >
            Explore Collection
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center text-white/70 text-sm">
          <span>🚚 Free Shipping Above PKR 2,000</span>
          <span>✅ 100% Authentic Fabrics</span>
          <span>💳 Easy Installments Available</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
};
