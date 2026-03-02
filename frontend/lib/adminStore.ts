import { create } from 'zustand';

// ─── Toast System ────────────────────────────────────────────────────────────

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  title?: string;
  duration?: number;
}

// ─── Admin Settings (persisted in localStorage) ──────────────────────────────

export interface AdminSettings {
  storeName: string;
  storePhone: string;
  whatsappNumber: string;
  lowStockThreshold: number;
  currency: string;
  timezone: string;
  autoWhatsApp: boolean;
  emailNotifications: boolean;
}

const DEFAULT_SETTINGS: AdminSettings = {
  storeName: 'AL Imran Fabrics',
  storePhone: '+92 300 0000000',
  whatsappNumber: '+923000000000',
  lowStockThreshold: 5,
  currency: 'PKR',
  timezone: 'Asia/Karachi',
  autoWhatsApp: true,
  emailNotifications: false,
};

// ─── Admin Store ─────────────────────────────────────────────────────────────

interface AdminStore {
  // Toasts
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;

  // Settings
  settings: AdminSettings;
  updateSettings: (partial: Partial<AdminSettings>) => void;
  resetSettings: () => void;

  // Sidebar state
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

let toastCounter = 0;

export const useAdminStore = create<AdminStore>((set, get) => ({
  // Toasts
  toasts: [],
  addToast: (toast) => {
    const id = String(++toastCounter);
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
  clearToasts: () => set({ toasts: [] }),

  // Settings — load from localStorage on first access
  settings: (() => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem('al-imran-admin-settings');
        if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
      } catch { /* ignore */ }
    }
    return DEFAULT_SETTINGS;
  })(),

  updateSettings: (partial) => {
    const next = { ...get().settings, ...partial };
    set({ settings: next });
    if (typeof window !== 'undefined') {
      localStorage.setItem('al-imran-admin-settings', JSON.stringify(next));
    }
  },

  resetSettings: () => {
    set({ settings: DEFAULT_SETTINGS });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('al-imran-admin-settings');
    }
  },

  // Sidebar
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));

// ─── Convenience hook for toasts ─────────────────────────────────────────────

export function useToast() {
  const { addToast } = useAdminStore();

  return {
    success: (message: string, title?: string) =>
      addToast({ type: 'success', message, title }),
    error: (message: string, title?: string) =>
      addToast({ type: 'error', message, title }),
    warning: (message: string, title?: string) =>
      addToast({ type: 'warning', message, title }),
    info: (message: string, title?: string) =>
      addToast({ type: 'info', message, title }),
  };
}
