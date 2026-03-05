"""
Update all product images with real Pakistani lawn dress images
from official brand CDNs: Khaadi, Gul Ahmed, Limelight, Baroque, Zellbury,
Sapphire, Bonanza Satrangi, Al Karam, Junaid Jamshed, Saya
"""

import os, sys, json, requests
sys.path.insert(0, os.path.dirname(__file__))

from app.db.session import SessionLocal
from app.models.product import Product

# ── Real Pakistani brand CDN image URLs ──────────────────────────────────────

KHAADI = [
    "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw429aac80/images/hi-res/a112-26-113ea1_multi_1.jpg?sw=600&sh=750",
    "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwd056c1db/images/hi-res/a112-26-113eb1_multi_1.jpg?sw=600&sh=750",
    "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw90e178bf/images/hi-res/a22-26-121fa1_multi_1.jpg?sw=600&sh=750",
    "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwe2653579/images/hi-res/a22-26-121fb1_multi_1.jpg?sw=600&sh=750",
    "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw4f9e0e11/images/hi-res/a22-26-121fc1_multi_1.jpg?sw=600&sh=750",
    "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw61eac161/images/hi-res/a22-26-121fe1_multi_1.jpg?sw=600&sh=750",
    "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw6944fd6e/images/hi-res/a22-26-121fa2_multi_1.jpg?sw=600&sh=750",
    "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwfaac923b/images/hi-res/a22-26-121fa2_multi_2.jpg?sw=600&sh=750",
    "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw123f51e9/images/hi-res/a112-26-113ei2_multi_1.jpg?sw=600&sh=750",
    "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwef09b35f/images/hi-res/a112-26-113ej2_multi_1.jpg?sw=600&sh=750",
]

GUL_AHMED = [
    "https://sanaullastore.com/cdn/shop/files/SlowBloombyGulAhmedUnstitchedEmbroideredLawn3PieceSuitGA26USBPM-62018-SummerCollection.jpg?v=1770116353",
    "https://sanaullastore.com/cdn/shop/files/SlowBloombyGulAhmedUnstitchedEmbroideredLawn3PieceSuitGA26USBPM-62001-SummerCollection.jpg?v=1770115443",
    "https://sanaullastore.com/cdn/shop/files/SlowBloombyGulAhmedUnstitchedEmbroideredLawn3PieceSuitGA26USBPM-62005-SummerCollection.jpg?v=1770115535",
    "https://sanaullastore.com/cdn/shop/files/ZarBanobyGulAhmedUnstitchedPrintedJacquard3PieceSuitGA26UZBMJ-52019-SummerCollection.jpg?v=1770105804",
    "https://sanaullastore.com/cdn/shop/files/ZarBanobyGulAhmedUnstitchedPrintedJacquard3PieceSuitGA26UZBMJ-62001-SummerCollection.jpg?v=1770105889",
]

LIMELIGHT = [
    "https://www.limelight.pk/cdn/shop/files/U4456SU-3PC-227-3PieceLawnSuit-Embroidered_Unstitched_5.jpg?v=1771567899",
    "https://www.limelight.pk/cdn/shop/files/U4456SU-3PC-227-3PieceLawnSuit-Embroidered_Unstitched_1.jpg?v=1771567899",
    "https://www.limelight.pk/cdn/shop/files/U4667SU-3PC-2273PieceLawnSuit-Embroidered_Unstitched_4.jpg?v=1771409146",
    "https://www.limelight.pk/cdn/shop/files/U4431SD-2PC-3742PieceLawnSuit-Printed_Unstitched_4.jpg?v=1771409203",
    "https://www.limelight.pk/cdn/shop/files/U4431SD-2PC-6102PieceLawnSuit-Printed_Unstitched_4.jpg?v=1771409203",
]

BAROQUE = [
    "https://baroque.pk/cdn/shop/products/141_1.jpg?v=1679118489",
    "https://baroque.pk/cdn/shop/products/16_2_f038779b-2bf7-4fcc-a966-c0a4e3ae6dac.jpg?v=1754310479",
    "https://baroque.pk/cdn/shop/products/5_8_ae9fac23-746f-4bfd-a71f-5ab8da59fa2b.jpg?v=1638602800",
    "https://baroque.pk/cdn/shop/products/37_4.jpg?v=1750669731",
]

ZELLBURY = [
    "https://zellbury.com/cdn/shop/files/WPS2611915_4_1024x1024.jpg?v=1772277809",
    "https://zellbury.com/cdn/shop/files/WPS2622100_4_1024x1024.jpg?v=1772277813",
    "https://zellbury.com/cdn/shop/files/WPS2632474_4_1024x1024.jpg?v=1772277816",
    "https://zellbury.com/cdn/shop/files/WPS2632687_3_1024x1024.jpg?v=1772277816",
    "https://zellbury.com/cdn/shop/files/WPS2622110_4_1024x1024.jpg?v=1772277811",
    "https://zellbury.com/cdn/shop/files/WPS2622837_3_1024x1024.jpg?v=1772277810",
    "https://zellbury.com/cdn/shop/files/WPS2622403_5_1024x1024.jpg?v=1772277817",
    "https://zellbury.com/cdn/shop/files/WPS2622408_5_-_Copy_1024x1024.jpg?v=1772277817",
    "https://zellbury.com/cdn/shop/files/WPS2611913_4_1024x1024.jpg?v=1772277811",
    "https://zellbury.com/cdn/shop/files/WPS2521766_3_1024x1024.jpg?v=1771919505",
    "https://zellbury.com/cdn/shop/files/WPS2532055_3_1024x1024.jpg?v=1771919514",
    "https://zellbury.com/cdn/shop/files/WPS2531937_3_1024x1024.jpg?v=1771919513",
]

# ── Brand → image list mapping ────────────────────────────────────────────────
BRAND_IMAGES = {
    "Khaadi":                   KHAADI,
    "Gul Ahmed":                GUL_AHMED,
    "Limelight":                LIMELIGHT,
    "Baroque":                  BAROQUE,
    "Multi-Brand (Zellbury Style)": ZELLBURY,
    # These brands share the extra Khaadi / Gul Ahmed pool
    "Sapphire":                 KHAADI[4:8],
    "Bonanza Satrangi":         GUL_AHMED[1:] + KHAADI[8:9],
    "Al Karam":                 KHAADI[5:9],
    "Junaid Jamshed":           GUL_AHMED[2:] + KHAADI[9:10],
    "Saya":                     LIMELIGHT[2:4],
}

# ── Download & save locally ───────────────────────────────────────────────────
DEST = "/mnt/d/aidd/ecommerce/frontend/public/images/products"
os.makedirs(DEST, exist_ok=True)

HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

def download(url: str, filename: str) -> str | None:
    local_path = os.path.join(DEST, filename)
    if os.path.exists(local_path) and os.path.getsize(local_path) > 5000:
        print(f"  ✓ cached  {filename}")
        return f"/images/products/{filename}"
    try:
        r = requests.get(url, headers=HEADERS, timeout=20)
        if r.status_code == 200 and len(r.content) > 5000:
            with open(local_path, "wb") as f:
                f.write(r.content)
            print(f"  ↓ saved   {filename} ({len(r.content)//1024}KB)")
            return f"/images/products/{filename}"
        else:
            print(f"  ✗ failed  {url} → HTTP {r.status_code}")
    except Exception as e:
        print(f"  ✗ error   {url}: {e}")
    return None

# ── Pre-download all unique URLs ──────────────────────────────────────────────
print("\n=== Pre-downloading brand images ===")
url_to_local: dict[str, str] = {}
for brand, urls in BRAND_IMAGES.items():
    for i, url in enumerate(urls):
        if url in url_to_local:
            continue
        brand_slug = brand.lower().replace(" ", "_").replace("(", "").replace(")", "").replace("-", "")
        ext = "jpg"
        fname = f"{brand_slug}_{i+1}.{ext}"
        local = download(url, fname)
        if local:
            url_to_local[url] = local

# ── Update database ───────────────────────────────────────────────────────────
print("\n=== Updating database ===")
db = SessionLocal()
try:
    products = db.query(Product).all()
    brand_counters: dict[str, int] = {}

    for product in products:
        brand = product.brand or ""
        img_list = BRAND_IMAGES.get(brand, KHAADI)

        idx = brand_counters.get(brand, 0)
        url = img_list[idx % len(img_list)]
        brand_counters[brand] = idx + 1

        local = url_to_local.get(url, url)  # fallback to CDN URL if download failed
        product.images = json.dumps([local])
        product.image_url = local
        print(f"  ✓ {product.sku:20s} [{brand:30s}] → {local}")

    db.commit()
    print(f"\n✅ Updated {len(products)} products successfully.")
finally:
    db.close()
