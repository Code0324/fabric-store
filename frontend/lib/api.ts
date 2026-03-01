import axios from 'axios';
import { Product, Order, User, OrderCreateRequest, AuthResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth headers to every request - reads from Zustand persisted storage
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    // Try Zustand persisted store first, fall back to raw localStorage key
    try {
      const raw = localStorage.getItem('al-imran-auth');
      if (raw) {
        const parsed = JSON.parse(raw);
        const token = parsed?.state?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        // X-User-Id and X-User-Role: required by the orders router (header-based auth)
        const userId = parsed?.state?.user?.id;
        if (userId) {
          config.headers['X-User-Id'] = userId;
        }
        const userRole = parsed?.state?.user?.role;
        if (userRole) {
          config.headers['X-User-Role'] = userRole;
        }
        return config;
      }
    } catch {
      // ignore JSON parse errors
    }
    // Legacy fallback
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle response errors - on 401, clear auth state and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        // Clear Zustand persisted auth store
        try {
          const raw = localStorage.getItem('al-imran-auth');
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed?.state) {
              parsed.state.token = null;
              parsed.state.user = null;
              parsed.state.isLoggedIn = false;
              localStorage.setItem('al-imran-auth', JSON.stringify(parsed));
            }
          }
        } catch {
          // ignore
        }
        localStorage.removeItem('token');
        // Only redirect if not already on auth pages
        const path = window.location.pathname;
        if (path !== '/login' && path !== '/register') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Authentication API endpoints
 */
export const authAPI = {
  /**
   * Register a new customer account.
   * Returns the created user along with a JWT access token.
   */
  register: (data: { email: string; password: string; name: string; phone?: string }) =>
    api.post<AuthResponse>('/auth/register', data),

  /**
   * Log in with email + password.
   * Returns the authenticated user along with a JWT access token.
   */
  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>('/auth/login', data),

  /**
   * Fetch the currently authenticated user.
   * Requires a valid Bearer token (injected by the request interceptor).
   */
  me: () => api.get<User>('/auth/me'),
};

/**
 * Products API endpoints
 */
export const productsAPI = {
  list: (skip = 0, limit = 20) =>
    api.get(`/products/`, {params: {skip, limit}}).then((res) => res.data.items || res.data),
  getAllFeatured: () =>
    api.get(`/products/`, {params: {skip: 0, limit: 200}}).then((res) => {
      const items = res.data.items || res.data;
      return Array.isArray(items) ? items.filter((p: any) => p.is_featured) : [];
    }),
  getAll: (limit = 200) =>
    api.get(`/products/`, {params: {skip: 0, limit}}).then((res) => {
      const items = res.data.items || res.data;
      return Array.isArray(items) ? items : [];
    }),
  get: (id: string) => api.get<Product>(`/products/${id}`),
  listByBrand: (brand: string, limit = 200) =>
    api.get(`/products/`, {params: {skip: 0, limit}}).then((res) => {
      const items = res.data.items || res.data;
      return Array.isArray(items) ? items.filter((p: any) => p.brand?.toLowerCase() === brand.toLowerCase()) : [];
    }),
  listByCategory: (category: string, limit = 200) =>
    api.get(`/products/`, {params: {skip: 0, limit}}).then((res) => {
      const items = res.data.items || res.data;
      return Array.isArray(items) ? items.filter((p: any) => p.category?.toLowerCase() === category.toLowerCase()) : [];
    }),
  listOnSale: () =>
    api.get(`/products/`, {params: {skip: 0, limit: 200}}).then((res) => {
      const items = res.data.items || res.data;
      return Array.isArray(items) ? items.filter((p: any) => p.compare_price && p.compare_price > p.price) : [];
    }),
  create: (data: any) => api.post<Product>('/products/', data),
  update: (id: string, data: any) => api.put<Product>(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

/**
 * Orders API endpoints
 */
export const ordersAPI = {
  /**
   * List orders for the authenticated user.
   */
  list: (page = 1, limit = 20) =>
    api.get(`/orders/`, { params: { page, limit } }),

  /**
   * List ALL orders (admin only). Supports filtering by status, payment_status, payment_method.
   */
  listAll: (params: {
    page?: number;
    limit?: number;
    status?: string;
    payment_status?: string;
    payment_method?: string;
  } = {}) => api.get('/orders/admin', { params }),

  /**
   * Get a single order by ID.
   */
  get: (id: string) => api.get<Order>(`/orders/${id}`),

  /**
   * Create a new order (JSON – legacy, no screenshot).
   */
  create: (data: OrderCreateRequest) =>
    api.post<Order>('/orders/', data),

  /**
   * Create a new order with manual payment screenshot (multipart/form-data).
   * Supports Easypaisa, JazzCash, and COD payment methods.
   */
  createWithPayment: (data: OrderCreateRequest) => {
    const formData = new FormData();
    formData.append('items', JSON.stringify(data.items));
    formData.append('customer_name', data.customer_name ?? '');
    formData.append('customer_phone', data.customer_phone ?? '');
    formData.append('customer_address', data.customer_address ?? '');
    formData.append('customer_city', data.customer_city ?? '');
    if (data.customer_notes) formData.append('customer_notes', data.customer_notes);
    formData.append('payment_method', data.payment_method);
    if (data.screenshot) formData.append('screenshot', data.screenshot);

    return api.post<Order>('/orders/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  /**
   * Update order fulfillment status (admin only).
   */
  updateStatus: (id: string, status: string) =>
    api.put<Order>(`/orders/${id}/status`, { status }),

  /**
   * Verify or reject a manual payment screenshot (admin only).
   * payment_status must be "Paid" or "Rejected".
   */
  verifyPayment: (id: string, payment_status: 'Paid' | 'Rejected') =>
    api.put<Order>(`/orders/${id}/verify`, { payment_status }),
};

/**
 * Users API endpoints
 */
export const usersAPI = {
  get: (id: string) => api.get<User>(`/users/${id}`),
  list: (skip = 0, limit = 10) =>
    api.get<User[]>(`/users?skip=${skip}&limit=${limit}`),
  listAdmins: (skip = 0, limit = 10) =>
    api.get<User[]>(`/users?skip=${skip}&limit=${limit}`).then((res) =>
      res.data.filter((u: User) => u.role === 'admin')
    ),
};

export default api;
