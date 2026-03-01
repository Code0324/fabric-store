'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center justify-center bg-dark-gradient">
      {/* Hero Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-eid.jpg"
          alt="Hero Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Optional: Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gold rounded-full mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-dark rounded-full mix-blend-screen animate-pulse delay-700"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 text-center py-20">
        <div className="max-w-4xl mx-auto">
          {/* Tagline */}
          <p className="text-gold font-medium tracking-widest uppercase mb-4 slide-up">
            ✨ Premium Pakistani Fabrics
          </p>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight slide-up">
            <span className="block text-cream mb-2">Elegance in Every</span>
            <span className="gradient-gold">Thread</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover our exquisite collection of stitched and unstitched fabrics. Crafted for those who appreciate
            quality and style.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/products" className="btn btn-primary px-8 py-3 text-lg inline-flex items-center gap-2">
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="https://wa.me/923000000000?text=Hello%20AL%20Imran%20Fabrics!%20I%20need%20fabric%20consultation"
              target="_blank"
              className="btn btn-outline px-8 py-3 text-lg"
            >
              Consult with Us
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-muted">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚚</span>
              <span>Free Shipping Above PKR 5,000</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span>100% Authentic Fabrics</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💳</span>
              <span>Easy Payment Options</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-gold rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}