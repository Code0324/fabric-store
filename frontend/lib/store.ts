import { create } from 'zustand';
import { persist, PersistStorage } from 'zustand/middleware';
import type { User, Product, CartItem, AuthStore, CartState } from './types';

/**
 * Auth Store with localStorage persistence
 */
export const useAuthStore = create<AuthStore, [['zustand/persist', AuthStore]]>(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,
      setUser: (user) => set({ user, isLoggedIn: !!user }),
      setToken: (token) => {
        set({ token, isLoggedIn: !!token });
      },
      logout: () => {
        set({ user: null, token: null, isLoggedIn: false });
      },
    }),
    {
      name: 'al-imran-auth',
      version: 1,
    }
  )
);

/**
 * Cart Store with localStorage persistence
 * Includes customer info fields for checkout
 */
export const useCartStore = create<CartState, [['zustand/persist', CartState]]>(
  persist(
    (set, get) => ({
      items: [],
      customerName: '',
      phone: '',
      address: '',
      city: '',
      notes: '',

      addItem: (product, quantity) => {
        set((state) => {
          const existing = state.items.find((item) => item.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: Math.max(1, item.quantity + quantity) }
                  : item
              ),
            };
          }
          return { items: [...state.items, { product, quantity: Math.max(1, quantity) }] };
        });
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),

      setCustomerInfo: (info) =>
        set({
          customerName: info.name,
          phone: info.phone,
          address: info.address,
          city: info.city,
          notes: info.notes || '',
        }),

      clear: () =>
        set({
          items: [],
          customerName: '',
          phone: '',
          address: '',
          city: '',
          notes: '',
        }),

      total: () => {
        const state = get();
        return state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },
    }),
    {
      name: 'al-imran-cart',
      version: 1,
    }
  )
);
