'use client';

const BRANDS = [
  { name: 'Khaadi',           short: 'KD' },
  { name: 'Gul Ahmed',        short: 'GA' },
  { name: 'Junaid Jamshed',   short: 'J.' },
  { name: 'Sapphire',         short: 'SP' },
  { name: 'Saya',             short: 'SA' },
  { name: 'Baroque',          short: 'BQ' },
  { name: 'Al Karam',         short: 'AK' },
  { name: 'Bonanza',          short: 'BS' },
  { name: 'Limelight',        short: 'LL' },
];

export const BrandLogos = () => {
  const items = [...BRANDS, ...BRANDS];

  return (
    <section className="py-8 bg-surface border-y border-border">
      <p className="text-center text-muted text-xs font-semibold uppercase tracking-[0.25em] mb-6">
        Premium Brands We Carry
      </p>
      <div className="overflow-hidden">
        <div className="animate-marquee-slow items-center">
          {items.map((brand, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 inline-flex flex-col items-center justify-center w-28 h-16 mx-3 bg-charcoal rounded-xl border border-border hover:border-gold transition-all duration-300 cursor-pointer group"
            >
              <span className="text-lg font-bold text-gold group-hover:text-gold-light transition-colors">
                {brand.short}
              </span>
              <span className="text-[10px] text-muted mt-0.5 font-medium text-center px-2 leading-tight group-hover:text-cream transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
