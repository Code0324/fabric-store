'use client';

import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FAF7F2 0%, #F0E6C8 50%, #FAF7F2 100%)',
        minHeight: '88vh',
      }}
    >
      {/* Subtle radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 65% 45%, rgba(184,150,62,0.10) 0%, transparent 68%)',
        }}
      />

      <div
        className="container relative z-10 flex items-center"
        style={{ minHeight: '88vh' }}
      >
        {/* ── Left: text ── */}
        <div style={{ flex: '0 0 auto', width: '100%', maxWidth: '560px', paddingTop: '5rem', paddingBottom: '5rem' }}>
          {/* Label */}
          <p
            className="section-label"
            style={{ marginBottom: '1.5rem' }}
          >
            Limited Time Offer
          </p>

          {/* Heading */}
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

          {/* Sub-heading */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '26px',
              fontWeight: 400,
              color: '#1A1A1A',
              marginBottom: '0.75rem',
            }}
          >
            UP TO{' '}
            <em style={{ color: '#B8963E', fontStyle: 'italic' }}>70% OFF</em>
          </p>

          {/* Body */}
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
            Celebrate Eid in style — exclusive stitched &amp; unstitched
            collections at irresistible prices.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link
              href="/products"
              className="btn btn-primary"
              style={{ padding: '14px 40px' }}
            >
              Shop Now
            </Link>
            <Link
              href="/products"
              className="btn btn-secondary"
              style={{ padding: '14px 40px' }}
            >
              Explore Collection
            </Link>
          </div>

          {/* Trust badges */}
          <div
            style={{
              display: 'flex',
              gap: '1.75rem',
              marginTop: '3rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              'Free Shipping Above PKR 2,000',
              '100% Authentic Fabrics',
              'Easy Installments',
            ].map((text) => (
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
            ))}
          </div>
        </div>

        {/* ── Right: image (desktop only) ── */}
        <div
          className="hidden lg:flex flex-1 items-end justify-center"
          style={{ height: '88vh', paddingLeft: '3rem' }}
        >
          <img
            src="/images/hero-eid.jpg"
            alt="Eid Collection"
            style={{
              maxHeight: '86vh',
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
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
