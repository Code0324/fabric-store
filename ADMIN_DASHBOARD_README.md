# AL Imran Fabrics - Admin Dashboard

**Production-Ready SaaS-Grade Admin Control Panel**

A complete, enterprise-level admin dashboard for managing an ecommerce platform built with Next.js 14, TypeScript, Prisma, and PostgreSQL.

## 🎯 What's Included

### Core Features
✅ **Authentication System** - Email/password login with JWT sessions
✅ **Product Management** - Full CRUD with stock tracking
✅ **Order Management** - Track and update order status
✅ **Analytics Dashboard** - Revenue, orders, and customer metrics
✅ **Inventory Tracking** - Low stock alerts and valuation
✅ **Customer Management** - Database and communication tools
✅ **WhatsApp Integration** - Automated order messaging
✅ **Settings Panel** - Store configuration

### Technical Features
✅ Role-Based Access Control (Admin only)
✅ Middleware Protection on all admin routes
✅ Real-time database updates
✅ Responsive UI (mobile + desktop)
✅ Production deployment ready (Vercel)
✅ Database migrations included
✅ Seed data for testing
✅ Error handling and validation

## 🏗 Tech Stack

```
Frontend:  Next.js 14 (App Router)
Language:  TypeScript (strict mode)
Styling:   Tailwind CSS
Database:  PostgreSQL (Neon compatible)
ORM:       Prisma
Auth:      NextAuth v5
Charts:    Recharts
State:     Zustand
Deploy:    Vercel
```

## 📁 Project Structure

```
ecommerce/
├── app/
│   ├── admin/
│   │   ├── login/page.tsx              # Login page
│   │   ├── dashboard/page.tsx          # Analytics dashboard
│   │   ├── products/page.tsx           # Product management
│   │   ├── orders/page.tsx             # Order tracking
│   │   ├── customers/page.tsx          # Customer management
│   │   ├── inventory/page.tsx          # Stock tracking
│   │   ├── settings/page.tsx           # Configuration
│   │   └── layout.tsx                  # Admin layout with sidebar
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts # Auth API
│   │   └── admin/
│   │       ├── products/route.ts       # Product API
│   │       ├── orders/route.ts         # Order API
│   │       ├── analytics/route.ts      # Analytics API
│   │       └── settings/route.ts       # Settings API
│   ├── layout.tsx                      # Root layout
│   ├── globals.css                     # Global styles
│   └── page.tsx                        # Root redirect
├── components/admin/
│   ├── Sidebar.tsx                     # Navigation sidebar
│   ├── Topbar.tsx                      # Top navigation
│   ├── StatCard.tsx                    # Dashboard stat card
│   ├── SalesChart.tsx                  # Revenue chart
│   ├── OrderChart.tsx                  # Order chart
│   ├── CategoryChart.tsx               # Category pie chart
│   └── ProductModal.tsx                # Product add/edit modal
├── lib/
│   ├── auth.ts                         # NextAuth configuration
│   ├── store.ts                        # Zustand state management
│   └── utils.ts                        # Helper utilities
├── prisma/
│   ├── schema.prisma                   # Database schema
│   └── seed.ts                         # Demo data seeding
├── middleware.ts                       # Auth middleware
├── .env.example                        # Environment template
├── package.json                        # Dependencies
├── tsconfig.json                       # TypeScript config
├── tailwind.config.ts                  # Tailwind config
├── next.config.js                      # Next.js config
└── vercel.json                         # Vercel deployment config
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your database URL
```

### 3. Setup Database
```bash
npx prisma migrate dev
npm run prisma:seed
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Login
Visit: `http://localhost:3000/admin/login`

**Demo Account:**
- Email: `admin@alimanfabrics.com`
- Password: `admin123`

## 🔐 Authentication

### Login Flow
1. User submits email + password
2. Password verified with bcrypt
3. Admin role checked
4. JWT session created (24 hour expiry)
5. Redirect to dashboard

### Protected Routes
All `/admin/*` routes are protected by middleware:
- Checks valid session
- Verifies admin role
- Redirects to login if unauthorized

## 📊 API Endpoints

### Products
```
GET    /api/admin/products           # List products (paginated)
POST   /api/admin/products           # Create product
PUT    /api/admin/products/[id]      # Update product
DELETE /api/admin/products/[id]      # Delete product
```

### Orders
```
GET    /api/admin/orders             # List orders (filterable)
PUT    /api/admin/orders/[id]        # Update order status
```

### Analytics
```
GET    /api/admin/analytics          # Get dashboard analytics
```

### Settings
```
GET    /api/admin/settings           # Get store settings
PUT    /api/admin/settings           # Update settings
```

## 🗄 Database Models

### User
```prisma
- id: String
- email: String (unique)
- password: String (hashed)
- name: String
- role: ADMIN | CUSTOMER
- createdAt, updatedAt
```

### Product
```prisma
- id: String
- sku: String (unique)
- name: String
- brand: String
- category: String
- price: Decimal
- comparePrice: Decimal? (for discounts)
- stock: Int
- description: String?
- image: String?
- isFeatured: Boolean
- isActive: Boolean
- createdAt, updatedAt
```

### Order
```prisma
- id: String
- userId: String
- totalAmount: Decimal
- status: PENDING | PAID | SHIPPED | COMPLETED | CANCELLED
- paymentMethod: COD | JAZZCASH | EASYPAISA | STRIPE
- customerPhone: String?
- customerName: String?
- shippingAddress: String?
- createdAt, updatedAt
```

### OrderItem
```prisma
- id: String
- orderId: String
- productId: String
- quantity: Int
- price: Decimal
- createdAt
```

## 🎨 UI Components

### StatCard
Displays KPI metrics with trend indicators
```tsx
<StatCard
  icon={<TrendingUp />}
  label="Revenue"
  value="PKR 1.2M"
  change={{ value: 12, isPositive: true }}
  color="amber"
/>
```

### ProductModal
Add/edit products with validation
- Auto-generate SKU
- Brand selection
- Category selection
- Stock tracking

### Charts
- **SalesChart** - Monthly revenue line chart
- **OrderChart** - Order status bar chart
- **CategoryChart** - Product category pie chart

## 🛠 Utility Functions

### formatCurrency
Formats numbers as PKR currency
```typescript
formatCurrency(1234.56) // "PKR 1,234.56"
```

### generateWhatsAppLink
Creates WhatsApp message link for orders
```typescript
generateWhatsAppLink(
  "+923001234567",
  "Embroidered Lawn Suit",
  4500,
  2,
  "Fatima Khan"
)
```

### isLowStock
Checks if product stock is below threshold
```typescript
isLowStock(3) // true (threshold: 5)
```

### generateSKU
Auto-generates unique SKU
```typescript
generateSKU("Khaadi", "Embroidered Lawn Suit")
// "KHA-EMB-1234"
```

## 🔄 State Management

Using Zustand for simple, efficient state:

```typescript
const { products, setProducts, addProduct } = useProductStore();
const { orders, updateOrder } = useOrderStore();
```

## 📱 Responsive Design

- **Mobile** (< 768px): Collapsible sidebar, single column
- **Tablet** (768px - 1024px): 2-column layouts
- **Desktop** (> 1024px): Full sidebar, 4-column grids

## 🔐 Security Features

### Authentication
- Password hashing with bcrypt
- JWT session tokens
- 24-hour session expiry
- Secure environment variables

### Authorization
- Role-based access control
- Middleware route protection
- Admin-only endpoints
- Session validation on every request

### Data Protection
- SQL injection prevention (Prisma)
- XSS protection (React escaping)
- CSRF protection ready
- Input validation on all forms

## 📈 Analytics

### Dashboard Shows
- Total revenue (all completed orders)
- Today's revenue
- Monthly revenue
- Total orders count
- Total customers count
- Low stock item alerts

### Charts Include
- 12-month revenue trend
- Order status distribution
- Product category breakdown

## 🚀 Deployment

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Run production server
```

### Production (Vercel)
See `DEPLOYMENT_GUIDE.md` for complete instructions

**Steps:**
1. Push to GitHub
2. Connect Vercel to repository
3. Set environment variables
4. Deploy automatically
5. Run migrations

## 📝 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript
npm run prisma:migrate   # Run database migrations
npm run prisma:generate  # Generate Prisma client
npm run prisma:seed      # Seed database with demo data
npm run prisma:studio    # Open Prisma Studio GUI
```

## 🎯 Demo Data

The seed file creates:
- 1 admin user
- 5 customer users
- 12 products across 6 brands
- 5 sample orders
- Store settings

## ⚙ Configuration

### Environment Variables
```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<random-secret>
NODE_ENV=development
NEXT_PUBLIC_WHATSAPP_NUMBER=+92300XXXXXXX
```

### Brands Available
- Khaadi
- Junaid Jamshed
- Gul Ahmed
- Saya
- Baroque
- Alkaram

### Product Categories
- Stitched
- Unstitched
- Luxury

## 🔍 Error Handling

### API Errors
- 401: Unauthorized (not logged in)
- 403: Forbidden (not admin)
- 404: Not found
- 400: Bad request (validation error)
- 500: Server error

### User Feedback
- Toast notifications for success/error
- Form validation messages
- Loading states
- Error boundaries

## 🌍 i18n Support (Future)

Ready for internationalization:
- All text in components
- Format functions support multiple locales
- Database supports UTF-8

## 📚 Learning Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [Prisma Guide](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🐛 Known Limitations

None in current version. All core features implemented.

## 🚦 Roadmap

- [ ] Multi-language support
- [ ] Advanced analytics/reporting
- [ ] Bulk operations
- [ ] Email notifications
- [ ] SMS integration
- [ ] Dark mode
- [ ] Mobile app

## 📞 Support

For questions or issues:
1. Check error logs
2. Review environment variables
3. Check Prisma status
4. Review database connection

## 📄 License

Private project for AL Imran Fabrics

## ✨ Built With Love

This admin dashboard is production-ready, fully typed, and scalable.

---

**Status: Ready for Production** ✅
