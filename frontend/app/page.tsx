'use client';

import { useEffect, useState } from 'react';
import { productsAPI } from '@/lib/api';
import type { Product } from '@/lib/types';
import { OfferBanner } from '@/components/home/OfferBanner';
import { HeroSection } from '@/components/home/HeroSection';
import { BrandLogos } from '@/components/home/BrandLogos';
import { WomenCollection } from '@/components/home/WomenCollection';
import { MenCollection } from '@/components/home/MenCollection';
import { USPSection } from '@/components/home/USPSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { SubscriptionSection } from '@/components/home/SubscriptionSection';
import Footer from '@/components/Footer';

const ITEMS_PER_PAGE = 8;

export default function Home() {
  const [womenProducts, setWomenProducts] = useState<Product[]>([]);
  const [menProducts, setMenProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [womenIdx, setWomenIdx] = useState(0);
  const [menIdx, setMenIdx] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await productsAPI.getAll(200);

        const women = products.filter(
          (p) =>
            p.name?.toLowerCase().includes('women') ||
            p.category?.toLowerCase().includes('women') ||
            p.category?.toLowerCase().includes('dress')
        ).slice(0, 24);

        const men = products.filter(
          (p) =>
            p.name?.toLowerCase().includes('men') ||
            p.category?.toLowerCase().includes('men')
        ).slice(0, 24);

        setWomenProducts(women.length > 0 ? women : products.slice(0, 24));
        setMenProducts(men.length > 0 ? men : products.slice(12, 36));
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleWomenNext = () =>
    setWomenIdx((prev) =>
      prev + ITEMS_PER_PAGE >= womenProducts.length ? 0 : prev + ITEMS_PER_PAGE
    );

  const handleWomenPrev = () =>
    setWomenIdx((prev) =>
      prev === 0 ? Math.max(0, womenProducts.length - ITEMS_PER_PAGE) : prev - ITEMS_PER_PAGE
    );

  const handleMenNext = () =>
    setMenIdx((prev) =>
      prev + ITEMS_PER_PAGE >= menProducts.length ? 0 : prev + ITEMS_PER_PAGE
    );

  const handleMenPrev = () =>
    setMenIdx((prev) =>
      prev === 0 ? Math.max(0, menProducts.length - ITEMS_PER_PAGE) : prev - ITEMS_PER_PAGE
    );

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Offer ticker */}
      <OfferBanner />

      {/* 2. Hero banner — hero-eid.png */}
      <HeroSection />

      {/* 3. Brand logos carousel */}
      <BrandLogos />

      {/* 4. Women Collection — banner + category icons + product grid */}
      <WomenCollection
        products={womenProducts}
        loading={loading}
        carouselIndex={womenIdx}
        handleNext={handleWomenNext}
        handlePrev={handleWomenPrev}
      />

      {/* 5. Men Collection — banner + category icons + product grid */}
      <MenCollection
        products={menProducts}
        loading={loading}
        carouselIndex={menIdx}
        handleNext={handleMenNext}
        handlePrev={handleMenPrev}
      />

      {/* 6. USP */}
      <USPSection />

      {/* 7. Reviews */}
      <ReviewsSection />

      {/* 8. Email subscription */}
      <SubscriptionSection />

      {/* 9. Footer */}
      <Footer />
    </div>
  );
}
