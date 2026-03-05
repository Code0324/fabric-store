"""Add Pakistani men's stitched/unstitched shalwar kameez products."""
import os, sys, json, uuid
sys.path.insert(0, os.path.dirname(__file__))

from app.db.session import SessionLocal
from app.models.product import Product
from app.models.brand import Brand
from app.models.category import Category

db = SessionLocal()

brands = {b.name: b.id for b in db.query(Brand).all()}
cats   = {c.name: c.id for c in db.query(Category).all()}

MEN_PRODUCTS = [
    # ── Khaadi ───────────────────────────────────────────────────────────────
    dict(sku="KHD-MSK-001", name="Khaadi Men Embroidered Stitched Shalwar Kameez",
         brand="Khaadi", category="Men Shalwar Kameez", piece_type="2-Piece",
         description="Premium embroidered lawn shalwar kameez, fully stitched. Rich embroidery on collar and cuffs.",
         selling_price=4990, discount_percentage=10,
         image="/images/products/men_janan_1.jpg", tags="men,stitched,embroidered,kurta"),

    dict(sku="KHD-MSK-002", name="Khaadi Classic Wash & Wear Shalwar Kameez",
         brand="Khaadi", category="Men Shalwar Kameez", piece_type="2-Piece",
         description="Everyday classic wash & wear shalwar kameez. Comfortable, wrinkle-free fabric perfect for daily wear.",
         selling_price=3490, discount_percentage=0,
         image="/images/products/men_janan_2.jpg", tags="men,wash-n-wear,unstitched,classic"),

    # ── Gul Ahmed ────────────────────────────────────────────────────────────
    dict(sku="GA-MSK-001", name="Gul Ahmed Men Printed Lawn Unstitched",
         brand="Gul Ahmed", category="Men Shalwar Kameez", piece_type="2-Piece",
         description="Gul Ahmed signature printed lawn unstitched suit. Vibrant colors, premium fabric for summer.",
         selling_price=2990, discount_percentage=15,
         image="/images/products/men_janan_3.jpg", tags="men,unstitched,printed,lawn"),

    dict(sku="GA-MSK-002", name="Gul Ahmed Festive Stitched Kurta",
         brand="Gul Ahmed", category="Men Kurta", piece_type="1-Piece",
         description="Festival-ready embroidered kurta with intricate threadwork. Perfect for Eid and celebrations.",
         selling_price=5490, discount_percentage=12,
         image="/images/products/men_janan_4.jpg", tags="men,stitched,embroidered,festive,kurta"),

    # ── Junaid Jamshed (J.) ──────────────────────────────────────────────────
    dict(sku="JJ-MSK-001", name="J. Men Luxury Embroidered Shalwar Kameez",
         brand="Junaid Jamshed", category="Men Shalwar Kameez", piece_type="3-Piece",
         description="J. signature luxury embroidered shalwar kameez with matching waistcoat. Premium lawn fabric.",
         selling_price=8990, discount_percentage=10,
         image="/images/products/men_janan_5.jpg", tags="men,stitched,luxury,embroidered,3-piece"),

    dict(sku="JJ-MSK-002", name="J. Men Casual Cotton Shalwar Kameez",
         brand="Junaid Jamshed", category="Men Shalwar Kameez", piece_type="2-Piece",
         description="Casual cotton shalwar kameez for everyday comfort. Soft fabric, relaxed fit.",
         selling_price=3290, discount_percentage=0,
         image="/images/products/men_janan_6.jpg", tags="men,stitched,cotton,casual"),

    # ── Bonanza Satrangi ─────────────────────────────────────────────────────
    dict(sku="BNZ-MSK-001", name="Bonanza Satrangi Eid Embroidered Kurta Pajama",
         brand="Bonanza Satrangi", category="Men Kurta", piece_type="2-Piece",
         description="Eid special kurta pajama with delicate embroidery. Available in festive colors.",
         selling_price=5990, discount_percentage=15,
         image="/images/products/men_janan_7.jpg", tags="men,stitched,embroidered,eid,kurta"),

    dict(sku="BNZ-MSK-002", name="Bonanza Satrangi Classic Shalwar Kameez",
         brand="Bonanza Satrangi", category="Men Shalwar Kameez", piece_type="2-Piece",
         description="Timeless classic shalwar kameez in premium lawn. Clean cut, elegant design.",
         selling_price=3990, discount_percentage=10,
         image="/images/products/men_janan_8.jpg", tags="men,stitched,classic,lawn"),

    # ── Zellbury ─────────────────────────────────────────────────────────────
    dict(sku="ZLB-MSK-001", name="Zellbury Jade Shalwar Kameez",
         brand="Multi-Brand (Zellbury Style)", category="Men Shalwar Kameez", piece_type="2-Piece",
         description="Zellbury Jade collection – modern cut shalwar kameez in ash grey. Premium blended fabric.",
         selling_price=4290, discount_percentage=0,
         image="/images/products/men_zellbury_1.jpg", tags="men,stitched,modern,zellbury"),

    dict(sku="ZLB-MSK-002", name="Zellbury Marvel Stitched Shalwar Kameez",
         brand="Multi-Brand (Zellbury Style)", category="Men Shalwar Kameez", piece_type="2-Piece",
         description="Marvel series – bold and stylish shalwar kameez in rich black. Machine washable.",
         selling_price=3790, discount_percentage=10,
         image="/images/products/men_zellbury_2.jpg", tags="men,stitched,zellbury,marvel"),

    dict(sku="ZLB-MSK-003", name="Zellbury Express Cotton Shalwar Kameez",
         brand="Multi-Brand (Zellbury Style)", category="Men Shalwar Kameez", piece_type="2-Piece",
         description="Express line – everyday cotton shalwar kameez. Breathable, comfortable, wrinkle resistant.",
         selling_price=2990, discount_percentage=0,
         image="/images/products/men_zellbury_3.jpg", tags="men,stitched,cotton,everyday"),

    dict(sku="ZLB-MSK-004", name="Zellbury Bosky Formal Shalwar Kameez",
         brand="Multi-Brand (Zellbury Style)", category="Men Shalwar Kameez", piece_type="2-Piece",
         description="Bosky formal shalwar kameez with textured fabric. Ideal for office and formal occasions.",
         selling_price=4590, discount_percentage=8,
         image="/images/products/men_zellbury_4.jpg", tags="men,stitched,formal,zellbury"),

    # ── Al Karam ──────────────────────────────────────────────────────────────
    dict(sku="AK-MSK-001", name="Al Karam Wash & Wear Unstitched Shalwar Kameez",
         brand="Al Karam", category="Men Shalwar Kameez", piece_type="2-Piece",
         description="Al Karam premium wash & wear fabric. Unstitched suit – tailor to your perfect fit.",
         selling_price=3190, discount_percentage=5,
         image="/images/products/men_zellbury_5.jpg", tags="men,unstitched,wash-n-wear,alkaram"),

    dict(sku="AK-MSK-002", name="Al Karam Printed Lawn Stitched Kurta",
         brand="Al Karam", category="Men Kurta", piece_type="1-Piece",
         description="Printed lawn kurta – bright summer print for a fresh look. Comfortable everyday wear.",
         selling_price=2590, discount_percentage=0,
         image="/images/products/men_zellbury_6.jpg", tags="men,stitched,printed,kurta,alkaram"),

    # ── Limelight ────────────────────────────────────────────────────────────
    dict(sku="LL-MSK-001", name="Limelight Men Embroidered Lawn Kurta",
         brand="Limelight", category="Men Kurta", piece_type="1-Piece",
         description="Limelight signature embroidered lawn kurta. Intricate pattern with fine detailing.",
         selling_price=3690, discount_percentage=10,
         image="/images/products/men_zellbury_7.jpg", tags="men,stitched,embroidered,kurta,limelight"),

    dict(sku="LL-MSK-002", name="Limelight Comfort Cotton Shalwar Kameez",
         brand="Limelight", category="Men Shalwar Kameez", piece_type="2-Piece",
         description="Pure comfort cotton shalwar kameez. Ultra-soft fabric ideal for summer.",
         selling_price=2990, discount_percentage=0,
         image="/images/products/men_zellbury_8.jpg", tags="men,stitched,cotton,comfort,limelight"),

    # ── Sapphire ─────────────────────────────────────────────────────────────
    dict(sku="SAP-MSK-001", name="Sapphire Men Maroon Shalwar Kameez",
         brand="Sapphire", category="Men Shalwar Kameez", piece_type="2-Piece",
         description="Sapphire's rich maroon shalwar kameez. Premium blended fabric with a clean, modern silhouette.",
         selling_price=5290, discount_percentage=12,
         image="/images/products/men_zellbury_9.jpg", tags="men,stitched,maroon,sapphire"),

    # ── Aizaz Zafar / Formal ─────────────────────────────────────────────────
    dict(sku="AZ-MSK-001", name="Aizaz Zafar Formal Kameez Shalwar – Black",
         brand="Baroque", category="Men Shalwar Kameez", piece_type="2-Piece",
         description="Premium formal kameez shalwar in classic black. Ideal for weddings, formal events, and Eid.",
         selling_price=6490, discount_percentage=0,
         image="/images/products/men_sanaullastore_1.jpg", tags="men,formal,stitched,black,luxury"),
]


def slug_for(name: str) -> str:
    return name.lower().replace(" ", "-").replace("'", "").replace(".", "")[:80]


print(f"Adding {len(MEN_PRODUCTS)} men's products...")
added = 0
for p in MEN_PRODUCTS:
    existing = db.query(Product).filter(Product.sku == p["sku"]).first()
    if existing:
        print(f"  skip (exists): {p['sku']}")
        continue

    brand_id = brands.get(p["brand"])
    cat_id   = cats.get(p["category"])
    if not brand_id or not cat_id:
        print(f"  WARN: missing brand/category for {p['sku']} ({p['brand']} / {p['category']})")
        continue

    sp = p["selling_price"]
    dp = round(sp * (1 - p["discount_percentage"] / 100), 2) if p["discount_percentage"] else None

    prod = Product(
        id=str(uuid.uuid4()),
        sku=p["sku"],
        name=p["name"],
        slug=slug_for(p["name"]),
        brand_id=brand_id,
        category_id=cat_id,
        piece_type=p.get("piece_type", "2-Piece"),
        description=p["description"],
        selling_price=sp,
        discount_percentage=p["discount_percentage"],
        discount_price=dp,
        total_stock=30,
        stock_status="in_stock",
        is_new_arrival=True,
        is_featured=True,
        status="active",
        images=json.dumps([p["image"]]),
        tags=p.get("tags", "men"),
    )
    db.add(prod)
    added += 1
    print(f"  ✓ {p['sku']:20s} | {p['brand']:30s} | {p['name'][:40]}")

db.commit()
db.close()
print(f"\n✅ Added {added} new men's products.")
