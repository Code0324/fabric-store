'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal border-t border-border mt-20">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h2
              className="mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 400, letterSpacing: '3px' }}
            >
              <span style={{ color: '#1A1A1A' }}>AL IMRAN </span>
              <span style={{ color: '#B8963E' }}>FABRICS</span>
            </h2>
            <p className="text-muted mb-6 leading-relaxed">
              Premium quality Pakistani fabrics crafted with elegance and tradition. Serving customers worldwide with
              authentic, hand-selected fabrics for every occasion since 2010.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-muted hover:text-gold transition">
                <Phone className="w-5 h-5 text-gold" />
                <a href="tel:+92213517701">+92 21 35171701</a>
              </div>
              <div className="flex items-center gap-3 text-muted hover:text-gold transition">
                <Mail className="w-5 h-5 text-gold" />
                <a href="mailto:info@alimranfabrics.com">info@alimranfabrics.com</a>
              </div>
              <div className="flex items-center gap-3 text-muted">
                <MapPin className="w-5 h-5 text-gold" />
                <span>Karachi, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-gold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted hover:text-gold transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted hover:text-gold transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted hover:text-gold transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-muted hover:text-gold transition">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-serif text-lg font-bold text-gold mb-6">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products/category/mens" className="text-muted hover:text-gold transition">
                  Mens Wear
                </Link>
              </li>
              <li>
                <Link href="/products/category/womens" className="text-muted hover:text-gold transition">
                  Womens Wear
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted hover:text-gold transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted hover:text-gold transition">
                  Sale Items
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-bold text-gold mb-6">Stay Updated</h4>
            <p className="text-muted text-sm mb-4">Subscribe to our newsletter for exclusive offers and new arrivals.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="input text-sm"
                required
              />
              <button type="submit" className="btn btn-primary w-full text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-muted text-sm">
            &copy; {currentYear} AL Imran Fabrics. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://facebook.com/alimanfabrics"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-gold transition"
              title="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/alimanfabrics"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-gold transition"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/alimanfabrics"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-gold transition"
              title="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-gold transition"
              title="WhatsApp"
            >
              <span className="text-lg">📱</span>
            </a>
          </div>

          {/* Quick Contact CTA */}
          <a
            href="https://wa.me/923000000000?text=Hello%20AL%20Imran%20Fabrics!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-sm whitespace-nowrap"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-surface py-4">
        <div className="container">
          <p className="text-center text-xs text-muted">
            Designed with ❤️ for Pakistani fabric lovers | Free shipping on orders above PKR 5,000
          </p>
        </div>
      </div>
    </footer>
  );
}
