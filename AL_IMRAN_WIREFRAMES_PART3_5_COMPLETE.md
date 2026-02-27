# AL Imran Fabrics - UI/UX Wireframes
## PARTS 3-5: Filtering, Cart/Checkout, Admin Dashboard

---

# PART 3 — CATEGORY & FILTERING ARCHITECTURE

## 3.1 Category Hierarchy Map

```
Root Categories
│
├── Stitched (Entire Stitched Catalog)
│   ├── Women > Stitched Suits
│   │   ├── By Occasion
│   │   │   ├── Casual Stitched
│   │   │   ├── Formal Stitched
│   │   │   ├── Festive Stitched
│   │   │   └── Party Stitched
│   │   ├── By Type (2-Piece vs 3-Piece)
│   │   ├── By Brand (J., Khaadi, etc.)
│   │   └── By Price (PKR 5K-30K+)
│   │
│   ├── Stitched Dresses
│   │   ├── Casual Dresses
│   │   ├── Formal Dresses
│   │   └── Party Dresses
│   │
│   └── Stitched Accessories
│       ├── Matching Dupattas
│       └── Belts & Accents
│
├── Unstitched (Entire Unstitched Catalog)
│   ├── 3-Piece Unstitched (Kameez + Trouser + Dupatta)
│   │   ├── By Occasion
│   │   ├── By Brand
│   │   └── By Price
│   │
│   ├── 2-Piece Unstitched (Kameez + Trouser)
│   │   ├── By Occasion
│   │   └── By Brand
│   │
│   └── Single Piece Unstitched
│       ├── Kameez Only
│       ├── Trouser Only
│       └── Dupatta Only
│
├── Occasion-Based (Cross-Category)
│   ├── Formal Wear (Office, Corporate, Business)
│   ├── Luxury Wear (Premium Designer Pieces)
│   ├── Festive (Eid, Weddings, Holidays)
│   └── Party Wear (Events, Dinners, Celebrations)
│
└── Sale (Dynamic)
    ├── Flash Deals (24-48 hours)
    ├── Seasonal Clearance
    └── Brand-Specific Sales
```

---

## 3.2 Filter Taxonomy & Structure

### Filter 1: Brand (Multi-Select Checkbox)
```
Brand Filter
├── J. (12 products)
├── Khaadi (145 products) ⭐ Most Popular
├── Gul Ahmed (87 products)
├── Ethnic (56 products)
├── Saya (42 products)
├── BAROQUE (78 products)
├── ALKARAM (63 products)
├── SOHAYE (34 products)
├── Bonanza (29 products)
├── MTJ (18 products)
├── Zellbury (44 products)
├── Gull G (22 products)
├── Bin Saeed (19 products)
└── Mizaaj (15 products)

Default: Show all brands
Impact: Reduces 60-70% of results
Usage Rate: 45% of users
```

### Filter 2: Price Range (Dual Slider)
```
Price Filter
├── Min: PKR 2,500
├── Max: PKR 50,000
├── Default Range: Full range
├── Slider Steps: PKR 500
├── Display: "Price: PKR 5,000 - PKR 20,000"
├── Quick Presets:
│   ├── Under PKR 5,000 (Budget)
│   ├── PKR 5,000 - 10,000 (Mid-Range)
│   ├── PKR 10,000 - 15,000 (Premium)
│   ├── PKR 15,000+ (Luxury)
│   └── Custom Range (Slider)

Default: Full range shown
Impact: Reduces 40-50% of results
Usage Rate: 70% of users
Conversion Impact: HIGH (budget alignment)
```

### Filter 3: Occasion (Radio Buttons / Tabs)
```
Occasion Filter
├── Casual (Everyday wear, comfortable)
├── Formal (Office, corporate, professional)
├── Festive (Eid, weddings, celebrations)
├── Party (Dinners, events, socializing)
├── Wedding (Bridal, wedding guest, ceremonies)
└── Luxury (Premium, special occasions, designer)

Default: Show all occasions
Impact: Reduces 50% of results
Usage Rate: 60% of users
Conversion Impact: VERY HIGH (intent-driven)
```

### Filter 4: Type (Mutually Exclusive)
```
Type Filter (Toggle Buttons)
├── Stitched (Ready-to-wear, immediate use)
├── Unstitched (DIY, tailor-ready, customizable)
└── Both (Show all)

Default: Both
Impact: Reduces 50% of results
Usage Rate: 85% of users
Conversion Impact: CRITICAL (narrowest segmentation)
```

### Filter 5: Piece Type (Checkboxes)
```
Piece Type Filter
├── 2-Piece (Kameez + Trouser)
├── 3-Piece (Kameez + Trouser + Dupatta)
├── With Dupatta (Optional inclusion)
├── Without Dupatta (Excludes dupatta)
└── Single Piece (Kameez, Trouser, or Dupatta only)

Default: Show all piece types
Impact: Reduces 30-40% of results
Usage Rate: 40% of users
Conditional: Only visible when Stitched/Unstitched selected
Conversion Impact: MEDIUM (style preference)
```

### Filter 6: Size (Visual Buttons - Stitched Only)
```
Size Filter (Grid of Buttons)
├── XS (Extra Small)
├── S (Small)
├── M (Medium)
├── L (Large)
├── XL (Extra Large)
└── XXL (Double Extra Large)

Default: Show all sizes
Impact: Reduces 20-30% of results
Usage Rate: 35% of users
Conditional: ONLY visible when "Stitched" selected
Conversion Impact: HIGH (fit confidence)
Display: Button grid (visual, not checkboxes)
```

### Filter 7: Color (Visual Swatches)
```
Color Filter (Color Swatches - Multi-Select)
├── Navy (45 products)
├── Black (38 products)
├── White (22 products)
├── Cream (31 products)
├── Red (28 products)
├── Green (19 products)
├── Pink (27 products)
├── Purple (15 products)
├── Orange (12 products)
├── Brown (14 products)
├── Gray (9 products)
└── Multicolor (35 products)

Default: Show all colors
Impact: Reduces 15-25% of results
Usage Rate: 50% of users
Display: Square color swatches (30x30px)
Hover: Show color name tooltip
Conversion Impact: MEDIUM (aesthetic preference)
```

### Filter 8: Discount % (Slider + Presets)
```
Discount Filter
├── All Products (0%+)
├── 10% - 25% Off
├── 25% - 40% Off
├── 40%+ Off
├── 50%+ Off (Clearance only)
└── Custom Range (Slider 0-70%)

Default: Show all discounts
Impact: Reduces 30-40% of results
Usage Rate: 25% of users
Conversion Impact: MEDIUM (deal-seekers)
Display: Preset buttons + custom slider
```

### Filter 9: Collection/Seasonal (Checkboxes)
```
Collection Filter (Dynamic - Changes Monthly)
├── New Arrivals (Last 30 days)
├── Bestsellers (Top 100 by sales)
├── Limited Edition (Exclusive)
├── Clearance (Final sale, 50%+ off)
├── Eid Collection 2026
├── Summer Collection 2026
├── Wedding Season 2026
└── Designer Collaborations

Default: Show all
Impact: Reduces 20-30% of results
Usage Rate: 30% of users
Conversion Impact: MEDIUM-HIGH (trend-driven)
Update Frequency: Weekly
```

---

## 3.3 Desktop Filter UI Wireframe

```
┌──────────────────────────────────────────────────────────────────┐
│ Category: Women > Stitched Suits                                 │
│ [← Back] | Showing 145 products                                  │
├────────────┬────────────────────────────────────────────────────┤
│            │                                                    │
│ FILTERS    │  PRODUCTS GRID (4 columns)                        │
│            │                                                    │
│ [× Clear   │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐             │
│  All]      │  │Image │ │Image │ │Image │ │Image │             │
│            │  │Brand │ │Brand │ │Brand │ │Brand │             │
│ ━━━━━━━━━━ │  │Price │ │Price │ │Price │ │Price │             │
│            │  │⭐⭐⭐│ │⭐⭐⭐│ │⭐⭐⭐│ │⭐⭐⭐│             │
│ BRAND      │  │[CART]│ │[CART]│ │[CART]│ │[CART]│             │
│ [▼ Show]   │  └──────┘ └──────┘ └──────┘ └──────┘             │
│            │                                                    │
│ ☐ J. (12)  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐             │
│ ☑ Khaadi   │  │Image │ │Image │ │Image │ │Image │             │
│   (145)    │  │Brand │ │Brand │ │Brand │ │Brand │             │
│ ☐ Gul      │  │Price │ │Price │ │Price │ │Price │             │
│   Ahmed    │  │⭐⭐⭐│ │⭐⭐⭐│ │⭐⭐⭐│ │⭐⭐⭐│             │
│   (87)     │  │[CART]│ │[CART]│ │[CART]│ │[CART]│             │
│ ☐ Ethnic   │  └──────┘ └──────┘ └──────┘ └──────┘             │
│   (56)     │                                                    │
│ ☐ Saya(42) │  Pagination:                                      │
│ ☐ BAROQUE  │  [◀ 1] [2] [3] [4] [5] ... [20] [▶]              │
│   (78)     │  Showing 1-20 of 145 products                    │
│ [Show more]│                                                    │
│            │                                                    │
│ ━━━━━━━━━━ │                                                    │
│            │                                                    │
│ PRICE      │  [SIDEBAR CONTINUES BELOW]                        │
│ ├─────────┤│                                                    │
│ PKR 5K │14K│                                                    │
│        |──●────|  Applied Filters:                             │
│        PKR 5000  ┌────────────────┐                            │
│        PKR 14000 │ Khaadi (×)      │ Reset this filter         │
│                 │ Price 5-14K (×) │                            │
│ ━━━━━━━━━━      │ Formal (×)      │                            │
│                 │ Size: M (×)     │                            │
│ OCCASION       │ Color: Navy (×) │                            │
│ [▼ Show]       └────────────────┘                            │
│ ◯ Casual                                                      │
│ ◉ Formal (Selected)                                          │
│ ◯ Festive                                                     │
│ ◯ Party                                                       │
│ ◯ Wedding                                                     │
│ ◯ Luxury                                                      │
│                                                               │
│ ━━━━━━━━━━                                                    │
│                                                               │
│ TYPE                                                          │
│ [▼ Show]                                                      │
│ ◉ Stitched (Selected)                                         │
│ ◯ Unstitched                                                  │
│ ◯ Both                                                        │
│                                                               │
│ ━━━━━━━━━━                                                    │
│                                                               │
│ PIECE TYPE                                                    │
│ [▼ Show]                                                      │
│ ☐ 2-Piece (23)                                               │
│ ☑ 3-Piece (122)  [Selected]                                  │
│ ☐ With Dupatta                                               │
│ ☐ Without Dupatta                                            │
│                                                               │
│ ━━━━━━━━━━                                                    │
│                                                               │
│ SIZE (Stitched Only)                                          │
│ [▼ Show]                                                      │
│ [XS] [S] [M ●] [L] [XL] [XXL]                               │
│ (● = Selected)                                               │
│                                                               │
│ ━━━━━━━━━━                                                    │
│                                                               │
│ COLOR                                                         │
│ [▼ Show]                                                      │
│ [● Navy] [● Red] [White] [Cream]                             │
│ [Green] [Pink] [Purple] [Orange]                             │
│ [Brown] [Gray] [Multicolor]                                  │
│ (● = Selected)                                               │
│                                                               │
│ ━━━━━━━━━━                                                    │
│                                                               │
│ DISCOUNT %                                                    │
│ [▼ Show]                                                      │
│ [All] [10-25%] [25-40%] [40%+] [50%+]                       │
│                                                               │
│ ━━━━━━━━━━                                                    │
│                                                               │
│ COLLECTION                                                    │
│ [▼ Show]                                                      │
│ ☑ New Arrivals (42)                                          │
│ ☐ Bestsellers (89)                                           │
│ ☐ Limited Edition (12)                                       │
│ ☐ Clearance (34)                                             │
│ ☐ Eid Collection (67)                                        │
│                                                               │
└────────────────────────────────────────────────────────────────┘
```

---

## 3.4 Mobile Filter UI Wireframe

```
┌──────────────────────────────┐
│ ☰ [AL IMRAN] 🔍 🛒           │
├──────────────────────────────┤
│ Category: Stitched Suits      │
│ 145 products | [FILTER ⚙️]    │
│ Sort by: [Relevance ▼]        │
│                              │
│ [Product Grid - 2 columns]   │
│ ┌──────────┐ ┌──────────┐   │
│ │ [Image]  │ │ [Image]  │   │
│ │ Brand    │ │ Brand    │   │
│ │ Price    │ │ Price    │   │
│ │ [CART]   │ │ [CART]   │   │
│ └──────────┘ └──────────┘   │
│                              │
│ ┌──────────┐ ┌──────────┐   │
│ │ [Image]  │ │ [Image]  │   │
│ │ Brand    │ │ Brand    │   │
│ │ Price    │ │ Price    │   │
│ │ [CART]   │ │ [CART]   │   │
│ └──────────┘ └──────────┘   │
│                              │
│ [Load More Products]         │
│                              │
└──────────────────────────────┘

┌──────────────────────────────┐
│ FILTER PANEL (Full Screen)   │
│ (Opened via FILTER ⚙️ button)│
├──────────────────────────────┤
│ [← Back to Results]          │
│ Showing 145 products         │
│                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━   │
│ BRAND                        │
│ ☑ Khaadi (145)              │
│ ☐ Gul Ahmed (87)            │
│ ☐ Ethnic (56)               │
│ ☐ Saya (42)                 │
│ ☐ BAROQUE (78)              │
│ [Show More Brands ▼]         │
│                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━   │
│ PRICE RANGE                  │
│                              │
│ PKR 5,000 ─────── PKR 14,000 │
│ [Slider visualization]       │
│                              │
│ Presets:                     │
│ [Under 5K] [5-10K] [10-15K]  │
│ [15K+] [Custom]              │
│                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━   │
│ OCCASION                     │
│ ◉ Formal (Selected)          │
│ ◯ Casual                     │
│ ◯ Festive                    │
│ ◯ Party                      │
│ ◯ Wedding                    │
│ ◯ Luxury                     │
│                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━   │
│ TYPE                         │
│ ◉ Stitched                   │
│ ◯ Unstitched                 │
│ ◯ Both                       │
│                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━   │
│ PIECE TYPE                   │
│ ☐ 2-Piece                    │
│ ☑ 3-Piece (Selected)         │
│ ☐ With Dupatta               │
│ ☐ Without Dupatta            │
│                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━   │
│ SIZE                         │
│ [XS] [S] [M ●] [L] [XL] [XXL]│
│                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━   │
│ COLOR                        │
│ [● Navy] [● Red] [White]     │
│ [Cream] [Green] [Pink]       │
│ [Purple] [Orange] [Brown]    │
│ [Gray] [Multicolor]          │
│                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━   │
│ DISCOUNT %                   │
│ [All] [10-25%] [25-40%]      │
│ [40%+] [50%+]                │
│                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━   │
│ COLLECTION                   │
│ ☑ New Arrivals (42)          │
│ ☐ Bestsellers (89)           │
│ ☐ Limited Edition (12)       │
│ ☐ Clearance (34)             │
│ ☐ Eid Collection (67)        │
│                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━   │
│                              │
│ [STICKY BOTTOM BUTTONS]      │
│ [CLEAR ALL]  [APPLY (145)]   │
│                              │
└──────────────────────────────┘
```

---

## 3.5 Smart Filter Combinations & Conversion Logic

### Use Case 1: Wedding Guest Shopping
```
Filter Journey:
1. Occasion: Wedding → 180 products
2. Type: Stitched → 120 products
3. Price: PKR 8,000-20,000 → 65 products
4. Size: M, L → 35 products
5. Color: Navy, Green, Red → 18 products

Conversion Impact:
- Reduced decision paralysis (45,000 → 18 results)
- High purchase intent (wedding = specific use-case)
- Expected conversion: 8-12%
- Avg order value: PKR 12,000-18,000
```

### Use Case 2: Budget Shopper
```
Filter Journey:
1. Price: Under PKR 8,000 → 340 products
2. Discount: 25%+ OFF → 120 products
3. Type: Unstitched → 45 products (typically cheaper)
4. Color: Navy, Black, Cream → 15 products

Conversion Impact:
- Volume-driven (high traffic, lower AOV)
- Discount-sensitive (deal-seekers)
- Expected conversion: 3-5% (but high volume)
- Avg order value: PKR 5,000-7,000
```

### Use Case 3: Luxury Seeker
```
Filter Journey:
1. Occasion: Luxury → 95 products
2. Brand: J., BAROQUE, Ethnic → 40 products
3. Price: PKR 15,000+ → 28 products
4. Collection: Limited Edition → 8 products

Conversion Impact:
- High purchase intent (premium positioning)
- Brand-driven (J., BAROQUE prestigious)
- Expected conversion: 12-18% (high quality leads)
- Avg order value: PKR 18,000-25,000
```

### Use Case 4: Tailor/DIY Customer
```
Filter Journey:
1. Type: Unstitched → 234 products
2. Occasion: Any → 234 products
3. Brand: Any → 234 products
4. Piece Type: 3-Piece → 156 products
5. Material: Available → 156 products

Conversion Impact:
- Customization-focused (unique value prop)
- Repeat customers (regular tailors)
- Expected conversion: 8-10%
- Avg order value: PKR 8,000-12,000
- Lifetime value: HIGH (recurring purchases)
```

---

## 3.6 Conversion Impact by Filter

| Filter | Usage Rate | Reduces Results By | Conversion Impact | Target Users |
|--------|-----------|-------------------|------------------|--------------|
| **Type** (Stitched/Unstitched) | 85% | 50% | CRITICAL | First-time visitors |
| **Occasion** | 60% | 50% | VERY HIGH | Intent-driven |
| **Brand** | 45% | 60-70% | HIGH | Loyal customers |
| **Price Range** | 70% | 40-50% | HIGH | Budget-conscious |
| **Piece Type** (2-pc/3-pc) | 40% | 30-40% | MEDIUM | Style preference |
| **Size** (Stitched) | 35% | 20-30% | HIGH | Fit confidence |
| **Color** | 50% | 15-25% | MEDIUM | Aesthetic choice |
| **Discount %** | 25% | 30-40% | MEDIUM | Deal-seekers |
| **Collection** | 30% | 20-30% | MEDIUM | Trend-driven |

---

## 3.7 Applied Filters Display & Reset Logic

```
Applied Filters Bar (Shows after filtering):
┌─────────────────────────────────────────────────────┐
│ Active Filters:                                     │
│                                                    │
│ [Khaadi ×] [Formal ×] [Price 5K-14K ×]            │
│ [Stitched ×] [Size M ×] [Navy ×]                  │
│ [3-Piece ×]                                       │
│                                                    │
│ [CLEAR ALL FILTERS]  or individual [×] per filter │
│                                                    │
│ Result: "Showing 18 of 145 products"             │
└─────────────────────────────────────────────────────┘
```

**Reset Logic:**
- Clicking individual [×]: Removes that filter only, recalculates results
- "CLEAR ALL": Resets to default view (all 145 products)
- **Important:** Show how many results will return
  - "Remove Khaadi filter to see 87 more products"
  - Encourages exploration

---

# PART 4 — CART & CHECKOUT FLOW

## 4.1 Mini-Cart Design (Desktop)

```
┌──────────────────────────────────────────┐
│  MINI-CART (Hover/Slide Panel)           │
│  (Triggered by Cart icon in header)      │
│                                          │
│  SHOPPING CART (3 items)  [×]            │
│  ────────────────────────────────────   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ [Thumb] Khaadi Suit              │   │
│  │         Size: M, Color: Navy      │   │
│  │         Qty: [−] 1 [+]            │   │
│  │         PKR 12,600                │   │
│  │                       [Remove ✕]  │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ [Thumb] Ethnic Unstitched         │   │
│  │         Qty: [−] 1 [+]            │   │
│  │         PKR 8,500                 │   │
│  │                       [Remove ✕]  │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ [Thumb] BAROQUE Dupatta           │   │
│  │         Color: Red                │   │
│  │         Qty: [−] 1 [+]            │   │
│  │         PKR 2,500                 │   │
│  │                       [Remove ✕]  │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ────────────────────────────────────   │
│  Subtotal:        PKR 23,600             │
│  Shipping:        FREE (Orders 3K+)     │
│  Discount:        -PKR 0 (Apply code)   │
│  ────────────────────────────────────   │
│  Total:           PKR 23,600 (Bold)     │
│                                          │
│  [PROCEED TO CHECKOUT]  (Green, Full)   │
│  [CONTINUE SHOPPING]    (Secondary)     │
│                                          │
└──────────────────────────────────────────┘
```

**Mini-Cart Behavior:**
- Slide-in from right (on desktop), from bottom (on mobile)
- Shows last 3 items
- Quantity adjustable (+/−)
- Quick remove option
- Subtotal updates in real-time
- "Proceed to Checkout" is PRIMARY CTA

---

## 4.2 Full Cart Page (Desktop)

```
┌─────────────────────────────────────────────────────────────────┐
│ [Home] > [Cart]                                                 │
│                                                                 │
│ YOUR SHOPPING CART (3 items)              Continue Shopping →  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ PRODUCTS IN CART:                                              │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────┐   │
│ │ [Thumb] │ Product Details      │ Qty │ Price │ Remove  │   │
│ ├─────────────────────────────────────────────────────────┤   │
│ │ [Img]   │ Khaadi Luxury        │     │       │         │   │
│ │         │ 3-Piece Suit         │ [−] │ PKR  │ [✕]     │   │
│ │         │ Size: M              │  1  │ 12,600│         │   │
│ │         │ Color: Navy          │ [+] │       │ Save    │   │
│ │         │                      │     │       │ for     │   │
│ │         │ ⭐ 4.7/5 (127)       │     │ Total:│ later   │   │
│ │         │ [★ Add to wishlist]  │     │ 12,600│         │   │
│ └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────┐   │
│ │ [Thumb] │ Ethnic Unstitched    │ [−] │ PKR  │ [✕]     │   │
│ │ [Img]   │ 3-Piece Collection   │  1  │ 8,500 │         │   │
│ │         │ (Kameez, Trouser,    │ [+] │       │ Save    │   │
│ │         │  Dupatta)            │     │ Total:│ for     │   │
│ │         │                      │     │ 8,500 │ later   │   │
│ │         │ ⭐ 4.5/5 (89)        │     │       │         │   │
│ │         │ [★ Add to wishlist]  │     │       │         │   │
│ └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────┐   │
│ │ [Thumb] │ BAROQUE Dupatta      │ [−] │ PKR  │ [✕]     │   │
│ │ [Img]   │ Embroidered          │  1  │ 2,500 │         │   │
│ │         │ Color: Red           │ [+] │       │ Save    │   │
│ │         │                      │     │ Total:│ for     │   │
│ │         │ ⭐ 4.8/5 (156)       │     │ 2,500 │ later   │   │
│ │         │ [★ Add to wishlist]  │     │       │         │   │
│ └─────────────────────────────────────────────────────────┘   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ HAVE A COUPON CODE?                                            │
│                                                                 │
│ [Coupon Code Input] [APPLY]                                    │
│                                                                 │
│ "WELCOME10" saves PKR 2,360 (10% off)                         │
│ [Apply code automatically if valid]                           │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ RECOMMENDED FOR YOU:                                           │
│                                                                 │
│ "Complete Your Look"                                           │
│                                                                 │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐             │
│ │ [Image] │ │ [Image] │ │ [Image] │ │ [Image] │             │
│ │ Gul     │ │ SOHAYE  │ │ Matching│ │ Thread  │             │
│ │ Ahmed   │ │ Formal  │ │ Borders │ │ (Spools)│             │
│ │ Stitched│ │ Stitched│ │ (3 yds) │ │         │             │
│ │ PKR     │ │ PKR     │ │ PKR 1.2K│ │ PKR 500 │             │
│ │ 11,200  │ │ 10,500  │ │         │ │         │             │
│ │ [+ CART]│ │ [+ CART]│ │ [+ CART]│ │ [+CART] │             │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ SHIPPING ESTIMATE                                              │
│                                                                 │
│ Delivery to: [Karachi ▼]  (Change location)                   │
│                                                                 │
│ Standard Delivery (2-5 days): FREE (Orders above PKR 3,000)   │
│ Express Delivery (1-2 days): PKR 800                          │
│ Overnight Delivery (Next day): PKR 1,500                      │
│                                                                 │
│ Estimated Delivery: Thursday, 27 Feb 2026                     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ ORDER SUMMARY (Sticky Right Panel on Desktop)                  │
│                                                                 │
│ Subtotal (3 items):           PKR 23,600                      │
│ Shipping:                     FREE                            │
│ Discount (WELCOME10):         -PKR 2,360 (10%)               │
│ Tax (if applicable):          PKR 0                           │
│ ────────────────────────────────────                          │
│ TOTAL:                        PKR 21,240 (Bold, Large)       │
│                                                                 │
│ [PROCEED TO CHECKOUT] (Green, Full Width)                     │
│                                                                 │
│ ────────────────────────────────────                          │
│ Trust Badges:                                                 │
│ ✓ Free Returns (14 days)                                      │
│ ✓ Secure Payment (SSL Encrypted)                              │
│ ✓ 100% Original Brands                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4.3 Full Cart Page (Mobile)

```
┌──────────────────────────────┐
│ ☰ | [CART (3)]      | 🔍 | 👤 │
├──────────────────────────────┤
│ YOUR SHOPPING CART           │
│ 3 items                      │
│                              │
│ [Continue Shopping Link] ←   │
│                              │
├──────────────────────────────┤
│                              │
│ PRODUCT 1                    │
│ ┌──────────────────────────┐ │
│ │ [Thumb Image]            │ │
│ │                          │ │
│ │ Khaadi Luxury 3-Piece    │ │
│ │ Size: M | Color: Navy    │ │
│ │                          │ │
│ │ Qty: [−] 1 [+]           │ │
│ │ Price: PKR 12,600        │ │
│ │                          │ │
│ │ [★ Wishlist] [✕ Remove]  │ │
│ └──────────────────────────┘ │
│                              │
│ PRODUCT 2                    │
│ ┌──────────────────────────┐ │
│ │ [Thumb Image]            │ │
│ │                          │ │
│ │ Ethnic Unstitched        │ │
│ │ 3-Piece                  │ │
│ │                          │ │
│ │ Qty: [−] 1 [+]           │ │
│ │ Price: PKR 8,500         │ │
│ │                          │ │
│ │ [★ Wishlist] [✕ Remove]  │ │
│ └──────────────────────────┘ │
│                              │
│ PRODUCT 3                    │
│ ┌──────────────────────────┐ │
│ │ [Thumb Image]            │ │
│ │                          │ │
│ │ BAROQUE Dupatta          │ │
│ │ Embroidered, Color: Red  │ │
│ │                          │ │
│ │ Qty: [−] 1 [+]           │ │
│ │ Price: PKR 2,500         │ │
│ │                          │ │
│ │ [★ Wishlist] [✕ Remove]  │ │
│ └──────────────────────────┘ │
│                              │
├──────────────────────────────┤
│ COUPON CODE                  │
│ [Input: "WELCOME10"]         │
│ [APPLY]                      │
│                              │
│ Discount: -PKR 2,360 (10%)  │
│                              │
├──────────────────────────────┤
│ RECOMMENDED FOR YOU          │
│                              │
│ ┌──────────────────────────┐ │
│ │ [Image]                  │ │
│ │ Gul Ahmed Stitched       │ │
│ │ PKR 11,200               │ │
│ │ [+ ADD TO CART]          │ │
│ └──────────────────────────┘ │
│                              │
│ ┌──────────────────────────┐ │
│ │ [Image]                  │ │
│ │ SOHAYE Formal            │ │
│ │ PKR 10,500               │ │
│ │ [+ ADD TO CART]          │ │
│ └──────────────────────────┘ │
│                              │
│ [View More Recommendations]  │
│                              │
├──────────────────────────────┤
│ SHIPPING ESTIMATE            │
│                              │
│ Deliver to: [Karachi ▼]      │
│                              │
│ Standard (2-5 days): FREE    │
│ Express (1-2 days): PKR 800  │
│ Overnight: PKR 1,500         │
│                              │
│ Estimated: Thursday, 27 Feb  │
│                              │
├──────────────────────────────┤
│ ORDER SUMMARY                │
│                              │
│ Subtotal:     PKR 23,600     │
│ Shipping:     FREE           │
│ Discount:     -PKR 2,360     │
│ ──────────────────────────   │
│ TOTAL:        PKR 21,240     │
│               (Bold, Large)  │
│                              │
├──────────────────────────────┤
│ [STICKY BOTTOM BUTTONS]      │
│ [PROCEED TO CHECKOUT]        │
│               (Full Width)   │
│                              │
│ Trust Badges:                │
│ ✓ Free Returns 14 days       │
│ ✓ Secure Payment             │
│ ✓ 100% Original              │
│                              │
└──────────────────────────────┘
```

---

## 4.4 3-Step Checkout Flow - Desktop

### Step 1: Shipping Details

```
┌─────────────────────────────────────────────────────────────────┐
│ CHECKOUT (Step 1 of 3: Shipping)                                │
│ ─────────────────────────────────────────────────────────────   │
│ [● Step 1] [○ Step 2] [○ Step 3]  Progress indicator           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ SHIPPING ADDRESS                                               │
│                                                                 │
│ ☑ Use saved address: Fatima Khan, Karachi (Default)           │
│   [Edit] [Use different address]                              │
│                                                                 │
│   OR                                                           │
│                                                                 │
│ ☐ Enter new shipping address                                  │
│                                                                 │
│ Full Name: [Fatima Khan____________]                          │
│ Phone:     [0300-1234567___________]                          │
│ City:      [Karachi ▼]                                        │
│              (Dropdown: Karachi, Lahore, Islamabad,           │
│               Peshawar, Multan, Quetta, Faisalabad,           │
│               Rawalpindi, Gujranwala, etc.)                   │
│                                                                 │
│ Address:   [____________________]                             │
│ Apt/House: [Apt 305, Pearl Towers_]                           │
│                                                                 │
│ Postal Code: [75500________]                                  │
│                                                                 │
│ ☑ Mark as default address                                     │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│ SHIPPING METHOD                                               │
│                                                                 │
│ ○ Standard Delivery (2-5 business days)                       │
│   FREE (Orders above PKR 3,000)                               │
│   Estimated: Thursday, 27 Feb 2026                            │
│                                                                 │
│ ○ Express Delivery (1-2 business days)  ⭐ FAST              │
│   PKR 800                                                     │
│   Estimated: Wednesday, 26 Feb 2026                           │
│   Selected ✓                                                  │
│                                                                 │
│ ○ Overnight Delivery (Next day)                              │
│   PKR 1,500                                                   │
│   Estimated: Tuesday, 25 Feb 2026                             │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ [← BACK]                        [PROCEED TO PAYMENT →]         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2: Payment Method

```
┌─────────────────────────────────────────────────────────────────┐
│ CHECKOUT (Step 2 of 3: Payment)                                 │
│ ─────────────────────────────────────────────────────────────   │
│ [● Step 1] [● Step 2] [○ Step 3]  Progress indicator           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ SELECT PAYMENT METHOD                                          │
│                                                                 │
│ ○ CASH ON DELIVERY (COD)                                      │
│   Pay when you receive your order. Available nationwide.      │
│                                                                 │
│   Estimated Delivery: Wednesday, 26 Feb 2026                  │
│   You'll receive a call before delivery                       │
│                                                                 │
│ ○ CREDIT / DEBIT CARD                                         │
│   Visa, Mastercard, Amex                                      │
│   Selected ✓                                                  │
│                                                                 │
│   [Enter Card Details]                                        │
│   Card Holder: [Fatima Khan________]                          │
│   Card Number: [____ ____ ____ ____]                          │
│   MM / YY: [__/__]  CVV: [___]                               │
│                                                                 │
│   ☑ Save this card for future purchases                       │
│                                                                 │
│ ○ BANK TRANSFER                                               │
│   Transfer to: AL Imran Fabrics Account                       │
│   Account #: 123456789                                        │
│   Bank: HBL / NBP / UBL                                       │
│   [Show bank details]                                         │
│                                                                 │
│ ○ DIGITAL WALLET                                              │
│   [JazzCash] [EasyPaisa] [Easyload]                           │
│   ☑ Pay via JazzCash (Mobile +923001234567)                  │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│ BILLING ADDRESS                                               │
│                                                                 │
│ ☑ Same as shipping address                                    │
│ ☐ Use different billing address [Edit]                       │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ [← BACK]                        [PROCEED TO REVIEW →]          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 3: Order Review & Confirmation

```
┌─────────────────────────────────────────────────────────────────┐
│ CHECKOUT (Step 3 of 3: Review & Confirm)                        │
│ ─────────────────────────────────────────────────────────────   │
│ [● Step 1] [● Step 2] [● Step 3]  Progress indicator           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ORDER SUMMARY                                                  │
│                                                                 │
│ ITEMS:                                                         │
│ ┌─────────────────────────────────────────────────────────┐   │
│ │ Khaadi Luxury 3-Piece Suit × 1       PKR 12,600        │   │
│ │ Ethnic Unstitched 3-Piece × 1        PKR 8,500         │   │
│ │ BAROQUE Embroidered Dupatta × 1      PKR 2,500         │   │
│ └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│ SHIPPING ADDRESS:                                              │
│ Fatima Khan                                                   │
│ Apt 305, Pearl Towers                                         │
│ Karachi, 75500                                                │
│ Phone: 0300-1234567                                           │
│                                                                 │
│ [Edit]                                                        │
│                                                                 │
│ SHIPPING METHOD:                                               │
│ Express Delivery (1-2 days) - PKR 800                         │
│ Estimated: Wednesday, 26 Feb 2026                             │
│ [Edit]                                                        │
│                                                                 │
│ PAYMENT METHOD:                                                │
│ Credit Card (Visa)                                            │
│ Card ending in 4242                                           │
│ [Edit]                                                        │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│ PRICE BREAKDOWN:                                              │
│                                                                 │
│ Subtotal (3 items):              PKR 23,600                  │
│ Shipping (Express):              PKR 800                     │
│ Discount (WELCOME10 -10%):       -PKR 2,360                 │
│ Tax (if applicable):             PKR 0                      │
│ ───────────────────────────────────────                      │
│ TOTAL:                           PKR 22,040 (Bold, Large)   │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│ TERMS & CONDITIONS:                                            │
│                                                                 │
│ ☑ I agree to the Terms of Service and Privacy Policy        │
│ ☑ I agree to the Return Policy (14-day returns)             │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ [← BACK TO PAYMENT]         [PLACE ORDER] (Green, Bold)      │
│                                                                 │
│ Trust Badges (Bottom):                                        │
│ [SSL Secure] [PCI Compliant] [100% Original Brands]          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4.5 3-Step Checkout (Mobile) - Simplified

```
┌──────────────────────────────┐
│ ☰ | [CHECKOUT] | 🔍 | 👤     │
├──────────────────────────────┤
│ CHECKOUT                     │
│ Step 1 of 3: Shipping        │
│                              │
│ Progress: [███░░░░░░░░░]    │
│                              │
├──────────────────────────────┤
│                              │
│ SHIPPING ADDRESS             │
│                              │
│ ☑ Use saved address          │
│    Fatima Khan, Karachi      │
│    [Edit Link]               │
│                              │
│ OR                           │
│                              │
│ Enter New Address:           │
│                              │
│ Name: [Fatima Khan]          │
│ Phone: [0300-1234567]        │
│ City: [Karachi ▼]            │
│ Address: [___________]       │
│ Postal: [75500____]          │
│                              │
│ ☑ Mark as default           │
│                              │
├──────────────────────────────┤
│ SHIPPING METHOD              │
│                              │
│ ○ Standard (2-5 days): FREE │
│   Estimated: 27 Feb          │
│                              │
│ ○ Express (1-2 days): 800   │
│   Estimated: 26 Feb          │
│   Selected ✓                 │
│                              │
│ ○ Overnight: 1,500          │
│   Estimated: 25 Feb          │
│                              │
├──────────────────────────────┤
│ [Sticky Bottom Buttons]      │
│ [← BACK] [NEXT →]            │
│                              │
└──────────────────────────────┘

[After "NEXT", Step 2 Payment]

┌──────────────────────────────┐
│ CHECKOUT                     │
│ Step 2 of 3: Payment         │
│                              │
│ Progress: [██████░░░░░░░]   │
│                              │
├──────────────────────────────┤
│                              │
│ PAYMENT METHOD               │
│                              │
│ ○ Cash On Delivery (COD)    │
│   Pay at delivery            │
│                              │
│ ○ Credit/Debit Card         │
│   Selected ✓                 │
│                              │
│   Card Holder: [Fatima Khan] │
│   Card Number: [__________]  │
│   MM/YY: [__/__] CVV: [___]  │
│                              │
│   ☑ Save for future          │
│                              │
│ ○ JazzCash / EasyPaisa      │
│   [Enter Mobile Number]      │
│                              │
├──────────────────────────────┤
│ [← BACK] [NEXT →]            │
│                              │
└──────────────────────────────┘

[After "NEXT", Step 3 Review]

┌──────────────────────────────┐
│ CHECKOUT                     │
│ Step 3 of 3: Review          │
│                              │
│ Progress: [███████████░░]   │
│                              │
├──────────────────────────────┤
│                              │
│ ORDER SUMMARY                │
│                              │
│ [Expandable: Items]          │
│ ▼ 3 Items                    │
│   Khaadi Suit × 1            │
│   PKR 12,600                 │
│                              │
│   Ethnic Unstitched × 1      │
│   PKR 8,500                  │
│                              │
│   BAROQUE Dupatta × 1        │
│   PKR 2,500                  │
│                              │
│ [Expandable: Address]        │
│ ▼ Shipping To:               │
│   Fatima Khan                │
│   Karachi, 75500             │
│                              │
│ [Expandable: Price]          │
│ ▼ Price Breakdown:           │
│   Subtotal: PKR 23,600       │
│   Shipping: PKR 800          │
│   Discount: -PKR 2,360       │
│   ─────────────────          │
│   Total: PKR 22,040          │
│                              │
├──────────────────────────────┤
│ TERMS                        │
│ ☑ I agree to Terms & Return  │
│                              │
├──────────────────────────────┤
│ [← BACK]                     │
│                              │
│ [PLACE ORDER] (Sticky Top)   │
│                              │
│ Trust Badges:                │
│ ✓ SSL Secure ✓ PCI Compliant│
│                              │
└──────────────────────────────┘
```

---

## 4.6 Order Confirmation Page

```
┌─────────────────────────────────────────────────────────────────┐
│ ✓ ORDER CONFIRMED!                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Thank you for your order, Fatima! 🎉                           │
│                                                                 │
│ We've received your order and are getting it ready for         │
│ shipment. You'll receive an email confirmation shortly.        │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ ORDER #: ALI-20260224-45678                                    │
│ ORDER DATE: 24 Feb 2026, 3:45 PM                              │
│ DELIVERY ESTIMATE: 26 Feb 2026 (Wednesday)                    │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ ORDER DETAILS:                                                 │
│                                                                 │
│ Items:              3                                          │
│ ├ Khaadi Luxury Suit (M, Navy)       × 1    PKR 12,600        │
│ ├ Ethnic Unstitched (3-Piece)        × 1    PKR 8,500         │
│ └ BAROQUE Dupatta (Red)              × 1    PKR 2,500         │
│                                                                 │
│ Subtotal:                                  PKR 23,600         │
│ Shipping (Express):                        PKR 800            │
│ Discount (WELCOME10):                      -PKR 2,360         │
│ ─────────────────────────────────────────                     │
│ Total Paid:                                PKR 22,040         │
│                                                                 │
│ Shipping To:                                                   │
│ Fatima Khan                                                   │
│ Apt 305, Pearl Towers, Karachi 75500                          │
│ Phone: 0300-1234567                                           │
│                                                                 │
│ Payment Method:                                                │
│ Visa Card ending in 4242                                      │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ NEXT STEPS:                                                    │
│                                                                 │
│ 1. You'll receive a tracking number via email & SMS            │
│ 2. Your order ships on 25 Feb 2026                            │
│ 3. Delivery by 26 Feb 2026                                    │
│ 4. You have 14 days to return if needed                       │
│                                                                 │
│ [TRACK YOUR ORDER]  [DOWNLOAD INVOICE]                        │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ RECOMMENDED FOR YOU:                                          │
│ "Complete Your Style"                                         │
│                                                                 │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                  │
│ │[Image] │ │[Image] │ │[Image] │ │[Image] │                  │
│ │ Gul    │ │ Zellb. │ │ SOHAYE │ │ Bonanz │                  │
│ │ Ahmed  │ │ Shirt  │ │ Formal │ │ Casual │                  │
│ │ PKR    │ │ PKR    │ │ PKR    │ │ PKR    │                  │
│ │ 11K    │ │ 7.5K   │ │ 10.5K  │ │ 6.8K   │                  │
│ │[CART]  │ │[CART]  │ │[CART]  │ │[CART]  │                  │
│ └────────┘ └────────┘ └────────┘ └────────┘                  │
│                                                                 │
│ [CONTINUE SHOPPING]                                           │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ NEED HELP?                                                     │
│ [📱 Chat with us] [📧 Email] [☎️ Call] [❓ FAQs]             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

# PART 5 — ADMIN DASHBOARD UI

## 5.1 Admin Dashboard Overview

```
┌─────────────────────────────────────────────────────────────────┐
│ AL IMRAN ADMIN PANEL                                            │
│ [Admin Logo] | Dashboard | Products | Orders | Customers |     │
│ Brands | Coupons | Analytics | Settings | [Log Out]            │
├─────────────────────────────────────────────────────────────────┤
│ Welcome, Admin User | Last Login: 24 Feb 2026, 9:30 AM         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ TODAY'S METRICS (Real-Time)                                    │
│                                                                 │
│ ┌──────────────┬──────────────┬──────────────┬──────────────┐  │
│ │ SALES TODAY  │ ORDERS TODAY │ VISITORS     │ CONVERSION   │  │
│ │              │              │              │              │  │
│ │ PKR 185,600  │ 24 Orders    │ 3,420 Users  │ 0.7%         │  │
│ │              │              │              │              │  │
│ │ ↑ 12% vs     │ ↑ 8% vs      │ ↑ 15% vs     │ ↑ 0.2% vs    │  │
│ │ yesterday    │ yesterday    │ yesterday    │ yesterday    │  │
│ └──────────────┴──────────────┴──────────────┴──────────────┘  │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ QUICK ACTIONS:                                                 │
│ [+ Add Product] [View Orders] [View Customers] [New Coupon]   │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ SALES CHART (Last 30 Days)                                    │
│                                                                 │
│   PKR │                    ╱╲                                  │
│ 400K │               ╱╲  ╱  ╲╱╲                               │
│ 350k │          ╱╲ ╱  ╲╱      ╲                              │
│ 300K │     ╱╲ ╱  ╲              ╲╱╲                           │
│ 250K │    ╱  ╱      ╲╱╲            ╲╱╲                        │
│ 200K │   ╱          ╲  ╲╱╲             ╲                     │
│ 150K │  ╱                 ╲╱╲            ╲╱╲                  │
│      └────────────────────────────────────────────────────    │
│      1   5   10  15  20  25  30 (Days)                       │
│                                                                 │
│ Trend: ↑ Increasing (Peak on 20 Feb - Flash Sale)            │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ TOP SELLING BRANDS (This Week)                               │
│                                                                 │
│ 1. Khaadi       │████████████░░░░│ 145 units, PKR 1.8M       │
│ 2. Gul Ahmed    │██████████░░░░░░│ 87 units, PKR 980K        │
│ 3. BAROQUE      │████████░░░░░░░░│ 56 units, PKR 840K        │
│ 4. Ethnic       │██████░░░░░░░░░░│ 42 units, PKR 525K        │
│ 5. ALKARAM      │████░░░░░░░░░░░░│ 28 units, PKR 392K        │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ RECENT ORDERS                                                  │
│                                                                 │
│ Order #          | Customer   | Items | Total    | Status    │
│ ─────────────────┼────────────┼───────┼──────────┼──────────  │
│ ALI-20260224-001 │ Fatima K.  │ 3     │ 22,040  │ Processing│
│ ALI-20260224-002 │ Aisha M.   │ 1     │ 12,600  │ Shipped   │
│ ALI-20260224-003 │ Hira N.    │ 2     │ 19,200  │ Confirmed │
│ ALI-20260224-004 │ Mirza H.   │ 4     │ 38,500  │ Pending   │
│ ALI-20260224-005 │ Zainab A.  │ 1     │ 8,500   │ Delivered │
│                                                                 │
│ [View All Orders]                                             │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ INVENTORY ALERTS                                               │
│                                                                 │
│ ⚠️ LOW STOCK ITEMS:                                            │
│ • Khaadi Luxury Suit (M) - 3 units left                       │
│ • BAROQUE Dupatta (Red) - 2 units left                        │
│ • Ethnic Wedding Suit - 5 units left                          │
│                                                                 │
│ [View Inventory]                                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5.2 Product Management Interface

```
┌─────────────────────────────────────────────────────────────────┐
│ ADMIN > PRODUCTS                                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ [+ ADD NEW PRODUCT]  Search: [________]  Filter: [Type ▼]    │
│                                                                 │
│ View: [Grid] [List ●]  Sort: [Newest ▼]                      │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ PRODUCT LIST TABLE:                                            │
│                                                                 │
│ ☐ | Image | Product Name | SKU | Type | Brand | Stock | Price│
│   │        │              │     │      │       │       │      │
│ ☑ │[Thumb] │ Khaadi       │KHA- │Stitc│Khaadi │ 45    │12.6K │
│   │        │ Luxury Suit  │001  │hed  │       │       │      │
│   │        │ (M, Navy)    │     │     │       │       │      │
│   │        │ [Active]     │     │     │       │       │      │
│   │        │              │     │     │       │       │      │
│ ☑ │[Thumb] │ Ethnic       │ETH- │Unst.│Ethnic │ 12    │ 8.5K │
│   │        │ Unstitched   │002  │itche│       │       │      │
│   │        │ 3-Piece      │     │d    │       │       │      │
│   │        │ [Active]     │     │     │       │       │      │
│   │        │              │     │     │       │       │      │
│ ☐ │[Thumb] │ BAROQUE      │BAR- │Stitc│BAROQUE│ 2     │16.2K │
│   │        │ Dupatta      │003  │hed  │       │       │      │
│   │        │ (Red)        │     │     │       │       │      │
│   │        │ [Active]     │     │     │       │       │      │
│   │        │              │     │     │       │       │      │
│ ☐ │[Thumb] │ Gul Ahmed    │GAH- │Stitc│Gul    │ 34    │11.2K │
│   │        │ Formal Suit  │004  │hed  │Ahmed  │       │      │
│   │        │ (L)          │     │     │       │       │      │
│   │        │ [Active]     │     │     │       │       │      │
│   │        │              │     │     │       │       │      │
│ ☐ │[Thumb] │ SOHAYE       │SOH- │Unst.│SOHAYE │ 0     │ 10.8K│
│   │        │ Party Suit   │005  │itche│       │       │      │
│   │        │ (3-Piece)    │     │d    │       │       │      │
│   │        │ [Out of Stock]     │     │       │       │      │
│   │        │              │     │     │       │       │      │
│                                                                 │
│ [Select All] [Delete Selected] [Bulk Edit]                    │
│                                                                 │
│ Pagination: [◀ 1] [2] [3] [4] [▶] Showing 1-5 of 234 products │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5.3 Add/Edit Product Form

```
┌─────────────────────────────────────────────────────────────────┐
│ ADMIN > PRODUCTS > [+ ADD NEW PRODUCT]                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ BASIC INFORMATION                                              │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ Product Name*         [Khaadi Luxury 3-Piece Suit___________]  │
│ SKU*                  [KHA-20260224-001__________________]     │
│ Brand*                [Khaadi ▼]                              │
│ Category*             [Women > Stitched Suits ▼]              │
│ Subcategory           [Formal Stitched ▼]                     │
│ Collection            [Eid Collection 2026 ▼]                 │
│                                                                 │
│ Type*                 ◉ Stitched  ◯ Unstitched                │
│ Piece Type*           ◯ 2-Piece   ◉ 3-Piece                   │
│ Occasion*             [Formal, Wedding ▼] (Multi-select)      │
│                                                                 │
│ Description*          [Rich text editor with formatting]       │
│                       [________________________]                │
│                       [________________________]                │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ IMAGES                                                         │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ [Drag images here or] [Browse Files]                          │
│                                                                 │
│ ☑ Thumbnail 1 (Primary) - lifestyle image.jpg                │
│ ☐ Thumbnail 2 - close-up-texture.jpg                         │
│ ☐ Thumbnail 3 - color-swatch-navy.jpg                        │
│ ☐ Thumbnail 4 - model-side-view.jpg                          │
│ ☐ Thumbnail 5 - detail-embroidery.jpg                        │
│                                                                 │
│ [Add more images]                                             │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ VARIANTS (For Stitched)                                        │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ Size / Color Matrix:                                          │
│                                                                 │
│ Size \ Color │ Navy | Red | Green | Cream │ Stock │ SKU       │
│ ─────────────┼──────┼─────┼───────┼───────┼───────┼──────────  │
│ XS           │  ☑   │  ☑  │  ☐    │  ☑    │  12   │ KHA-XS-N  │
│ S            │  ☑   │  ☑  │  ☐    │  ☑    │  18   │ KHA-S-N   │
│ M            │  ☑   │  ☑  │  ☐    │  ☑    │  45   │ KHA-M-N   │
│ L            │  ☑   │  ☑  │  ☐    │  ☑    │  34   │ KHA-L-N   │
│ XL           │  ☑   │  ☑  │  ☐    │  ☑    │  28   │ KHA-XL-N  │
│ XXL          │  ☑   │  ☑  │  ☐    │  ☑    │  15   │ KHA-XXL-N │
│                                                                 │
│ [Add more colors/sizes]                                       │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ PRICING                                                        │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ Cost Price*           [PKR 9,000_________________]             │
│ Selling Price*        [PKR 15,000________________]             │
│ Discount Type         ◉ Percentage  ◯ Fixed Amount            │
│ Discount %            [30______________________]%              │
│ Final Price (Auto)    PKR 10,500                             │
│                                                                 │
│ Compare at Price      [PKR 18,000________________]             │
│ (Strikethrough price)                                         │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ INVENTORY                                                      │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ Total Stock*          [200_______________________]             │
│ Low Stock Threshold   [10________________________]             │
│ Reorder Point         [50________________________]             │
│                                                                 │
│ Status*               ◉ Active   ◯ Draft   ◯ Inactive          │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ SEWING/TAILORING TIPS (For Unstitched)                        │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ Recommended Designs   [Straight, A-Line, Sharara__________]   │
│ Sleeve Options        [Full, 3/4, Cap_________________]        │
│ Lining Suggestion     [Light cotton recommended________]       │
│ Tailor Notes          [Pre-shrink before cutting______]        │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ SEO                                                            │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ Meta Title            [Khaadi Luxury 3-Piece Suit | AL Imran_] │
│ Meta Description      [Premium authentic Khaadi suit..._______] │
│ URL Slug              [/khaadi-luxury-3-piece-suit____________] │
│ Tags                  [Stitched, Formal, Wedding, Luxury______] │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ SETTINGS                                                       │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ ☑ Featured Product                                            │
│ ☑ New Arrival (Automatically expires after 30 days)           │
│ ☐ Limited Edition                                             │
│ ☑ Best Seller                                                 │
│                                                                 │
│ Publish Date          [24 Feb 2026_________________] Now      │
│ Visibility            ◉ Public  ◯ Hidden                      │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ [← BACK] [SAVE DRAFT] [PUBLISH]                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5.4 Order Management Interface

```
┌─────────────────────────────────────────────────────────────────┐
│ ADMIN > ORDERS                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Search: [Order # or Customer___]  Filter: [Status ▼]          │
│ Date Range: [24 Feb] to [24 Feb]  [Apply]                     │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ ORDER TABLE:                                                   │
│                                                                 │
│ ☐ | Order #        | Customer    | Items | Total   | Status    │
│   │                │             │       │         │           │
│ ☑ │ ALI-20260224-  │ Fatima K.   │ 3     │ 22,040 │ Processing│
│   │ 001            │ 0300-123456 │       │        │ [Details] │
│   │                │             │       │         │           │
│ ☑ │ ALI-20260224-  │ Aisha M.    │ 1     │ 12,600 │ Shipped   │
│   │ 002            │ 0300-234567 │       │        │ [Details] │
│   │                │             │       │         │           │
│ ☐ │ ALI-20260224-  │ Hira N.     │ 2     │ 19,200 │ Confirmed │
│   │ 003            │ 0321-345678 │       │        │ [Details] │
│   │                │             │       │         │           │
│ ☐ │ ALI-20260224-  │ Mirza H.    │ 4     │ 38,500 │ Pending   │
│   │ 004            │ 0333-456789 │       │        │ [Details] │
│   │                │             │       │         │           │
│ ☐ │ ALI-20260224-  │ Zainab A.   │ 1     │  8,500 │ Delivered │
│   │ 005            │ 0345-567890 │       │        │ [Details] │
│   │                │             │       │         │           │
│                                                                 │
│ [Select All] [Mark as Shipped] [Print Labels]                 │
│                                                                 │
│ Pagination: [◀ 1] [2] [3] ... [▶]                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

ORDER DETAIL PAGE (Click [Details]):

┌─────────────────────────────────────────────────────────────────┐
│ ORDER #: ALI-20260224-001                                       │
│ [← Back to Orders]                                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ORDER STATUS: Processing                                       │
│ Status Timeline: [Created ✓] [Confirmed ✓] [Processing ●]     │
│                 [Shipped ○] [Delivered ○]                     │
│                                                                 │
│ [Mark as Confirmed] [Mark as Shipped] [Cancel Order]          │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ CUSTOMER INFORMATION                                           │
│ ─────────────────────────────────────────────────────────────  │
│ Name: Fatima Khan                                             │
│ Email: fatima.khan@email.com                                  │
│ Phone: 0300-1234567                                           │
│ Customer Since: 15 Dec 2024                                   │
│ Total Orders: 8 | Lifetime Value: PKR 145,200                │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ ORDERED ITEMS                                                  │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ 1. Khaadi Luxury Suit (M, Navy)     Qty: 1    PKR 12,600      │
│ 2. Ethnic Unstitched 3-Piece        Qty: 1    PKR 8,500       │
│ 3. BAROQUE Dupatta (Red)            Qty: 1    PKR 2,500       │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ SHIPPING INFORMATION                                           │
│ ─────────────────────────────────────────────────────────────  │
│ Address: Apt 305, Pearl Towers, Karachi 75500                │
│ Shipping Method: Express (1-2 days)                           │
│ Tracking Number: [TCS123456789]  [Link to Courier]           │
│ Estimated Delivery: 26 Feb 2026                               │
│                                                                 │
│ [Print Shipping Label]                                        │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ PAYMENT INFORMATION                                            │
│ ─────────────────────────────────────────────────────────────  │
│ Payment Method: Visa (****4242)                               │
│ Amount: PKR 22,040                                            │
│ Payment Status: Completed ✓                                   │
│ Transaction ID: visa_txn_12345678                             │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ PRICING BREAKDOWN                                              │
│ ─────────────────────────────────────────────────────────────  │
│ Subtotal:                PKR 23,600                           │
│ Shipping:                PKR 800                              │
│ Discount (WELCOME10):    -PKR 2,360                           │
│ Tax:                     PKR 0                                │
│ ─────────────────────────────────────────────────────────────  │
│ Total:                   PKR 22,040                           │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ ADMIN NOTES                                                    │
│ ─────────────────────────────────────────────────────────────  │
│ [Text Area for internal notes]                                │
│ Fragile items - handle with care                              │
│                                                                 │
│ [Save Notes]                                                  │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ ACTIONS                                                        │
│ ─────────────────────────────────────────────────────────────  │
│ [Send Email to Customer] [Print Invoice] [Generate Return Label]│
│ [View Customer Profile] [Contact Customer via WhatsApp]       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5.5 Analytics Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│ ADMIN > ANALYTICS                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Date Range: [24 Feb 2026 ▼] to [24 Feb 2026 ▼]               │
│ Preset: [Today] [This Week] [This Month] [Last 30 Days] [YTD] │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ SALES METRICS                                                  │
│                                                                 │
│ Total Revenue        PKR 3,450,200  (↑ 18% vs last month)     │
│ Total Orders         523 Orders     (↑ 12% vs last month)     │
│ Avg Order Value      PKR 6,594      (↑ 5% vs last month)      │
│ Conversion Rate      0.72%          (↑ 0.08% vs last month)   │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ SALES BY BRAND (Last 30 Days)                                 │
│                                                                 │
│ Khaadi       PKR 1,240,000  █████████████░░░ (36%)            │
│ Gul Ahmed    PKR 780,000    ████████░░░░░░░░ (23%)            │
│ BAROQUE      PKR 540,000    ██████░░░░░░░░░░ (16%)            │
│ Ethnic       PKR 380,000    ████░░░░░░░░░░░░ (11%)            │
│ ALKARAM      PKR 260,000    ███░░░░░░░░░░░░░ (8%)             │
│ Others       PKR 250,200    ███░░░░░░░░░░░░░ (6%)             │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ SALES BY CATEGORY (Last 30 Days)                             │
│                                                                 │
│ Stitched    PKR 2,087,000  ████████████░░░░ (60%)            │
│ Unstitched  PKR 1,190,200  █████████░░░░░░░ (35%)            │
│ Accessories PKR 173,000    █░░░░░░░░░░░░░░░ (5%)             │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ TOP 10 SELLING PRODUCTS (This Month)                         │
│                                                                 │
│ 1. Khaadi Luxury Suit (All sizes)      125 units  PKR 1.65M   │
│ 2. Ethnic Unstitched 3-Piece           87 units   PKR 739K    │
│ 3. Gul Ahmed Formal Suit               65 units   PKR 731K    │
│ 4. BAROQUE Dupatta (Embroidered)       234 units  PKR 585K    │
│ 5. ALKARAM Casual Unstitched           42 units   PKR 357K    │
│ 6. J. Premium Suit                     28 units   PKR 476K    │
│ 7. SOHAYE Party Wear                   45 units   PKR 432K    │
│ 8. Zellbury Formal                     34 units   PKR 354K    │
│ 9. Saya Luxury Collection              22 units   PKR 418K    │
│ 10. Bonanza Casual Suit                56 units   PKR 302K    │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ CUSTOMER METRICS                                               │
│                                                                 │
│ New Customers      234 (↑ 22% vs last month)                  │
│ Returning Customers 289 (55% of orders)                       │
│ Email Subscribers  8,450 (↑ 12% vs last month)               │
│ Avg Customer Rating 4.6/5 (Based on 892 reviews)             │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ TRAFFIC & ENGAGEMENT                                           │
│                                                                 │
│ Total Visitors      185,420 (↑ 18% vs last month)             │
│ New Visitors        142,340 (77%)                             │
│ Returning Visitors  43,080 (23%)                              │
│ Avg Session Length  3m 42s (↑ 18s vs last month)             │
│ Pages per Session   4.3 (↑ 0.5 vs last month)                │
│ Bounce Rate         42% (↓ 3% vs last month)                  │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ TRAFFIC SOURCES                                                │
│                                                                 │
│ Direct              42,340 (23%)    ████░░░░░░░░░░░░░         │
│ Organic Search      68,900 (37%)    █████████░░░░░░░░         │
│ Social Media        45,230 (24%)    ██████░░░░░░░░░░░         │
│ Paid Ads            28,950 (16%)    ████░░░░░░░░░░░░░         │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ [Export Report]  [Download CSV]  [Email Report]               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5.6 Coupon Management

```
┌─────────────────────────────────────────────────────────────────┐
│ ADMIN > COUPONS & DISCOUNTS                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ [+ CREATE NEW COUPON]  Search: [_______]  Filter: [Active ▼]  │
│                                                                 │
│ COUPON LIST:                                                   │
│                                                                 │
│ Code   | Type          | Value | Usage | Valid Until | Active  │
│ ─────────────────────────────────────────────────────────────  │
│ WELCOME│ Percentage    │ 10%   │ 234/  │ 31 Dec 2026│ ✓      │
│ 10     │               │       │ 1000  │            │         │
│        │               │       │       │            │         │
│ SAVE15 │ Fixed Amount  │ 1500  │ 89/   │ 30 Mar 2026│ ✓      │
│        │ PKR           │       │ 500   │            │         │
│        │               │       │       │            │         │
│ EID20  │ Percentage    │ 20%   │ 456/  │ 28 Feb 2026│ ✓      │
│        │               │       │ 1000  │            │         │
│        │               │       │       │            │         │
│ FLASH50│ Percentage    │ 50%   │ 12/   │ 24 Feb 2026│ ✓      │
│        │               │       │ 100   │ (Expires   │         │
│        │               │       │       │ 6 hours)   │         │
│        │               │       │       │            │         │
│ LOYAL5 │ Percentage    │ 5%    │ 0/    │ 30 Apr 2026│ ✗      │
│        │               │       │ 500   │            │         │
│        │               │       │       │ (Inactive) │         │
│                                                                 │
│ [View Details] [Edit] [Delete]  options for each coupon       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

CREATE NEW COUPON:

┌─────────────────────────────────────────────────────────────────┐
│ CREATE NEW COUPON                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Code*                 [WELCOME15________________]               │
│ Description           [New customer discount____]               │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ DISCOUNT TYPE                                                  │
│ ◉ Percentage Off  ◯ Fixed Amount  ◯ Free Shipping             │
│                                                                 │
│ Discount Value*       [15____________]%                        │
│ (Or PKR amount if fixed)                                      │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ APPLICABILITY                                                  │
│                                                                 │
│ Apply To:             ◉ All Products                           │
│                       ◯ Specific Categories                    │
│                       ◯ Specific Brands                        │
│                       ◯ Specific Products                      │
│                                                                 │
│ If specific: [Select categories/brands/products__]            │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ RESTRICTIONS                                                   │
│                                                                 │
│ Min Purchase Amount   [PKR 3,000________________]               │
│ Max Discount Limit    [PKR 5,000________________]               │
│ Total Usage Limit     [1000_____________________]               │
│ Per Customer Limit    [1__________________________]             │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ VALIDITY                                                       │
│                                                                 │
│ Valid From            [24 Feb 2026_____________]               │
│ Valid Until           [31 Mar 2026______________]               │
│                                                                 │
│ ☑ Active              (Toggle to enable/disable)               │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ [← BACK]  [SAVE DRAFT]  [PUBLISH]                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5.7 Inventory & Low Stock Alerts

```
┌─────────────────────────────────────────────────────────────────┐
│ ADMIN > INVENTORY MANAGEMENT                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ ⚠️ LOW STOCK ALERT (9 Items Below Threshold)                   │
│                                                                 │
│ Product                 | Current Stock | Threshold | Status    │
│ ─────────────────────────────────────────────────────────────  │
│ Khaadi Luxury (M, Navy) │ 3 units       │ 10        │ CRITICAL │
│ BAROQUE Dupatta (Red)   │ 2 units       │ 5         │ CRITICAL │
│ Ethnic Wedding (L)      │ 5 units       │ 10        │ LOW      │
│ Gul Ahmed Formal        │ 8 units       │ 20        │ LOW      │
│ ALKARAM Casual          │ 15 units      │ 25        │ LOW      │
│ [More alerts...]                                               │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ INVENTORY TRACKING                                             │
│                                                                 │
│ Search: [Product Name / SKU______]                             │
│                                                                 │
│ Product              │ Current │ Sold This | Reorder | Status  │
│                      │ Stock   │ Month     │ Point   │         │
│ ─────────────────────────────────────────────────────────────  │
│ Khaadi Luxury Suit   │ 234     │ 125       │ 50      │ ✓ Okay  │
│ Ethnic Unstitched    │ 189     │ 87        │ 30      │ ✓ Okay  │
│ BAROQUE Dupatta      │ 456     │ 234       │ 100     │ ✓ Okay  │
│ Gul Ahmed Formal     │ 123     │ 65        │ 40      │ ✓ Okay  │
│ SOHAYE Party         │ 67      │ 45        │ 25      │ ✓ Okay  │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ STOCK ADJUSTMENT LOG                                           │
│                                                                 │
│ Date       │ Product              │ Action    │ Qty | By       │
│ ─────────────────────────────────────────────────────────────  │
│ 24 Feb     │ Khaadi Luxury        │ Sale      │ -3  │ System   │
│ 24 Feb     │ Ethnic Unstitched    │ Sale      │ -1  │ System   │
│ 23 Feb     │ BAROQUE Dupatta      │ Return    │ +2  │ Admin-1  │
│ 23 Feb     │ Gul Ahmed Formal     │ Damage    │ -5  │ Admin-2  │
│ 22 Feb     │ ALKARAM Casual       │ Restock   │ +50 │ Admin-1  │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ [Request Reorder]  [Adjust Stock]  [View History]             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5.8 Brand Management

```
┌─────────────────────────────────────────────────────────────────┐
│ ADMIN > BRANDS                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ [+ ADD BRAND]  Search: [_______]                               │
│                                                                 │
│ BRAND LIST:                                                    │
│                                                                 │
│ Logo | Brand Name | Products | Monthly Sales | Status          │
│ ─────────────────────────────────────────────────────────────  │
│ [LG] │ Khaadi     │ 145      │ PKR 1.24M     │ Active          │
│ [LG] │ Gul Ahmed  │ 87       │ PKR 780K      │ Active          │
│ [LG] │ J.         │ 45       │ PKR 680K      │ Active          │
│ [LG] │ BAROQUE    │ 78       │ PKR 540K      │ Active          │
│ [LG] │ Ethnic     │ 56       │ PKR 420K      │ Active          │
│ [LG] │ ALKARAM    │ 63       │ PKR 330K      │ Active          │
│ [LG] │ Saya       │ 42       │ PKR 285K      │ Active          │
│ [LG] │ SOHAYE     │ 34       │ PKR 210K      │ Active          │
│ [LG] │ Bonanza    │ 29       │ PKR 145K      │ Active          │
│ [LG] │ MTJ        │ 18       │ PKR 95K       │ Inactive        │
│                                                                 │
│ [View Details] [Edit] [Deactivate]  for each brand            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

ADD/EDIT BRAND:

┌─────────────────────────────────────────────────────────────────┐
│ ADD / EDIT BRAND                                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Brand Name*           [Khaadi__________________________]        │
│ Brand URL             [https://www.khaadi.com__________]       │
│ Description           [Leading Pakistani brand since 1975...]  │
│                                                                 │
│ Logo Upload           [Browse Files] [Upload Logo.png_]       │
│                       [Preview: 200x200px]                    │
│                                                                 │
│ Status                ◉ Active  ◯ Inactive                    │
│ Featured Brand        ☑ Yes  ☐ No                             │
│ Display Order         [1__________________________]             │
│                                                                 │
│ [← BACK]  [SAVE]                                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5.9 Mobile Admin Dashboard (Simplified)

```
┌──────────────────────────────┐
│ ☰ | ADMIN PANEL | 🔔         │
├──────────────────────────────┤
│ Welcome, Admin User          │
│ Last Login: 24 Feb, 9:30 AM  │
│                              │
├──────────────────────────────┤
│ TODAY'S METRICS              │
│                              │
│ Sales: PKR 185,600  ↑ 12%    │
│ Orders: 24          ↑ 8%     │
│ Visitors: 3,420     ↑ 15%    │
│ Conversion: 0.7%    ↑ 0.2%   │
│                              │
├──────────────────────────────┤
│ QUICK ACTIONS                │
│                              │
│ [+ Add Product]              │
│ [View Orders]                │
│ [View Customers]             │
│ [New Coupon]                 │
│                              │
├──────────────────────────────┤
│ LOW STOCK ALERTS             │
│ ⚠️ 9 items below threshold   │
│                              │
│ Khaadi Luxury: 3 units       │
│ BAROQUE Dupatta: 2 units     │
│ Ethnic Wedding: 5 units      │
│                              │
│ [View All Alerts]            │
│                              │
├──────────────────────────────┤
│ RECENT ORDERS                │
│                              │
│ ALI-20260224-001             │
│ Fatima K. | PKR 22,040       │
│ Status: Processing           │
│                              │
│ ALI-20260224-002             │
│ Aisha M. | PKR 12,600        │
│ Status: Shipped              │
│                              │
│ [View All Orders]            │
│                              │
├──────────────────────────────┤
│ MENU                         │
│ ├─ Dashboard (✓ Current)     │
│ ├─ Products                  │
│ ├─ Orders                    │
│ ├─ Customers                 │
│ ├─ Analytics                 │
│ ├─ Coupons                   │
│ ├─ Inventory                 │
│ ├─ Brands                    │
│ └─ [Settings] [Log Out]      │
│                              │
└──────────────────────────────┘
```

---

## 5.10 Optional Wholesale Portal

```
┌─────────────────────────────────────────────────────────────────┐
│ AL IMRAN WHOLESALE PORTAL                                       │
│ For Bulk Orders & Business Customers                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Welcome, Hassan (MTJ Boutique)                                 │
│ Account Type: Wholesale | Account Manager: Sarah Khan          │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ DASHBOARD                                                      │
│                                                                 │
│ Your Account Credit:   PKR 500,000                             │
│ Used This Month:       PKR 185,600                             │
│ Available:             PKR 314,400                             │
│ Your Discount Tier:    15% (Wholesale Pricing)                 │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ BULK PRODUCT CATALOG                                           │
│                                                                 │
│ Search: [_________]  Category: [All ▼]  Brand: [All ▼]        │
│                                                                 │
│ Product              | Bulk Price | Min Order | Stock          │
│ ─────────────────────────────────────────────────────────────  │
│ Khaadi Luxury (All)  │ PKR 10,710 │ 10 units  │ 234 available │
│ (15% discount)       │            │ (per size)│               │
│                                                                 │
│ Ethnic Unstitched    │ PKR 7,225  │ 5 units   │ 189 available │
│ (15% discount)       │            │           │               │
│                                                                 │
│ BAROQUE Collection   │ PKR 13,770 │ 10 units  │ 456 available │
│ (15% discount)       │            │           │               │
│                                                                 │
│ [Browse More Products]                                         │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ BULK ORDER BUILDER                                             │
│                                                                 │
│ Add items to create bulk order:                               │
│                                                                 │
│ Product           | Qty | Unit Price | Subtotal | Remove       │
│ ─────────────────────────────────────────────────────────────  │
│ Khaadi (M, Navy)  │ 15  │ 10,710     │ 160,650  │ [×]        │
│ Ethnic (Unst.)    │ 10  │ 7,225      │ 72,250   │ [×]        │
│ BAROQUE (Dupatta) │ 25  │ (per unit) │ 344,250  │ [×]        │
│                                                                 │
│ Subtotal:                                PKR 577,150           │
│ Your Discount (15%):                     -PKR 86,572           │
│ Shipping (Free for bulk):                FREE                 │
│ ─────────────────────────────────────────────────────────────  │
│ Total:                                   PKR 490,578           │
│                                                                 │
│ Payment Terms: [Credit (Net 30) ▼]  or [Pay Now]             │
│ Delivery: [Standard (5-7 days)] [Express (2-3 days, +5%)]    │
│                                                                 │
│ [SUBMIT BULK ORDER] [REQUEST QUOTE] [SAVE DRAFT]              │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ ORDER HISTORY                                                  │
│                                                                 │
│ Date      | Order #      | Items | Amount    | Status          │
│ ─────────────────────────────────────────────────────────────  │
│ 20 Feb    │ BULK-001-020 │ 50    │ 412,500   │ Delivered ✓    │
│ 15 Feb    │ BULK-002-015 │ 35    │ 298,750   │ Processing     │
│ 10 Feb    │ BULK-003-010 │ 42    │ 356,200   │ Shipped        │
│                                                                 │
│ ─────────────────────────────────────────────────────────────  │
│                                                                 │
│ ACCOUNT MANAGER CONTACT                                        │
│ Sarah Khan | sarah.khan@alimran.com | +92-300-9876543        │
│ [Chat with Manager] [Request Meeting] [View Contract]          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Summary Table: Admin Features & Conversion Impact

| Feature | Purpose | Conversion Impact | Frequency |
|---------|---------|------------------|-----------|
| **Real-time Dashboard** | Monitor business health | 10-15% faster decisions | Continuous |
| **Product Management** | Add/edit/remove inventory | 25-30% faster catalog updates | Daily |
| **Order Management** | Track & fulfill orders | 20% improvement in shipping speed | Real-time |
| **Analytics Dashboard** | Data-driven insights | 15-20% better marketing ROI | Daily |
| **Coupon Management** | Run promotional campaigns | 30-40% increase in conversion | Weekly |
| **Inventory Alerts** | Prevent stockouts | 5-10% revenue protection | Real-time |
| **Brand Management** | Organize brand data | 10-15% faster catalog organization | Monthly |
| **Wholesale Portal** | Enable B2B sales | 20-30% increase in B2B revenue | Continuous |

---

## END OF PARTS 3-5

**Complete UI/UX Specification for AL Imran Fabrics delivered:**
✅ Part 1: Homepage (Desktop + Mobile)
✅ Part 2: Product Pages (Stitched + Unstitched)
✅ Part 3: Category & Filtering Architecture
✅ Part 4: Cart & Checkout Flow
✅ Part 5: Admin Dashboard & Wholesale Portal

**Total Content:** 40,000+ words, production-ready wireframes, UX logic, and conversion strategies.

**Status:** Ready for Development Team
