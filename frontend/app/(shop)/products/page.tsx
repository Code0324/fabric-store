'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { productsAPI } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { getUniqueBrands, getUniqueCategories, sortProducts, filterByBrand, filterByCategory, filterByPriceRange } from '@/lib/utils';
import type { Product } from '@/lib/types';
import { SlidersHorizontal, X } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Filter states — initialise from URL query params
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    searchParams.get('brand') || null,
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category') || null,
  );
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = viewType === 'grid' ? 12 : 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const all = await productsAPI.getAll(200);
        setAllProducts(all);
      } catch (err: any) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (selectedBrand) {
      result = filterByBrand(result, selectedBrand);
    }
    if (selectedCategory) {
      result = filterByCategory(result, selectedCategory);
    }
    result = filterByPriceRange(result, priceRange[0], priceRange[1]);
    result = sortProducts(result, sortBy);

    return result;
  }, [allProducts, selectedBrand, selectedCategory, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const brands = useMemo(() => getUniqueBrands(allProducts), [allProducts]);
  const categories = useMemo(() => getUniqueCategories(allProducts), [allProducts]);

  const hasActiveFilters = !!(selectedBrand || selectedCategory);

  const clearFilters = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-border pb-6">
        <button
          onClick={() => setViewType('grid')}
          className={`flex-1 py-2 px-3 rounded-lg transition ${
            viewType === 'grid'
              ? 'bg-gold text-charcoal font-medium'
              : 'bg-surface text-cream hover:bg-charcoal'
          }`}
        >
          Grid
        </button>
        <button
          onClick={() => setViewType('list')}
          className={`flex-1 py-2 px-3 rounded-lg transition ${
            viewType === 'list'
              ? 'bg-gold text-charcoal font-medium'
              : 'bg-surface text-cream hover:bg-charcoal'
          }`}
        >
          List
        </button>
      </div>

      <div>
        <h3 className="font-serif font-bold text-gold mb-4">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
          className="input"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      {brands.length > 0 && (
        <div>
          <h3 className="font-serif font-bold text-gold mb-4">Brand</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer text-cream hover:text-gold transition">
              <input
                type="radio"
                name="brand"
                value=""
                checked={selectedBrand === null}
                onChange={() => {
                  setSelectedBrand(null);
                  setCurrentPage(1);
                }}
              />
              <span>All Brands</span>
            </label>
            {brands.slice(0, 8).map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer text-cream hover:text-gold transition text-sm">
                <input
                  type="radio"
                  name="brand"
                  value={brand}
                  checked={selectedBrand === brand}
                  onChange={() => {
                    setSelectedBrand(brand);
                    setCurrentPage(1);
                  }}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {categories.length > 0 && (
        <div>
          <h3 className="font-serif font-bold text-gold mb-4">Category</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer text-cream hover:text-gold transition">
              <input
                type="radio"
                name="category"
                value=""
                checked={selectedCategory === null}
                onChange={() => {
                  setSelectedCategory(null);
                  setCurrentPage(1);
                }}
              />
              <span>All Categories</span>
            </label>
            {categories.slice(0, 8).map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer text-cream hover:text-gold transition text-sm">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-serif font-bold text-gold mb-4">Price Range</h3>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted">Min: PKR {priceRange[0].toLocaleString()}</label>
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={priceRange[0]}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val <= priceRange[1]) {
                  setPriceRange([val, priceRange[1]]);
                  setCurrentPage(1);
                }
              }}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-xs text-muted">Max: PKR {priceRange[1].toLocaleString()}</label>
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={priceRange[1]}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val >= priceRange[0]) {
                  setPriceRange([priceRange[0], val]);
                  setCurrentPage(1);
                }
              }}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="btn btn-secondary w-full text-sm"
        >
          Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-4">Our Collection</h1>
          <p className="text-muted">Discover our complete range of premium Pakistani fabrics</p>
        </div>

        {error && (
          <div className="bg-danger/20 border border-danger text-danger px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="loading"></div>
          </div>
        ) : (
          <>
            {/* Mobile filter toggle */}
            <div className="lg:hidden flex items-center justify-between mb-6">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center gap-2 btn btn-secondary text-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="bg-gold text-charcoal text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {(selectedBrand ? 1 : 0) + (selectedCategory ? 1 : 0)}
                  </span>
                )}
              </button>
              <p className="text-sm text-muted">{filteredProducts.length} products</p>
            </div>

            {/* Mobile filter panel */}
            {filtersOpen && (
              <div className="lg:hidden mb-6 bg-surface border border-border rounded-xl p-5 relative">
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="absolute top-4 right-4 text-muted hover:text-gold"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
                <FilterPanel />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Desktop sidebar */}
              <div className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <FilterPanel />
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="mb-6 text-sm text-muted hidden lg:block">
                  Showing {paginatedProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{' '}
                  {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                </div>

                {paginatedProducts.length > 0 ? (
                  <>
                    <div
                      className={
                        viewType === 'grid'
                          ? 'grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8'
                          : 'space-y-4 mb-8'
                      }
                    >
                      {paginatedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex justify-center gap-2">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                          const pageNum = currentPage > 3 ? currentPage - 2 + i : i + 1;
                          return pageNum <= totalPages ? (
                            <button
                              key={pageNum}
                              onClick={() => {
                                setCurrentPage(pageNum);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className={`px-4 py-2 rounded-lg transition ${
                                currentPage === pageNum
                                  ? 'bg-gold text-charcoal font-bold'
                                  : 'bg-surface text-cream hover:bg-charcoal'
                              }`}
                            >
                              {pageNum}
                            </button>
                          ) : null;
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-20 text-muted">
                    <p className="text-lg mb-4">No products found</p>
                    {hasActiveFilters && (
                      <button onClick={clearFilters} className="btn btn-primary">
                        Clear Filters
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="loading" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
