'use client';

import { useEffect, useState } from 'react';
import { productsAPI } from '@/lib/api';
import type { Product } from '@/lib/types';
import Navbar from '@/components/Navbar';
import { OfferBanner } from '@/components/home/OfferBanner';
import { HeroSection } from '@/components/home/HeroSection';
import { BrandLogos } from '@/components/home/BrandLogos';
import { WomenCollection } from '@/components/home/WomenCollection';
import { MenCollection } from '@/components/home/MenCollection';
import { USPSection } from '@/components/home/USPSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { SubscriptionSection } from '@/components/home/SubscriptionSection';
import { CTASection } from '@/components/home/CTASection';
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
            p.category?.toLowerCase().includes('women') ||
            p.category?.toLowerCase().includes('bridal') ||
            p.name?.toLowerCase().includes('women')
        ).slice(0, 24);

        const men = products.filter(
          (p) =>
            p.category?.toLowerCase().includes('men') ||
            p.category?.toLowerCase().includes('kurta') ||
            p.category?.toLowerCase().includes('shalwar')
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
    <div className="min-h-screen bg-charcoal">
      <OfferBanner />
      <Navbar />
      <HeroSection />
      <BrandLogos />
      <WomenCollection
        products={womenProducts}
        loading={loading}
        carouselIndex={womenIdx}
        handleNext={handleWomenNext}
        handlePrev={handleWomenPrev}
      />
      <MenCollection
        products={menProducts}
        loading={loading}
        carouselIndex={menIdx}
        handleNext={handleMenNext}
        handlePrev={handleMenPrev}
      />
      <USPSection />
      <ReviewsSection />
      <SubscriptionSection />
      <CTASection />
      <Footer />
    </div>
  );
}
