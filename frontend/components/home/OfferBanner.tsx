'use client';

const MESSAGES = [
  '🎉 EID MEGA SALE — UP TO 70% OFF ON ALL COLLECTIONS!',
  '🚚 FREE SHIPPING ON ORDERS OVER PKR 2,000!',
  '✨ NEW ARRIVALS EVERY WEEK — SHOP FRESH STYLES!',
  '💳 EASY INSTALLMENTS ON ORDERS ABOVE PKR 5,000!',
];

export const OfferBanner = () => {
  const items = [...MESSAGES, ...MESSAGES];

  return (
    <div className="bg-[#E6007E] text-white py-2.5 overflow-hidden">
      <div className="animate-marquee">
        {items.map((msg, i) => (
          <span key={i} className="text-sm font-semibold px-10 tracking-wide whitespace-nowrap">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
};
