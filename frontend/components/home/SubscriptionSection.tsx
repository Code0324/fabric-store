'use client';

import { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

export const SubscriptionSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-16 md:py-24 bg-charcoal border-t border-border">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 bg-gold/10 border border-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7 text-gold" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-cream mb-3">
            Subscribe &amp; Save <span className="gradient-gold">10%</span>
          </h2>
          <p className="text-muted mb-8">
            Get exclusive deals, new arrivals, and style inspiration delivered to your inbox.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-success py-4">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">You&apos;re subscribed! Check your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input flex-1"
                required
              />
              <button
                type="submit"
                className="btn btn-primary flex items-center justify-center gap-2 whitespace-nowrap px-6"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-xs text-muted mt-4 flex items-center justify-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
