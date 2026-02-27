'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Category {
  name: string;
  slug: string;
  image: string;
  description: string;
  color: string;
}

const categories: Category[] = [
  {
    name: 'Mens Wear',
    slug: 'mens',
    image: 'https://images.unsplash.com/photo-1564622506233-b5e12b4c2a5e?w=500&h=500&fit=crop',
    description: 'Premium collection for the modern man',
    color: 'from-blue-600/80 to-blue-900/80',
  },
  {
    name: 'Womens Wear',
    slug: 'womens',
    image: 'https://images.unsplash.com/photo-1552062407-c551eeda4bbb?w=500&h=500&fit=crop',
    description: 'Elegant fabrics for every woman',
    color: 'from-pink-600/80 to-pink-900/80',
  },
  {
    name: 'New Arrivals',
    slug: 'new-arrivals',
    image: 'https://images.unsplash.com/photo-1595938895559-58d7cb561341?w=500&h=500&fit=crop',
    description: 'Latest collections just arrived',
    color: 'from-purple-600/80 to-purple-900/80',
  },
  {
    name: 'Sale',
    slug: 'sale',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&h=500&fit=crop',
    description: 'Incredible discounts on premium fabrics',
    color: 'from-red-600/80 to-red-900/80',
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-gold font-medium tracking-widest uppercase mb-4">Curated Collections</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-4">Shop by Category</h2>
          <p className="text-muted max-w-2xl mx-auto">
            Explore our handpicked categories with fabrics for every occasion and style preference.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products/category/${category.slug}`}
              className="group relative overflow-hidden rounded-xl h-64 md:h-72 cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} group-hover:opacity-60 transition-opacity duration-300`}></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">{category.name}</h3>
                <p className="text-white/90 text-sm md:text-base mb-4">{category.description}</p>
                <div className="inline-flex items-center gap-2 bg-gold text-charcoal px-4 py-2 rounded-lg font-medium group-hover:bg-gold-light transition">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
