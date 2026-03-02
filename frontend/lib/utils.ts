/**
 * Utility functions for Al Imran Fabrics ecommerce
 */

import { CartItem } from './types';

// ─── Admin Utilities ─────────────────────────────────────────────────────────

/**
 * Format amount as Pakistani Rupees (alias for formatPKR — preferred in admin)
 */
export function formatCurrency(amount: number): string {
  return formatPKR(amount);
}

/**
 * Generate a unique SKU for new products
 * Format: ALI-XXXX-YYYY where XXXX is random alpha and YYYY is random numeric
 */
export function generateSKU(): string {
  const alpha = Array.from({ length: 4 }, () =>
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 26))
  ).join('');
  const numeric = String(Math.floor(1000 + Math.random() * 9000));
  return `ALI-${alpha}-${numeric}`;
}

/**
 * Check if a product's stock is low
 */
export function isLowStock(stock: number, threshold = 5): boolean {
  return stock >= 0 && stock <= threshold;
}

/**
 * Generate a WhatsApp deep-link for sending an order update to a customer
 */
export function generateWhatsAppLink(
  phone: string,
  message: string
): string {
  const digits = phone.replace(/\D/g, '');
  const normalized = digits.startsWith('92') ? digits : digits.startsWith('0') ? `92${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate a WhatsApp message for an order status update
 */
export function generateOrderUpdateMessage(order: {
  id: string;
  customerName: string;
  status: string;
  totalAmount: number;
  trackingNumber?: string;
}): string {
  const statusMessages: Record<string, string> = {
    confirmed: 'Your order has been confirmed and is being processed.',
    shipped:   'Great news! Your order has been shipped and is on its way.',
    delivered: 'Your order has been delivered. Thank you for shopping with us!',
    cancelled: 'Your order has been cancelled. Please contact us for details.',
  };

  const trackingLine = order.trackingNumber
    ? `\nTracking #: ${order.trackingNumber}`
    : '';

  return `*AL Imran Fabrics - Order Update*

Hi ${order.customerName}!

Order ID: #${order.id.substring(0, 8).toUpperCase()}${trackingLine}
Amount: ${formatPKR(order.totalAmount)}
Status: *${order.status.charAt(0).toUpperCase() + order.status.slice(1)}*

${statusMessages[order.status] ?? 'Your order status has been updated.'}

For any queries, reply to this message or call us.
— AL Imran Fabrics Team`;
}

/**
 * Format number as Pakistani Rupees (PKR)
 */
export function formatPKR(amount: number): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generate WhatsApp URL with order details encoded in message
 */
export function generateWhatsAppURL(order: {
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
}): string {
  const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+923000000000';

  const itemsText = order.items
    .map((item) => `• ${item.product.name} x${item.quantity} = ${formatPKR(item.product.price * item.quantity)}`)
    .join('\n');

  const message = `*New Order - Al Imran Fabrics*

*Customer Details:*
Name: ${order.customerName}
Phone: ${order.phone}
Address: ${order.address}
City: ${order.city}
${order.notes ? `Notes: ${order.notes}\n` : ''}

*Order Items:*
${itemsText}

*Total Amount:* ${formatPKR(order.totalAmount)}

*Payment Method:* Cash on Delivery (COD)

---
Placed via: Al Imran Fabrics Website`;

  return `https://wa.me/${WHATSAPP.replace('+', '')}?text=${encodeURIComponent(message)}`;
}

/**
 * Get color class for order status badges
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return 'bg-yellow-900 text-yellow-200';
    case 'paid':
      return 'bg-blue-900 text-blue-200';
    case 'shipped':
      return 'bg-purple-900 text-purple-200';
    case 'completed':
      return 'bg-green-900 text-green-200';
    case 'cancelled':
      return 'bg-red-900 text-red-200';
    default:
      return 'bg-gray-700 text-gray-200';
  }
}

/**
 * Convert string to URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

/**
 * Format date to readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-PK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Calculate discount percentage
 */
export function getDiscountPercentage(price: number, comparePrice?: number): number {
  if (!comparePrice || comparePrice <= price) return 0;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}

/**
 * Check if product is on sale
 */
export function isOnSale(comparePrice?: number): boolean {
  return !!comparePrice;
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/**
 * Calculate cart total amount
 */
export function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

/**
 * Get unique brands from products list
 */
export function getUniqueBrands(products: any[]): string[] {
  const brands = new Set(products.map((p) => p.brand).filter(Boolean));
  return Array.from(brands).sort();
}

/**
 * Get unique categories from products list
 */
export function getUniqueCategories(products: any[]): string[] {
  const categories = new Set(products.map((p) => p.category).filter(Boolean));
  return Array.from(categories).sort();
}

/**
 * Filter products by brand (case-insensitive)
 */
export function filterByBrand(products: any[], brand: string): any[] {
  return products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
}

/**
 * Filter products by category (case-insensitive)
 */
export function filterByCategory(products: any[], category: string): any[] {
  return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

/**
 * Filter products by price range
 */
export function filterByPriceRange(products: any[], minPrice: number, maxPrice: number): any[] {
  return products.filter((p) => p.price >= minPrice && p.price <= maxPrice);
}

/**
 * Sort products by various criteria
 */
export function sortProducts(products: any[], sortBy: string = 'newest'): any[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'newest':
    default:
      sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      break;
  }

  return sorted;
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  // Remove non-digits
  const digits = phone.replace(/\D/g, '');

  // Format as Pakistani phone number
  if (digits.length >= 10) {
    const last10 = digits.slice(-10);
    return `+92 ${last10.slice(0, 3)} ${last10.slice(3, 6)} ${last10.slice(6)}`;
  }

  return phone;
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (basic Pakistani format)
 */
export function isValidPhoneNumber(phone: string): boolean {
  // Accept formats like +923001234567 or 03001234567
  const phoneRegex = /^(\+92|0)[3|0][0-9]{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}
