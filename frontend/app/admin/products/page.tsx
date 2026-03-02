'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { productsAPI } from '@/lib/api';
import { formatCurrency, isLowStock } from '@/lib/utils';
import { useToast } from '@/lib/adminStore';
import ProductModal from '@/components/admin/ProductModal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import {
  Plus, Search, RefreshCw, Edit2, Trash2, Package,
  AlertTriangle, Filter, Eye, EyeOff, Loader2, Star, Zap, Sparkles,
} from 'lucide-react';
import type { Product } from '@/lib/types';

// ─── Constants ───────────────────────────────────────────────────────────────

const LOW_STOCK_THRESHOLD = 5;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0)
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">Out of stock</span>;
  if (isLowStock(stock, LOW_STOCK_THRESHOLD))
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200"><AlertTriangle className="w-3 h-3" />{stock} low</span>;
  return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">{stock} in stock</span>;
}

function FlagBadge({ label, icon: Icon, active }: { label: string; icon: React.ElementType; active: boolean }) {
  if (!active) return null;
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-2xs font-medium bg-gold/10 text-gold border border-gold/20">
      <Icon className="w-2.5 h-2.5" />{label}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminProductsPage() {
  const toast = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');

  const fetchProducts = useCallback(async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      const data = await productsAPI.getAll(500);
      setProducts(Array.isArray(data) ? data : []);
    } catch (e: any) {
      toast.error(e?.response?.data?.detail ?? 'Failed to load products.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // Derived filter options
  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category).filter(Boolean))).sort(), [products]);
  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand).filter(Boolean))).sort(), [products]);

  const filtered = useMemo(() => {
    let result = products;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    }
    if (filterCategory) result = result.filter((p) => p.category === filterCategory);
    if (filterBrand) result = result.filter((p) => p.brand === filterBrand);
    if (filterActive === 'active') result = result.filter((p) => p.is_active);
    if (filterActive === 'inactive') result = result.filter((p) => !p.is_active);
    return result;
  }, [products, search, filterCategory, filterBrand, filterActive]);

  const lowStockCount = useMemo(() => products.filter((p) => isLowStock(p.stock, LOW_STOCK_THRESHOLD)).length, [products]);

  // ── Create / Update ──────────────────────────────────────────────────────

  const handleSave = async (data: Partial<Product>) => {
    if (editProduct) {
      const res = await productsAPI.update(editProduct.id, data);
      setProducts((prev) => prev.map((p) => (p.id === editProduct.id ? (res.data as Product) : p)));
      toast.success('Product updated successfully.');
    } else {
      const res = await productsAPI.create(data);
      setProducts((prev) => [res.data as Product, ...prev]);
      toast.success('Product created successfully.');
    }
    setModalOpen(false);
    setEditProduct(null);
  };

  // ── Delete ────────────────────────────────────────────────────────────────

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await productsAPI.delete(deleteTarget.id);
      setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      toast.success(`"${deleteTarget.name}" deleted.`);
    } catch (e: any) {
      toast.error(e?.response?.data?.detail ?? 'Failed to delete product.');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-cream">Products</h1>
          <p className="text-sm text-muted mt-0.5">
            {filtered.length} of {products.length} products
            {lowStockCount > 0 && (
              <span className="ml-2 text-amber-600 font-medium">
                · {lowStockCount} low stock
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchProducts(true)}
            disabled={refreshing}
            className="p-2 text-muted border border-border rounded-lg hover:bg-ivory hover:text-cream transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => { setEditProduct(null); setModalOpen(true); }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gold text-white rounded-lg hover:bg-gold-dark transition"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search by name, SKU, brand…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-surface border border-border rounded-lg text-cream placeholder-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 text-sm bg-surface border border-border rounded-lg text-cream focus:outline-none focus:border-gold"
        >
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>

        <select
          value={filterBrand}
          onChange={(e) => setFilterBrand(e.target.value)}
          className="px-3 py-2 text-sm bg-surface border border-border rounded-lg text-cream focus:outline-none focus:border-gold"
        >
          <option value="">All Brands</option>
          {brands.map((b) => <option key={b}>{b}</option>)}
        </select>

        <select
          value={filterActive}
          onChange={(e) => setFilterActive(e.target.value as any)}
          className="px-3 py-2 text-sm bg-surface border border-border rounded-lg text-cream focus:outline-none focus:border-gold"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        {(search || filterCategory || filterBrand || filterActive !== 'all') && (
          <button
            onClick={() => { setSearch(''); setFilterCategory(''); setFilterBrand(''); setFilterActive('all'); }}
            className="px-3 py-2 text-xs text-muted border border-border rounded-lg hover:bg-ivory hover:text-cream transition"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-16 text-center">
          <Package className="w-12 h-12 text-muted mx-auto mb-4" />
          <p className="text-muted font-medium">No products found</p>
          <p className="text-muted text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ivory border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Product</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider hidden md:table-cell">Category / Brand</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Price</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Stock</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider hidden lg:table-cell">Flags</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((product) => (
                  <tr key={product.id} className="hover:bg-ivory/50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg border border-border bg-ivory overflow-hidden flex-shrink-0">
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-4 h-4 text-muted" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-cream truncate max-w-[200px]">{product.name}</p>
                          <p className="text-xs text-muted font-mono">{product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm text-cream">{product.category}</p>
                      <p className="text-xs text-muted">{product.brand}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-cream">{formatCurrency(product.price)}</p>
                      {product.compare_price && (
                        <p className="text-xs text-muted line-through">{formatCurrency(product.compare_price)}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StockBadge stock={product.stock} />
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        <FlagBadge label="Featured" icon={Star} active={product.is_featured} />
                        <FlagBadge label="Bestseller" icon={Zap} active={product.is_bestseller ?? false} />
                        <FlagBadge label="New" icon={Sparkles} active={product.is_new_arrival ?? false} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        product.is_active
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-gray-100 text-gray-500 border border-gray-200'
                      }`}>
                        {product.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => { setEditProduct(product); setModalOpen(true); }}
                          className="p-1.5 text-muted hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(product)}
                          className="p-1.5 text-muted hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        open={modalOpen}
        product={editProduct}
        onClose={() => { setModalOpen(false); setEditProduct(null); }}
        onSave={handleSave}
      />

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        confirmClass="bg-red-600 hover:bg-red-700 text-white"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
