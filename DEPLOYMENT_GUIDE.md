# AL Imran Fabrics Admin Dashboard - Deployment Guide

## 🚀 Production-Ready Admin Control Panel

This is a complete, enterprise-grade admin dashboard built with modern technologies.

## 📋 Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- PostgreSQL database (or Neon PostgreSQL)
- Git

## 🔧 Local Development Setup

### 1. Clone and Install

```bash
git clone <your-repo>
cd ecommerce
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local` with your database and auth settings:

```env
# Database (Use Neon PostgreSQL for cloud)
DATABASE_URL="postgresql://user:password@localhost:5432/al_imran_admin"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# Optional
NEXT_PUBLIC_WHATSAPP_NUMBER="+923001234567"
```

### 3. Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Create database and run migrations
npx prisma migrate dev

# Seed with demo data
npm run prisma:seed
```

### 4. Start Development Server

```bash
npm run dev
```

Access at: `http://localhost:3000/admin/login`

**Demo Credentials:**
- Email: `admin@alimanfabrics.com`
- Password: `admin123`

## 🌍 Production Deployment (Vercel)

### Step 1: Prepare Repository

```bash
git add .
git commit -m "Initial admin dashboard setup"
git push origin main
```

### Step 2: Set Up Neon PostgreSQL

1. Go to [neon.tech](https://neon.tech)
2. Create account and project
3. Copy connection string (looks like: `postgresql://user:password@host/dbname`)

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Configure environment variables:

```
DATABASE_URL = <Your Neon PostgreSQL URL>
NEXTAUTH_SECRET = $(openssl rand -base64 32)
NEXTAUTH_URL = https://your-domain.vercel.app
```

### Step 4: Database Migration

After deployment, run migrations on Vercel:

```bash
# In Vercel dashboard, go to your project
# Open "Deployments" tab
# Click on your latest deployment
# Go to the Logs
# Or run via CLI:
vercel env pull
npx prisma migrate deploy
```

### Step 5: Verify Deployment

Visit: `https://your-domain.vercel.app/admin/login`

## 🔐 Security Checklist

- ✅ Environment variables secured in Vercel
- ✅ Password hashed with bcrypt
- ✅ JWT session tokens
- ✅ Middleware protection on /admin routes
- ✅ Role-based access control (ADMIN only)
- ✅ No sensitive data in git history
- ✅ HTTPS enforced on production

## 📦 Features Included

### Authentication
- Email + password login
- JWT sessions (24 hour expiry)
- Admin role-based access
- Secure password hashing

### Inventory Management
- Full CRUD operations
- SKU generation
- Stock tracking
- Low stock alerts
- Product categories and brands

### Sales Analytics
- Revenue tracking
- Monthly revenue charts
- Order status breakdown
- Category analytics
- Customer statistics

### Order Management
- Order tracking
- Status updates
- Customer details
- Order history

### Customer Management
- Customer database
- Order history
- Spending analytics
- WhatsApp integration

### Settings
- Store information
- WhatsApp configuration
- Address management
- Email and phone

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signin` - Login
- `POST /api/auth/signout` - Logout
- `GET /api/auth/session` - Get session

### Products
- `GET /api/admin/products` - List products
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product

### Orders
- `GET /api/admin/orders` - List orders
- `PUT /api/admin/orders/[id]` - Update order status

### Analytics
- `GET /api/admin/analytics` - Get analytics data

### Settings
- `GET /api/admin/settings` - Get settings
- `PUT /api/admin/settings` - Update settings

## 🗄 Database Schema

### Users
- id, email, password, name, role, createdAt, updatedAt

### Products
- id, sku, name, brand, category, price, comparePrice, stock, description, image, isFeatured, isActive, createdAt, updatedAt

### Orders
- id, userId, totalAmount, status, paymentMethod, customerPhone, customerName, shippingAddress, createdAt, updatedAt

### OrderItems
- id, orderId, productId, quantity, price, createdAt

### Settings
- id, whatsappNumber, storeName, storeEmail, storePhone, storeAddress, updatedAt

## 🔄 Continuous Deployment

Every push to `main` automatically triggers:

1. Build
2. Prisma migration
3. Deployment to production

## 🆘 Troubleshooting

### "Database connection failed"
- Verify `DATABASE_URL` is correct
- Check IP whitelist in Neon settings
- Ensure database name is correct

### "Migration failed"
```bash
npx prisma migrate status
npx prisma migrate resolve --rolled-back <migration-name>
npx prisma migrate dev
```

### "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Session not working"
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches deployment domain
- Clear browser cookies and try again

## 📈 Performance Tips

1. **Enable Database Indexing** (Already configured)
2. **Use Connection Pooling** (Neon does this automatically)
3. **Cache API Responses** (Implement in production)
4. **Optimize Images** (Use Next.js Image component)
5. **Enable Compression** (Vercel does this automatically)

## 🔄 Backup Strategy

### Daily Backups (Neon)
1. Go to Neon console
2. Enable automatic backups
3. Set retention to 7 days

### Manual Backup
```bash
pg_dump $DATABASE_URL > backup.sql
```

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection | postgresql://... |
| `NEXTAUTH_URL` | App URL | https://domain.com |
| `NEXTAUTH_SECRET` | Session secret | [random 32 char] |
| `NODE_ENV` | Environment | production |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp business | +92300123456 |

## 🚀 Scaling Considerations

### Database
- Use Neon's autoscaling
- Monitor connection count
- Archive old orders annually

### Application
- Use CDN for static assets
- Implement caching layer
- Use serverless functions for heavy operations

### Monitoring
- Set up error tracking (Sentry)
- Monitor database performance
- Setup alerts for failures

## 📞 Support

For issues or questions:
1. Check error logs in Vercel
2. Review database connection settings
3. Verify all environment variables
4. Check Prisma documentation

## ✨ Next Steps

After deployment:

1. Change admin password
2. Configure WhatsApp number
3. Add real product data
4. Set up backup strategy
5. Monitor logs and performance

---

**Deployment Status: Production Ready** ✅

Your admin dashboard is fully configured and ready to scale!
