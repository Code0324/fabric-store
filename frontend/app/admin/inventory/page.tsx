'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { productsAPI } from '@/lib/api';
import { formatCurrency, isLowStock, generateWhatsAppLink } from '@/lib/utils';
import { useToast, useAdminStore } from '@/lib/adminStore';
import {
  Package, AlertTriangle, Search, RefreshCw,
  ArrowUpDown, Edit2, MessageCircle, CheckCircle,
  Loader2, TrendingDown,
} from 'lucide-react';
import type { Product } from '@/lib/types';

type SortBy = 'stock-asc' | 'stock-desc' | 'name' | 'category';
type FilterView = 'all' | 'low' | 'out';

export default function AdminInventoryPage() {
  const toast = useToast();
  const { settings } = useAdminStore();
  const threshold = settings.lowStockThreshold;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('stock-asc');
  const [filterView, setFilterView] = useState<FilterView>('low');

  // Inline stock editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStock, setEditStock] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);

  const fetchProducts = useCallback(async (silent = false) => {
    if (!silent) setLoading(true); else setRefreshing(true);
    try {
      const data = await productsAPI.getAll(500);
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load inventory.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const filtered = useMemo(() => {
    let result = products;

    // View filter
    if (filterView === 'low') result = result.filter((p) => isLowStock(p.stock, threshold) && p.stock > 0);
    if (filterView === 'out') result = result.filter((p) => p.stock === 0);

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      );
    }

    // Sort
    return [...result].sort((a, b) => {
      if (sortBy === 'stock-asc') return a.stock - b.stock;
      if (sortBy === 'stock-desc') return b.stock - a.stock;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'category') return (a.category ?? '').localeCompare(b.category ?? '');
      return 0;
    });
  }, [products, filterView, search, sortBy, threshold]);

  const stats = useMemo(() => ({
    total: products.length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    lowStock: products.filter((p) => isLowStock(p.stock, threshold) && p.stock > 0).length,
    healthy: products.filter((p) => p.stock > threshold).length,
    totalValue: products.reduce((s, p) => s + p.price * p.stock, 0),
  }), [products, threshold]);

  const handleInlineEdit = async (product: Product) => {
    const newStock = parseInt(editStock);
    if (isNaN(newStock) || newStock < 0) {
      toast.warning('Please enter a valid stock number.');
      return;
    }
    setSavingId(product.id);
    try {
      const res = await productsAPI.update(product.id, { ...product, stock: newStock });
      setProducts((prev) => prev.map((p) => (p.id === product.id ? (res.data as Product) : p)));
      toast.success(`Stock updated to ${newStock} for "${product.name}".`);
    } catch (e: any) {
      toast.error(e?.response?.data?.detail ?? 'Failed to update stock.');
    } finally {
      setSavingId(null);
      setEditingId(null);
      setEditStock('');
    }
  };

  const handleRestockWhatsApp = (product: Product) => {
    const phone = settings.whatsappNumber;
    const msg = `*Restock Alert - AL Imran Fabrics*\n\nProduct: ${product.name}\nSKU: ${product.sku}\nCurrent Stock: ${product.stock}\n\nPlease arrange restocking for this item.`;
    window.open(generateWhatsAppLink(phone, msg), '_blank');
  };

  const VIEWS: { label: string; value: FilterView; count: number; color: string }[] = [
    { label: 'All Products', value: 'all', count: stats.total, color: 'border-border' },
    { label: 'Low Stock', value: 'low', count: stats.lowStock, color: 'border-amber-400 text-amber-700' },
    { label: 'Out of Stock', value: 'out', count: stats.outOfStock, color: 'border-red-400 text-red-700' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-cream">Inventory</h1>
          <p className="text-sm text-muted mt-0.5">
            Low stock threshold: <span className="text-amber-600 font-medium">{threshold} units</span>
          </p>
        </div>
        <button
          onClick={() => fetchProducts(true)}
          disabled={refreshing}
          className="self-start p-2 text-muted border border-border rounded-lg hover:bg-ivory hover:text-cream transition disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-lg px-4 py-3">
          <p className="text-xl font-bold text-cream">{stats.total}</p>
          <p className="text-xs text-muted mt-0.5">Total Products</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          <p className="text-xl font-bold text-amber-700">{stats.lowStock}</p>
          <p className="text-xs text-amber-600 mt-0.5">Low Stock</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <p className="text-xl font-bold text-red-700">{stats.outOfStock}</p>
          <p className="text-xs text-red-600 mt-0.5">Out of Stock</p>
        </div>
        <div className="bg-surface border border-border rounded-lg px-4 py-3">
          <p className="text-xl font-bold text-cream">{formatCurrency(stats.totalValue)}</p>
          <p className="text-xs text-muted mt-0.5">Inventory Value</p>
        </div>
      </div>

      {/* Alert banner */}
      {stats.outOfStock + stats.lowStock > 0 && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">Inventory Attention Required</p>
            <p className="text-sm text-amber-700 mt-0.5">
              {stats.outOfStock > 0 && <span>{stats.outOfStock} product{stats.outOfStock !== 1 ? 's are' : ' is'} out of stock. </span>}
              {stats.lowStock > 0 && <span>{stats.lowStock} product{stats.lowStock !== 1 ? 's have' : ' has'} low stock (≤{threshold} units).</span>}
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex rounded-lg border border-border overflow-hidden">
          {VIEWS.map((v) => (
            <button
              key={v.value}
              onClick={() => setFilterView(v.value)}
              className={`px-4 py-2 text-sm font-medium transition whitespace-nowrap ${
                filterView === v.value
                  ? 'bg-gold text-white'
                  : 'text-muted hover:bg-ivory hover:text-cream'
              }`}
            >
              {v.label}
              <span className={`ml-2 text-xs font-bold ${filterView === v.value ? 'text-white/80' : 'text-muted'}`}>
                ({loading ? '…' : v.count})
              </span>
            </button>
          ))}
        </div>

        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-surface border border-border rounded-lg text-cream placeholder-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="px-3 py-2 text-sm bg-surface border border-border rounded-lg text-cream focus:outline-none focus:border-gold"
        >
          <option value="stock-asc">Stock: Low to High</option>
          <option value="stock-desc">Stock: High to Low</option>
          <option value="name">Name A–Z</option>
          <option value="category">Category</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-gold" /></div>
      ) : filtered.length === 0 ? (
        <div className="bg-surface border border-border rounded-xl p-16 text-center">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <p className="text-muted font-medium">
            {filterView === 'low' ? 'No low-stock products!' : filterView === 'out' ? 'All products are in stock!' : 'No products found'}
          </p>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ivory border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Product</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider hidden sm:table-cell">SKU / Category</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Stock</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider hidden md:table-cell">Price</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider hidden lg:table-cell">Stock Value</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((product) => {
                  const isOut = product.stock === 0;
                  const isLow = isLowStock(product.stock, threshold) && !isOut;
                  const isEditing = editingId === product.id;
                  const isSaving = savingId === product.id;

                  return (
                    <tr key={product.id} className={`hover:bg-ivory/50 transition ${isOut ? 'bg-red-50/30' : isLow ? 'bg-amber-50/30' : ''}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg border border-border bg-ivory overflow-hidden flex-shrink-0 flex items-center justify-center">
                            {product.image_url ? (
                              <img src={product.image_url} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            ) : (
                              <Package className="w-4 h-4 text-muted" />
                            )}
                          </div>
                          <p className="text-sm font-medium text-cream truncate max-w-[160px]">{product.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <p className="text-xs font-mono text-muted">{product.sku}</p>
                        <p className="text-xs text-muted">{product.category}</p>
                      </td>
                      <td className="px-4 py-3">
                        {isEditing ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={editStock}
                              onChange={(e) => setEditStock(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleInlineEdit(product);
                                if (e.key === 'Escape') { setEditingId(null); setEditStock(''); }
                              }}
                              autoFocus
                              min="0"
                              className="w-20 px-2 py-1 text-sm border border-gold rounded focus:outline-none focus:ring-1 focus:ring-gold/30 bg-white"
                            />
                            <button
                              onClick={() => handleInlineEdit(product)}
                              disabled={isSaving}
                              className="p-1 text-green-600 hover:bg-green-50 rounded"
                            >
                              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        ) : (
                          <span className={`text-sm font-bold ${isOut ? 'text-red-600' : isLow ? 'text-amber-600' : 'text-cream'}`}>
                            {product.stock}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="text-sm text-cream">{formatCurrency(product.price)}</p>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <p className="text-sm text-muted">{formatCurrency(product.price * product.stock)}</p>
                      </td>
                      <td className="px-4 py-3">
                        {isOut ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                            <TrendingDown className="w-3 h-3" />Out of stock
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
                            <AlertTriangle className="w-3 h-3" />Low stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                            Healthy
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => { setEditingId(product.id); setEditStock(String(product.stock)); }}
                            className="p-1.5 text-muted hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit stock"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRestockWhatsApp(product)}
                            className="p-1.5 text-muted hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Request restock via WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
