'use client';

import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden w-full min-h-[65vh] md:min-h-[88vh]"
      style={{ position: 'relative' }}
    >
      {/* Full-width background image */}
      <img
        src="/images/hero-sapphire.png"
        alt="Eid Collection"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0, objectPosition: 'center top' }}
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/images/hero-limelight.jpg';
        }}
      />

      {/* Overlay — uniform dark on mobile, directional on desktop */}
      <div
        className="absolute inset-0 pointer-events-none md:hidden"
        style={{ background: 'rgba(8,6,4,0.60)', zIndex: 1 }}
      />
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background: 'linear-gradient(to left, rgba(8,6,4,0.82) 0%, rgba(8,6,4,0.55) 38%, rgba(8,6,4,0.15) 70%, rgba(0,0,0,0) 100%)',
          zIndex: 1,
        }}
      />

      <div className="container relative flex md:justify-end justify-center items-center min-h-[65vh] md:min-h-[88vh]" style={{ zIndex: 2 }}>
        {/* Centered on mobile, right-aligned on desktop */}
        <div className="text-center md:text-left w-full md:w-auto" style={{ maxWidth: '520px', padding: '3.5rem 0.5rem' }}>
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#D4AF5A',
            marginBottom: '1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            borderLeft: '2px solid #D4AF5A',
            paddingLeft: '10px',
          }}>
            Limited Time Offer
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(42px, 10vw, 76px)',
              fontWeight: 300,
              lineHeight: 1.0,
              color: '#F5F0E8',
              letterSpacing: '3px',
              marginBottom: '0.75rem',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            }}
          >
            EID
            <br />
            <em style={{ fontStyle: 'italic', color: '#D4AF5A', fontWeight: 400 }}>
              MEGA SALE
            </em>
          </h1>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(18px, 4vw, 26px)',
              fontWeight: 400,
              color: '#F5F0E8',
              marginBottom: '0.5rem',
            }}
          >
            UP TO <em style={{ color: '#D4AF5A', fontStyle: 'italic' }}>70% OFF</em>
          </p>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '12px',
              letterSpacing: '1px',
              color: 'rgba(245,240,232,0.70)',
              lineHeight: 1.9,
              marginBottom: '2rem',
            }}
          >
            Celebrate Eid in style — exclusive stitched &amp; unstitched collections at irresistible prices.
          </p>
          <div className="flex justify-center md:justify-start" style={{ gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn btn-primary" style={{ padding: '12px 32px' }}>
              Shop Now
            </Link>
            <Link
              href="/products"
              style={{
                padding: '12px 32px',
                border: '1px solid rgba(212,175,90,0.6)',
                color: '#D4AF5A',
                fontFamily: "'Jost', sans-serif",
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                display: 'inline-block',
                transition: 'all 0.2s',
              }}
            >
              Explore
            </Link>
          </div>
          <div className="flex justify-center md:justify-start flex-wrap" style={{ gap: '1rem', marginTop: '2rem' }}>
            {['Free Shipping ≥ PKR 2,000', '100% Authentic', 'Easy Installments'].map(
              (text) => (
                <span
                  key={text}
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '10px',
                    letterSpacing: '0.5px',
                    color: 'rgba(245,240,232,0.55)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <span style={{ color: '#D4AF5A' }}>✦</span>
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