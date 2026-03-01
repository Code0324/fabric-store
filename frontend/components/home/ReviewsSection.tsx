'use client';

import { Star, Quote } from 'lucide-react';

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
    <section className="py-16 md:py-20 bg-surface border-t border-border">
      <div className="container px-4">
        <div className="text-center mb-12">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            Customer Reviews
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-cream mb-3">
            What Our Customers Say
          </h2>
          <p className="text-muted">Trusted by thousands of happy customers across Pakistan</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-charcoal rounded-2xl p-7 border border-border hover:border-gold/40 transition-colors relative"
            >
              <Quote className="w-8 h-8 text-gold/20 absolute top-6 right-6" />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-muted text-sm leading-relaxed mb-6 italic">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-gold">{review.initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-cream text-sm">{review.name}</p>
                  <p className="text-xs text-muted">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
