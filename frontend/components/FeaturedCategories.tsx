'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Category {
  name: string;
  href: string;
  image: string;
  description: string;
}

const categories: Category[] = [
  {
    name: "Men's Wear",
    href: '/products?category=Men+Kurta',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=700&fit=crop',
    description: 'Kurtas, Shalwar Kameez & more',
  },
  {
    name: "Women's Lawn",
    href: '/products?category=Women+Lawn+Unstitched',
    image: 'https://images.unsplash.com/photo-1617623814075-e51df1bdc82f?w=600&h=700&fit=crop',
    description: 'Stitched & unstitched lawn suits',
  },
  {
    name: 'New Arrivals',
    href: '/products',
    image: 'https://images.unsplash.com/photo-1618932260643-30f82d9a8444?w=600&h=700&fit=crop',
    description: 'Fresh styles added weekly',
  },
  {
    name: 'Luxury Formal',
    href: '/products?category=Luxury+Formal',
    image: 'https://images.unsplash.com/photo-1606529957590-dffbdf47e3a1?w=600&h=700&fit=crop',
    description: 'Chiffon, velvet & bridal wear',
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 md:py-24 bg-charcoal">
      <div className="container px-4">
        <div className="text-center mb-12">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            Curated Collections
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-3">
            Shop by Category
          </h2>
          <p className="text-muted max-w-xl mx-auto text-sm">
            Handpicked categories for every style and occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-xl h-64 md:h-72 cursor-pointer block"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-serif font-bold text-white mb-1">{category.name}</h3>
                <p className="text-white/70 text-xs mb-4">{category.description}</p>
                <div className="inline-flex items-center gap-2 bg-gold text-charcoal px-4 py-1.5 rounded-lg text-xs font-bold group-hover:bg-gold-light transition-colors">
                  Explore
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
