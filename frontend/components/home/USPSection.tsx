'use client';

import { Truck, Zap, Award, Heart } from 'lucide-react';

// USP Features
const USP_FEATURES = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Hand-selected fabrics from top international manufacturers'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick shipping across Pakistan with tracking'
  },
  {
    icon: Zap,
    title: 'Best Prices',
    description: 'Competitive pricing with regular discounts'
  },
  {
    icon: Heart,
    title: 'Customer Care',
    description: '24/7 support for all your queries'
  },
];

export const USPSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FFF8F0]">
      <div className="container px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2E2E2E] mb-16">
          Why Choose <span className="text-[#E6007E]">Al Imran Fabrics</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {USP_FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#E6007E] to-[#C80066] rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#2E2E2E] mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};