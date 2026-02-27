# AL Imran Fabrics - Multi-Brand Fashion E-Commerce
## Professional Product Strategy, UI/UX Architecture & Database Design

**Document Type:** Production-Ready Specification
**Client:** AL Imran Fabrics (Pakistan)
**Date:** February 2026
**Status:** Ready for Development Team

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Part 1 - Homepage Wireframe](#part-1--homepage-wireframe)
3. [Part 2 - Product Detail Pages](#part-2--product-detail-pages)
4. [Part 3 - Category & Filter Architecture](#part-3--category--filter-architecture)
5. [Part 4 - PostgreSQL Database Schema](#part-4--postgresql-database-schema)

---

## Project Overview

### Business Context
**AL Imran Fabrics** is a **premium multi-brand Pakistani fashion retailer** specializing in:
- Stitched and unstitched suit collections
- 2-piece and 3-piece ensembles
- Formal wear, luxury collections, party wear
- Authentic branded products from top Pakistani labels

### Brands Carried
J., Khaadi, Gul Ahmed, Ethnic, Saya, BAROQUE, ALKARAM, SOHAYE, Bonanza, MTJ, Zellbury, Gull G, Bin Saeed, Mizaaj

### Key Differentiators
✅ Curated collections from authentic brands
✅ Premium pricing with quality assurance
✅ Stitched + unstitched options
✅ Occasion-based browsing (Festive, Formal, Luxury, Party)
✅ Easy returns & COD available
✅ WhatsApp customer support

### Target Customer Segments
1. **Urban Women** (22-50) - Fashion-conscious, seeking branded pieces
2. **Wedding Shoppers** - Looking for festive/party wear
3. **Corporate Professionals** - Seeking formal wear
4. **Luxury Seekers** - High-end collections and designer pieces

---

# PART 1 — HOMEPAGE WIREFRAME

## 1.1 Homepage Wireframe Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  [ANNOUNCEMENT BAR - FREE SHIPPING | COD AVAILABLE | 30% SALE]  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ STICKY HEADER / NAVIGATION                                       │
├─────────────────────────────────────────────────────────────────┤
│ Logo | Search Bar | Cart (X items) | Wishlist | Account          │
├─────────────────────────────────────────────────────────────────┤
│ Stitched | Unstitched | 2-Piece | 3-Piece | Formal | Luxury | Sale│
│                                               (MEGA MENU)         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│              HERO BANNER (1920x600)                              │
│    "Eid Collection 2026 - Premium Luxury Suits"                 │
│             [SHOP NOW] [EXPLORE]                                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  SHOP BY CATEGORY SECTION                                        │
├─────────────────────────────────────────────────────────────────┤
│  [Stitched]  [Unstitched]  [2-Piece]  [3-Piece]                │
│  [Formal]    [Luxury]      [Party]    [Sale]                    │
│  (8 Category cards with images, titles, product count)          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  SHOP BY BRAND SECTION                                           │
├─────────────────────────────────────────────────────────────────┤
│ "Featured Brands" - Logo carousel/grid                           │
│ [J.] [Khaadi] [Gul Ahmed] [Ethnic] [Saya] [BAROQUE]            │
│ [ALKARAM] [SOHAYE] [Bonanza] [MTJ] [Zellbury] [MORE...]        │
│ Left/Right arrows for carousel navigation                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  NEW ARRIVALS SECTION                                            │
├─────────────────────────────────────────────────────────────────┤
│ Heading: "Just Arrived - Fresh Styles This Week"               │
│                                                                   │
│ Product Grid (4 columns on desktop, 2 on mobile):               │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                             │
│ │Image │ │Image │ │Image │ │Image │                             │
│ │Brand │ │Brand │ │Brand │ │Brand │                             │
│ │Name  │ │Name  │ │Name  │ │Name  │                             │
│ │Price │ │Price │ │Price │ │Price │                             │
│ │♡ Cart│ │♡ Cart│ │♡ Cart│ │♡ Cart│                             │
│ └──────┘ └──────┘ └──────┘ └──────┘                             │
│                                                                   │
│ [View All New Arrivals] →                                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  BEST SELLERS SECTION                                            │
├─────────────────────────────────────────────────────────────────┤
│ Heading: "Customer Favorites - Best Selling Styles"            │
│                                                                   │
│ Product Grid (4 columns) with "BESTSELLER" badge               │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                             │
│ │ ⭐BS │ │ ⭐BS │ │ ⭐BS │ │ ⭐BS │                             │
│ │Image │ │Image │ │Image │ │Image │                             │
│ │Brand │ │Brand │ │Brand │ │Brand │                             │
│ │Price │ │Price │ │Price │ │Price │                             │
│ │Rating│ │Rating│ │Rating│ │Rating│                             │
│ │♡ Cart│ │♡ Cart│ │♡ Cart│ │♡ Cart│                             │
│ └──────┘ └──────┘ └──────┘ └──────┘                             │
│                                                                   │
│ [Explore All Bestsellers] →                                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  LUXURY COLLECTION HIGHLIGHT BANNER                              │
├─────────────────────────────────────────────────────────────────┤
│         "Luxury Edit - Exclusive Designer Pieces"               │
│      Image of premium collection | Premium badge on image       │
│                                                                   │
│    Text: "Handpicked luxury suits from our finest brands"      │
│         "Starting from PKR 15,000"                              │
│                                                                   │
│              [SHOP LUXURY COLLECTION]                           │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FLASH SALE / LIMITED TIME SECTION                               │
├─────────────────────────────────────────────────────────────────┤
│ Heading: "Flash Sale - Today Only!" with countdown timer        │
│                                                                   │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                             │
│ │-30%  │ │-40%  │ │-25%  │ │-50%  │  (Discount badges)        │
│ │Image │ │Image │ │Image │ │Image │                             │
│ │Old$  │ │Old$  │ │Old$  │ │Old$  │                             │
│ │New$  │ │New$  │ │New$  │ │New$  │                             │
│ │[Add] │ │[Add] │ │[Add] │ │[Add] │                             │
│ └──────┘ └──────┘ └──────┘ └──────┘                             │
│                                                                   │
│ [See All Flash Deals] →                                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  OCCASION-BASED COLLECTIONS                                      │
├─────────────────────────────────────────────────────────────────┤
│ 4 Collection Tiles (Festive | Formal | Party | Casual):        │
│                                                                   │
│ ┌─────────────────────┐  ┌─────────────────────┐               │
│ │     FESTIVE         │  │      FORMAL         │               │
│ │   (Image: large)    │  │   (Image: large)    │               │
│ │ "Eid, Wedding"      │  │ "Office, Meetings"  │               │
│ │ [EXPLORE]           │  │ [EXPLORE]           │               │
│ └─────────────────────┘  └─────────────────────┘               │
│                                                                   │
│ ┌─────────────────────┐  ┌─────────────────────┐               │
│ │      PARTY          │  │      CASUAL         │               │
│ │   (Image: large)    │  │   (Image: large)    │               │
│ │ "Dinners, Events"   │  │ "Everyday Wear"     │               │
│ │ [EXPLORE]           │  │ [EXPLORE]           │               │
│ └─────────────────────┘  └─────────────────────┘               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  TRUST & ASSURANCE SECTION                                       │
├─────────────────────────────────────────────────────────────────┤
│  ✓ 100% Original Brands   ✓ Easy Returns   ✓ COD Available     │
│  ✓ Secure Payment         ✓ Free Shipping  ✓ Quality Checked   │
│                                                                   │
│  (6 Trust badges with icons and 1-line copy)                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  CUSTOMER TESTIMONIALS CAROUSEL                                  │
├─────────────────────────────────────────────────────────────────┤
│ "What Customers Say" - 3 rotating testimonials                 │
│                                                                   │
│ ⭐⭐⭐⭐⭐ "Perfect fit! Authentic Khaadi, fast delivery"       │
│ — Aisha, Karachi                                               │
│                                                                   │
│ ⭐⭐⭐⭐⭐ "Luxury collection exceeded expectations"            │
│ — Fatima, Lahore                                               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  WHATSAPP QUICK ORDER BUTTON (STICKY ON MOBILE)                │
├─────────────────────────────────────────────────────────────────┤
│            📱 WhatsApp: Chat for Quick Orders                   │
│      "Ask for recommendations, place bulk orders"               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  NEWSLETTER SIGNUP SECTION                                       │
├─────────────────────────────────────────────────────────────────┤
│ Heading: "Get Exclusive Deals & New Collection Updates"        │
│ Subheading: "Subscribe to our newsletter"                      │
│                                                                   │
│ [Email Input Field] [Subscribe Button]                          │
│                                                                   │
│ Incentive: "Enjoy 10% off your first order"                    │
│ Checkbox: "I agree to receive promotional emails"              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  FOOTER SECTION                                                  │
├─────────────────────────────────────────────────────────────────┤
│ Column 1: About | Contact | Blog | FAQs | Size Chart           │
│ Column 2: Shipping Policy | Returns | Privacy | Terms          │
│ Column 3: Social Media Icons | Download App                    │
│ Column 4: Payment Methods | Trust Badges                       │
│                                                                   │
│ Copyright © 2026 AL Imran Fabrics. All rights reserved.        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1.2 Section-by-Section Strategy & Conversion Logic

### Announcement Bar
**Purpose:** Communicate key benefits immediately
```
Free Shipping on orders above PKR 3,000 | Easy Returns within 14 days | COD Available Nationwide
```
**Conversion Impact:**
- Builds trust immediately
- Removes purchase friction (no shipping cost concerns)
- Reassures about payment method flexibility

---

### Sticky Header / Navigation
**Design:**
- Logo on left (clickable to homepage)
- Search bar (center-left) with autocomplete
- Cart icon (right) - shows item count
- Wishlist icon (right)
- Account/Login icon (right)

**Mega Menu Example (Hover on "Stitched"):**
```
├─ By Type
│  ├─ Stitched Suits (Kameez + Trouser)
│  ├─ Stitched Dresses
│  ├─ Ready-to-Wear Sets
│
├─ By Occasion
│  ├─ Casual Stitched
│  ├─ Formal Stitched
│  ├─ Festive Stitched
│  └─ Party Wear Stitched
│
├─ By Brand
│  ├─ Khaadi
│  ├─ Gul Ahmed
│  ├─ Gull G
│  └─ View All Brands
│
└─ Quick Links
   ├─ New Arrivals
   └─ Best Sellers
```

**Conversion Logic:**
- Sticky positioning keeps navigation accessible during scroll
- Mega menu reduces clicks to reach products
- Search bar prominent for quick product discovery
- Cart visibility encourages impulse additions

---

### Hero Banner Section
**Size:** 1920x600px (desktop), 375x500px (mobile)
**Content:** Seasonal campaign rotator (3-5 slides, 5-second auto-rotate)

**Sample Banners:**
1. "Eid Collection 2026 - Premium Luxury Suits"
   - Image: Model in festive wear
   - CTA: "Shop Now" (primary), "Explore" (secondary)
   - Urgency: "Limited quantities"

2. "New Khaadi & Ethnic Collection"
   - Image: Latest designer pieces
   - CTA: "View Collection"

3. "Flash Sale - Up to 50% Off Selected Brands"
   - Image: Discount-focused
   - CTA: "Shop Sale"

**Conversion Logic:**
- First impression matters - hero banner sets brand perception
- Seasonal relevance keeps content fresh
- Clear CTAs guide user action
- Auto-rotation showcases multiple collections without scrolling

---

### Shop by Category Section
**Layout:** 8 category cards (4x2 on desktop, 2 columns on tablet, 1 on mobile)

**Card Design:**
```
┌─────────────────────────────┐
│   [Category Image]          │
│   ─────────────────────────  │
│   Category Name             │
│   "X products available"    │
│   [EXPLORE CATEGORY →]      │
└─────────────────────────────┘
```

**Categories & Images:**
1. **Stitched** - Model in stitched suit
2. **Unstitched** - Display of fabrics/pieces
3. **2-Piece** - 2-piece ensemble on mannequin
4. **3-Piece** - 3-piece full suit display
5. **Formal Wear** - Corporate/office look
6. **Luxury Collection** - High-end designer pieces
7. **Party Wear** - Evening/festive collection
8. **Sale** - Discount tag prominent

**Conversion Logic:**
- Visual categorization reduces decision paralysis
- Product counts indicate selection size
- Each category narrows user intent
- Clear CTAs drive immediate navigation

---

### Shop by Brand Section
**Layout:** Logo carousel (6-8 visible, swipeable)

**Brands Order:**
- Premium first: J., BAROQUE, Khaadi, Gul Ahmed
- Mid-tier: Ethnic, Saya, ALKARAM, Zellbury
- Value: Bonanza, MTJ, SOHAYE, Bin Saeed

**Design:**
- Brand logos on white background (center)
- Equal size and spacing (brand hierarchy through order, not size)
- Left/Right arrows for carousel navigation
- Click on logo → filtered products by that brand

**Conversion Logic:**
- Brand trust is huge in Pakistani fashion
- Logo recognition builds confidence
- Carousel keeps section compact (doesn't dominate)
- Allows exploration by brand preference

---

### New Arrivals Section
**Purpose:** Showcase latest inventory weekly

**Layout:** 4-column grid (8 products shown)

**Product Card Design:**
```
┌─────────────────────────┐
│   [Product Image]       │
│   [NEW badge] (top-left)│
│   ───────────────────── │
│   Brand Name (small)    │
│   Product Title         │
│   Price (bold)          │
│   ⭐4.5/5 (12 reviews)  │
│   ───────────────────── │
│   [♡ Wishlist] [Add →] │
└─────────────────────────┘
```

**Conversion Logic:**
- Novelty effect drives impulse purchases
- Pricing visible immediately
- Rating badges build trust
- Wishlist option captures undecided customers
- "View All" link extends engagement

---

### Best Sellers Section
**Purpose:** Show social proof and popularity

**Product Cards:**
- Same as New Arrivals but with "BESTSELLER" badge instead of "NEW"
- Display actual sales count: "Sold 432 times"

**Conversion Logic:**
- FOMO (Fear of Missing Out) from bestseller status
- Sales count validates product quality
- Popular products easier to recommend to friends
- Repeat purchase encouragement

---

### Luxury Collection Highlight Banner
**Size:** Full-width (1920x400px)
**Design:** Two-column layout

**Left Column (60%):**
- Hero image of luxury collection
- "LUXURY EDIT" badge (gold/premium color)
- "Handpicked designer pieces"

**Right Column (40%):**
- Headline: "Luxury Edit - Exclusive Collections"
- Subheading: "Curated pieces from premium brands"
- Price range: "Starting from PKR 15,000"
- Description: "Premium fabrics, meticulous craftsmanship, timeless designs"
- CTA: "EXPLORE LUXURY COLLECTION" (button, gold color)

**Conversion Logic:**
- Premium visual treatment attracts high-value customers
- Price transparency sets expectations
- Exclusive language builds aspirational appeal
- Separates luxury seekers from budget shoppers

---

### Occasion-Based Collections
**Layout:** 4 tiles (2x2 on desktop, 1 column on mobile)

**Tiles:**
```
┌──────────────────────────────┐
│   [Occasion Image - large]   │
│   ─────────────────────────  │
│   Occasion Name (bold)       │
│   "Relevant sub-occasions"   │
│   [EXPLORE COLLECTION →]     │
└──────────────────────────────┘
```

**4 Occasions:**
1. **FESTIVE** - Eid, Wedding, Religious events
2. **FORMAL** - Office, Corporate, Business
3. **PARTY** - Dinners, Events, Celebrations
4. **CASUAL** - Everyday wear, Comfortable

**Conversion Logic:**
- Occasions drive purchase intent
- Helps users contextualize purchases
- Reduces browsing time (pre-filtered by use-case)
- Appeals to gift-givers (buying for occasion, not style preference)

---

### Trust & Assurance Section
**6 Trust Pillars (icons + text):**

```
✓ 100% Original Brands
  "Authentic products from official brand partners"

✓ Easy Returns (14 Days)
  "No questions asked return policy"

✓ COD Available
  "Pay on delivery - nationwide coverage"

✓ Secure Payment
  "SSL encrypted, PCI-DSS compliant"

✓ Free Shipping
  "On orders above PKR 3,000"

✓ Quality Checked
  "Every item inspected before dispatch"
```

**Conversion Logic:**
- Directly addresses purchase objections
- Repeated messaging reinforces trust
- Specific details (14 days, PKR 3,000) build credibility
- Removes risk from online purchase

---

### WhatsApp Quick Order Button
**Mobile:** Sticky bottom-right corner (WhatsApp icon)
**Desktop:** Chat widget or banner

**On Click → WhatsApp Opens with Preset Message:**
```
"Hi AL Imran Fabrics! 👋

I'd like to:
□ Get a product recommendation
□ Place a bulk order
□ Ask about sizing
□ Check availability

What can I help you with?"
```

**Conversion Logic:**
- Reduces friction for customers uncertain about online shopping
- Appeals to WhatsApp-native Pakistani users
- Captures customers about to abandon
- Personal touch builds relationship
- Bulk order inquiry channel

---

### Newsletter Section
**Design:** Two-column (image on left, form on right)

**Copy:**
- Headline: "Get Exclusive Deals & New Arrivals First"
- Subheading: "Join 50,000+ fashion lovers in Pakistan"
- Form: [Email input] + [Subscribe button]
- Incentive: "Enjoy 10% off your first order"
- Checkbox: "I'd like to receive emails about exclusive deals"

**Conversion Logic:**
- Email list = owned marketing channel
- Discount code drives immediate conversion
- Opt-in compliance (checkbox)
- Privacy assured ("exclusive deals" language)

---

### Footer
**4-Column Layout:**

**Column 1: About**
- About AL Imran
- Contact Us
- Blog / Size Guide
- FAQs

**Column 2: Policies**
- Shipping Policy
- Returns & Exchanges
- Privacy Policy
- Terms of Service

**Column 3: Social & App**
- Instagram, Facebook, Pinterest icons
- "Download Our App" badges
- QR code to app

**Column 4: Payment & Security**
- Payment method icons (Card, JazzCash, Easypaisa, COD)
- Trust badges (SSL, PCI-DSS)
- Business registration info

**Conversion Logic:**
- Comprehensive footer builds trust
- Policies accessible (legal compliance)
- Social proof through app download incentive
- Payment icons reassure security

---

## 1.3 Conversion Optimization Tactics

| Section | Tactic | Expected Impact |
|---------|--------|-----------------|
| **Hero Banner** | Seasonal urgency + clear CTA | 5-8% click-through |
| **Categories** | Visual + text + product count | 12-15% category entry |
| **New/Best Sellers** | Algorithmic social proof | 8-10% product views |
| **Trust Badges** | Repeated messaging | 3-5% reduced cart abandonment |
| **Newsletter** | Discount incentive | 8-12% email list growth |
| **WhatsApp Button** | Mobile friction reduction | 2-4% support conversations |

---

# PART 2 — PRODUCT DETAIL PAGES

## 2.1 Stitched Product Page Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│ [Back to Category] | Brand Badge | Save to Wishlist ♡           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     PRODUCT DETAIL PAGE                           │
├────────────────────────────────┬────────────────────────────────┤
│      LEFT SECTION (60%)        │   RIGHT SECTION (40%)          │
├────────────────────────────────┤────────────────────────────────┤
│                                │                                │
│  [Primary Product Image]       │  Brand: Khaadi                │
│  (600x800 px)                  │  Product: Stitched Suit       │
│                                │  (Kameez + Trouser)           │
│  Zoom on hover                 │                                │
│  ─────────────────────         │  ⭐⭐⭐⭐⭐ 4.5/5           │
│                                │  (127 reviews)                │
│  Thumbnail Gallery:            │  ─────────────────────        │
│  [Thumb1] [Thumb2] [Thumb3]   │                                │
│  [Thumb4] [Thumb5] ...        │  Price:                       │
│                                │  PKR 12,500                   │
│  360° View (if available)      │  [Save PKR 2,500]             │
│  ────────────────────────      │  Original: PKR 15,000         │
│                                │  ─────────────────────        │
│                                │                                │
│                                │  [SIZE SELECTOR]              │
│                                │  ┌─────────────────────────┐  │
│                                │  │ Select Your Size        │  │
│                                │  │ □ XS □ S □ M           │  │
│                                │  │ □ L  □ XL □ XXL        │  │
│                                │  │ [SIZE CHART LINK]       │  │
│                                │  └─────────────────────────┘  │
│                                │                                │
│                                │  [COLOR VARIANTS]             │
│                                │  Available Colors:            │
│                                │  [● Navy] [● Red] [● Green]  │
│                                │  [● Cream] [● Black]          │
│                                │  ─────────────────────        │
│                                │                                │
│                                │  Quantity: [ 1 ] [+ / -]      │
│                                │  ─────────────────────        │
│                                │                                │
│                                │  [ADD TO CART] (Green/Bold)   │
│                                │  [BUY NOW] (Secondary)        │
│                                │  ─────────────────────        │
│                                │                                │
│                                │  📦 Free Shipping             │
│                                │     (Orders above PKR 3,000)  │
│                                │                                │
│                                │  🔄 Easy Returns              │
│                                │     (14-day money-back)       │
│                                │                                │
│                                │  ✓ COD Available              │
│                                │     (Pay on delivery)         │
│                                │  ─────────────────────        │
│                                │                                │
│                                │  Estimated Delivery:          │
│                                │  📅 3-5 Business Days         │
│                                │                                │
└────────────────────────────────┴────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  TAB SECTION - PRODUCT INFORMATION                               │
├─────────────────────────────────────────────────────────────────┤
│ [Description] [Fabric Details] [Care] [Reviews] [Shipping]     │
│                                                                   │
│ DESCRIPTION TAB:                                                │
│ ─────────────────────────────────────────────────────────────  │
│ This stitched suit by Khaadi features premium cotton with      │
│ traditional embroidery. The ensemble includes:                  │
│ • Kameez (tunic top)                                            │
│ • Trouser                                                        │
│ • Matching dupatta (optional)                                   │
│                                                                   │
│ Perfect for weddings, festivals, and formal occasions.         │
│ Each piece is meticulously stitched by skilled artisans.       │
│                                                                   │
│ [More Details...]                                              │
│                                                                   │
│ FABRIC DETAILS TAB:                                            │
│ ─────────────────────────────────────────────────────────────  │
│ Material: 100% Cotton Cambric                                   │
│ Thread Count: 60x60                                             │
│ Weight: 150 GSM                                                 │
│ Embroidery: Hand embroidered borders                           │
│ Finish: Digitally printed with embroidery accents             │
│ Occasion: Formal, Wedding, Festive                            │
│                                                                   │
│ CARE INSTRUCTIONS TAB:                                         │
│ ─────────────────────────────────────────────────────────────  │
│ 🧼 Wash in cold water with similar colors                     │
│ 🚫 Do not bleach                                               │
│ 🔥 Iron on medium heat                                         │
│ ☀️  Avoid direct sun for drying (preserves color)             │
│ 🧴 Use mild detergent                                          │
│                                                                   │
│ REVIEWS TAB:                                                   │
│ ─────────────────────────────────────────────────────────────  │
│ ⭐⭐⭐⭐⭐ "Perfect fit, beautiful design"                      │
│ — Aisha, Karachi (Verified Purchase)                           │
│                                                                   │
│ ⭐⭐⭐⭐ "Great quality, took 5 days to deliver"               │
│ — Fatima, Lahore (Verified Purchase)                           │
│                                                                   │
│ [View All Reviews...]                                          │
│ [Write a Review]                                               │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  RELATED PRODUCTS SECTION                                        │
├─────────────────────────────────────────────────────────────────┤
│ "Customers Also Viewed" / "Similar Collections"                │
│                                                                   │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                             │
│ │Image │ │Image │ │Image │ │Image │                             │
│ │Brand │ │Brand │ │Brand │ │Brand │                             │
│ │Name  │ │Name  │ │Name  │ │Name  │                             │
│ │Price │ │Price │ │Price │ │Price │                             │
│ │Rating│ │Rating│ │Rating│ │Rating│                             │
│ └──────┘ └──────┘ └──────┘ └──────┘                             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  CUSTOMER REVIEWS SECTION                                        │
├─────────────────────────────────────────────────────────────────┤
│ Average Rating: 4.5 / 5  (127 reviews)                         │
│                                                                   │
│ Rating Distribution:                                            │
│ ⭐⭐⭐⭐⭐ 60% (76 reviews)  [████████████████ 60%]           │
│ ⭐⭐⭐⭐  25% (32 reviews)   [████████ 25%]                  │
│ ⭐⭐⭐   10% (13 reviews)    [███ 10%]                       │
│ ⭐⭐     3% (4 reviews)      [█ 3%]                          │
│ ⭐      2% (2 reviews)       [█ 2%]                          │
│                                                                   │
│ Sort by: Most Helpful | Most Recent | Highest Rated           │
│ Filter: ⭐ All Reviews  ⭐⭐⭐⭐⭐ Highest                   │
│                                                                   │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ ⭐⭐⭐⭐⭐ "Perfect Eid outfit!"                            │  │
│ │                                                          │  │
│ │ "Arrived on time, stitching is impeccable. My daughter  │  │
│ │ looked stunning in this suit for Eid. Highly           │  │
│ │ recommended!"                                           │  │
│ │                                                          │  │
│ │ — Fatima Khan, Karachi  (Verified Purchase - 2 weeks ago) │  │
│ │ Helpful? [👍 24]  [👎 0]                                │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│ ┌──────────────────────────────────────────────────────────┐  │
│ │ ⭐⭐⭐⭐ "Good quality, slightly loose fit"              │  │
│ │                                                          │  │
│ │ "The suit is beautiful and authentic Khaadi. The       │  │
│ │ stitching is neat. However, it ran a bit loose around  │  │
│ │ the bust. Check the size chart carefully."             │  │
│ │                                                          │  │
│ │ — Aisha Malik, Lahore  (Verified Purchase - 1 month ago) │  │
│ │ Helpful? [👍 8]  [👎 1]                                 │  │
│ └──────────────────────────────────────────────────────────┘  │
│                                                                   │
│ [Write Your Review]                                            │
│ [View All 127 Reviews]                                         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2.2 Stitched Product Page - UX Logic

### Size Selector Strategy
**Problem:** Pakistani sizing varies by brand
**Solution:**
- Size chart modal (detailed measurements)
- Visual fit guide ("This runs small" vs "True to size")
- Size recommendation based on height/weight
- Easy exchange for size mismatch (free return/reship)

### Price & Discount Strategy
- Original price crossed out (MSRP)
- Discount percentage highlighted (psychology: saves amount)
- "Save PKR X" language (loss aversion)
- No hidden charges message

### Color Variants
- Show 4-5 color options as swatches
- Click swatch → Image updates + stock status shows
- "Only 2 left in Navy" → Urgency

### Trust Signals
- Shipping cost clarity (free above threshold)
- Delivery timeline (3-5 days)
- Easy returns (14 days, no questions)
- COD availability
- Verified purchase badges on reviews

### Call-to-Action Buttons
- **Add to Cart:** Secondary action (encourages browsing)
- **Buy Now:** Primary action (checkout directly)
- Wishlist: Captures indecisive customers

---

## 2.3 Unstitched Suit Page Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│ [Back to Category] | Brand Badge | Save to Wishlist ♡           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                  UNSTITCHED SUIT DETAIL PAGE                     │
├────────────────────────────────┬────────────────────────────────┤
│      LEFT SECTION (60%)        │   RIGHT SECTION (40%)          │
├────────────────────────────────┤────────────────────────────────┤
│                                │                                │
│  [Primary Fabric Image]        │  Brand: Gul Ahmed              │
│  (600x800 px)                  │  Unstitched Suit Collection   │
│  Close-up of texture/pattern   │  (3-Piece)                     │
│                                │                                │
│  Zoom on hover                 │  ⭐⭐⭐⭐⭐ 4.7/5           │
│  ─────────────────────         │  (89 reviews)                 │
│                                │  ─────────────────────        │
│  Thumbnail Gallery:            │                                │
│  [Thumb1] [Thumb2] [Thumb3]   │  Price:                       │
│  [Thumb4] [Thumb5] ...        │  PKR 8,500                    │
│                                │  Original: PKR 11,000         │
│  Color Palette Swatches:       │  ─────────────────────        │
│  ────────────────────────      │                               │
│  (If available in other colors)│  [OCCASION BADGE]             │
│                                │  🎉 Festive / Wedding         │
│                                │  ─────────────────────        │
│                                │                                │
│                                │  [PIECE BREAKDOWN]            │
│                                │  ┌─────────────────────────┐  │
│                                │  │ What's Included:        │  │
│                                │  │                         │  │
│                                │  │ 📦 Kameez (3.5 yards)  │  │
│                                │  │    - Front + Back       │  │
│                                │  │    - Sleeves            │  │
│                                │  │                         │  │
│                                │  │ 📦 Trouser (2 yards)   │  │
│                                │  │    - Full length piece  │  │
│                                │  │                         │  │
│                                │  │ 📦 Dupatta (2.5 yards) │  │
│                                │  │    - Embroidered border │  │
│                                │  │                         │  │
│                                │  └─────────────────────────┘  │
│                                │  ─────────────────────        │
│                                │                                │
│                                │  [FABRIC DETAILS]             │
│                                │  Material: Unstitched         │
│                                │  Type: Cotton Cambric         │
│                                │  Total Length: ~8 yards       │
│                                │  Width: 60 inches             │
│                                │  ─────────────────────        │
│                                │                                │
│                                │  Quantity: [1] [+ / -]        │
│                                │  ─────────────────────        │
│                                │                                │
│                                │  [ADD TO CART]                │
│                                │  [BUY NOW]                    │
│                                │  ─────────────────────        │
│                                │                                │
│                                │  📦 Free Shipping             │
│                                │  🔄 Easy Returns              │
│                                │  ✓ COD Available              │
│                                │  ─────────────────────        │
│                                │                                │
│                                │  Estimated Delivery:          │
│                                │  📅 3-5 Business Days         │
│                                │                                │
└────────────────────────────────┴────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  TAB SECTION - FABRIC & STITCHING INFORMATION                    │
├─────────────────────────────────────────────────────────────────┤
│ [Details] [Fabric Specs] [Care] [Stitching Tips] [Reviews]     │
│                                                                   │
│ DETAILS TAB:                                                    │
│ ─────────────────────────────────────────────────────────────  │
│ This 3-piece unstitched suit by Gul Ahmed features premium     │
│ cotton with intricate embroidery. The collection includes:     │
│ • Kameez (3.5 yards)                                            │
│ • Trouser (2 yards)                                             │
│ • Dupatta with embroidered border (2.5 yards)                 │
│                                                                   │
│ Each piece is cut and ready for stitching. Perfect for         │
│ customizing fit and style with your tailor!                    │
│                                                                   │
│ STITCHING TIPS TAB:                                            │
│ ─────────────────────────────────────────────────────────────  │
│ 💡 Recommended Styles:                                         │
│    • Straight cut kameez (modern look)                         │
│    • A-line kameez (flattering for all body types)           │
│    • Sharara-style trouser (festive occasion)                 │
│    • Straight trouser (formal look)                           │
│                                                                   │
│ 🪡 Stitching Suggestions:                                      │
│    • Lining: Light cotton lining recommended for kameez       │
│    • Sleeve style: Full sleeves or 3/4 length                 │
│    • Neckline: V-neck, round neck, or boat neck               │
│    • Dupatta: Can be worn as scarf or paired dupatta          │
│                                                                   │
│ 👗 Budget-Friendly Tips:                                       │
│    • Ask tailor for design suggestions                         │
│    • Spare fabric can be used for matching accents            │
│    • Pre-shrink fabric before cutting                         │
│                                                                   │
│ FABRIC SPECS TAB:                                              │
│ ─────────────────────────────────────────────────────────────  │
│ Material: 100% Cotton Cambric                                   │
│ Print Type: Digital Print with Hand Embroidery                │
│ Weight: 140 GSM                                                 │
│ Width: 60 inches (standard)                                    │
│ Total Yardage: ~8 yards                                        │
│ Color: Available in 5 variants                                 │
│                                                                   │
│ CARE INSTRUCTIONS TAB:                                         │
│ ─────────────────────────────────────────────────────────────  │
│ 🧼 Wash in lukewarm water (pre-shrink before cutting)        │
│ 🚫 Do not bleach or use harsh chemicals                       │
│ 🔥 Iron on medium heat (especially on embroidery)            │
│ ☀️  Air dry in shade (preserves color)                        │
│ 🧴 Use mild detergent                                          │
│                                                                   │
│ REVIEWS TAB:                                                   │
│ ─────────────────────────────────────────────────────────────  │
│ ⭐⭐⭐⭐⭐ "Beautiful design, perfect unstitched set"          │
│ — Hira, Islamabad (Verified Purchase)                         │
│                                                                   │
│ ⭐⭐⭐⭐⭐ "My tailor loved the quality of this fabric"       │
│ — Mirza, Lahore (Verified Purchase)                           │
│                                                                   │
│ [View All Reviews...]                                          │
│ [Write a Review]                                               │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  RELATED PRODUCTS SECTION                                        │
├─────────────────────────────────────────────────────────────────┤
│ "Complementary Items" / "Same Brand Collections"               │
│                                                                   │
│ [Suggestion: Matching embroidered borders, lining fabric, etc.]│
│                                                                   │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                             │
│ │Image │ │Image │ │Image │ │Image │                             │
│ │Brand │ │Brand │ │Brand │ │Brand │                             │
│ │Name  │ │Name  │ │Name  │ │Name  │                             │
│ │Price │ │Price │ │Price │ │Price │                             │
│ │Rating│ │Rating│ │Rating│ │Rating│                             │
│ └──────┘ └──────┘ └──────┘ └──────┘                             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  CUSTOMER REVIEWS SECTION (Same as Stitched)                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2.4 Unstitched Product Page - UX Differences

### Key Differences from Stitched Products

| Aspect | Stitched | Unstitched |
|--------|----------|-----------|
| **Images** | Finished suit on model | Fabric close-up + layout |
| **Piece Breakdown** | Not necessary | Essential (yardage per piece) |
| **Size Selector** | Sizes (S, M, L) | Total yardage + width |
| **Fit Concerns** | Model fit guide | Tailor fit guidance |
| **Care Instructions** | Post-stitched care | Pre-stitching (pre-shrinking) |
| **Stitching Tips** | Review mentions | Dedicated tab |
| **Related Products** | Similar stitched suits | Complementary fabrics, embellishments |
| **Occasion** | Specific occasion badge | Occasion suitability |

### Piece Breakdown Section
**Critical for unstitched products:**
```
📦 Kameez (3.5 yards)
   - Front bodice + back
   - Sleeves (separate)
   - Pre-cut pieces ready for sewing

📦 Trouser (2 yards)
   - Full length trouser piece
   - Cut to standard width

📦 Dupatta (2.5 yards)
   - Embroidered border (if included)
   - Ready to drape or stitch as scarf
```

### Stitching Tips Tab
**Educational content for DIY sewers:**
- Recommended designs (straight, A-line, etc.)
- Sleeve options (full, 3/4, cap)
- Neckline suggestions
- Lining requirements
- Video tutorials (embedded YouTube)
- Tailor recommendations (budget tips)

---

# PART 3 — CATEGORY & FILTER ARCHITECTURE

## 3.1 Category Hierarchy

```
Root Level (Main Categories)
├── Stitched
│   ├── Stitched Suits (Kameez + Trouser)
│   │   ├── By Occasion
│   │   │   ├── Casual Stitched
│   │   │   ├── Formal Stitched
│   │   │   ├── Festive Stitched
│   │   │   └── Party Stitched
│   │   ├── By Type
│   │   │   ├── 2-Piece (Kameez + Trouser)
│   │   │   ├── 3-Piece (Kameez + Trouser + Dupatta)
│   │   │   └── With Dupatta
│   │   ├── By Brand
│   │   │   └── (All 13 brands)
│   │   └── By Price Range
│   │       └── (PKR 5,000 - 30,000+)
│   │
│   ├── Stitched Dresses
│   │   ├── By Occasion
│   │   ├── By Style (A-line, Straight, etc.)
│   │   └── By Brand
│   │
│   ├── Ready-to-Wear Sets
│   │   ├── Coordinated sets
│   │   └── Pre-paired outfits
│   │
│   └── Stitched Accessories
│       ├── Matching dupattas
│       ├── Belts & accents
│       └── Shoes/footwear
│
├── Unstitched
│   ├── Unstitched Suits
│   │   ├── 3-Piece Unstitched
│   │   │   ├── Kameez + Trouser + Dupatta
│   │   │   ├── By Occasion
│   │   │   ├── By Brand
│   │   │   └── By Price
│   │   │
│   │   ├── 2-Piece Unstitched
│   │   │   ├── Kameez + Trouser
│   │   │   └── (Same filters)
│   │   │
│   │   └── Single Piece Unstitched
│   │       ├── Kameez only
│   │       ├── Trouser only
│   │       └── Dupatta only
│   │
│   ├── Unstitched Dupattas
│   │   ├── Embroidered
│   │   ├── Printed
│   │   └── Plain
│   │
│   └── Unstitched Fabrics (if offered)
│       ├── By brand/collection
│       └── Complementary pieces
│
├── Formal Wear
│   ├── Corporate Suits
│   ├── Office Appropriate
│   ├── Business Casual
│   └── Formal Evening
│
├── Luxury Collection
│   ├── Premium Designer Pieces
│   ├── Limited Edition
│   ├── High-End Brands
│   └── By Brand (premium tier)
│
├── Party & Festive
│   ├── Wedding Collection
│   ├── Eid Collection
│   ├── Engagement Wear
│   ├── Evening Wear
│   └── Seasonal Collections
│
└── Sale
    ├── Clearance
    ├── Seasonal Sale
    ├── Brand-Specific Sale
    ├── Price Tiers
    │   ├── Under PKR 5,000
    │   ├── PKR 5,000 - 10,000
    │   ├── PKR 10,000 - 15,000
    │   └── PKR 15,000+
    └── By Discount %
```

---

## 3.2 Filter Taxonomy

### Filter 1: Brand
**Type:** Multi-select checkbox
**Options:**
- J. (1)
- Khaadi (47)
- Gul Ahmed (23)
- Ethnic (18)
- Saya (15)
- BAROQUE (22)
- ALKARAM (19)
- SOHAYE (9)
- Bonanza (12)
- MTJ (8)
- Zellbury (14)
- Gull G (6)
- Bin Saeed (7)
- Mizaaj (5)

**UI:** Checkboxes with product count
**Default:** Show all brands
**Impact:** Reduces products by ~60-70%

---

### Filter 2: Price Range
**Type:** Slider (dual-handle)
**Min:** PKR 2,500
**Max:** PKR 50,000
**Default Range:** PKR 2,500 - 50,000
**Intervals:** PKR 500 steps
**Display:** "Price: PKR 5,000 - PKR 20,000"
**Impact:** Reduces products by ~40-50%

---

### Filter 3: Occasion
**Type:** Multi-select checkbox
**Options:**
- Casual (everyday wear)
- Formal (office, corporate)
- Festive (Eid, holidays, cultural events)
- Party (dinners, celebrations)
- Wedding (bridal, wedding guest)
- Luxury (premium, special occasions)

**UI:** Large radio buttons with description
**Default:** Show all occasions
**Impact:** High intent filter - reduces by ~50%

---

### Filter 4: Product Type
**Type:** Radio buttons (mutually exclusive for stitched/unstitched)
**Options:**
- Stitched (ready-to-wear)
- Unstitched (ready-to-stitch)
- Both (show all)

**UI:** Toggle-style buttons
**Default:** Show both
**Impact:** Reduces by ~50%

---

### Filter 5: Piece Type
**Type:** Multi-select checkbox
**Options:**
- 2-Piece (Kameez + Trouser)
- 3-Piece (Kameez + Trouser + Dupatta)
- With Dupatta
- Without Dupatta
- Single Piece (for unstitched individual pieces)

**UI:** Checkboxes
**Default:** Show all
**Impact:** Reduces by ~30-40%

---

### Filter 6: Size (Stitched Only)
**Type:** Multi-select checkbox
**Options:**
- XS (Extra Small)
- S (Small)
- M (Medium)
- L (Large)
- XL (Extra Large)
- XXL (Double Extra Large)

**UI:** Button-style grid (visual toggle)
**Default:** Show all sizes
**Conditional:** Only visible when "Stitched" selected
**Impact:** Reduces by ~20-30%

---

### Filter 7: Color
**Type:** Visual color swatches (multi-select)
**Options:** (Dynamic - based on in-stock items)
- Navy
- Black
- White
- Cream
- Red
- Green
- Pink
- Purple
- Orange
- Brown
- Gray
- Multicolor

**UI:** Color swatches (square 30px) with names on hover
**Default:** Show all colors
**Stock Awareness:** Shows count (e.g., "Navy (12)")
**Impact:** Reduces by ~15-25%

---

### Filter 8: Discount Percentage
**Type:** Slider + preset buttons
**Presets:**
- All Products
- 10% - 25% Off
- 25% - 40% Off
- 40%+ Off
- 50%+ Off (clearance)

**UI:** Buttons for presets, slider for custom range
**Default:** Show all discounts
**Impact:** Reduces by ~30-40%

---

### Filter 9: Collection/Seasonal
**Type:** Multi-select checkbox
**Options:** (Dynamic - seasonal)
- New Arrivals (Last 30 days)
- Bestsellers (Top 100 by sales)
- Limited Edition (Exclusive)
- Clearance (Final sale)
- Eid Collection 2026
- Summer Collection
- Wedding Season

**UI:** Checkboxes
**Default:** Show all
**Impact:** Reduces by ~20-30%

---

## 3.3 Filter Application Logic

### Filter Order (Recommended)
**Mobile-First Approach:**
1. **Type** (Stitched vs Unstitched) - Biggest decision
2. **Occasion** - Use case clarity
3. **Brand** - Customer loyalty/preference
4. **Piece Type** - 2-piece vs 3-piece
5. **Price** - Budget alignment
6. **Size** (if stitched) - Availability
7. **Color** - Aesthetic preference
8. **Discount** - Deal hunters
9. **Collection** - Trending/seasonal

### Mobile vs Desktop

**Desktop:**
- Sidebar filters (left column)
- All filters visible
- Collapse/expand sections
- Easy multi-select

**Mobile:**
- Sticky "Filters" button (bottom/top)
- Slide-out panel from bottom
- One filter at a time visible
- "Apply Filters" button at bottom
- Filter count badge (e.g., "Filters (3)")

---

## 3.4 Conversion Impact by Filter

| Filter | Usage Rate | Conversion Impact | Typical Reduction |
|--------|-----------|------------------|------------------|
| **Type** (Stitched/Unstitched) | 85% | Very High | 50% |
| **Occasion** | 60% | High | 50% |
| **Brand** | 45% | Medium | 60-70% |
| **Piece Type** | 40% | Medium | 30-40% |
| **Price Range** | 70% | High | 40-50% |
| **Size** | 35% | High | 20-30% |
| **Color** | 50% | Medium | 15-25% |
| **Discount %** | 25% | Medium | 30-40% |
| **Collection** | 30% | Medium | 20-30% |

---

## 3.5 Smart Filter Combinations

### Recommended Filter Combinations

**Use Case 1: Wedding Guest Shopping**
```
Occasion: Wedding
Type: Stitched
Price: PKR 8,000 - 20,000
Color: Any (customizable)
→ Result: 45-65 products
```

**Use Case 2: Eid Collection Hunting**
```
Collection: Eid 2026
Type: Stitched
Piece Type: 3-Piece
→ Result: 30-50 products
```

**Use Case 3: Luxury Seekers**
```
Occasion: Luxury/Wedding
Brand: J., BAROQUE, Ethnic
Price: PKR 15,000+
→ Result: 20-35 premium pieces
```

**Use Case 4: Budget-Conscious**
```
Discount: 30%+
Type: Unstitched (typically cheaper)
Price: Under PKR 8,000
→ Result: 80-120 budget options
```

**Use Case 5: Formal Office Wear**
```
Occasion: Formal
Type: Stitched
Size: M, L (professional sizing)
Color: Navy, Black, Cream
→ Result: 35-50 office-appropriate pieces
```

---

## 3.6 Filter Persistence & User Experience

### URL Structure (for bookmarking/sharing)
```
/shop?type=stitched&occasion=wedding&brand=khaadi,gul-ahmed&price=8000-20000&size=m,l&color=navy
```

### Wishlist Integration
- "Refine by..." button near filters
- Wishlist filter: "Items in my wishlist"
- "Saved Items" quick view

### Filter Reset
- "Clear All Filters" button (visible when filters applied)
- Individual filter "X" buttons
- Reset maintains product count visibility

---

# PART 4 — PostgreSQL DATABASE SCHEMA

## 4.1 Database Design Principles

**Normalization:** Third Normal Form (3NF)
**Scalability:** Designed for 100K+ products, 1M+ orders
**Performance:** Indexed for common queries
**Integrity:** Foreign keys, constraints, audit trails

---

## 4.2 Complete Schema

```sql
-- ============================================================
-- 1. ROLES & AUTHENTICATION
-- ============================================================

CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  permissions TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (name, permissions) VALUES
  ('customer', ARRAY['browse', 'purchase', 'review']),
  ('vendor', ARRAY['manage_products', 'manage_orders', 'view_analytics']),
  ('admin', ARRAY['all']);

-- ============================================================
-- 2. USERS & ACCOUNTS
-- ============================================================

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  date_of_birth DATE,
  profile_picture_url VARCHAR(500),
  role_id UUID NOT NULL REFERENCES roles(id),
  account_status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);

-- ============================================================
-- 3. ADDRESSES
-- ============================================================

CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type ENUM('billing', 'shipping') DEFAULT 'shipping',
  full_name VARCHAR(150),
  phone VARCHAR(20),
  street_address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  province VARCHAR(100),
  postal_code VARCHAR(10),
  country VARCHAR(50) DEFAULT 'Pakistan',
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_addresses_user_id ON addresses(user_id);
CREATE INDEX idx_addresses_type ON addresses(type);

-- ============================================================
-- 4. BRANDS
-- ============================================================

CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  logo_url VARCHAR(500),
  description TEXT,
  brand_url VARCHAR(255),
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_brands_name ON brands(name);
CREATE INDEX idx_brands_slug ON brands(slug);

-- Sample brand data
INSERT INTO brands (name, slug, logo_url, display_order) VALUES
  ('Khaadi', 'khaadi', '/brands/khaadi-logo.png', 1),
  ('Gul Ahmed', 'gul-ahmed', '/brands/gul-ahmed-logo.png', 2),
  ('J.', 'j-brand', '/brands/j-logo.png', 3),
  ('Ethnic', 'ethnic', '/brands/ethnic-logo.png', 4),
  ('Saya', 'saya', '/brands/saya-logo.png', 5),
  ('BAROQUE', 'baroque', '/brands/baroque-logo.png', 6),
  ('ALKARAM', 'alkaram', '/brands/alkaram-logo.png', 7),
  ('SOHAYE', 'sohaye', '/brands/sohaye-logo.png', 8),
  ('Bonanza', 'bonanza', '/brands/bonanza-logo.png', 9),
  ('MTJ', 'mtj', '/brands/mtj-logo.png', 10),
  ('Zellbury', 'zellbury', '/brands/zellbury-logo.png', 11),
  ('Gull G', 'gull-g', '/brands/gull-g-logo.png', 12),
  ('Bin Saeed', 'bin-saeed', '/brands/bin-saeed-logo.png', 13),
  ('Mizaaj', 'mizaaj', '/brands/mizaaj-logo.png', 14);

-- ============================================================
-- 5. CATEGORIES
-- ============================================================

CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(500),
  parent_category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent ON categories(parent_category_id);

-- Sample category structure
INSERT INTO categories (name, slug, display_order) VALUES
  ('Stitched', 'stitched', 1),
  ('Unstitched', 'unstitched', 2),
  ('Formal Wear', 'formal-wear', 3),
  ('Luxury Collection', 'luxury-collection', 4),
  ('Party & Festive', 'party-festive', 5),
  ('Sale', 'sale', 6);

-- Subcategories (parent_category_id populated)
-- INSERT INTO categories (name, slug, parent_category_id, display_order) VALUES
--   ('Stitched Suits', 'stitched-suits',
--    (SELECT id FROM categories WHERE slug='stitched'), 1),
--   ('Stitched Dresses', 'stitched-dresses',
--    (SELECT id FROM categories WHERE slug='stitched'), 2),
--   ...etc

-- ============================================================
-- 6. COLLECTIONS (Seasonal / Special)
-- ============================================================

CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(500),
  banner_image_url VARCHAR(500),
  season VARCHAR(50), -- 'Spring 2026', 'Eid 2026', 'Wedding Season', etc.
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_collections_slug ON collections(slug);
CREATE INDEX idx_collections_season ON collections(season);

-- ============================================================
-- 7. PRODUCTS
-- ============================================================

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  detailed_description TEXT, -- Longer description for PDP

  -- Classification
  brand_id UUID NOT NULL REFERENCES brands(id),
  category_id UUID NOT NULL REFERENCES categories(id),
  collection_id UUID REFERENCES collections(id),

  -- Attributes
  product_type ENUM('stitched', 'unstitched') NOT NULL,
  piece_type ENUM('2-piece', '3-piece', 'single') DEFAULT '3-piece',
  occasion VARCHAR(50), -- 'casual', 'formal', 'festive', 'party', 'wedding', 'luxury'

  -- Pricing
  cost_price DECIMAL(12, 2),
  selling_price DECIMAL(12, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'PKR',
  discount_percentage INT DEFAULT 0,
  discount_price DECIMAL(12, 2), -- If different calculation needed

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

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_brand_id ON products(brand_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_collection_id ON products(collection_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_product_type ON products(product_type);
CREATE INDEX idx_products_occasion ON products(occasion);

-- ============================================================
-- 8. PRODUCT VARIANTS (Size, Color)
-- ============================================================

CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,

  -- Variant attributes (for stitched products)
  size VARCHAR(10), -- 'XS', 'S', 'M', 'L', 'XL', 'XXL'
  color VARCHAR(50),
  color_code VARCHAR(7), -- Hex color code

  -- For unstitched products (optional)
  piece_name VARCHAR(100), -- 'Kameez', 'Trouser', 'Dupatta', etc.
  yardage DECIMAL(5, 2), -- Yards/meters

  -- Variant-specific inventory
  variant_sku VARCHAR(100) UNIQUE,
  stock_quantity INT DEFAULT 0,

  -- Images
  image_url VARCHAR(500),

  -- Pricing (variant can override product price)
  variant_price DECIMAL(12, 2),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_variants_product_id ON product_variants(product_id);
CREATE INDEX idx_variants_size_color ON product_variants(size, color);
CREATE INDEX idx_variants_stock ON product_variants(stock_quantity);

-- ============================================================
-- 9. PRODUCT IMAGES
-- ============================================================

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

-- ============================================================
-- 10. PRODUCT SPECIFICATIONS (For unstitched)
-- ============================================================

CREATE TABLE product_specs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,

  -- Unstitched specs
  fabric_type VARCHAR(100), -- 'Cotton', 'Cotton Cambric', 'Silk', etc.
  fabric_weight INT, -- GSM (grams per square meter)
  thread_count VARCHAR(20), -- '60x60', '40x40', etc.
  width_inches INT,
  total_yardage DECIMAL(5, 2),

  -- Stitched specs
  size_guide_url VARCHAR(500),
  fitting_details TEXT, -- 'True to size', 'Runs small', etc.

  care_instructions TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_product_specs_product_id ON product_specs(product_id);

-- ============================================================
-- 11. PRODUCT STITCHING TIPS (For unstitched)
-- ============================================================

CREATE TABLE stitching_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,

  recommended_styles TEXT[], -- Array of style recommendations
  sleeve_options TEXT[],
  neckline_options TEXT[],
  lining_suggestion TEXT,
  tailor_notes TEXT,
  video_tutorial_url VARCHAR(500),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_stitching_tips_product_id ON stitching_tips(product_id);

-- ============================================================
-- 12. INVENTORY TRACKING
-- ============================================================

CREATE TABLE inventory_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),

  action ENUM('purchase', 'return', 'restock', 'adjustment', 'damage') NOT NULL,
  quantity_change INT NOT NULL,
  previous_quantity INT,
  new_quantity INT,

  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_inventory_logs_product_id ON inventory_logs(product_id);
CREATE INDEX idx_inventory_logs_created_at ON inventory_logs(created_at);

-- ============================================================
-- 13. COUPONS & DISCOUNTS
-- ============================================================

CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) NOT NULL UNIQUE,

  discount_type ENUM('percentage', 'fixed_amount') NOT NULL,
  discount_value DECIMAL(10, 2) NOT NULL,
  max_discount_amount DECIMAL(12, 2), -- For percentage discounts

  applicable_to ENUM('all_products', 'specific_brands', 'specific_categories', 'specific_products') DEFAULT 'all_products',
  brand_ids UUID[], -- Array of brand IDs
  category_ids UUID[], -- Array of category IDs
  product_ids UUID[], -- Array of product IDs

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

-- ============================================================
-- 14. WISHLIST
-- ============================================================

CREATE TABLE wishlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id),

  notes VARCHAR(500), -- "For sister", "Save for Eid", etc.
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(user_id, product_id, variant_id)
);

CREATE INDEX idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX idx_wishlist_product_id ON wishlist(product_id);

-- ============================================================
-- 15. ORDERS
-- ============================================================

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) NOT NULL UNIQUE, -- Format: AL-20260224-001234

  user_id UUID NOT NULL REFERENCES users(id),

  -- Addresses
  shipping_address_id UUID REFERENCES addresses(id),
  billing_address_id UUID REFERENCES addresses(id),

  -- Order details
  subtotal DECIMAL(12, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  coupon_id UUID REFERENCES coupons(id),
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

  -- Additional info
  customer_notes TEXT,
  admin_notes TEXT,

  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_order_status ON orders(order_status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- ============================================================
-- 16. ORDER ITEMS
-- ============================================================

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

  product_id UUID NOT NULL REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),

  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(12, 2) NOT NULL, -- Price at time of purchase
  subtotal DECIMAL(12, 2) NOT NULL,

  -- Captured variant details (in case product is updated)
  captured_size VARCHAR(10),
  captured_color VARCHAR(50),
  captured_sku VARCHAR(100),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- ============================================================
-- 17. REVIEWS & RATINGS
-- ============================================================

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  order_id UUID REFERENCES orders(id), -- Must be verified purchase

  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  review_text TEXT,

  verified_purchase BOOLEAN DEFAULT FALSE,

  helpful_votes INT DEFAULT 0,
  unhelpful_votes INT DEFAULT 0,

  review_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_verified ON reviews(verified_purchase);
CREATE INDEX idx_reviews_status ON reviews(review_status);

-- ============================================================
-- 18. REVIEW IMAGES
-- ============================================================

CREATE TABLE review_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_review_images_review_id ON review_images(review_id);

-- ============================================================
-- 19. BANNERS (Homepage, Seasonal)
-- ============================================================

CREATE TABLE banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(500),

  banner_type ENUM('hero', 'promotional', 'collection', 'seasonal', 'featured') DEFAULT 'hero',

  image_url VARCHAR(500),
  mobile_image_url VARCHAR(500),

  cta_text VARCHAR(50), -- Button text
  cta_link VARCHAR(500), -- Link destination

  placement VARCHAR(100), -- 'homepage_hero', 'sidebar', 'category_top', etc.

  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_banners_active ON banners(is_active);
CREATE INDEX idx_banners_placement ON banners(placement);

-- ============================================================
-- 20. BLOG POSTS
-- ============================================================

CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,

  author_id UUID REFERENCES users(id),

  excerpt TEXT,
  content TEXT,

  featured_image VARCHAR(500),

  category VARCHAR(100), -- 'stitching_tips', 'styling_guide', 'seasonal_trends', etc.
  tags TEXT[], -- Array of tags

  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,

  seo_title VARCHAR(60),
  seo_description VARCHAR(160),
  seo_keywords TEXT[],

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);

-- ============================================================
-- 21. CUSTOMER SUPPORT TICKETS
-- ============================================================

CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number VARCHAR(50) NOT NULL UNIQUE,

  user_id UUID NOT NULL REFERENCES users(id),
  order_id UUID REFERENCES orders(id),

  subject VARCHAR(255),
  description TEXT,

  category ENUM('sizing', 'quality', 'shipping', 'payment', 'returns', 'other') DEFAULT 'other',
  priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',

  status ENUM('open', 'in_progress', 'waiting_customer', 'resolved', 'closed') DEFAULT 'open',

  assigned_to UUID REFERENCES users(id),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_created_at ON support_tickets(created_at);

-- ============================================================
-- 22. SUPPORT TICKET MESSAGES
-- ============================================================

CREATE TABLE support_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,

  sender_id UUID NOT NULL REFERENCES users(id),
  message_text TEXT,

  attachment_url VARCHAR(500),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_support_messages_ticket_id ON support_messages(ticket_id);

-- ============================================================
-- 23. RETURNS & REFUNDS
-- ============================================================

CREATE TABLE returns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  return_number VARCHAR(50) NOT NULL UNIQUE,

  order_id UUID NOT NULL REFERENCES orders(id),
  order_item_id UUID NOT NULL REFERENCES order_items(id),

  user_id UUID NOT NULL REFERENCES users(id),

  reason ENUM('wrong_size', 'quality_issue', 'color_mismatch', 'changed_mind', 'damaged', 'other') NOT NULL,
  description TEXT,

  return_status ENUM('requested', 'approved', 'in_transit', 'received', 'refunded', 'rejected') DEFAULT 'requested',

  refund_amount DECIMAL(12, 2),
  refund_method ENUM('original_payment', 'store_credit', 'bank_transfer') DEFAULT 'original_payment',

  return_date TIMESTAMP,
  received_date TIMESTAMP,
  refund_date TIMESTAMP,

  tracking_number VARCHAR(100),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_returns_order_id ON returns(order_id);
CREATE INDEX idx_returns_user_id ON returns(user_id);
CREATE INDEX idx_returns_status ON returns(return_status);

-- ============================================================
-- 24. ANALYTICS - PAGE VIEWS
-- ============================================================

CREATE TABLE page_views (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),

  page_type ENUM('homepage', 'category', 'product', 'cart', 'checkout', 'other'),
  page_url VARCHAR(500),
  product_id UUID REFERENCES products(id),

  referrer VARCHAR(500),

  session_id VARCHAR(100),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_page_views_user_id ON page_views(user_id);
CREATE INDEX idx_page_views_product_id ON page_views(product_id);
CREATE INDEX idx_page_views_created_at ON page_views(created_at);

-- ============================================================
-- 25. ANALYTICS - CONVERSIONS
-- ============================================================

CREATE TABLE conversion_events (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  order_id UUID REFERENCES orders(id),

  event_type ENUM('cart_add', 'wishlist_add', 'checkout_start', 'purchase', 'review_submit') NOT NULL,
  product_id UUID REFERENCES products(id),

  event_value DECIMAL(12, 2),

  session_id VARCHAR(100),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_conversion_events_user_id ON conversion_events(user_id);
CREATE INDEX idx_conversion_events_product_id ON conversion_events(product_id);
CREATE INDEX idx_conversion_events_event_type ON conversion_events(event_type);

-- ============================================================
-- 26. NEWSLETTER SUBSCRIPTIONS
-- ============================================================

CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  user_id UUID REFERENCES users(id),

  status ENUM('subscribed', 'unsubscribed', 'bounced') DEFAULT 'subscribed',

  subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribe_date TIMESTAMP,

  frequency ENUM('daily', 'weekly', 'monthly') DEFAULT 'weekly',

  categories TEXT[], -- Interested in

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX idx_newsletter_status ON newsletter_subscriptions(status);

-- ============================================================
-- VIEWS (Helpful for queries)
-- ============================================================

-- View: Products with brand and category names
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
  p.product_type,
  p.occasion,
  p.is_bestseller,
  p.is_featured,
  p.created_at
FROM products p
LEFT JOIN brands b ON p.brand_id = b.id
LEFT JOIN categories c ON p.category_id = c.id;

-- View: Order summary with item count
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

-- View: Product reviews summary
CREATE VIEW product_reviews_summary AS
SELECT
  p.id,
  p.name,
  COUNT(r.id) AS total_reviews,
  AVG(CAST(r.rating AS DECIMAL)) AS average_rating,
  SUM(CASE WHEN r.rating = 5 THEN 1 ELSE 0 END) AS five_star_count,
  SUM(CASE WHEN r.rating = 4 THEN 1 ELSE 0 END) AS four_star_count,
  SUM(CASE WHEN r.rating = 3 THEN 1 ELSE 0 END) AS three_star_count,
  SUM(CASE WHEN r.rating = 2 THEN 1 ELSE 0 END) AS two_star_count,
  SUM(CASE WHEN r.rating = 1 THEN 1 ELSE 0 END) AS one_star_count
FROM products p
LEFT JOIN reviews r ON p.id = r.product_id AND r.review_status = 'approved'
GROUP BY p.id;

-- ============================================================
-- FUNCTION: Calculate product discount price
-- ============================================================

CREATE OR REPLACE FUNCTION calculate_discounted_price(
  selling_price DECIMAL,
  discount_percentage INT
)
RETURNS DECIMAL AS $$
BEGIN
  RETURN selling_price * (100 - discount_percentage) / 100;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ============================================================
-- FUNCTION: Update product stock status
-- ============================================================

CREATE OR REPLACE FUNCTION update_stock_status()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products
  SET stock_status = CASE
    WHEN total_stock = 0 THEN 'out_of_stock'
    WHEN total_stock <= low_stock_threshold THEN 'low_stock'
    ELSE 'in_stock'
  END,
  updated_at = CURRENT_TIMESTAMP
  WHERE id = NEW.product_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_stock_status
AFTER INSERT OR UPDATE ON inventory_logs
FOR EACH ROW
EXECUTE FUNCTION update_stock_status();

-- ============================================================
-- FUNCTION: Generate order number
-- ============================================================

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS VARCHAR AS $$
BEGIN
  RETURN 'AL-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' ||
         LPAD(NEXTVAL('order_number_seq')::TEXT, 6, '0');
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE order_number_seq START 1000;
```

---

## 4.3 Sample Queries for Common Operations

### Get Featured Products
```sql
SELECT * FROM product_view
WHERE is_featured = TRUE
AND stock_status IN ('in_stock', 'low_stock')
ORDER BY created_at DESC
LIMIT 10;
```

### Get Bestsellers by Brand
```sql
SELECT * FROM product_view
WHERE brand_name = 'Khaadi'
AND is_bestseller = TRUE
ORDER BY selling_price DESC;
```

### Filter Products by Multiple Criteria
```sql
SELECT * FROM product_view
WHERE product_type = 'stitched'
AND brand_name IN ('Khaadi', 'Gul Ahmed')
AND occasion = 'wedding'
AND discounted_price BETWEEN 5000 AND 20000
AND stock_status IN ('in_stock', 'low_stock')
ORDER BY discounted_price ASC;
```

### Get User Wishlist with Product Details
```sql
SELECT
  p.name,
  b.name AS brand,
  p.selling_price,
  p.discount_percentage,
  (p.selling_price * (100 - p.discount_percentage) / 100) AS current_price,
  pv.size,
  pv.color
FROM wishlist w
LEFT JOIN products p ON w.product_id = p.id
LEFT JOIN product_variants pv ON w.variant_id = pv.id
LEFT JOIN brands b ON p.brand_id = b.id
WHERE w.user_id = $1
ORDER BY w.added_at DESC;
```

### Get Order Details with Items
```sql
SELECT
  o.order_number,
  o.created_at,
  o.total_amount,
  o.order_status,
  oi.quantity,
  p.name AS product_name,
  b.name AS brand,
  oi.unit_price,
  oi.subtotal
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.id
LEFT JOIN brands b ON p.brand_id = b.id
WHERE o.order_number = $1;
```

### Get Product with Reviews
```sql
SELECT
  p.id,
  p.name,
  prs.average_rating,
  prs.total_reviews,
  prs.five_star_count,
  prs.four_star_count,
  r.title,
  r.review_text,
  r.rating,
  u.first_name,
  u.last_name,
  r.created_at
FROM products p
LEFT JOIN product_reviews_summary prs ON p.id = prs.id
LEFT JOIN reviews r ON p.id = r.product_id AND r.review_status = 'approved'
LEFT JOIN users u ON r.user_id = u.id
WHERE p.slug = $1
ORDER BY r.helpful_votes DESC;
```

---

## 4.4 Database Optimization Recommendations

### Indexes Summary
| Table | Index | Purpose |
|-------|-------|---------|
| products | (brand_id, category_id, status) | Category browsing |
| products | (product_type, occasion, discount_percentage) | Advanced filtering |
| product_variants | (size, color, stock_quantity) | Variant selection |
| orders | (user_id, created_at) | User order history |
| reviews | (product_id, review_status) | Product review display |
| wishlist | (user_id, product_id) | Wishlist lookup |
| inventory_logs | (product_id, created_at) | Inventory tracking |

### Performance Optimization
1. **Materialized Views** for frequently accessed aggregations
   - Best-sellers by category
   - Top-rated products
   - Seasonal collection stats

2. **Caching Strategy**
   - Cache product list pages (24 hours)
   - Cache product detail pages (12 hours)
   - Cache brand pages (48 hours)
   - Real-time: Cart, wishlist, user accounts

3. **Query Optimization**
   - Use EXPLAIN ANALYZE before deploying queries
   - Avoid SELECT * (specify needed columns)
   - Use pagination (LIMIT/OFFSET)
   - Batch operations where possible

---

## 4.5 Data Integrity & Constraints

### Key Constraints
```sql
-- Products must have brand and category
ALTER TABLE products
ADD CONSTRAINT fk_products_brand FOREIGN KEY (brand_id) REFERENCES brands(id);

ALTER TABLE products
ADD CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id);

-- Order items must reference valid order
ALTER TABLE order_items
ADD CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE;

-- Inventory logs must have valid action
ALTER TABLE inventory_logs
ADD CONSTRAINT check_inventory_action CHECK (action IN ('purchase', 'return', 'restock', 'adjustment', 'damage'));

-- Ratings must be 1-5
ALTER TABLE reviews
ADD CONSTRAINT check_rating CHECK (rating >= 1 AND rating <= 5);

-- Discount percentage 0-100
ALTER TABLE products
ADD CONSTRAINT check_discount_percentage CHECK (discount_percentage >= 0 AND discount_percentage <= 100);
```

---

## 4.6 Backup & Recovery Strategy

### Backup Schedule
- **Daily full backups** (automated)
- **Hourly incremental backups** during business hours
- **Point-in-time recovery** enabled
- **Geo-redundant storage** for disaster recovery

### Data Retention
- Transaction logs: 90 days
- Order history: 7 years (legal requirement)
- User data: Until account deletion + 30 days
- Analytics data: 2 years aggregated

---

# Conclusion & Next Steps

This comprehensive specification provides:

✅ **Professional Homepage Design** with conversion optimization
✅ **Dual Product Pages** (stitched & unstitched) with tailored UX
✅ **Smart Filter System** for advanced product discovery
✅ **Production-Ready Database** with 26 tables, proper indexing, and integrity constraints
✅ **Scalability** for 100K+ products and 1M+ orders
✅ **Query Examples** for common business operations

## For Development Team

1. **Frontend:** Build components based on wireframes (mobile-first)
2. **Backend:** Implement API routes following database schema
3. **Database:** Deploy schema in test environment, run performance tests
4. **Integration:** Connect payment gateway, shipping APIs, email service
5. **Testing:** QA testing across devices, load testing

---

**Document Version:** 1.0
**Prepared for:** AL Imran Fabrics Development Team
**Date:** February 2026
**Status:** Ready for Implementation
