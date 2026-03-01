"""
Add more brands, categories, and products to the DB.
Run: python add_products.py  (from backend/ with venv active)
"""
import json, os, sys, uuid
from pathlib import Path

# --- env ---
env_file = Path("../.env")
for line in env_file.read_text().splitlines():
    line = line.strip()
    if line and not line.startswith("#") and "=" in line:
        k, _, v = line.partition("=")
        os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.environ["DATABASE_URL"].replace("postgresql+asyncpg://", "postgresql://")
engine = create_engine(DATABASE_URL, echo=False)
Session = sessionmaker(bind=engine)

sys.path.insert(0, ".")
import app.models  # register metadata
from app.models import Brand, Category, Product

# ── BRANDS ───────────────────────────────────────────────────────────────────
BRANDS = [
    {"name": "Khaadi",           "slug": "khaadi"},
    {"name": "Gul Ahmed",        "slug": "gul-ahmed"},
    {"name": "Junaid Jamshed",   "slug": "junaid-jamshed"},
    {"name": "Sapphire",         "slug": "sapphire"},
    {"name": "Saya",             "slug": "saya"},
    {"name": "Baroque",          "slug": "baroque"},
    {"name": "Al Karam",         "slug": "al-karam"},
    {"name": "Bonanza Satrangi", "slug": "bonanza-satrangi"},
    {"name": "Limelight",        "slug": "limelight"},
]

# ── CATEGORIES ────────────────────────────────────────────────────────────────
CATEGORIES = [
    {"name": "Women Lawn Unstitched",   "slug": "women-lawn-unstitched"},
    {"name": "Women Stitched Pret",     "slug": "women-stitched-pret"},
    {"name": "Men Shalwar Kameez",      "slug": "men-shalwar-kameez"},
    {"name": "Men Kurta",               "slug": "men-kurta"},
    {"name": "Kids Collection",         "slug": "kids-collection"},
    {"name": "Luxury Formal",           "slug": "luxury-formal"},
    {"name": "Winter Khaddar",          "slug": "winter-khaddar"},
    {"name": "Bridal & Wedding",        "slug": "bridal-wedding"},
]

# ── PRODUCTS ──────────────────────────────────────────────────────────────────
# (brand / category must match names above or existing DB names)
PRODUCTS = [
    # ── Khaadi ──────────────────────────────────────────────────────────────
    {
        "sku": "KHD-L-001", "name": "Khaadi Floral Lawn 3-Piece",
        "slug": "khaadi-floral-lawn-3-piece",
        "brand": "Khaadi", "category": "Women Lawn Unstitched",
        "description": "Vibrant floral printed lawn with embroidered neckline and chiffon dupatta.",
        "selling_price": 4290.0, "discount_percentage": 10,
        "total_stock": 55, "type": "unstitched", "piece_type": "3-piece",
        "is_featured": True, "is_new_arrival": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1595521624a6-6c85c2e4d0e6?w=600&h=750&fit=crop"]),
        "tags": "women,lawn,floral,unstitched,summer",
    },
    {
        "sku": "KHD-L-002", "name": "Khaadi Geometric Print Lawn",
        "slug": "khaadi-geometric-print-lawn",
        "brand": "Khaadi", "category": "Women Lawn Unstitched",
        "description": "Bold geometric printed lawn with contrast embroidered dupatta.",
        "selling_price": 3890.0, "discount_percentage": 0,
        "total_stock": 40, "type": "unstitched", "piece_type": "2-piece",
        "is_featured": False, "is_bestseller": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1617623814075-e51df1bdc82f?w=600&h=750&fit=crop"]),
        "tags": "women,lawn,geometric,unstitched",
    },
    {
        "sku": "KHD-P-001", "name": "Khaadi Embroidered Pret Shirt",
        "slug": "khaadi-embroidered-pret-shirt",
        "brand": "Khaadi", "category": "Women Stitched Pret",
        "description": "Ready-to-wear embroidered shirt in premium cotton fabric.",
        "selling_price": 5490.0, "discount_percentage": 15,
        "total_stock": 30, "type": "stitched", "piece_type": "single",
        "is_featured": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1618932260643-30f82d9a8444?w=600&h=750&fit=crop"]),
        "tags": "women,stitched,pret,embroidered",
    },
    {
        "sku": "KHD-M-001", "name": "Khaadi Men Classic Kurta",
        "slug": "khaadi-men-classic-kurta",
        "brand": "Khaadi", "category": "Men Kurta",
        "description": "Classic men's kurta in premium cotton with subtle texture.",
        "selling_price": 3200.0, "discount_percentage": 0,
        "total_stock": 45, "type": "stitched", "piece_type": "single",
        "is_featured": False, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop"]),
        "tags": "men,kurta,cotton,classic",
    },

    # ── Gul Ahmed ───────────────────────────────────────────────────────────
    {
        "sku": "GA-L-001", "name": "Gul Ahmed Summer Lawn Collection",
        "slug": "gul-ahmed-summer-lawn-collection",
        "brand": "Gul Ahmed", "category": "Women Lawn Unstitched",
        "description": "Signature summer lawn with delicate embroidery and printed dupatta.",
        "selling_price": 5200.0, "discount_percentage": 20,
        "total_stock": 60, "type": "unstitched", "piece_type": "3-piece",
        "is_featured": True, "is_bestseller": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1606529957590-dffbdf47e3a1?w=600&h=750&fit=crop"]),
        "tags": "women,lawn,summer,unstitched,embroidered",
    },
    {
        "sku": "GA-W-001", "name": "Gul Ahmed Winter Khaddar Suit",
        "slug": "gul-ahmed-winter-khaddar-suit",
        "brand": "Gul Ahmed", "category": "Winter Khaddar",
        "description": "Warm khaddar 3-piece suit with embroidered neckline for winter.",
        "selling_price": 6800.0, "discount_percentage": 10,
        "total_stock": 35, "type": "unstitched", "piece_type": "3-piece",
        "is_featured": False, "is_new_arrival": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1572804419223-0ac36cb5d85f?w=600&h=750&fit=crop"]),
        "tags": "women,khaddar,winter,unstitched",
    },
    {
        "sku": "GA-M-001", "name": "Gul Ahmed Men Wash & Wear",
        "slug": "gul-ahmed-men-wash-and-wear",
        "brand": "Gul Ahmed", "category": "Men Shalwar Kameez",
        "description": "Premium wash & wear shalwar kameez for men — wrinkle-resistant.",
        "selling_price": 4500.0, "discount_percentage": 0,
        "total_stock": 50, "type": "unstitched", "piece_type": "2-piece",
        "is_featured": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1592286927505-1def25115558?w=600&h=750&fit=crop"]),
        "tags": "men,shalwar-kameez,wash-and-wear",
    },

    # ── Junaid Jamshed ──────────────────────────────────────────────────────
    {
        "sku": "JJ-L-001", "name": "J. Luxury Embroidered Lawn",
        "slug": "jj-luxury-embroidered-lawn",
        "brand": "Junaid Jamshed", "category": "Women Lawn Unstitched",
        "description": "Luxury lawn with intricate thread embroidery on shirt and dupatta.",
        "selling_price": 8900.0, "discount_percentage": 0,
        "total_stock": 20, "type": "unstitched", "piece_type": "3-piece",
        "is_featured": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1617623814075-e51df1bdc82f?w=600&h=750&fit=crop"]),
        "tags": "women,lawn,luxury,embroidered",
    },
    {
        "sku": "JJ-F-001", "name": "J. Formal Chiffon Suit",
        "slug": "jj-formal-chiffon-suit",
        "brand": "Junaid Jamshed", "category": "Luxury Formal",
        "description": "Elegant chiffon formal suit with heavy embroidery for weddings and events.",
        "selling_price": 18500.0, "discount_percentage": 0,
        "total_stock": 10, "type": "stitched", "piece_type": "3-piece",
        "is_featured": True, "is_limited_edition": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1595521624a6-6c85c2e4d0e6?w=600&h=750&fit=crop"]),
        "tags": "women,formal,chiffon,luxury,wedding",
    },
    {
        "sku": "JJ-M-001", "name": "J. Men Embroidered Kurta Pajama",
        "slug": "jj-men-embroidered-kurta-pajama",
        "brand": "Junaid Jamshed", "category": "Men Kurta",
        "description": "Embroidered kurta pajama set — perfect for Eid and formal occasions.",
        "selling_price": 7800.0, "discount_percentage": 10,
        "total_stock": 25, "type": "stitched", "piece_type": "2-piece",
        "is_featured": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop"]),
        "tags": "men,kurta,pajama,embroidered,eid",
    },

    # ── Sapphire ─────────────────────────────────────────────────────────────
    {
        "sku": "SAP-P-001", "name": "Sapphire Linen Shirt",
        "slug": "sapphire-linen-shirt",
        "brand": "Sapphire", "category": "Women Stitched Pret",
        "description": "Minimalist linen shirt in earth tones — effortless everyday style.",
        "selling_price": 3290.0, "discount_percentage": 0,
        "total_stock": 70, "type": "stitched", "piece_type": "single",
        "is_featured": False, "is_bestseller": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1618932260643-30f82d9a8444?w=600&h=750&fit=crop"]),
        "tags": "women,stitched,linen,casual,pret",
    },
    {
        "sku": "SAP-P-002", "name": "Sapphire Co-Ord Set",
        "slug": "sapphire-co-ord-set",
        "brand": "Sapphire", "category": "Women Stitched Pret",
        "description": "Matching shirt and trouser co-ord set in premium lawn fabric.",
        "selling_price": 5990.0, "discount_percentage": 15,
        "total_stock": 40, "type": "stitched", "piece_type": "2-piece",
        "is_featured": True, "is_new_arrival": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1606529957590-dffbdf47e3a1?w=600&h=750&fit=crop"]),
        "tags": "women,co-ord,stitched,pret,matching",
    },

    # ── Saya ─────────────────────────────────────────────────────────────────
    {
        "sku": "SAYA-P-001", "name": "Saya Printed Lawn Shirt",
        "slug": "saya-printed-lawn-shirt",
        "brand": "Saya", "category": "Women Stitched Pret",
        "description": "Bright printed ready-to-wear lawn shirt for summer.",
        "selling_price": 2490.0, "discount_percentage": 20,
        "total_stock": 80, "type": "stitched", "piece_type": "single",
        "is_featured": False, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1572804419223-0ac36cb5d85f?w=600&h=750&fit=crop"]),
        "tags": "women,lawn,printed,stitched,casual",
    },
    {
        "sku": "SAYA-K-001", "name": "Saya Kids Frock",
        "slug": "saya-kids-frock",
        "brand": "Saya", "category": "Kids Collection",
        "description": "Adorable embroidered frock for girls aged 3-12.",
        "selling_price": 1890.0, "discount_percentage": 0,
        "total_stock": 50, "type": "stitched", "piece_type": "single",
        "is_featured": False, "is_new_arrival": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1595521624a6-6c85c2e4d0e6?w=600&h=750&fit=crop"]),
        "tags": "kids,girls,frock,embroidered",
    },

    # ── Baroque ───────────────────────────────────────────────────────────────
    {
        "sku": "BRQ-L-001", "name": "Baroque Embroidered Lawn",
        "slug": "baroque-embroidered-lawn",
        "brand": "Baroque", "category": "Women Lawn Unstitched",
        "description": "Signature Baroque embroidered lawn — rich detailing on shirt and dupatta.",
        "selling_price": 7500.0, "discount_percentage": 10,
        "total_stock": 30, "type": "unstitched", "piece_type": "3-piece",
        "is_featured": True, "is_bestseller": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1617623814075-e51df1bdc82f?w=600&h=750&fit=crop"]),
        "tags": "women,lawn,embroidered,baroque,luxury",
    },
    {
        "sku": "BRQ-F-001", "name": "Baroque Wedding Formal",
        "slug": "baroque-wedding-formal",
        "brand": "Baroque", "category": "Bridal & Wedding",
        "description": "Opulent bridal formal with zardozi and resham embroidery on velvet.",
        "selling_price": 35000.0, "discount_percentage": 0,
        "total_stock": 5, "type": "stitched", "piece_type": "3-piece",
        "is_featured": True, "is_limited_edition": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1592286927505-1def25115558?w=600&h=750&fit=crop"]),
        "tags": "bridal,wedding,formal,luxury,velvet",
    },

    # ── Al Karam ──────────────────────────────────────────────────────────────
    {
        "sku": "AK-L-001", "name": "Al Karam Studio Lawn",
        "slug": "al-karam-studio-lawn",
        "brand": "Al Karam", "category": "Women Lawn Unstitched",
        "description": "Digital printed lawn with embroidered shirt front and printed dupatta.",
        "selling_price": 4800.0, "discount_percentage": 10,
        "total_stock": 45, "type": "unstitched", "piece_type": "3-piece",
        "is_featured": False, "is_new_arrival": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1595521624a6-6c85c2e4d0e6?w=600&h=750&fit=crop"]),
        "tags": "women,lawn,digital-print,unstitched",
    },
    {
        "sku": "AK-W-001", "name": "Al Karam Khaddar Winter",
        "slug": "al-karam-khaddar-winter",
        "brand": "Al Karam", "category": "Winter Khaddar",
        "description": "Cozy khaddar suit with embroidered detailing for chilly winters.",
        "selling_price": 5600.0, "discount_percentage": 15,
        "total_stock": 35, "type": "unstitched", "piece_type": "3-piece",
        "is_featured": False, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1606529957590-dffbdf47e3a1?w=600&h=750&fit=crop"]),
        "tags": "women,khaddar,winter,unstitched",
    },
    {
        "sku": "AK-M-001", "name": "Al Karam Men Khaddar",
        "slug": "al-karam-men-khaddar",
        "brand": "Al Karam", "category": "Men Shalwar Kameez",
        "description": "Premium khaddar shalwar kameez for men — ideal for winter.",
        "selling_price": 3800.0, "discount_percentage": 0,
        "total_stock": 40, "type": "unstitched", "piece_type": "2-piece",
        "is_featured": False, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=750&fit=crop"]),
        "tags": "men,khaddar,winter,shalwar-kameez",
    },

    # ── Bonanza Satrangi ─────────────────────────────────────────────────────
    {
        "sku": "BNZ-L-001", "name": "Bonanza Satrangi Lawn Suit",
        "slug": "bonanza-satrangi-lawn-suit",
        "brand": "Bonanza Satrangi", "category": "Women Lawn Unstitched",
        "description": "Colourful Satrangi lawn — vibrant prints for a bold summer look.",
        "selling_price": 3500.0, "discount_percentage": 20,
        "total_stock": 65, "type": "unstitched", "piece_type": "3-piece",
        "is_featured": False, "is_bestseller": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1618932260643-30f82d9a8444?w=600&h=750&fit=crop"]),
        "tags": "women,lawn,colourful,unstitched,summer",
    },
    {
        "sku": "BNZ-M-001", "name": "Bonanza Men Festive Kurta",
        "slug": "bonanza-men-festive-kurta",
        "brand": "Bonanza Satrangi", "category": "Men Kurta",
        "description": "Richly embroidered festive kurta for Eid and celebrations.",
        "selling_price": 4200.0, "discount_percentage": 10,
        "total_stock": 30, "type": "stitched", "piece_type": "single",
        "is_featured": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1572804419223-0ac36cb5d85f?w=600&h=750&fit=crop"]),
        "tags": "men,kurta,festive,eid,embroidered",
    },
    {
        "sku": "BNZ-K-001", "name": "Bonanza Kids Summer Set",
        "slug": "bonanza-kids-summer-set",
        "brand": "Bonanza Satrangi", "category": "Kids Collection",
        "description": "Fun printed cotton set for kids — shirt and shorts combo.",
        "selling_price": 1490.0, "discount_percentage": 0,
        "total_stock": 60, "type": "stitched", "piece_type": "2-piece",
        "is_featured": False, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1592286927505-1def25115558?w=600&h=750&fit=crop"]),
        "tags": "kids,summer,printed,cotton",
    },

    # ── Limelight ─────────────────────────────────────────────────────────────
    {
        "sku": "LL-P-001", "name": "Limelight Casual Lawn Pret",
        "slug": "limelight-casual-lawn-pret",
        "brand": "Limelight", "category": "Women Stitched Pret",
        "description": "Relaxed-fit lawn pret shirt in a soft pastel palette.",
        "selling_price": 2890.0, "discount_percentage": 0,
        "total_stock": 90, "type": "stitched", "piece_type": "single",
        "is_featured": False, "is_bestseller": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1617623814075-e51df1bdc82f?w=600&h=750&fit=crop"]),
        "tags": "women,lawn,casual,stitched,pastel",
    },
    {
        "sku": "LL-L-001", "name": "Limelight Embroidered Lawn",
        "slug": "limelight-embroidered-lawn",
        "brand": "Limelight", "category": "Women Lawn Unstitched",
        "description": "Beautiful embroidered lawn suit with organza dupatta.",
        "selling_price": 4100.0, "discount_percentage": 10,
        "total_stock": 50, "type": "unstitched", "piece_type": "3-piece",
        "is_featured": True, "is_new_arrival": True, "status": "active",
        "images": json.dumps(["https://images.unsplash.com/photo-1595521624a6-6c85c2e4d0e6?w=600&h=750&fit=crop"]),
        "tags": "women,lawn,embroidered,organza,unstitched",
    },
]

# ─────────────────────────────────────────────────────────────────────────────
def run():
    db = Session()
    try:
        # upsert brands
        brand_map = {}
        for b in BRANDS:
            obj = db.query(Brand).filter_by(slug=b["slug"]).first()
            if not obj:
                obj = Brand(id=str(uuid.uuid4()), **b)
                db.add(obj)
                db.flush()
                print(f"  + Brand: {b['name']}")
            brand_map[b["name"]] = obj.id

        # upsert categories
        cat_map = {}
        for c in CATEGORIES:
            obj = db.query(Category).filter_by(slug=c["slug"]).first()
            if not obj:
                obj = Category(id=str(uuid.uuid4()), **c)
                db.add(obj)
                db.flush()
                print(f"  + Category: {c['name']}")
            cat_map[c["name"]] = obj.id

        # insert products (skip existing SKUs)
        added = skipped = 0
        for p in PRODUCTS:
            brand_name = p.pop("brand")
            cat_name   = p.pop("category")
            is_limited = p.pop("is_limited_edition", False)

            if db.query(Product).filter_by(sku=p["sku"]).first():
                skipped += 1
                continue

            bid = brand_map.get(brand_name)
            cid = cat_map.get(cat_name)
            if not bid or not cid:
                print(f"  ⚠  Skipped {p['sku']}: brand/cat not found")
                skipped += 1
                continue

            stock_status = "in_stock" if p.get("total_stock", 0) > 10 else \
                           "low_stock" if p.get("total_stock", 0) > 0 else "out_of_stock"

            obj = Product(
                id=str(uuid.uuid4()),
                brand_id=bid,
                category_id=cid,
                stock_status=stock_status,
                is_limited_edition=is_limited,
                **p,
            )
            db.add(obj)
            added += 1
            print(f"  + [{p['sku']}] {p['name']}")

        db.commit()
        print(f"\n✅  Added {added} products  ({skipped} skipped — already exist)")
        print(f"   Total in DB: {db.query(Product).count()}")

    except Exception as e:
        db.rollback()
        print(f"\n❌ Failed: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    print("🌱  Adding brands, categories, and products...\n")
    run()
