'use client';

const BRANDS = [
  { name: 'Junaid Jamshed', short: 'J.' },
  { name: 'Zellbury', short: 'ZB' },
  { name: 'Khaadi', short: 'KD' },
  { name: 'Sana Safinaz', short: 'SS' },
  { name: 'Sapphire', short: 'SP' },
  { name: 'Maria.B', short: 'MB' },
  { name: 'Gul Ahmed', short: 'GA' },
  { name: 'Alkaram', short: 'AK' },
  { name: 'Nishat Linen', short: 'NL' },
  { name: 'Bonanza', short: 'BS' },
  { name: 'SAYA', short: 'SA' },
  { name: 'Baroque', short: 'BQ' },
];

export const BrandLogos = () => {
  const items = [...BRANDS, ...BRANDS];

  return (
    <section className="py-10 bg-white border-t border-b border-gray-100">
      <p className="text-center text-gray-400 text-xs font-semibold uppercase tracking-[0.25em] mb-8">
        Premium Brands We Carry
      </p>
      <div className="overflow-hidden">
        <div className="animate-marquee-slow items-center">
          {items.map((brand, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 inline-flex flex-col items-center justify-center w-32 h-20 mx-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-[#E6007E] hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <span className="text-xl font-bold text-gray-700 group-hover:text-[#E6007E] transition-colors">
                {brand.short}
              </span>
              <span className="text-[10px] text-gray-400 mt-1 font-medium text-center px-2 leading-tight">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
