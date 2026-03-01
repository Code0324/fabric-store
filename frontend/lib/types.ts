/**
 * Shared TypeScript interfaces for Al Imran Fabrics ecommerce platform
 */

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  description?: string;
  price: number;
  compare_price?: number;
  stock: number;
  image_url?: string;
  is_featured: boolean;
  is_bestseller?: boolean;
  is_new_arrival?: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
  product?: Product; // For enriched order display
}

export interface Order {
  id: string;
  user_id: string;
  customer_name?: string;
  customer_phone?: string;
  customer_address?: string;
  customer_city?: string;
  customer_notes?: string;
  items: OrderItem[];
  total_amount: number;
  payment_method: 'cod' | 'easypaisa' | 'jazzcash';
  payment_status: string;
  payment_screenshot?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  customerName: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setCustomerInfo: (info: { name: string; phone: string; address: string; city: string; notes?: string }) => void;
  clear: () => void;
  total: () => number;
}

export interface AuthStore {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface OrderCreateRequest {
  items: Array<{
    product_id: string;
    quantity: number;
  }>;
  customer_name?: string;
  customer_phone?: string;
  customer_address?: string;
  customer_city?: string;
  customer_notes?: string;
  payment_method: 'cod' | 'easypaisa' | 'jazzcash';
  screenshot?: File;
}
