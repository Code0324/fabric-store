'use client';

import { Truck, Zap, Award, MessageCircle } from 'lucide-react';

const USP_FEATURES = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Hand-selected fabrics from Pakistan\'s top brands and manufacturers.',
  },
  {
    icon: Truck,
    title: 'Nationwide Delivery',
    description: 'Fast, tracked shipping to every city across Pakistan.',
  },
  {
    icon: Zap,
    title: 'Best Prices',
    description: 'Competitive pricing with regular sales and exclusive member discounts.',
  },
  {
    icon: MessageCircle,
    title: '24/7 Support',
    description: 'Reach us anytime on WhatsApp for orders, queries, or returns.',
  },
];

export const USPSection = () => {
  return (
    <section className="py-16 md:py-24 bg-charcoal border-t border-border">
      <div className="container px-4">
        <div className="text-center mb-14">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            Why Shop With Us
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream">
            Why Choose <span className="gradient-gold">AL Imran Fabrics</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {USP_FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-surface rounded-xl p-8 text-center border border-border hover:border-gold transition-colors group"
              >
                <div className="flex justify-center mb-5">
                  <div className="w-14 h-14 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                </div>
                <h3 className="text-lg font-serif font-bold text-cream mb-2">{feature.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
