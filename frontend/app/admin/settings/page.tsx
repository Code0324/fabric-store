'use client';

import { useState } from 'react';
import { useAdminStore } from '@/lib/adminStore';
import { useToast } from '@/lib/adminStore';
import {
  Settings, Store, Phone, MessageCircle, Package,
  Bell, Globe, Save, RotateCcw, ExternalLink,
} from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/utils';

export default function AdminSettingsPage() {
  const { settings, updateSettings, resetSettings } = useAdminStore();
  const toast = useToast();

  const [form, setForm] = useState({ ...settings });
  const [saving, setSaving] = useState(false);

  const set = (field: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 300)); // brief feedback delay
    updateSettings(form);
    setSaving(false);
    toast.success('Settings saved successfully.');
  };

  const handleReset = () => {
    resetSettings();
    const defaultSettings = {
      storeName: 'AL Imran Fabrics',
      storePhone: '+92 300 0000000',
      whatsappNumber: '+923000000000',
      lowStockThreshold: 5,
      currency: 'PKR',
      timezone: 'Asia/Karachi',
      autoWhatsApp: true,
      emailNotifications: false,
    };
    setForm(defaultSettings);
    toast.info('Settings reset to defaults.');
  };

  const testWhatsApp = () => {
    const link = generateWhatsAppLink(
      form.whatsappNumber,
      `*AL Imran Fabrics Admin Test*\n\nHello! This is a test message from your admin panel. Your WhatsApp integration is working correctly. 🎉`
    );
    window.open(link, '_blank');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-cream">Settings</h1>
        <p className="text-sm text-muted mt-0.5">Configure your store and admin preferences</p>
      </div>

      {/* Store Info */}
      <Section icon={Store} title="Store Information" subtitle="Basic store details and contact info">
        <Field label="Store Name">
          <input
            type="text"
            value={form.storeName}
            onChange={(e) => set('storeName', e.target.value)}
            className={inputCls}
            placeholder="AL Imran Fabrics"
          />
        </Field>
        <Field label="Store Phone">
          <input
            type="tel"
            value={form.storePhone}
            onChange={(e) => set('storePhone', e.target.value)}
            className={inputCls}
            placeholder="+92 300 0000000"
          />
        </Field>
        <Field label="Currency">
          <select value={form.currency} onChange={(e) => set('currency', e.target.value)} className={inputCls}>
            <option value="PKR">PKR — Pakistani Rupee</option>
            <option value="USD">USD — US Dollar</option>
            <option value="GBP">GBP — British Pound</option>
          </select>
        </Field>
        <Field label="Timezone">
          <select value={form.timezone} onChange={(e) => set('timezone', e.target.value)} className={inputCls}>
            <option value="Asia/Karachi">Asia/Karachi (PKT +5:00)</option>
            <option value="Asia/Dubai">Asia/Dubai (GST +4:00)</option>
            <option value="UTC">UTC</option>
          </select>
        </Field>
      </Section>

      {/* WhatsApp */}
      <Section icon={MessageCircle} title="WhatsApp Integration" subtitle="Auto-send order updates to customers via WhatsApp">
        <Field label="Business WhatsApp Number" hint="Include country code, e.g. +923001234567">
          <div className="flex gap-2">
            <input
              type="tel"
              value={form.whatsappNumber}
              onChange={(e) => set('whatsappNumber', e.target.value)}
              className={`flex-1 ${inputCls}`}
              placeholder="+923001234567"
            />
            <button
              type="button"
              onClick={testWhatsApp}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition whitespace-nowrap"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Test
            </button>
          </div>
        </Field>

        <Field label="Auto-send Order Updates">
          <Toggle
            value={form.autoWhatsApp}
            onChange={(v) => set('autoWhatsApp', v)}
            label="Automatically open WhatsApp with order status messages"
          />
        </Field>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm font-medium text-green-800 mb-1">How WhatsApp integration works</p>
          <p className="text-sm text-green-700">
            When you update an order status or click the WhatsApp icon on a customer record, the admin panel
            will generate a pre-filled message and open it in WhatsApp Web. No API key required.
          </p>
        </div>
      </Section>

      {/* Inventory */}
      <Section icon={Package} title="Inventory Settings" subtitle="Configure low stock alerting thresholds">
        <Field
          label="Low Stock Threshold"
          hint="Products with stock at or below this number will show low-stock alerts"
        >
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={form.lowStockThreshold}
              onChange={(e) => set('lowStockThreshold', Math.max(1, parseInt(e.target.value) || 5))}
              min="1"
              max="100"
              className={`w-32 ${inputCls}`}
            />
            <span className="text-sm text-muted">units</span>
          </div>
        </Field>
      </Section>

      {/* Notifications */}
      <Section icon={Bell} title="Notifications" subtitle="Configure admin notification preferences">
        <Field label="Email Notifications">
          <Toggle
            value={form.emailNotifications}
            onChange={(v) => set('emailNotifications', v)}
            label="Receive email notifications for new orders (requires backend integration)"
          />
        </Field>
      </Section>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 text-sm text-muted border border-border rounded-lg hover:bg-ivory hover:text-cream transition"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 text-sm font-semibold bg-gold text-white rounded-lg hover:bg-gold-dark transition disabled:opacity-50"
        >
          {saving ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Settings
        </button>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const inputCls =
  'w-full px-3 py-2 text-sm bg-charcoal border border-border rounded-lg text-cream placeholder-muted/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition';

function Section({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-ivory">
        <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-gold" />
        </div>
        <div>
          <p className="text-sm font-semibold text-cream">{title}</p>
          <p className="text-xs text-muted">{subtitle}</p>
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {children}
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted/70 mt-1">{hint}</p>}
    </div>
  );
}

function Toggle({
  value,
  onChange,
  label,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div
        onClick={() => onChange(!value)}
        className={`relative flex-shrink-0 w-10 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-gold' : 'bg-border'}`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-4' : 'translate-x-0'}`}
        />
      </div>
      <span className="text-sm text-muted group-hover:text-cream transition leading-snug">{label}</span>
    </label>
  );
}
