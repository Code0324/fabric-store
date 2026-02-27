'use client';

import { useEffect, useState } from 'react';
import { productsAPI } from '@/lib/api';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { ChevronLeft, ChevronRight, ShoppingBag, Heart, Star, Truck, Zap, Award, Mail, CheckCircle } from 'lucide-react';

// Premium Pakistani Fashion Brands
const BRANDS = [
  { name: 'J.', shortName: 'J' },
  { name: 'Zellbury', shortName: 'ZB' },
  { name: 'Khaadi', shortName: 'KD' },
  { name: 'Sana Safinaz', shortName: 'SS' },
  { name: 'Sapphire', shortName: 'SP' },
  { name: 'Maria B', shortName: 'MB' },
  { name: 'Gul Ahmed', shortName: 'GA' },
  { name: 'Alkaram Studio', shortName: 'AK' },
  { name: 'Nishat Linen', shortName: 'NL' },
  { name: 'Bonanza Satrangi', shortName: 'BS' },
  { name: 'Sania Maskatiya', shortName: 'SM' },
  { name: 'Zainab Chottani', shortName: 'ZC' },
  { name: 'SAYA', shortName: 'SA' },
];

// Women's Brand Categories with Model Images
const WOMEN_BRANDS = [
  {
    id: 1,
    name: 'Khaadi',
    image: '/images/categories/istockphoto-1710488387-612x612.jpg',
  },
  {
    id: 2,
    name: 'Sapphire',
    image: '/images/categories/istockphoto-1712063447-612x612.jpg',
  },
  {
    id: 3,
    name: 'Maria B',
    image: '/images/categories/istockphoto-1710488387-612x612.jpg',
  },
  {
    id: 4,
    name: 'Gul Ahmed',
    image: '/images/categories/istockphoto-1712063447-612x612.jpg',
  },
  {
    id: 5,
    name: 'Alkaram Studio',
    image: '/images/categories/istockphoto-1710488387-612x612.jpg',
  },
  {
    id: 6,
    name: 'Bareeze',
    image: '/images/categories/istockphoto-1712063447-612x612.jpg',
  },
];

// Men's Brand Categories with Model Images
const MEN_BRANDS = [
  {
    id: 1,
    name: 'Edenrobe',
    image: '/images/categories/istockphoto-1712063447-612x612.jpg',
  },
  {
    id: 2,
    name: 'Bonanza Satrangi',
    image: '/images/categories/istockphoto-1710488387-612x612.jpg',
  },
  {
    id: 3,
    name: 'Junaid Jamshed',
    image: '/images/categories/istockphoto-1712063447-612x612.jpg',
  },
  {
    id: 4,
    name: 'Outfitters',
    image: '/images/categories/istockphoto-1710488387-612x612.jpg',
  },
  {
    id: 5,
    name: 'Cambridge',
    image: '/images/categories/istockphoto-1712063447-612x612.jpg',
  },
  {
    id: 6,
    name: 'Diners',
    image: '/images/categories/istockphoto-1710488387-612x612.jpg',
  },
];

// Sample Reviews
const REVIEWS = [
  {
    id: 1,
    name: 'Fatima Khan',
    location: 'Karachi',
    rating: 5,
    text: 'Excellent quality and fast delivery! The fabric is premium and the stitching is perfect. Highly recommended!',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima'
  },
  {
    id: 2,
    name: 'Ayesha Ahmed',
    location: 'Lahore',
    rating: 5,
    text: 'Love the designs and the customer service is amazing. Al Imran Fabrics never disappoints. Thank you!',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayesha'
  },
  {
    id: 3,
    name: 'Sarah Malik',
    location: 'Islamabad',
    rating: 5,
    text: 'Premium quality at reasonable prices. The delivery was faster than expected. Very satisfied with my purchase!',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
];

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

export default function Home() {
  const [womenProducts, setWomenProducts] = useState<Product[]>([]);
  const [menProducts, setMenProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [womenCarouselIndex, setWomenCarouselIndex] = useState(0);
  const [menCarouselIndex, setMenCarouselIndex] = useState(0);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await productsAPI.getAll(200);

        // Filter women products
        const women = products.filter(
          (p) => p.name?.toLowerCase().includes('women') ||
                 p.category?.toLowerCase().includes('women') ||
                 p.category?.toLowerCase().includes('dress')
        ).slice(0, 12);

        // Filter men products
        const men = products.filter(
          (p) => p.name?.toLowerCase().includes('men') ||
                 p.category?.toLowerCase().includes('men')
        ).slice(0, 12);

        setWomenProducts(women.length > 0 ? women : products.slice(0, 12));
        setMenProducts(men.length > 0 ? men : products.slice(12, 24));
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const ITEMS_PER_ROW = 6;

  const handleWomenNext = () => {
    setWomenCarouselIndex((prev) =>
      prev + ITEMS_PER_ROW >= womenProducts.length ? 0 : prev + ITEMS_PER_ROW
    );
  };

  const handleWomenPrev = () => {
    setWomenCarouselIndex((prev) =>
      prev === 0 ? Math.max(0, womenProducts.length - ITEMS_PER_ROW) : prev - ITEMS_PER_ROW
    );
  };

  const handleMenNext = () => {
    setMenCarouselIndex((prev) =>
      prev + ITEMS_PER_ROW >= menProducts.length ? 0 : prev + ITEMS_PER_ROW
    );
  };

  const handleMenPrev = () => {
    setMenCarouselIndex((prev) =>
      prev === 0 ? Math.max(0, menProducts.length - ITEMS_PER_ROW) : prev - ITEMS_PER_ROW
    );
  };

  // Premium product images for better display
  const PREMIUM_PRODUCT_IMAGES = [
    'https://images.unsplash.com/photo-1617623814075-e51df1bdc82f?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1618932260643-30f82d9a8444?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1606529957590-dffbdf47e3a1?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1572804419223-0ac36cb5d85f?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1592286927505-1def25115558?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop',
  ];

  const ProductCard = ({ product, index }: { product: Product; index?: number }) => (
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

  return (
    <div className="bg-white min-h-screen">
      {/* Animated Offer Banner */}
      <div className="bg-gradient-to-r from-[#E6007E] to-[#C80066] text-white py-3 overflow-hidden">

        <div className="flex animate-scroll">
          <span className="text-sm md:text-base font-bold whitespace-nowrap px-4">
            🎉 EID MEGA SALE - UP TO 50% OFF ON ALL COLLECTIONS! 🎉
          </span>
          <span className="text-sm md:text-base font-bold whitespace-nowrap px-4">
            🎉 FREE SHIPPING ON ORDERS OVER PKR 2000! 🎉
          </span>
        </div>
        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-scroll {
            animation: scroll 15s linear infinite;
          }
        `}</style>
      </div>

      {/* Hero Banner with Eid Sale */}
      <section className="relative h-[80vh] md:h-screen flex items-center justify-center overflow-hidden" style={{backgroundImage: 'linear-gradient(135deg, rgba(230, 0, 126, 0.5) 0%, rgba(200, 0, 102, 0.4) 100%), url(https://images.unsplash.com/photo-1617623814075-e51df1bdc82f?w=1600&h=1200&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFA3B1] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFA3B1] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container text-center px-4">
          <div className="mb-8 animate-pulse">
            <span className="text-6xl">✨</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            EID SALE OFFER
          </h1>
          <p className="text-2xl md:text-3xl text-[#FFF0F5] mb-2 font-semibold">
            UP TO 70% OFF
          </p>
          <p className="text-lg md:text-xl text-[#FFF0F5] mb-12 max-w-2xl mx-auto">
            Celebrate in style with our exclusive Eid collection of stitched and unstitched dresses
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="px-8 py-4 bg-white text-[#E6007E] font-bold rounded-lg hover:bg-[#FFF0F5] transition-all text-lg">
              Shop Now
            </Link>
            <Link href="/products" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#E6007E] transition-all text-lg">
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Logos Scrolling Section */}
      <section className="py-16 md:py-20 bg-white border-t border-gray-100">
        <div className="container px-4">
          <p className="text-center text-gray-600 text-xs md:text-sm font-semibold mb-10 uppercase tracking-widest">
            Premium Brands We Carry
          </p>
          <div className="overflow-hidden">
            <div className="flex gap-6 md:gap-8 animate-scroll-slow items-center justify-center">
              {[...BRANDS, ...BRANDS].map((brand, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 flex items-center justify-center min-w-max group cursor-pointer transition-all duration-300"
                >
                  <div className="relative">
                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border border-gray-200 group-hover:border-[#E6007E] group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-105">
                      <div className="text-center">
                        <p className="text-3xl md:text-4xl font-bold text-gray-800 group-hover:text-[#E6007E] transition-colors">
                          {brand.shortName}
                        </p>
                        <p className="text-xs md:text-sm text-gray-600 mt-2 font-semibold px-2">
                          {brand.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            @keyframes scroll-slow {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scroll-slow {
              animation: scroll-slow 45s linear infinite;
            }
            .animate-scroll-slow:hover {
              animation-play-state: paused;
            }
          `}</style>
        </div>
      </section>

      {/* USP Section - Unique Identity */}
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

      {/* Women's Collection Banner */}
      <section className="relative h-64 md:h-96 w-full overflow-hidden">
        <img
          src="/images/women-banner.jpg"
          alt="Women's Collection"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Women's Collection</h2>
            <p className="text-lg md:text-2xl text-[#FFF0F5]">Explore Premium Brands</p>
          </div>
        </div>
      </section>

      {/* Women's Brand Categories Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#FFF8F5]">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2E2E2E] mb-4">
            Shop Women by Brand
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Discover elegant dresses from your favorite brands</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {WOMEN_BRANDS.map((brand) => (
              <Link key={brand.id} href={`/products?brand=${brand.name.toLowerCase()}`}>
                <div className="group cursor-pointer flex flex-col items-center">
                  {/* Circle Card */}
                  <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* Hover Border Glow */}
                    <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#E91E63] group-hover:shadow-[inset_0_0_20px_rgba(233,30,99,0.3)] transition-all duration-300"></div>
                  </div>

                  {/* Brand Name Below */}
                  <h3 className="mt-4 text-center font-bold text-[#2E2E2E] text-sm md:text-base group-hover:text-[#E91E63] transition-colors duration-300">
                    {brand.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Women Products */}
      <section className="py-16 md:py-24 bg-[#FFF8F0]">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2E2E2E] mb-4">
            Featured Women's Collection
          </h2>
          <p className="text-gray-600 mb-12 text-lg">
            Handpicked premium dresses and fabrics for every occasion
          </p>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-[#E6007E] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : womenProducts.length > 0 ? (
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {womenProducts.slice(womenCarouselIndex, womenCarouselIndex + ITEMS_PER_ROW).map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={womenCarouselIndex + idx} />
                ))}
              </div>

              {womenProducts.length > ITEMS_PER_ROW && (
                <>
                  <button
                    onClick={handleWomenPrev}
                    className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-[#E6007E] text-white p-2 rounded-full hover:bg-[#C80066] transition-colors z-10 hidden lg:block"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleWomenNext}
                    className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-[#E6007E] text-white p-2 rounded-full hover:bg-[#C80066] transition-colors z-10 hidden lg:block"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Products coming soon</p>
            </div>
          )}
        </div>
      </section>

      {/* Men's Collection Banner */}
      <section className="relative h-64 md:h-96 w-full overflow-hidden">
        <img
          src="/images/women-banner.jpg"
          alt="Men's Collection"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Men's Collection</h2>
            <p className="text-lg md:text-2xl text-[#FFF0F5]">Premium Styles for Every Occasion</p>
          </div>
        </div>
      </section>

      {/* Men's Brand Categories Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFF8F5] to-white">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2E2E2E] mb-4">
            Shop Men by Brand
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Premium styles from leading men's fashion brands</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {MEN_BRANDS.map((brand) => (
              <Link key={brand.id} href={`/products?brand=${brand.name.toLowerCase()}`}>
                <div className="group cursor-pointer flex flex-col items-center">
                  {/* Circle Card */}
                  <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* Hover Border Glow */}
                    <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#E91E63] group-hover:shadow-[inset_0_0_20px_rgba(233,30,99,0.3)] transition-all duration-300"></div>
                  </div>

                  {/* Brand Name Below */}
                  <h3 className="mt-4 text-center font-bold text-[#2E2E2E] text-sm md:text-base group-hover:text-[#E91E63] transition-colors duration-300">
                    {brand.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Men's Featured Collection */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2E2E2E] mb-4">
            Men's Premium Collection
          </h2>
          <p className="text-gray-600 mb-12 text-lg">
            Stylish and elegant designs for the modern Pakistani man
          </p>

          {menProducts.length > 0 ? (
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {menProducts.slice(menCarouselIndex, menCarouselIndex + ITEMS_PER_ROW).map((product, idx) => (
                  <ProductCard key={product.id} product={product} index={menCarouselIndex + idx} />
                ))}
              </div>

              {menProducts.length > ITEMS_PER_ROW && (
                <>
                  <button
                    onClick={handleMenPrev}
                    className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-[#E6007E] text-white p-2 rounded-full hover:bg-[#C80066] transition-colors z-10 hidden lg:block"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleMenNext}
                    className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-[#E6007E] text-white p-2 rounded-full hover:bg-[#C80066] transition-colors z-10 hidden lg:block"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Products coming soon</p>
            </div>
          )}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 md:py-24 bg-[#FFF8F0]">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#2E2E2E] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">Trusted by thousands across Pakistan</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-6">
                  <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-bold text-[#2E2E2E]">{review.name}</p>
                    <p className="text-sm text-gray-600">{review.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E6007E] text-[#E6007E]" />
                  ))}
                </div>

                <p className="text-gray-700 italic">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Section */}
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

            <form onSubmit={(e) => { e.preventDefault(); setEmail(''); }} className="flex flex-col sm:flex-row gap-3 mb-6">
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

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2E2E2E] mb-6">
            Ready to Elevate Your Wardrobe?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Discover premium Pakistani fashion with Al Imran Fabrics. Quality guaranteed, fast delivery assured.
          </p>
          <Link href="/products" className="inline-block px-10 py-4 bg-[#E6007E] text-white font-bold rounded-lg hover:bg-[#C80066] transition-all text-lg">
            Shop Full Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
