import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Heart, X } from 'lucide-react';

const EmbroideredCollection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [sort, setSort] = useState('newest');
  const [showSoldOut, setShowSoldOut] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE}/products/embroidered`, {
          params: {
            page,
            limit,
            sort,
            sold_out: showSoldOut,
          },
        });
        setProducts(response.data.items);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, sort, showSoldOut]);

  const handleAddToCart = (product) => {
    // TODO: Integrate with your cart store (Zustand)
    console.log('Added to cart:', product);
  };

  const handleWhatsApp = (product) => {
    const message = `Hi! I'm interested in ${product.name} (SKU: ${product.sku}). Price: Rs.${product.selling_price}`;
    const whatsappNumber = '+923001234567'; // Update with actual number
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const parseImages = (imageString) => {
    try {
      return JSON.parse(imageString || '[]');
    } catch {
      return [];
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F0E8] py-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Embroidered Unstitched Collection
        </h1>
        <p className="text-center text-[#8A8A8A] max-w-2xl mx-auto">
          Premium embroidered unstitched lawn suits, perfect for Eid, weddings, and festive occasions
        </p>
      </div>

      {/* Filters & Sorting */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-6 border-b border-[#2A2A2A]">
          {/* Sort */}
          <div className="flex items-center gap-4">
            <label className="text-[#8A8A8A]">Sort:</label>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="bg-[#141414] border border-[#2A2A2A] text-[#F5F0E8] px-4 py-2 rounded hover:border-[#C9A84C] transition-colors"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {/* Show Sold Out Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showSoldOut}
              onChange={(e) => {
                setShowSoldOut(e.target.checked);
                setPage(1);
              }}
              className="w-4 h-4 accent-[#C9A84C]"
            />
            <span className="text-[#8A8A8A]">Include Sold Out</span>
          </label>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-[#141414] rounded-lg animate-pulse h-96" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {products.map((product) => {
                const images = parseImages(product.images);
                const imageUrl = images[0] || '/placeholder-product.jpg';
                const isSoldOut = product.stock_status === 'out_of_stock';

                return (
                  <div
                    key={product.id}
                    className="bg-[#141414] rounded-lg overflow-hidden border border-[#2A2A2A] hover:border-[#C9A84C] transition-all duration-300 group"
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden bg-[#0A0A0A] aspect-square">
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Sold Out Badge */}
                      {isSoldOut && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-[#E53E3E] font-bold text-lg">SOLD OUT</span>
                        </div>
                      )}

                      {/* Quick Actions */}
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="bg-[#C9A84C] text-[#0A0A0A] p-2 rounded-full hover:bg-[#E8C76A] transition-colors">
                          <Heart size={20} />
                        </button>
                      </div>

                      {/* Discount Badge */}
                      {product.discount_percentage > 0 && !isSoldOut && (
                        <div className="absolute bottom-2 left-2 bg-[#E53E3E] text-white px-3 py-1 rounded font-bold text-sm">
                          -{product.discount_percentage}%
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      {/* SKU & Type */}
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs text-[#8A8A8A] uppercase tracking-widest">
                            {product.piece_type}
                          </p>
                          <p className="text-xs text-[#8A8A8A]">SKU: {product.sku}</p>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3
                        className="text-sm font-semibold mb-3 line-clamp-2 hover:text-[#C9A84C] cursor-pointer transition-colors"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {product.name}
                      </h3>

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-[#C9A84C]">
                            Rs.{product.selling_price.toLocaleString()}
                          </span>
                          {product.discount_percentage > 0 && (
                            <span className="text-xs text-[#8A8A8A] line-through">
                              Rs.{(product.selling_price / (1 - product.discount_percentage / 100)).toFixed(0)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#8A8A8A] mt-1">
                          Stock: {product.total_stock}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={isSoldOut}
                          className="flex-1 bg-[#C9A84C] text-[#0A0A0A] py-2 rounded font-semibold hover:bg-[#E8C76A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={16} />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => handleWhatsApp(product)}
                          className="flex-1 bg-[#25D366] text-white py-2 rounded font-semibold hover:bg-[#20BA58] transition-colors text-sm"
                        >
                          WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-[#141414] border border-[#2A2A2A] rounded hover:border-[#C9A84C] transition-colors disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-[#8A8A8A]">Page {page}</span>
              <button
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 bg-[#141414] border border-[#2A2A2A] rounded hover:border-[#C9A84C] transition-colors"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#8A8A8A]">No products found</p>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] rounded-lg max-w-2xl w-full border border-[#2A2A2A]">
            <div className="flex justify-between items-center p-6 border-b border-[#2A2A2A]">
              <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-[#8A8A8A] hover:text-[#F5F0E8]"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image */}
                <div className="bg-[#0A0A0A] rounded p-4">
                  <img
                    src={parseImages(selectedProduct.images)[0] || '/placeholder.jpg'}
                    alt={selectedProduct.name}
                    className="w-full h-auto rounded"
                  />
                </div>

                {/* Details */}
                <div>
                  <p className="text-[#C9A84C] font-bold mb-2">SKU: {selectedProduct.sku}</p>
                  <p className="text-[#8A8A8A] mb-4">{selectedProduct.piece_type} Suit</p>
                  <p className="text-[#F5F0E8] mb-6">{selectedProduct.description}</p>

                  <div className="mb-6">
                    <p className="text-2xl font-bold text-[#C9A84C] mb-2">
                      Rs.{selectedProduct.selling_price.toLocaleString()}
                    </p>
                    {selectedProduct.discount_percentage > 0 && (
                      <p className="text-[#8A8A8A] line-through">
                        Original: Rs.{(selectedProduct.selling_price / (1 - selectedProduct.discount_percentage / 100)).toFixed(0)}
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-[#8A8A8A] mb-6">
                    Tags: {selectedProduct.tags}
                  </p>

                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full bg-[#C9A84C] text-[#0A0A0A] py-3 rounded font-semibold hover:bg-[#E8C76A] transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbroideredCollection;
