'use client';

import { Star } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Fatima Khan',
    location: 'Karachi',
    rating: 5,
    text: 'Excellent quality and fast delivery! The fabric is premium and the stitching is perfect. Will definitely order again.',
    initials: 'FK',
  },
  {
    id: 2,
    name: 'Ayesha Ahmed',
    location: 'Lahore',
    rating: 5,
    text: 'Love the designs and the customer service is amazing. Al Imran Fabrics never disappoints. Highly recommended!',
    initials: 'AA',
  },
  {
    id: 3,
    name: 'Sarah Malik',
    location: 'Islamabad',
    rating: 5,
    text: 'Premium quality at reasonable prices. Delivery was faster than expected. Very satisfied with my purchase!',
    initials: 'SM',
  },
];

export const ReviewsSection = () => {
  return (
    <section style={{ background: '#FAF7F2', padding: '80px 0', borderTop: '1px solid #E0D8CC' }}>
      <div className="container px-4">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="section-label" style={{ marginBottom: '12px' }}>
            Customer Reviews
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px, 4vw, 46px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#1A1A1A',
              marginBottom: '8px',
            }}
          >
            What Our Customers Say
          </h2>
          <div className="ornament-divider" style={{ maxWidth: '180px', margin: '12px auto 0' }}>✦</div>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '13px',
              color: '#6B6560',
              marginTop: '14px',
            }}
          >
            Trusted by thousands of happy customers across Pakistan
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E0D8CC',
                padding: '2rem',
                position: 'relative',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
                (e.currentTarget as HTMLDivElement).style.borderColor = '#D4AF5A';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLDivElement).style.borderColor = '#E0D8CC';
              }}
            >
              {/* Large decorative quote mark */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '20px',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '64px',
                  fontWeight: 300,
                  color: 'rgba(184,150,62,0.15)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem' }}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5" style={{ fill: '#B8963E', color: '#B8963E' }} />
                ))}
              </div>

              {/* Review text */}
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '13px',
                  color: '#6B6560',
                  lineHeight: 1.85,
                  marginBottom: '1.5rem',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Reviewer */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    border: '1px solid #E0D8CC',
                    background: '#FAF7F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#B8963E',
                    }}
                  >
                    {review.initials}
                  </span>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#1A1A1A',
                    }}
                  >
                    {review.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '11px',
                      color: '#6B6560',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {review.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
