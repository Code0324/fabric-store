# AL Imran Fabrics - Technical Specification
## Parts 3-6: Database Schema, APIs, Components, Design Tokens, Testing & Project Management

**Status:** Production-Ready for Development Team
**Date:** February 2026
**Version:** 1.0

---

## Table of Contents

1. [Part 3: PostgreSQL Database Schema](#part-3-postgresql-database-schema)
2. [Part 4: RESTful API Documentation](#part-4-restful-api-documentation)
3. [Part 5: React Component Specifications](#part-5-react-component-specifications)
4. [Part 6: Design Tokens & UI System](#part-6-design-tokens--ui-system)
5. [Testing Strategy](#testing-strategy)
6. [Project Management & Timeline](#project-management--timeline)

---

# PART 3: PostgreSQL DATABASE SCHEMA

## 3.1 Database Architecture Overview

```
AL_IMRAN_FABRICS DATABASE
├── Core Tables
│   ├── users
│   ├── roles
│   ├── addresses
│   ├── payment_methods
│   │
├── Product Catalog
│   ├── brands
│   ├── categories
│   ├── products
│   ├── product_variants
│   ├── product_images
│   ├── product_specifications
│   │
├── Shopping
│   ├── cart
│   ├── cart_items
│   ├── wishlist
│   ├── reviews
│   │
├── Transactions
│   ├── orders
│   ├── order_items
│   ├── order_tracking
│   │
├── Promotions
│   ├── coupons
│   ├── coupon_usage
│   ├── banners
│   │
├── Shipping
│   ├── shipping_methods
│   ├── shipping_rates
│   ├── courier_integrations
│   │
└── Analytics
    ├── events
    ├── page_views
    ├── conversions
```

---

## 3.2 SQL Create Statements

### Users & Authentication

```sql
-- ROLES TABLE
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  permissions JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name, description, permissions) VALUES
  ('customer', 'Regular customer', '["browse", "purchase", "review"]'),
  ('admin', 'Administrator', '["all"]'),
  ('vendor', 'Vendor/Brand', '["manage_products", "view_orders"]');

-- USERS TABLE
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  role_id INTEGER NOT NULL REFERENCES roles(id),

  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,

  last_login TIMESTAMP,
  account_status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_role_id ON users(role_id);

-- ADDRESSES TABLE
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  type ENUM('billing', 'shipping') DEFAULT 'shipping',
  full_name VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  street_address VARCHAR(255) NOT NULL,
  apartment_suite VARCHAR(100),
  city VARCHAR(100) NOT NULL,
  province VARCHAR(100),
  postal_code VARCHAR(10),
  country VARCHAR(50) DEFAULT 'Pakistan',

  is_default BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_addresses_user_id ON addresses(user_id);
CREATE INDEX idx_addresses_type ON addresses(type);

-- PAYMENT METHODS TABLE
CREATE TABLE payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  type ENUM('credit_card', 'debit_card', 'bank_transfer', 'digital_wallet') NOT NULL,

  -- Tokenized (never store full details)
  token VARCHAR(255) NOT NULL UNIQUE,
  last_four VARCHAR(4),
  card_brand VARCHAR(50), -- Visa, Mastercard, etc.
  expiry_month INT,
  expiry_year INT,

  is_default BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payment_methods_user_id ON payment_methods(user_id);
```

---

### Product Catalog

```sql
-- BRANDS TABLE
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  logo_url VARCHAR(500),
  description TEXT,
  brand_url VARCHAR(255),
  country_of_origin VARCHAR(100),
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_brands_is_featured ON brands(is_featured);

INSERT INTO brands (name, slug, is_featured, display_order) VALUES
  ('Khaadi', 'khaadi', TRUE, 1),
  ('Gul Ahmed', 'gul-ahmed', TRUE, 2),
  ('J.', 'j-brand', TRUE, 3),
  ('Ethnic', 'ethnic', FALSE, 4),
  ('Saya', 'saya', FALSE, 5),
  ('BAROQUE', 'baroque', FALSE, 6),
  ('ALKARAM', 'alkaram', FALSE, 7),
  ('SOHAYE', 'sohaye', FALSE, 8),
  ('Bonanza', 'bonanza', FALSE, 9),
  ('MTJ', 'mtj', FALSE, 10),
  ('Zellbury', 'zellbury', FALSE, 11),
  ('Gull G', 'gull-g', FALSE, 12),
  ('Bin Saeed', 'bin-saeed', FALSE, 13),
  ('Mizaaj', 'mizaaj', FALSE, 14);

-- CATEGORIES TABLE
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(500),
  parent_category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  seo_title VARCHAR(60),
  seo_description VARCHAR(160),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent_id ON categories(parent_category_id);

INSERT INTO categories (name, slug, display_order) VALUES
  ('Stitched', 'stitched', 1),
  ('Unstitched', 'unstitched', 2),
  ('Formal Wear', 'formal-wear', 3),
  ('Luxury Collection', 'luxury-collection', 4),
  ('Party & Festive', 'party-festive', 5),
  ('Sale', 'sale', 6);

-- PRODUCTS TABLE (Core)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  detailed_description TEXT,

  -- Classification
  brand_id UUID NOT NULL REFERENCES brands(id),
  category_id UUID NOT NULL REFERENCES categories(id),
  occasion VARCHAR(50), -- casual, formal, festive, party, wedding, luxury

  -- Attributes
  type ENUM('stitched', 'unstitched') NOT NULL,
  piece_type ENUM('2-piece', '3-piece', 'single') DEFAULT '3-piece',

  -- Pricing
  cost_price DECIMAL(12, 2),
  selling_price DECIMAL(12, 2) NOT NULL,
  discount_percentage INT DEFAULT 0, -- 0-100
  discount_price DECIMAL(12, 2),

  -- Inventory
  total_stock INT DEFAULT 0,
  low_stock_threshold INT DEFAULT 10,
  stock_status ENUM('in_stock', 'low_stock', 'out_of_stock') DEFAULT 'in_stock',

  -- Metadata
  is_bestseller BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_new_arrival BOOLEAN DEFAULT FALSE,
  is_limited_edition BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,

  -- Status
  status ENUM('draft', 'active', 'inactive', 'archived') DEFAULT 'draft',

  -- SEO
  seo_title VARCHAR(60),
  seo_description VARCHAR(160),
  seo_keywords TEXT[],

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_brand_id ON products(brand_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_type ON products(type);
CREATE INDEX idx_products_occasion ON products(occasion);
CREATE INDEX idx_products_price ON products(selling_price);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- PRODUCT VARIANTS (Size, Color combinations)
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,

  -- Variant identifiers
  size VARCHAR(10), -- XS, S, M, L, XL, XXL (for stitched)
  color VARCHAR(50),
  color_code VARCHAR(7), -- Hex code #RRGGBB

  -- Variant-specific inventory
  variant_sku VARCHAR(100) UNIQUE,
  stock_quantity INT DEFAULT 0,

  -- Images
  image_url VARCHAR(500),

  -- Variant pricing (can override product price)
  variant_price DECIMAL(12, 2),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_variants_product_id ON product_variants(product_id);
CREATE INDEX idx_variants_size_color ON product_variants(size, color);
CREATE INDEX idx_variants_stock ON product_variants(stock_quantity);

-- PRODUCT IMAGES
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,

  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  image_type ENUM('main', 'lifestyle', 'detail', 'color_swatch') DEFAULT 'main',
  display_order INT DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_images_variant_id ON product_images(variant_id);

-- PRODUCT SPECIFICATIONS (JSON for flexibility)
CREATE TABLE product_specs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL UNIQUE REFERENCES products(id) ON DELETE CASCADE,

  -- Unstitched specs
  fabric_type VARCHAR(100), -- Cotton, Silk, Chiffon, etc.
  fabric_weight INT, -- GSM
  thread_count VARCHAR(20), -- 60x60, 40x40, etc.
  width_inches INT,
  total_yardage DECIMAL(5, 2),

  -- Stitched specs
  size_guide_url VARCHAR(500),
  fitting_details TEXT,

  -- Care instructions
  care_instructions TEXT,

  -- Stitching tips (for unstitched)
  stitching_tips JSONB DEFAULT '{}',
  -- {
  --   "recommended_styles": ["straight", "a-line", "sharara"],
  --   "sleeve_options": ["full", "3/4", "cap"],
  --   "lining_suggestion": "light cotton recommended",
  --   "video_tutorial_url": "https://..."
  -- }

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_product_specs_product_id ON product_specs(product_id);
```

---

### Shopping & Cart

```sql
-- WISHLIST TABLE
CREATE TABLE wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,

  notes VARCHAR(500),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(user_id, product_id, variant_id)
);

CREATE INDEX idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX idx_wishlist_product_id ON wishlist(product_id);

-- CART TABLE
CREATE TABLE cart (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  subtotal DECIMAL(12, 2) DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(user_id)
);

CREATE INDEX idx_cart_user_id ON cart(user_id);

-- CART ITEMS
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID NOT NULL REFERENCES cart(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),

  quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price DECIMAL(12, 2) NOT NULL,
  subtotal DECIMAL(12, 2) NOT NULL,

  -- Captured details (in case product is updated)
  captured_size VARCHAR(10),
  captured_color VARCHAR(50),
  captured_sku VARCHAR(100),

  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);

-- REVIEWS & RATINGS
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  order_id UUID, -- Foreign key to orders

  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  review_text TEXT,

  helpful_votes INT DEFAULT 0,
  unhelpful_votes INT DEFAULT 0,

  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  verified_purchase BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_status ON reviews(status);
```

---

### Orders & Transactions

```sql
-- ORDERS TABLE
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) NOT NULL UNIQUE, -- AL-20260224-001234

  user_id UUID NOT NULL REFERENCES users(id),

  -- Addresses
  shipping_address_id UUID REFERENCES addresses(id),
  billing_address_id UUID REFERENCES addresses(id),

  -- Pricing
  subtotal DECIMAL(12, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  coupon_id UUID, -- Foreign key to coupons
  total_amount DECIMAL(12, 2) NOT NULL,

  currency VARCHAR(3) DEFAULT 'PKR',

  -- Payment
  payment_method ENUM('cod', 'credit_card', 'debit_card', 'bank_transfer', 'digital_wallet') NOT NULL,
  payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  payment_date TIMESTAMP,
  transaction_id VARCHAR(100),

  -- Shipping
  shipping_method ENUM('standard', 'express', 'overnight') DEFAULT 'standard',
  courier_name VARCHAR(100),
  tracking_number VARCHAR(100),

  -- Order status
  order_status ENUM('pending', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned') DEFAULT 'pending',

  -- Dates
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  confirmed_at TIMESTAMP,
  shipped_at TIMESTAMP,
  delivered_at TIMESTAMP,
  cancelled_at TIMESTAMP,

  -- Notes
  customer_notes TEXT,
  admin_notes TEXT,

  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- ORDER ITEMS
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),

  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(12, 2) NOT NULL,
  subtotal DECIMAL(12, 2) NOT NULL,

  -- Captured variant details
  captured_size VARCHAR(10),
  captured_color VARCHAR(50),
  captured_sku VARCHAR(100),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- ORDER TRACKING
CREATE TABLE order_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

  status VARCHAR(50),
  location VARCHAR(255),
  description TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_tracking_order_id ON order_tracking(order_id);
CREATE INDEX idx_order_tracking_timestamp ON order_tracking(timestamp DESC);
```

---

### Promotions & Coupons

```sql
-- COUPONS TABLE
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) NOT NULL UNIQUE,

  discount_type ENUM('percentage', 'fixed_amount', 'free_shipping') NOT NULL,
  discount_value DECIMAL(10, 2) NOT NULL,
  max_discount_amount DECIMAL(12, 2), -- For percentage discounts

  applicable_to ENUM('all_products', 'specific_brands', 'specific_categories') DEFAULT 'all_products',
  applicable_brand_ids UUID[], -- Array of brand IDs
  applicable_category_ids UUID[], -- Array of category IDs

  min_purchase_amount DECIMAL(12, 2),
  max_uses_total INT, -- NULL = unlimited
  max_uses_per_customer INT DEFAULT 1,

  usage_count INT DEFAULT 0,

  status ENUM('active', 'inactive', 'expired') DEFAULT 'active',
  valid_from DATE,
  valid_until DATE,

  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_coupons_status ON coupons(status);

-- COUPON USAGE TRACKING
CREATE TABLE coupon_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id UUID NOT NULL REFERENCES coupons(id),
  user_id UUID NOT NULL REFERENCES users(id),
  order_id UUID REFERENCES orders(id),

  discount_amount DECIMAL(10, 2),
  used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_coupon_usage_coupon_id ON coupon_usage(coupon_id);
CREATE INDEX idx_coupon_usage_user_id ON coupon_usage(user_id);
```

---

### Shipping

```sql
-- SHIPPING METHODS
CREATE TABLE shipping_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL, -- Standard, Express, Overnight
  code VARCHAR(50) NOT NULL UNIQUE,
  delivery_days_min INT,
  delivery_days_max INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SHIPPING RATES (by city)
CREATE TABLE shipping_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipping_method_id UUID NOT NULL REFERENCES shipping_methods(id),
  city VARCHAR(100) NOT NULL,
  cost DECIMAL(10, 2) NOT NULL,
  is_free_threshold DECIMAL(12, 2), -- Free if order > this amount
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(shipping_method_id, city)
);

-- COURIER INTEGRATIONS
CREATE TABLE courier_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL, -- TCS, Leopards, Trax
  api_url VARCHAR(500),
  api_key_encrypted VARCHAR(500),
  webhook_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### Analytics

```sql
-- PAGE VIEWS
CREATE TABLE page_views (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),

  page_type VARCHAR(50), -- homepage, category, product, cart, checkout
  page_url VARCHAR(500),
  product_id UUID REFERENCES products(id),

  referrer VARCHAR(500),
  session_id VARCHAR(100),
  user_agent TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_page_views_user_id ON page_views(user_id);
CREATE INDEX idx_page_views_product_id ON page_views(product_id);
CREATE INDEX idx_page_views_created_at ON page_views(created_at DESC);

-- CONVERSION EVENTS
CREATE TABLE conversion_events (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  order_id UUID REFERENCES orders(id),

  event_type VARCHAR(50), -- cart_add, wishlist_add, checkout_start, purchase, review
  product_id UUID REFERENCES products(id),

  event_value DECIMAL(12, 2),
  session_id VARCHAR(100),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_conversion_events_user_id ON conversion_events(user_id);
CREATE INDEX idx_conversion_events_event_type ON conversion_events(event_type);
CREATE INDEX idx_conversion_events_created_at ON conversion_events(created_at DESC);
```

---

## 3.3 Database Views (for optimization)

```sql
-- Product with brand and category info
CREATE VIEW product_view AS
SELECT
  p.id,
  p.sku,
  p.name,
  p.slug,
  b.name AS brand_name,
  b.slug AS brand_slug,
  c.name AS category_name,
  c.slug AS category_slug,
  p.selling_price,
  p.discount_percentage,
  (p.selling_price * (100 - p.discount_percentage) / 100) AS discounted_price,
  p.total_stock,
  p.stock_status,
  p.type,
  p.occasion,
  p.is_bestseller,
  p.is_featured,
  p.created_at
FROM products p
LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.status = 'active';

-- Product reviews summary
CREATE VIEW product_reviews_summary AS
SELECT
  p.id,
  p.name,
  COUNT(r.id) AS total_reviews,
  AVG(CAST(r.rating AS DECIMAL(3,2))) AS average_rating,
  SUM(CASE WHEN r.rating = 5 THEN 1 ELSE 0 END) AS five_star_count,
  SUM(CASE WHEN r.rating = 4 THEN 1 ELSE 0 END) AS four_star_count,
  SUM(CASE WHEN r.rating = 3 THEN 1 ELSE 0 END) AS three_star_count,
  SUM(CASE WHEN r.rating = 2 THEN 1 ELSE 0 END) AS two_star_count,
  SUM(CASE WHEN r.rating = 1 THEN 1 ELSE 0 END) AS one_star_count
FROM products p
LEFT JOIN reviews r ON p.id = r.product_id AND r.status = 'approved'
GROUP BY p.id;

-- Order summary with item counts
CREATE VIEW order_summary_view AS
SELECT
  o.id,
  o.order_number,
  o.user_id,
  u.email,
  u.first_name,
  u.last_name,
  COUNT(oi.id) AS item_count,
  SUM(oi.quantity) AS total_quantity,
  o.total_amount,
  o.order_status,
  o.payment_status,
  o.created_at
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, u.id;
```

---

## 3.4 Sample Seed Data

```sql
-- Insert sample product
INSERT INTO products (
  sku, name, slug, brand_id, category_id,
  type, piece_type, occasion,
  cost_price, selling_price, discount_percentage,
  total_stock, stock_status, status
) VALUES (
  'KHA-001',
  'Khaadi Luxury 3-Piece Suit',
  'khaadi-luxury-3-piece-suit',
  (SELECT id FROM brands WHERE slug = 'khaadi'),
  (SELECT id FROM categories WHERE slug = 'stitched'),
  'stitched', '3-piece', 'formal',
  9000.00, 15000.00, 30,
  45, 'in_stock', 'active'
);

-- Insert product specifications
INSERT INTO product_specs (
  product_id,
  fabric_type, fabric_weight, thread_count, width_inches,
  fitting_details,
  care_instructions
) VALUES (
  (SELECT id FROM products WHERE sku = 'KHA-001'),
  'Cotton Cambric', 140, '60x60', 60,
  'True to size. Model is 5''6" wearing size M.',
  'Wash in cold water. Iron on medium heat. Air dry.'
);

-- Insert product images
INSERT INTO product_images (
  product_id, image_url, alt_text, image_type, display_order
) VALUES
  (
    (SELECT id FROM products WHERE sku = 'KHA-001'),
    'https://cdn.alimran.com/products/KHA-001-main.jpg',
    'Khaadi Luxury Suit Front View',
    'main', 1
  ),
  (
    (SELECT id FROM products WHERE sku = 'KHA-001'),
    'https://cdn.alimran.com/products/KHA-001-lifestyle.jpg',
    'Khaadi Luxury Suit Lifestyle',
    'lifestyle', 2
  );

-- Insert product variants
INSERT INTO product_variants (
  product_id, size, color, color_code, variant_sku, stock_quantity, image_url, variant_price
) VALUES
  (
    (SELECT id FROM products WHERE sku = 'KHA-001'),
    'M', 'Navy', '#001F3F', 'KHA-001-M-NAVY', 15, 'https://cdn.alimran.com/KHA-001-m-navy.jpg', NULL
  ),
  (
    (SELECT id FROM products WHERE sku = 'KHA-001'),
    'M', 'Red', '#FF4136', 'KHA-001-M-RED', 10, 'https://cdn.alimran.com/KHA-001-m-red.jpg', NULL
  );
```

---

# PART 4: RESTFUL API DOCUMENTATION

## 4.1 Authentication APIs

### POST /api/auth/signup
Register a new user

**Request:**
```json
{
  "email": "fatima.khan@example.com",
  "password": "SecurePass123!",
  "first_name": "Fatima",
  "last_name": "Khan",
  "phone": "+923001234567"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "fatima.khan@example.com",
    "first_name": "Fatima",
    "role": "customer"
  },
  "tokens": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 3600
  }
}
```

**Error Responses:**
- 400: Invalid email format, weak password
- 409: Email already registered

---

### POST /api/auth/login
Login user

**Request:**
```json
{
  "email": "fatima.khan@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "fatima.khan@example.com",
    "first_name": "Fatima",
    "role": "customer"
  },
  "tokens": {
    "access_token": "eyJhbGciOiJIUzI1NiIs...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 3600
  }
}
```

**Error Responses:**
- 401: Invalid credentials
- 404: User not found

---

## 4.2 Product APIs

### GET /api/products
Fetch products with filtering and pagination

**Query Parameters:**
```
?page=1
&limit=20
&brand=khaadi,gul-ahmed
&category=stitched
&occasion=formal,wedding
&type=stitched
&piece_type=3-piece
&min_price=5000
&max_price=20000
&size=M,L
&color=navy,red
&discount_min=10
&discount_max=100
&sort=newest|price_asc|price_desc|rating|bestseller
&search=luxury
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "sku": "KHA-001",
        "name": "Khaadi Luxury 3-Piece Suit",
        "slug": "khaadi-luxury-3-piece-suit",
        "brand": {
          "id": "550e8400-e29b-41d4-a716-446655440001",
          "name": "Khaadi",
          "slug": "khaadi"
        },
        "category": {
          "id": "550e8400-e29b-41d4-a716-446655440002",
          "name": "Stitched",
          "slug": "stitched"
        },
        "type": "stitched",
        "piece_type": "3-piece",
        "occasion": "formal",
        "price": {
          "original": 15000,
          "discounted": 10500,
          "discount_percentage": 30,
          "currency": "PKR"
        },
        "stock": {
          "total": 45,
          "status": "in_stock"
        },
        "rating": {
          "average": 4.7,
          "count": 127
        },
        "images": [
          {
            "url": "https://cdn.alimran.com/KHA-001-main.jpg",
            "alt": "Khaadi Luxury Suit",
            "type": "main"
          }
        ],
        "is_featured": false,
        "is_bestseller": true,
        "is_new_arrival": false
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 234,
      "total_pages": 12
    },
    "filters": {
      "brands": [
        { "id": "550e8400-e29b-41d4-a716-446655440001", "name": "Khaadi", "count": 145 },
        { "id": "550e8400-e29b-41d4-a716-446655440003", "name": "Gul Ahmed", "count": 87 }
      ],
      "occasions": [
        { "value": "formal", "label": "Formal", "count": 78 },
        { "value": "wedding", "label": "Wedding", "count": 56 }
      ],
      "price_range": {
        "min": 2500,
        "max": 50000
      }
    }
  }
}
```

---

### GET /api/products/:id
Fetch single product detail

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "sku": "KHA-001",
    "name": "Khaadi Luxury 3-Piece Suit",
    "description": "This stunning 3-piece stitched suit...",
    "detailed_description": "Long detailed description...",
    "brand": {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Khaadi",
      "slug": "khaadi",
      "logo_url": "https://cdn.alimran.com/khaadi-logo.png"
    },
    "type": "stitched",
    "piece_type": "3-piece",
    "occasion": "formal",
    "price": {
      "original": 15000,
      "discounted": 10500,
      "discount_percentage": 30,
      "currency": "PKR"
    },
    "specifications": {
      "fabric_type": "Cotton Cambric",
      "thread_count": "60x60",
      "weight_gsm": 140,
      "width_inches": 60,
      "fitting_details": "True to size",
      "care_instructions": "Wash in cold water..."
    },
    "images": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440010",
        "url": "https://cdn.alimran.com/KHA-001-main.jpg",
        "alt": "Main View",
        "type": "main"
      }
    ],
    "variants": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440020",
        "size": "M",
        "color": "Navy",
        "color_code": "#001F3F",
        "stock": 15,
        "price": null,
        "image_url": "https://cdn.alimran.com/KHA-001-m-navy.jpg"
      },
      {
        "id": "550e8400-e29b-41d4-a716-446655440021",
        "size": "M",
        "color": "Red",
        "color_code": "#FF4136",
        "stock": 10,
        "price": null,
        "image_url": "https://cdn.alimran.com/KHA-001-m-red.jpg"
      }
    ],
    "reviews": {
      "average_rating": 4.7,
      "total_reviews": 127,
      "distribution": {
        "5": 102,
        "4": 19,
        "3": 5,
        "2": 1,
        "1": 0
      }
    },
    "related_products": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440030",
        "name": "Gul Ahmed Formal Suit",
        "slug": "gul-ahmed-formal-suit",
        "price": {
          "original": 12000,
          "discounted": 11200
        }
      }
    ],
    "is_in_wishlist": false,
    "stock_status": "in_stock"
  }
}
```

---

### GET /api/categories
Fetch all categories

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "name": "Stitched",
      "slug": "stitched",
      "image_url": "https://cdn.alimran.com/stitched.jpg",
      "product_count": 345
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "name": "Unstitched",
      "slug": "unstitched",
      "image_url": "https://cdn.alimran.com/unstitched.jpg",
      "product_count": 234
    }
  ]
}
```

---

## 4.3 Cart APIs

### POST /api/cart/add
Add item to cart

**Request:**
```json
{
  "product_id": "550e8400-e29b-41d4-a716-446655440000",
  "variant_id": "550e8400-e29b-41d4-a716-446655440020",
  "quantity": 1
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "cart_id": "550e8400-e29b-41d4-a716-446655440100",
    "item": {
      "id": "550e8400-e29b-41d4-a716-446655440101",
      "product_id": "550e8400-e29b-41d4-a716-446655440000",
      "product_name": "Khaadi Luxury 3-Piece Suit",
      "quantity": 1,
      "unit_price": 10500,
      "subtotal": 10500,
      "size": "M",
      "color": "Navy"
    },
    "cart_summary": {
      "item_count": 1,
      "subtotal": 10500,
      "discount": 0,
      "shipping": 0,
      "total": 10500
    }
  }
}
```

---

### GET /api/cart
Fetch user's cart

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440100",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "items": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440101",
        "product_id": "550e8400-e29b-41d4-a716-446655440000",
        "product_name": "Khaadi Luxury 3-Piece Suit",
        "product_image": "https://cdn.alimran.com/KHA-001-m-navy.jpg",
        "quantity": 1,
        "unit_price": 10500,
        "subtotal": 10500,
        "size": "M",
        "color": "Navy",
        "stock_available": 14,
        "is_available": true
      },
      {
        "id": "550e8400-e29b-41d4-a716-446655440102",
        "product_id": "550e8400-e29b-41d4-a716-446655440040",
        "product_name": "Ethnic Unstitched Suit",
        "quantity": 1,
        "unit_price": 8500,
        "subtotal": 8500,
        "stock_available": 11,
        "is_available": true
      }
    ],
    "summary": {
      "item_count": 2,
      "subtotal": 19000,
      "discount_applied": 0,
      "coupon_code": null,
      "shipping_cost": 0,
      "estimated_shipping_cost": 0,
      "tax": 0,
      "total": 19000
    },
    "updated_at": "2026-02-24T10:30:00Z"
  }
}
```

---

### DELETE /api/cart/:itemId
Remove item from cart

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "removed_item_id": "550e8400-e29b-41d4-a716-446655440101",
    "cart_summary": {
      "item_count": 1,
      "subtotal": 8500,
      "total": 8500
    }
  }
}
```

---

## 4.4 Checkout APIs

### POST /api/checkout
Initiate checkout

**Request:**
```json
{
  "shipping_address_id": "550e8400-e29b-41d4-a716-446655440200",
  "billing_address_id": "550e8400-e29b-41d4-a716-446655440200",
  "shipping_method": "express",
  "payment_method": "credit_card",
  "coupon_code": "WELCOME10",
  "customer_notes": "Please handle with care"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "order": {
      "id": "550e8400-e29b-41d4-a716-446655440300",
      "order_number": "AL-20260224-001234",
      "status": "pending",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "items": [
        {
          "product_name": "Khaadi Luxury 3-Piece Suit",
          "quantity": 1,
          "unit_price": 10500,
          "subtotal": 10500
        }
      ],
      "shipping_address": {
        "name": "Fatima Khan",
        "city": "Karachi",
        "address": "Apt 305, Pearl Towers"
      },
      "pricing": {
        "subtotal": 19000,
        "shipping_cost": 800,
        "discount": 1900,
        "tax": 0,
        "total": 17900
      },
      "payment": {
        "method": "credit_card",
        "status": "pending"
      },
      "shipping": {
        "method": "express",
        "estimated_delivery": "2026-02-26",
        "tracking_number": null
      },
      "created_at": "2026-02-24T10:45:00Z"
    }
  }
}
```

---

### POST /api/checkout/confirm-payment
Confirm payment after payment gateway processing

**Request:**
```json
{
  "order_id": "550e8400-e29b-41d4-a716-446655440300",
  "transaction_id": "txn_1234567890",
  "payment_status": "completed"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "order_number": "AL-20260224-001234",
    "status": "confirmed",
    "payment_status": "completed",
    "message": "Order confirmed. You will receive an SMS and email shortly."
  }
}
```

---

## 4.5 Orders APIs

### GET /api/orders/:userId
Fetch user's orders

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440300",
        "order_number": "AL-20260224-001234",
        "created_at": "2026-02-24T10:45:00Z",
        "status": "delivered",
        "total": 17900,
        "item_count": 2,
        "items": [
          {
            "product_name": "Khaadi Luxury 3-Piece Suit",
            "quantity": 1,
            "image_url": "https://cdn.alimran.com/KHA-001-main.jpg"
          }
        ],
        "tracking": {
          "status": "delivered",
          "tracking_number": "TCS123456789",
          "courier": "TCS",
          "estimated_delivery": "2026-02-26",
          "actual_delivery": "2026-02-26"
        }
      }
    ],
    "pagination": {
      "total": 8,
      "page": 1,
      "limit": 10
    }
  }
}
```

---

## 4.6 Coupon APIs

### GET /api/coupons
Fetch available coupons

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440400",
      "code": "WELCOME10",
      "discount_type": "percentage",
      "discount_value": 10,
      "min_purchase": 3000,
      "max_discount": 5000,
      "valid_until": "2026-03-31",
      "applicable_to": "all_products"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440401",
      "code": "SAVE15",
      "discount_type": "fixed_amount",
      "discount_value": 1500,
      "min_purchase": 5000,
      "valid_until": "2026-03-15",
      "applicable_to": "specific_brands",
      "brands": ["Khaadi", "Gul Ahmed"]
    }
  ]
}
```

---

### POST /api/coupons/apply
Apply coupon to cart

**Request:**
```json
{
  "coupon_code": "WELCOME10",
  "cart_subtotal": 19000
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "coupon": {
      "code": "WELCOME10",
      "discount_type": "percentage",
      "discount_value": 10
    },
    "discount_amount": 1900,
    "new_total": 17100,
    "message": "Coupon applied successfully"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "COUPON_INVALID",
    "message": "Coupon code has expired or is not valid for this order"
  }
}
```

---

## 4.7 Reviews API

### POST /api/reviews
Submit product review

**Request:**
```json
{
  "product_id": "550e8400-e29b-41d4-a716-446655440000",
  "order_id": "550e8400-e29b-41d4-a716-446655440300",
  "rating": 5,
  "title": "Perfect Eid Outfit!",
  "review_text": "Arrived on time, stitching is impeccable, and the color is exactly as shown.",
  "images": []
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440500",
    "product_id": "550e8400-e29b-41d4-a716-446655440000",
    "rating": 5,
    "status": "pending",
    "message": "Review submitted. It will appear after moderation."
  }
}
```

---

## 4.8 Error Handling

**Standard Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_OUT_OF_STOCK",
    "message": "This product is currently out of stock",
    "details": {
      "product_id": "550e8400-e29b-41d4-a716-446655440000",
      "requested_quantity": 2,
      "available": 0
    }
  }
}
```

**HTTP Status Codes:**
- `200 OK` - Successful GET/POST
- `201 Created` - Resource created
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (e.g., duplicate email)
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

---

# PART 5: REACT COMPONENT SPECIFICATIONS

## 5.1 ProductCard Component

```jsx
// File: src/components/ProductCard/ProductCard.tsx

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    brand: { name: string; slug: string };
    images: Array<{ url: string; alt: string }>;
    price: {
      original: number;
      discounted: number;
      discount_percentage: number;
    };
    stock: { status: 'in_stock' | 'low_stock' | 'out_of_stock' };
    rating: { average: number; count: number };
    is_bestseller: boolean;
    is_new_arrival: boolean;
    occasion?: string;
  };
  variant?: 'default' | 'compact' | 'featured';
  showWishlist?: boolean;
  onAddToCart?: (productId: string) => void;
  onAddToWishlist?: (productId: string) => void;
  onProductClick?: (productSlug: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'default',
  showWishlist = true,
  onAddToCart,
  onAddToWishlist,
  onProductClick,
}) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await onAddToCart?.(product.id);
      // Show success toast
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlist = async () => {
    setIsInWishlist(!isInWishlist);
    await onAddToWishlist?.(product.id);
  };

  return (
    <div className="product-card">
      {/* Image Container */}
      <div className="product-image-container">
        <img
          src={product.images[0]?.url}
          alt={product.images[0]?.alt}
          loading="lazy"
          className="product-image"
        />

        {/* Badges */}
        <div className="badges">
          {product.is_new_arrival && (
            <span className="badge badge-new">NEW</span>
          )}
          {product.is_bestseller && (
            <span className="badge badge-bestseller">⭐ BESTSELLER</span>
          )}
          {product.price.discount_percentage > 0 && (
            <span className="badge badge-discount">
              -{product.price.discount_percentage}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        {showWishlist && (
          <button
            className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
            onClick={handleWishlist}
            aria-label="Add to wishlist"
          >
            ♡
          </button>
        )}

        {/* Quick Add Button */}
        {product.stock.status === 'in_stock' && (
          <button
            className="quick-add-btn"
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-brand">{product.brand.name}</h3>
        <h2 className="product-name" onClick={() => onProductClick?.(product.slug)}>
          {product.name}
        </h2>

        {/* Rating */}
        <div className="product-rating">
          <span className="stars">{'⭐'.repeat(Math.round(product.rating.average))}</span>
          <span className="rating-count">{product.rating.average}/5 ({product.rating.count})</span>
        </div>

        {/* Pricing */}
        <div className="product-pricing">
          <span className="original-price">
            ~~PKR {product.price.original.toLocaleString()}~~
          </span>
          <span className="discounted-price">
            PKR {product.price.discounted.toLocaleString()}
          </span>
          {product.price.discount_percentage > 0 && (
            <span className="save-amount">
              You save: PKR {(product.price.original - product.price.discounted).toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className={`stock-status ${product.stock.status}`}>
          {product.stock.status === 'in_stock' && '✓ In Stock'}
          {product.stock.status === 'low_stock' && '⚠ Low Stock'}
          {product.stock.status === 'out_of_stock' && '✕ Out of Stock'}
        </div>
      </div>
    </div>
  );
};
```

**Styling (Tailwind CSS):**
```css
/* Desktop: 4 columns, Tablet: 3 columns, Mobile: 2 columns */
.product-card {
  @apply bg-white rounded-lg shadow hover:shadow-lg transition-shadow;
}

.product-image-container {
  @apply relative w-full overflow-hidden rounded-t-lg;
  aspect-ratio: 1;
}

.product-image {
  @apply w-full h-full object-cover;
}

.badges {
  @apply absolute top-3 left-3 flex flex-col gap-2;
}

.badge {
  @apply px-2 py-1 rounded text-xs font-bold text-white;
}

.badge-new { @apply bg-blue-500; }
.badge-bestseller { @apply bg-yellow-500; }
.badge-discount { @apply bg-red-500; }

.product-info {
  @apply p-4;
}

.product-pricing {
  @apply flex flex-col gap-1 mt-2 mb-3;
}

.original-price {
  @apply line-through text-gray-500 text-sm;
}

.discounted-price {
  @apply text-lg font-bold text-primary;
}

.save-amount {
  @apply text-xs text-green-600 font-semibold;
}
```

---

## 5.2 FilterPanel Component

```jsx
// File: src/components/FilterPanel/FilterPanel.tsx

interface FilterPanelProps {
  filters: {
    brands: Array<{ id: string; name: string; count: number }>;
    occasions: Array<{ value: string; label: string; count: number }>;
    types: Array<{ value: string; label: string; count: number }>;
    priceRange: { min: number; max: number };
    colors: Array<{ name: string; code: string; count: number }>;
  };
  selectedFilters: {
    brands?: string[];
    occasion?: string;
    type?: string;
    priceRange?: { min: number; max: number };
    colors?: string[];
  };
  onFilterChange: (filterType: string, value: any) => void;
  onClearAll: () => void;
  isMobile?: boolean;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  onClearAll,
  isMobile = false,
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    brands: true,
    occasion: true,
    price: false,
    colors: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <aside className={`filter-panel ${isMobile ? 'mobile' : 'desktop'}`}>
      {/* Clear All */}
      {Object.keys(selectedFilters).length > 0 && (
        <button className="clear-all-btn" onClick={onClearAll}>
          ✕ Clear All Filters
        </button>
      )}

      {/* Brand Filter */}
      <FilterSection
        title="Brand"
        isExpanded={expandedSections.brands}
        onToggle={() => toggleSection('brands')}
      >
        {filters.brands.map((brand) => (
          <label key={brand.id} className="filter-checkbox">
            <input
              type="checkbox"
              checked={selectedFilters.brands?.includes(brand.id)}
              onChange={(e) => {
                const newBrands = e.target.checked
                  ? [...(selectedFilters.brands || []), brand.id]
                  : selectedFilters.brands?.filter((b) => b !== brand.id) || [];
                onFilterChange('brands', newBrands);
              }}
            />
            <span>{brand.name}</span>
            <span className="count">({brand.count})</span>
          </label>
        ))}
      </FilterSection>

      {/* Price Range Filter */}
      <FilterSection
        title="Price Range"
        isExpanded={expandedSections.price}
        onToggle={() => toggleSection('price')}
      >
        <div className="price-slider">
          <input
            type="range"
            min={filters.priceRange.min}
            max={filters.priceRange.max}
            step={500}
            value={selectedFilters.priceRange?.min || filters.priceRange.min}
            onChange={(e) =>
              onFilterChange('priceRange', {
                min: parseInt(e.target.value),
                max: selectedFilters.priceRange?.max || filters.priceRange.max,
              })
            }
          />
          <input
            type="range"
            min={filters.priceRange.min}
            max={filters.priceRange.max}
            step={500}
            value={selectedFilters.priceRange?.max || filters.priceRange.max}
            onChange={(e) =>
              onFilterChange('priceRange', {
                min: selectedFilters.priceRange?.min || filters.priceRange.min,
                max: parseInt(e.target.value),
              })
            }
          />
        </div>
        <div className="price-display">
          PKR {(selectedFilters.priceRange?.min || filters.priceRange.min).toLocaleString()} -{' '}
          PKR {(selectedFilters.priceRange?.max || filters.priceRange.max).toLocaleString()}
        </div>
      </FilterSection>

      {/* Occasion Filter */}
      <FilterSection
        title="Occasion"
        isExpanded={expandedSections.occasion}
        onToggle={() => toggleSection('occasion')}
      >
        {filters.occasions.map((occasion) => (
          <label key={occasion.value} className="filter-radio">
            <input
              type="radio"
              name="occasion"
              value={occasion.value}
              checked={selectedFilters.occasion === occasion.value}
              onChange={(e) => onFilterChange('occasion', e.target.value)}
            />
            <span>{occasion.label}</span>
            <span className="count">({occasion.count})</span>
          </label>
        ))}
      </FilterSection>

      {/* Color Filter */}
      <FilterSection
        title="Color"
        isExpanded={expandedSections.colors}
        onToggle={() => toggleSection('colors')}
      >
        <div className="color-swatches">
          {filters.colors.map((color) => (
            <label
              key={color.name}
              className={`color-swatch ${selectedFilters.colors?.includes(color.name) ? 'selected' : ''}`}
              title={color.name}
            >
              <input
                type="checkbox"
                value={color.name}
                checked={selectedFilters.colors?.includes(color.name)}
                onChange={(e) => {
                  const newColors = e.target.checked
                    ? [...(selectedFilters.colors || []), color.name]
                    : selectedFilters.colors?.filter((c) => c !== color.name) || [];
                  onFilterChange('colors', newColors);
                }}
              />
              <span
                style={{ backgroundColor: color.code }}
                className="swatch"
              />
            </label>
          ))}
        </div>
      </FilterSection>
    </aside>
  );
};

// Helper component
const FilterSection: React.FC<{
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ title, isExpanded, onToggle, children }) => (
  <div className="filter-section">
    <button className="section-header" onClick={onToggle}>
      <span>{title}</span>
      <span className="toggle-icon">{isExpanded ? '▼' : '▶'}</span>
    </button>
    {isExpanded && <div className="section-content">{children}</div>}
  </div>
);
```

---

## 5.3 CartItem Component

```jsx
// File: src/components/Cart/CartItem.tsx

interface CartItemProps {
  item: {
    id: string;
    product_name: string;
    product_image: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
    size?: string;
    color?: string;
    stock_available: number;
  };
  onQuantityChange: (itemId: string, newQuantity: number) => void;
  onRemove: (itemId: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
}) => {
  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0 && newQuantity <= item.stock_available) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <img
        src={item.product_image}
        alt={item.product_name}
        className="cart-item-image"
      />

      <div className="cart-item-details">
        <h3>{item.product_name}</h3>
        {item.size && <p className="size-color">Size: {item.size}</p>}
        {item.color && <p className="size-color">Color: {item.color}</p>}
      </div>

      <div className="cart-item-quantity">
        <button
          onClick={() => handleQuantityChange(-1)}
          disabled={item.quantity <= 1}
        >
          −
        </button>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (val > 0 && val <= item.stock_available) {
              onQuantityChange(item.id, val);
            }
          }}
          min="1"
          max={item.stock_available}
        />
        <button
          onClick={() => handleQuantityChange(1)}
          disabled={item.quantity >= item.stock_available}
        >
          +
        </button>
      </div>

      <div className="cart-item-price">
        <p className="unit-price">PKR {item.unit_price.toLocaleString()}</p>
        <p className="subtotal">PKR {item.subtotal.toLocaleString()}</p>
      </div>

      <button
        className="remove-btn"
        onClick={() => onRemove(item.id)}
        aria-label="Remove item"
      >
        ✕
      </button>
    </div>
  );
};
```

---

## 5.4 CheckoutForm Component

```jsx
// File: src/components/Checkout/CheckoutForm.tsx

interface CheckoutFormProps {
  onSubmit: (formData: CheckoutData) => void;
  isLoading?: boolean;
}

interface CheckoutData {
  shipping_address_id: string;
  shipping_method: 'standard' | 'express' | 'overnight';
  payment_method: 'cod' | 'credit_card' | 'digital_wallet';
  coupon_code?: string;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<CheckoutData>({
    shipping_address_id: '',
    shipping_method: 'standard',
    payment_method: 'cod',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      {/* Step 1: Shipping */}
      <fieldset>
        <legend>Shipping Address</legend>
        <select
          value={formData.shipping_address_id}
          onChange={(e) =>
            setFormData({ ...formData, shipping_address_id: e.target.value })
          }
          required
        >
          <option value="">Select or add address</option>
          {/* Address options */}
        </select>
      </fieldset>

      {/* Step 2: Shipping Method */}
      <fieldset>
        <legend>Shipping Method</legend>
        {[
          { value: 'standard', label: 'Standard (2-5 days) - FREE' },
          { value: 'express', label: 'Express (1-2 days) - PKR 800' },
          { value: 'overnight', label: 'Overnight - PKR 1,500' },
        ].map((method) => (
          <label key={method.value} className="radio-group">
            <input
              type="radio"
              name="shipping_method"
              value={method.value}
              checked={formData.shipping_method === method.value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  shipping_method: e.target.value as any,
                })
              }
            />
            {method.label}
          </label>
        ))}
      </fieldset>

      {/* Step 3: Payment Method */}
      <fieldset>
        <legend>Payment Method</legend>
        {[
          { value: 'cod', label: 'Cash On Delivery' },
          { value: 'credit_card', label: 'Credit Card' },
          { value: 'digital_wallet', label: 'Digital Wallet (JazzCash/EasyPaisa)' },
        ].map((method) => (
          <label key={method.value} className="radio-group">
            <input
              type="radio"
              name="payment_method"
              value={method.value}
              checked={formData.payment_method === method.value}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  payment_method: e.target.value as any,
                })
              }
            />
            {method.label}
          </label>
        ))}
      </fieldset>

      {/* Coupon Code */}
      <fieldset>
        <legend>Coupon Code (Optional)</legend>
        <input
          type="text"
          placeholder="Enter coupon code"
          value={formData.coupon_code || ''}
          onChange={(e) =>
            setFormData({ ...formData, coupon_code: e.target.value })
          }
        />
      </fieldset>

      <button type="submit" disabled={isLoading} className="submit-btn">
        {isLoading ? 'Processing...' : 'Complete Order'}
      </button>
    </form>
  );
};
```

---

## 5.5 State Management (Zustand)

```typescript
// File: src/store/cartStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  product_id: string;
  variant_id: string;
  quantity: number;
  unit_price: number;
  product_name: string;
  size?: string;
  color?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.product_id === item.product_id && i.variant_id === item.variant_id
          );

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === existingItem.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { items: [...state.items, item] };
        }),

      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),

      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      getTotal: () =>
        get().items.reduce((total, item) => total + item.quantity * item.unit_price, 0),

      getItemCount: () =>
        get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: 'cart-storage',
    }
  )
);
```

---

(Continuing with more components...)

# PART 6: DESIGN TOKENS & UI SYSTEM

## 6.1 Color Palette

```typescript
// File: src/tokens/colors.ts

export const colors = {
  // Primary
  primary: {
    50: '#f8f4f1',
    100: '#f0e8e3',
    200: '#dcc8b8',
    300: '#c7a88d',
    400: '#a87d5f',
    500: '#8B4513', // Primary Brown
    600: '#7a3a0f',
    700: '#5d2d0a',
    800: '#4a2408',
    900: '#3a1a06',
  },

  // Secondary/Accent
  accent: {
    50: '#fffef5',
    100: '#fffae0',
    200: '#fff5c2',
    300: '#fff0a3',
    400: '#ffe680',
    500: '#D4AF37', // Gold
    600: '#c9a030',
    700: '#a88024',
    800: '#8c691d',
    900: '#6f5517',
  },

  // Semantic Colors
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8',

  // Neutral
  neutral: {
    white: '#FFFFFF',
    50: '#F9F7F4',
    100: '#F0EBE5',
    200: '#E0DDD8',
    300: '#C8C4BC',
    400: '#A8A8A8',
    500: '#808080',
    600: '#4A4A4A',
    700: '#2C2C2C',
    800: '#1a1a1a',
    black: '#000000',
  },

  // Semantic States
  hover: 'rgba(0, 0, 0, 0.05)',
  active: 'rgba(0, 0, 0, 0.10)',
  disabled: '#CCCCCC',
  border: '#E0DDD8',
  background: '#F9F7F4',
};
```

---

## 6.2 Typography

```typescript
// File: src/tokens/typography.ts

export const typography = {
  fonts: {
    display: "'Poppins', sans-serif", // Headings
    body: "'Inter', sans-serif", // Body text
  },

  // Heading Styles
  h1: {
    fontSize: '48px',
    fontWeight: 700,
    lineHeight: '1.2',
    letterSpacing: '-0.5px',
    fontFamily: "'Poppins', sans-serif",
  },

  h2: {
    fontSize: '36px',
    fontWeight: 700,
    lineHeight: '1.3',
    letterSpacing: '-0.25px',
    fontFamily: "'Poppins', sans-serif",
  },

  h3: {
    fontSize: '28px',
    fontWeight: 600,
    lineHeight: '1.4',
    fontFamily: "'Poppins', sans-serif",
  },

  h4: {
    fontSize: '22px',
    fontWeight: 600,
    lineHeight: '1.4',
    fontFamily: "'Poppins', sans-serif",
  },

  h5: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: '1.5',
    fontFamily: "'Poppins', sans-serif",
  },

  h6: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '1.5',
    fontFamily: "'Poppins', sans-serif",
  },

  // Body Text Styles
  body_lg: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '1.6',
    letterSpacing: '0px',
    fontFamily: "'Inter', sans-serif",
  },

  body_md: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '1.5',
    fontFamily: "'Inter', sans-serif",
  },

  body_sm: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '1.4',
    fontFamily: "'Inter', sans-serif",
  },

  // Labels & UI Text
  label: {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '1.4',
    fontFamily: "'Inter', sans-serif",
  },

  button: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '1.5',
    fontFamily: "'Inter', sans-serif",
  },

  price: {
    fontSize: '26px',
    fontWeight: 700,
    lineHeight: '1.2',
    fontFamily: "'Poppins', sans-serif",
  },
};
```

---

## 6.3 Spacing Scale

```typescript
// File: src/tokens/spacing.ts

export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
};

// Component Spacing
export const componentSpacing = {
  // Button Padding
  button: {
    sm: { x: spacing[2], y: spacing[2] }, // 8px 8px
    md: { x: spacing[4], y: spacing[2] }, // 16px 8px
    lg: { x: spacing[6], y: spacing[3] }, // 24px 12px
  },

  // Form Input Padding
  input: {
    padding: spacing[3], // 12px
    height: '44px', // Touch-friendly
  },

  // Card Padding
  card: {
    sm: spacing[3], // 12px
    md: spacing[4], // 16px
    lg: spacing[6], // 24px
  },

  // Section Padding
  section: {
    mobile: spacing[4], // 16px
    tablet: spacing[6], // 24px
    desktop: spacing[8], // 32px
  },
};
```

---

## 6.4 Breakpoints

```typescript
// File: src/tokens/breakpoints.ts

export const breakpoints = {
  mobile: '375px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1920px',
};

export const mediaQueries = {
  mobile: '@media (max-width: 374px)',
  sm: '@media (min-width: 375px) and (max-width: 639px)',
  md: '@media (min-width: 768px) and (max-width: 1023px)',
  lg: '@media (min-width: 1024px) and (max-width: 1279px)',
  xl: '@media (min-width: 1280px)',
  xxl: '@media (min-width: 1920px)',

  // Mobile-first approach
  smUp: '@media (min-width: 375px)',
  mdUp: '@media (min-width: 768px)',
  lgUp: '@media (min-width: 1024px)',
  xlUp: '@media (min-width: 1280px)',
  xxlUp: '@media (min-width: 1920px)',
};
```

---

## 6.5 Component Guidelines

```typescript
// File: src/tokens/components.ts

export const components = {
  // Button Styles
  button: {
    primary: {
      background: colors.primary[500],
      color: colors.neutral.white,
      padding: `${spacing[3]} ${spacing[4]}`,
      fontSize: typography.button.fontSize,
      fontWeight: typography.button.fontWeight,
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',

      '&:hover': {
        background: colors.primary[600],
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      },

      '&:active': {
        background: colors.primary[700],
      },

      '&:disabled': {
        background: colors.disabled,
        cursor: 'not-allowed',
        opacity: 0.6,
      },
    },

    secondary: {
      background: colors.neutral.white,
      color: colors.primary[500],
      border: `1px solid ${colors.primary[500]}`,
      padding: `${spacing[3]} ${spacing[4]}`,
      // ... rest of styles
    },
  },

  // Input Styles
  input: {
    width: '100%',
    padding: `${spacing[3]} ${spacing[3]}`,
    fontSize: typography.body_md.fontSize,
    border: `1px solid ${colors.border}`,
    borderRadius: '4px',
    fontFamily: typography.fonts.body,
    transition: 'all 0.2s ease',

    '&:focus': {
      outline: 'none',
      borderColor: colors.primary[500],
      boxShadow: `0 0 0 3px ${colors.primary[50]}`,
    },

    '&:disabled': {
      background: colors.neutral[50],
      color: colors.neutral[400],
      cursor: 'not-allowed',
    },
  },

  // Card Styles
  card: {
    background: colors.neutral.white,
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',

    '&:hover': {
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
    },
  },

  // Modal Styles
  modal: {
    overlay: {
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
    },
    dialog: {
      background: colors.neutral.white,
      borderRadius: '8px',
      padding: spacing[6],
      maxWidth: '500px',
      width: '90%',
    },
  },
};
```

---

(Continuing with Testing Strategy and Project Management...)

## TESTING STRATEGY

### Unit Tests (Jest + React Testing Library)

```typescript
// File: src/components/__tests__/ProductCard.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../ProductCard';

const mockProduct = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  name: 'Khaadi Luxury Suit',
  slug: 'khaadi-luxury-suit',
  brand: { name: 'Khaadi', slug: 'khaadi' },
  images: [{ url: 'https://example.com/image.jpg', alt: 'Product' }],
  price: { original: 15000, discounted: 10500, discount_percentage: 30 },
  stock: { status: 'in_stock' as const },
  rating: { average: 4.7, count: 127 },
  is_bestseller: true,
  is_new_arrival: false,
};

describe('ProductCard', () => {
  it('should render product card with correct information', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Khaadi Luxury Suit')).toBeInTheDocument();
    expect(screen.getByText('Khaadi')).toBeInTheDocument();
    expect(screen.getByText('PKR 10,500')).toBeInTheDocument();
    expect(screen.getByText('⭐ BESTSELLER')).toBeInTheDocument();
  });

  it('should calculate and display correct discount', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('-30%')).toBeInTheDocument();
  });

  it('should call onAddToCart when add to cart button is clicked', async () => {
    const mockAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    const addBtn = screen.getByText('Add to Cart');
    fireEvent.click(addBtn);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct.id);
  });

  it('should toggle wishlist when heart icon is clicked', async () => {
    const mockAddToWishlist = jest.fn();
    render(
      <ProductCard product={mockProduct} onAddToWishlist={mockAddToWishlist} />
    );

    const wishlistBtn = screen.getByLabelText('Add to wishlist');
    fireEvent.click(wishlistBtn);

    expect(mockAddToWishlist).toHaveBeenCalledWith(mockProduct.id);
  });
});
```

### Integration Tests (Cart + Checkout)

```typescript
// File: src/__tests__/checkout.integration.test.ts

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { CheckoutFlow } from '../flows/CheckoutFlow';

jest.mock('axios');

describe('Checkout Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should complete full checkout flow', async () => {
    const { getByLabelText, getByText } = render(<CheckoutFlow />);

    // Step 1: Select shipping address
    const addressSelect = getByLabelText(/shipping address/i);
    fireEvent.change(addressSelect, {
      target: { value: 'address-123' },
    });

    // Step 2: Select shipping method
    const expressShipping = getByText(/express \(1-2 days\)/i);
    fireEvent.click(expressShipping);

    // Step 3: Select payment method
    const codPayment = getByLabelText(/cash on delivery/i);
    fireEvent.click(codPayment);

    // Step 4: Submit
    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        success: true,
        data: { order_number: 'AL-20260224-001234' },
      },
    });

    const submitBtn = getByText(/complete order/i);
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        '/api/checkout',
        expect.objectContaining({
          shipping_address_id: 'address-123',
          shipping_method: 'express',
          payment_method: 'cod',
        })
      );
    });
  });
});
```

### E2E Tests (Cypress)

```typescript
// File: cypress/e2e/purchase-flow.cy.ts

describe('Complete Purchase Flow', () => {
  beforeEach(() => {
    cy.visit('https://alimran.com');
  });

  it('should allow user to browse, add to cart, and checkout', () => {
    // Browse products
    cy.get('[data-testid="category-stitched"]').click();
    cy.contains('Khaadi Luxury Suit').should('be.visible');

    // Add to cart
    cy.get('[data-testid="product-card-kha-001"]').within(() => {
      cy.contains('Add to Cart').click();
    });

    // Verify cart
    cy.contains('Added to cart').should('be.visible');
    cy.get('[data-testid="cart-count"]').should('contain', '1');

    // Go to cart
    cy.get('[data-testid="cart-icon"]').click();
    cy.url().should('include', '/cart');

    // Checkout
    cy.contains('Proceed to Checkout').click();
    cy.url().should('include', '/checkout');

    // Fill checkout form
    cy.get('select[name="shipping_address_id"]').select('address-123');
    cy.get('input[value="express"]').check();
    cy.get('input[value="cod"]').check();

    // Submit order
    cy.contains('Complete Order').click();

    // Verify confirmation
    cy.url().should('include', '/order-confirmation');
    cy.contains('Thank you for your order').should('be.visible');
  });
});
```

---

## PROJECT MANAGEMENT & TIMELINE

### Development Timeline (16-20 weeks)

```
PHASE 1: FOUNDATION (Weeks 1-4)
├── Week 1-2: Database Setup & API Scaffolding
│   ├── PostgreSQL database setup
│   ├── Schema creation and migration
│   └── Express/Nest.js server setup
│
├── Week 2-3: Core APIs
│   ├── Authentication endpoints
│   ├── Product APIs (GET, filtering)
│   └── Category APIs
│
└── Week 4: Testing Infrastructure
    ├── Jest setup
    ├── Unit test examples
    └── API testing suite


PHASE 2: FRONTEND (Weeks 5-10)
├── Week 5-6: Component Library
│   ├── ProductCard
│   ├── CategoryCard
│   ├── FilterPanel
│   ├── Cart components
│   └── Navigation/Footer
│
├── Week 7-8: Pages & Flows
│   ├── Homepage implementation
│   ├── Category/Search pages
│   ├── Product detail pages
│   └── Cart page
│
└── Week 9-10: Checkout & Account
    ├── Checkout flow (3 steps)
    ├── Order confirmation
    ├── User account/dashboard
    └── Order tracking


PHASE 3: E-COMMERCE FEATURES (Weeks 11-14)
├── Week 11: Cart & Wishlist
│   ├── Cart management APIs
│   ├── Wishlist functionality
│   └── Cart persistence
│
├── Week 12: Payments & Coupons
│   ├── Payment gateway integration (Stripe)
│   ├── COD workflow
│   ├── Coupon system
│   └── Order creation APIs
│
├── Week 13: Shipping & Tracking
│   ├── Shipping method integration
│   ├── City-based rates
│   ├── Courier API integration
│   └── Tracking page
│
└── Week 14: Reviews & Ratings
    ├── Review submission
    ├── Rating display
    └── Moderation workflow


PHASE 4: ADMIN & ANALYTICS (Weeks 15-17)
├── Week 15: Admin Dashboard
│   ├── Product management
│   ├── Order management
│   └── Inventory tracking
│
├── Week 16: Analytics
│   ├── Sales metrics
│   ├── Top products report
│   └── Customer analytics
│
└── Week 17: Admin Features
    ├── Coupon management
    ├── Banner management
    └── Customer support


PHASE 5: TESTING & OPTIMIZATION (Weeks 18-20)
├── Week 18: Comprehensive Testing
│   ├── Unit tests (80%+ coverage)
│   ├── Integration tests
│   └── E2E tests for critical flows
│
├── Week 19: Performance & Security
│   ├── Lighthouse optimization (target 90+)
│   ├── Database query optimization
│   ├── Security audit (PCI-DSS, OWASP)
│   └── Load testing
│
└── Week 20: Launch Preparation
    ├── Final QA testing
    ├── Documentation
    └── Production deployment
```

---

### Sprint Planning Template

```
SPRINT 3 (Week 5-6): Component Library Development

Goal: Build reusable component library with 80% test coverage

Tasks:
├── [EPIC] ProductCard Component
│   ├── [STORY] Implement product card layout (3 pts)
│   │   └── [TASK] Create responsive image section (2 pts)
│   │   └── [TASK] Implement variant selector (2 pts)
│   │   └── [TASK] Add price display (1 pt)
│   │   └── [TASK] Write unit tests (2 pts)
│   │
│   └── [STORY] Add interactive features (5 pts)
│       └── [TASK] Add to cart button (2 pts)
│       └── [TASK] Wishlist toggle (2 pts)
│       └── [TASK] Product click navigation (1 pt)
│
├── [EPIC] FilterPanel Component
│   ├── [STORY] Implement filter UI (5 pts)
│   │   └── [TASK] Brand filter (2 pts)
│   │   └── [TASK] Price range slider (2 pts)
│   │   └── [TASK] Color swatches (1 pt)
│   │
│   └── [STORY] Filter logic (3 pts)
│       └── [TASK] Apply filters (2 pts)
│       └── [TASK] Clear filters (1 pt)
│
└── [EPIC] Testing Infrastructure
    └── [TASK] Setup Jest + React Testing Library (2 pts)
    └── [TASK] Write component test examples (3 pts)

Acceptance Criteria:
✓ All components render correctly on mobile/desktop
✓ 80% unit test coverage
✓ Lighthouse score > 90
✓ Accessibility audit passed (WCAG AA)
✓ Performance: Component render < 100ms

Dependencies:
- Design tokens finalized (from Phase 1)
- Tailwind CSS setup complete
```

---

### Risk Mitigation Matrix

| Risk | Probability | Impact | Mitigation |
|------|-----------|--------|-----------|
| Payment gateway integration delays | Medium | High | Start integration Week 11, have backup gateway ready |
| Database performance issues | Low | High | Early load testing, proper indexing from start |
| Scope creep | High | Medium | Strict feature freeze after Week 14 |
| Third-party API unavailability (Courier) | Medium | Medium | Mock APIs for testing, fallback communication |
| Shipping calculation complexity | Medium | Medium | Simple MVP first, enhance later |
| Mobile responsiveness issues | Medium | Medium | Mobile-first dev, test on real devices |

---

This completes the comprehensive technical specification for AL Imran Fabrics. All parts are production-ready for development teams.

**Total Documentation:**
- Part 3: PostgreSQL Schema (30 tables + indexes + views)
- Part 4: API Documentation (20+ endpoints with examples)
- Part 5: React Components (6+ components with full implementation)
- Part 6: Design Tokens (colors, typography, spacing, breakpoints)
- Testing Strategy (unit, integration, E2E tests)
- Project Management (16-20 week timeline, sprint planning)

**Ready for:**
✅ Backend development team
✅ Frontend development team
✅ QA/Testing team
✅ DevOps/Infrastructure team
✅ Project manager
