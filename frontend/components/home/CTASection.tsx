'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const CTASection = () => {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #2C2420 100%)',
        padding: '80px 0',
      }}
    >
      <div className="container px-4">
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          {/* Label */}
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#D4AF5A',
              marginBottom: '1rem',
            }}
          >
            Start Shopping
          </p>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px, 5vw, 52px)',
              fontWeight: 300,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '1rem',
            }}
          >
            Ready to Elevate{' '}
            <em style={{ fontStyle: 'italic', color: '#D4AF5A' }}>Your Wardrobe?</em>
          </h2>

          {/* Ornament */}
          <div className="ornament-divider" style={{ maxWidth: '200px', margin: '0 auto 1.5rem' }}>✦</div>

          {/* Sub */}
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '13px',
              letterSpacing: '0.5px',
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '480px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.9,
            }}
          >
            Discover 33+ premium Pakistani fabric styles — stitched, unstitched, formal, and casual.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/products"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                padding: '14px 40px',
                background: '#B8963E',
                color: '#FFFFFF',
                border: '1px solid #B8963E',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#D4AF5A';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#D4AF5A';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = '#B8963E';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#B8963E';
              }}
            >
              Shop Full Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/923000000000?text=Hello%20AL%20Imran%20Fabrics!"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                padding: '14px 40px',
                background: 'transparent',
                color: '#FFFFFF',
                border: '1px solid rgba(255,255,255,0.4)',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#D4AF5A';
                (e.currentTarget as HTMLAnchorElement).style.color = '#D4AF5A';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.4)';
                (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF';
              }}
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
