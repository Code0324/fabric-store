'use client';

import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden w-full"
      style={{
        minHeight: '88vh',
        position: 'relative',
      }}
    >
      {/* Full-width background image */}
      <img
        src="/images/hero-banner.jpg"
        alt="Eid Collection"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ zIndex: -1 }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* Subtle radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 65% 45%, rgba(184,150,62,0.10) 0%, transparent 68%)',
        }}
      />

      <div className="container relative z-10 flex justify-end items-center h-full">
        {/* Right-aligned text */}
        <div style={{ maxWidth: '560px', padding: '5rem 1rem' }}>
          <p className="section-label mb-6">Limited Time Offer</p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(52px, 6vw, 72px)',
              fontWeight: 300,
              lineHeight: 1.0,
              color: '#1A1A1A',
              letterSpacing: '2px',
              marginBottom: '1rem',
            }}
          >
            EID
            <br />
            <em style={{ fontStyle: 'italic', color: '#B8963E', fontWeight: 400 }}>
              MEGA SALE
            </em>
          </h1>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '26px',
              fontWeight: 400,
              color: '#1A1A1A',
              marginBottom: '0.75rem',
            }}
          >
            UP TO <em style={{ color: '#B8963E', fontStyle: 'italic' }}>70% OFF</em>
          </p>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '13px',
              letterSpacing: '1.5px',
              color: '#6B6560',
              maxWidth: '400px',
              lineHeight: 1.9,
              marginBottom: '2.5rem',
            }}
          >
            Celebrate Eid in style — exclusive stitched & unstitched collections at
            irresistible prices.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn btn-primary" style={{ padding: '14px 40px' }}>
              Shop Now
            </Link>
            <Link href="/products" className="btn btn-secondary" style={{ padding: '14px 40px' }}>
              Explore Collection
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '1.75rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            {['Free Shipping Above PKR 2,000', '100% Authentic Fabrics', 'Easy Installments'].map(
              (text) => (
                <span
                  key={text}
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '0.5px',
                    color: '#6B6560',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span style={{ color: '#B8963E' }}>✦</span>
                  {text}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div
          style={{
            width: '22px',
            height: '36px',
            border: '1px solid rgba(184,150,62,0.4)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '5px',
          }}
        >
          <div
            style={{
              width: '2px',
              height: '6px',
              background: 'rgba(184,150,62,0.6)',
              borderRadius: '2px',
            }}
          />
        </div>
      </div>
    </section>
  );
};