import axios from 'axios';
import { Product, Order, User, OrderCreateRequest } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Authentication API endpoints
 */
export const authAPI = {
  register: (data: { email: string; password: string; name: string; role?: string }) =>
    api.post<{ access_token: string; token_type: string; user: User }>('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post<{ access_token: string; token_type: string; user: User }>('/auth/login', data),
  me: () => api.get<User>('/auth/me'),
};

/**
 * Products API endpoints
 */
export const productsAPI = {
  list: (skip = 0, limit = 20) =>
    api.get<Product[]>(`/products?skip=${skip}&limit=${limit}`),
  getAllFeatured: () =>
    api.get<Product[]>(`/products?skip=0&limit=200`).then((res) =>
      res.data.filter((p: Product) => p.is_featured)
    ),
  getAll: (limit = 200) =>
    api.get<Product[]>(`/products?skip=0&limit=${limit}`).then((res) => res.data),
  get: (id: string) => api.get<Product>(`/products/${id}`),
  listByBrand: (brand: string, limit = 200) =>
    api.get<Product[]>(`/products?skip=0&limit=${limit}`).then((res) =>
      res.data.filter((p: Product) => p.brand.toLowerCase() === brand.toLowerCase())
    ),
  listByCategory: (category: string, limit = 200) =>
    api.get<Product[]>(`/products?skip=0&limit=${limit}`).then((res) =>
      res.data.filter((p: Product) => p.category.toLowerCase() === category.toLowerCase())
    ),
  listOnSale: () =>
    api.get<Product[]>(`/products?skip=0&limit=200`).then((res) =>
      res.data.filter((p: Product) => p.compare_price && p.compare_price > p.price)
    ),
  create: (data: any) => api.post<Product>('/products', data),
  update: (id: string, data: any) => api.put<Product>(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

/**
 * Orders API endpoints
 */
export const ordersAPI = {
  list: (skip = 0, limit = 20) =>
    api.get<Order[]>(`/orders?skip=${skip}&limit=${limit}`),
  get: (id: string) => api.get<Order>(`/orders/${id}`),
  create: (data: OrderCreateRequest) =>
    api.post<Order>('/orders', data),
  update: (id: string, data: any) =>
    api.put<Order>(`/orders/${id}`, data),
  updateStatus: (id: string, status: string) =>
    api.put<Order>(`/orders/${id}`, { status }),
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
