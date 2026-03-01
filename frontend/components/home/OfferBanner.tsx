'use client';

const MESSAGES = [
  'EID MEGA SALE — UP TO 70% OFF ON ALL COLLECTIONS',
  'FREE SHIPPING ON ORDERS OVER PKR 2,000',
  'NEW ARRIVALS EVERY WEEK — SHOP FRESH STYLES',
  'EASY INSTALLMENTS ON ORDERS ABOVE PKR 5,000',
];

const SEP = <span style={{ color: '#6B6560', margin: '0 20px' }}>✦</span>;

export const OfferBanner = () => {
  const items = [...MESSAGES, ...MESSAGES];

  return (
    <div style={{ background: '#1A1A1A', overflow: 'hidden', padding: '9px 0' }}>
      <div className="animate-marquee">
        {items.map((msg, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '2.5px',
              color: '#D4AF5A',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {msg}
            {SEP}
          </span>
        ))}
      </div>
    </div>
  );
};
