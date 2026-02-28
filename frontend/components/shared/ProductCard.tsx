'use client';

import { Product } from '@/lib/types';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';

// Premium product images for better display
const PREMIUM_PRODUCT_IMAGES = [
  'https://images.unsplash.com/photo-1617623814075-e51df1bdc82f?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1618932260643-30f82d9a8444?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1606529957590-dffbdf47e3a1?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1572804419223-0ac36cb5d85f?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop',
];

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group cursor-pointer h-full">
        <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden mb-4">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <img
              src={PREMIUM_PRODUCT_IMAGES[index ? index % PREMIUM_PRODUCT_IMAGES.length : 0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          )}
          {product.compare_price && product.compare_price > product.price && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              -{Math.round(((product.compare_price - product.price) / product.compare_price) * 100)}%
            </div>
          )}
          <button className="absolute bottom-3 right-3 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
            <Heart className="w-5 h-5 text-[#E6007E]" />
          </button>
        </div>
        <div>
          <p className="text-xs text-[#E6007E] font-bold mb-1 uppercase tracking-widest">{product.brand || 'Al Imran'}</p>
          <h3 className="text-sm font-bold text-[#2E2E2E] line-clamp-2 mb-2 group-hover:text-[#E6007E] transition-colors">{product.name}</h3>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#E6007E] text-[#E6007E]" />
            ))}
            <span className="text-xs text-gray-600 ml-1">(256)</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-[#E6007E]">
                PKR {Math.floor(product.price).toLocaleString()}
              </p>
              {product.compare_price && product.compare_price > product.price && (
                <p className="text-xs text-gray-400 line-through">
                  PKR {Math.floor(product.compare_price).toLocaleString()}
                </p>
              )}
            </div>
          </div>
          <button className="w-full mt-3 bg-[#E6007E] text-white py-2 rounded font-bold text-sm hover:bg-[#C80066] transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};