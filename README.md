# AL Imran Fabrics - Admin Dashboard

A modern, production-ready Admin Dashboard for AL Imran Fabrics ecommerce platform built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## 🎯 Features

### Dashboard
- **Statistics Overview**: Real-time stats for products, orders, revenue, and customers
- **Recent Orders**: Display of latest orders with status tracking
- **Responsive Design**: Mobile-first approach with full desktop support

### Product Management
- **Product Table**: View all products with sorting and filtering
- **Add Products**: Modal form to add new products with details
- **Product Management**: Edit and delete functionality
- **Stock Tracking**: Real-time inventory status with visual indicators

### Order Management
- **Order Tracking**: View all customer orders with details
- **Status Management**: Update order status with dropdown
- **Order Actions**: View and download invoices
- **Customer Details**: Phone numbers and product information

### Customer Management
- **Customer Database**: Complete customer information
- **Contact Options**: Direct email, call, and WhatsApp buttons
- **Spending Analytics**: Track total spent per customer
- **Order History**: View number of orders per customer

### Banner Management
- **Hero Banners**: Manage large promotional banners
- **Banner Types**: Hero, Promotional, and Side banner support
- **Toggle Control**: Enable/disable banners without deletion
- **Upload System**: File upload interface (ready for backend integration)

### Store Settings
- **Store Configuration**: Manage store name, phone, email
- **WhatsApp Integration**: Store WhatsApp number for customer support
- **Location Details**: Address, city, country, and opening hours
- **Currency Settings**: Support for multiple currencies
- **Account Management**: View admin account details

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Node Version**: 18+ recommended

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000`
   The app will automatically redirect to `/admin`

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
ecommerce/
├── app/
│   ├── admin/
│   │   ├── layout.tsx           # Admin layout with sidebar & topbar
│   │   ├── page.tsx             # Dashboard home
│   │   ├── products/
│   │   │   └── page.tsx         # Products management
│   │   ├── orders/
│   │   │   └── page.tsx         # Orders management
│   │   ├── customers/
│   │   │   └── page.tsx         # Customers management
│   │   ├── banners/
│   │   │   └── page.tsx         # Banners management
│   │   └── settings/
│   │       └── page.tsx         # Store settings
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Root redirect to admin
│   └── globals.css              # Global styles
├── components/
│   └── admin/
│       ├── Sidebar.tsx          # Navigation sidebar
│       ├── Topbar.tsx           # Top navigation bar
│       ├── StatCard.tsx         # Reusable stat card component
│       ├── DataTable.tsx        # Reusable data table component
│       └── ProductForm.tsx      # Product form modal
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── next.config.js              # Next.js configuration
└── README.md                   # This file
```

## 🎨 Design Features

- **Modern Gradient Sidebar**: Dark theme with amber accent
- **Clean UI Components**: Reusable, well-structured components
- **Responsive Tables**: Mobile-friendly data tables with horizontal scroll
- **Status Indicators**: Color-coded status badges
- **Soft Shadows**: Subtle depth with Tailwind shadow utilities
- **Rounded Corners**: Modern rounded card design (rounded-2xl)
- **Hover Effects**: Smooth transitions on interactive elements
- **Mobile Navigation**: Collapsible sidebar for mobile devices

## 🔧 Available Pages

### Dashboard (`/admin`)
- Statistics overview
- Recent orders table
- Quick metrics display

### Products (`/admin/products`)
- Product inventory management
- Add new products modal
- Edit/Delete actions
- Stock status indicators

### Orders (`/admin/orders`)
- Order list with customer details
- Status management dropdown
- View and download options
- Phone number display

### Customers (`/admin/customers`)
- Customer database
- Contact actions (email, call, WhatsApp)
- Spending analytics
- Join date tracking

### Banners (`/admin/banners`)
- Banner management grid
- Upload new banners
- Toggle active/inactive
- Delete banners
- Banner type selection

### Settings (`/admin/settings`)
- Store information
- Location details
- WhatsApp integration
- Currency selection
- Opening hours
- Account information

## 📊 Dummy Data

All pages include realistic dummy data for:
- **Pakistani Fashion Brands**: Junaid Jamshed, Khaadi, Gul Ahmed, Saya, Baroque, Alkaram
- **Product Categories**: Stitched, Unstitched, Luxury
- **Customer Names**: Pakistani names with authentic details
- **Orders**: Complete with amounts in PKR
- **Locations**: Karachi-based store information

## 🎯 Responsive Breakpoints

- **Mobile**: Full-width on small screens (< 768px)
- **Tablet**: Grid layout adjustments (768px - 1024px)
- **Desktop**: Full sidebar + content layout (> 1024px)

## 🔐 Security Notes

This is a **frontend-only** implementation. When integrating with a backend:

- Implement proper authentication
- Validate all form inputs
- Use environment variables for API endpoints
- Implement rate limiting
- Add CSRF protection
- Sanitize user inputs

## 🚀 Future Enhancements

- [ ] Backend API integration
- [ ] Authentication & Authorization
- [ ] Real data persistence (Database)
- [ ] Image upload functionality
- [ ] Advanced search & filtering
- [ ] Export to CSV/PDF
- [ ] Dashboard charts & analytics
- [ ] Notification system
- [ ] User management
- [ ] Audit logs

## 🐛 Known Limitations

Current version is frontend-only:
- Forms don't persist data (no backend)
- Image uploads show UI only (not functional)
- Status updates reset on page reload
- No user authentication

## 💡 Code Quality

- ✅ TypeScript for type safety
- ✅ Clean component architecture
- ✅ Reusable components
- ✅ Proper file organization
- ✅ Responsive design
- ✅ Accessibility considerations
- ✅ Production-ready code

## 📝 Component API

### StatCard
```typescript
<StatCard
  icon={<IconComponent />}
  label="Label"
  value="Value"
  change={{ value: 12, isPositive: true }}
  color="amber"
/>
```

### DataTable
```typescript
<DataTable
  columns={columns}
  data={data}
  title="Table Title"
  actions={(row) => <ActionButtons />}
/>
```

## 🤝 Contributing

This is a project for AL Imran Fabrics. For contributions, please:
1. Follow the existing code structure
2. Use TypeScript for new code
3. Maintain responsive design
4. Test on mobile and desktop

## 📄 License

Private project for AL Imran Fabrics

## 📞 Support

For issues or questions about the admin dashboard, please contact the development team.

---

**Built with ❤️ for AL Imran Fabrics**
# fabrics-store
