'use client';

import { Star } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Fatima Khan',
    location: 'Karachi',
    rating: 5,
    text: 'Excellent quality and fast delivery! The fabric is premium and the stitching is perfect. Highly recommended!',
    initials: 'FK',
    bgClass: 'bg-pink-100',
    textClass: 'text-[#E6007E]',
  },
  {
    id: 2,
    name: 'Ayesha Ahmed',
    location: 'Lahore',
    rating: 5,
    text: 'Love the designs and the customer service is amazing. Al Imran Fabrics never disappoints. Thank you!',
    initials: 'AA',
    bgClass: 'bg-purple-100',
    textClass: 'text-purple-600',
  },
  {
    id: 3,
    name: 'Sarah Malik',
    location: 'Islamabad',
    rating: 5,
    text: 'Premium quality at reasonable prices. Delivery was faster than expected. Very satisfied with my purchase!',
    initials: 'SM',
    bgClass: 'bg-rose-100',
    textClass: 'text-rose-600',
  },
];

export const ReviewsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-400 text-base">
            Trusted by thousands of happy customers across Pakistan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#E6007E] text-[#E6007E]" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-full ${review.bgClass} flex items-center justify-center flex-shrink-0`}
                >
                  <span className={`text-sm font-bold ${review.textClass}`}>
                    {review.initials}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
