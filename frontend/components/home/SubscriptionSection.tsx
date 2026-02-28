'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export const SubscriptionSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the subscription here
    setEmail('');
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-[#E6007E] to-[#C80066]">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 text-5xl">💌</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Subscribe & Save 10%
          </h2>
          <p className="text-[#FFF0F5] text-lg mb-8">
            Get exclusive deals, new arrivals, and fashion tips delivered to your inbox
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-3 rounded-lg text-[#2E2E2E] placeholder-gray-400 outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-[#E6007E] font-bold rounded-lg hover:bg-[#FFF0F5] transition-all whitespace-nowrap flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Subscribe
            </button>
          </form>

          <p className="text-xs text-[#FFF0F5]">
            <CheckCircle className="w-4 h-4 inline mr-2" />
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};