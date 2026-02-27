# AL Imran Fabrics Admin Dashboard - Setup Guide

## 🎯 Complete Setup Instructions

### Step 1: Prerequisites Check

Make sure you have installed:
- **Node.js** v18+ ([Download](https://nodejs.org))
- **npm** v9+ (comes with Node.js)
- A code editor (VS Code recommended)

Check versions:
```bash
node --version  # Should be v18 or higher
npm --version   # Should be v9 or higher
```

### Step 2: Project Initialization

1. **Navigate to project directory:**
   ```bash
   cd /path/to/ecommerce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   This will install:
   - `next`: Next.js 14 framework
   - `react` & `react-dom`: React 18
   - `typescript`: TypeScript support
   - `tailwindcss`: CSS framework
   - `lucide-react`: Icon library
   - And all other dependencies in package.json

### Step 3: Environment Setup

1. **Create .env.local file (optional):**
   ```bash
   cp .env.example .env.local
   ```

2. **Update values** in `.env.local` if needed:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   NEXT_PUBLIC_STORE_NAME=AL Imran Fabrics
   ```

### Step 4: Start Development Server

```bash
npm run dev
```

The application will be available at:
- **Local**: `http://localhost:3000`
- **Network**: `http://192.168.x.x:3000` (check terminal output)

The app automatically redirects to `/admin`

### Step 5: Verify Installation

Open your browser and check:
1. ✅ Dashboard page loads at `http://localhost:3000/admin`
2. ✅ Sidebar navigation is visible
3. ✅ All menu items are clickable
4. ✅ Tables display data
5. ✅ Forms can be opened (Products)

## 📁 File Structure Overview

```
ecommerce/
├── app/                          # App Router pages
│   ├── admin/                    # Admin section
│   │   ├── layout.tsx           # Sidebar + Topbar wrapper
│   │   ├── page.tsx             # Dashboard
│   │   ├── products/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── customers/page.tsx
│   │   ├── banners/page.tsx
│   │   └── settings/page.tsx
│   ├── globals.css              # Global styles
│   └── layout.tsx               # Root layout
├── components/admin/            # Reusable components
│   ├── Sidebar.tsx
│   ├── Topbar.tsx
│   ├── StatCard.tsx
│   ├── DataTable.tsx
│   └── ProductForm.tsx
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🛠️ Available Commands

### Development
```bash
npm run dev
# Start development server with hot reload
```

### Production Build
```bash
npm run build
npm start
```

### Type Checking
```bash
npm run type-check
# Verify TypeScript types without building
```

### Linting
```bash
npm run lint
# Run ESLint on the code
```

## 🎨 Customization Guide

### Change Brand Colors

Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    },
  },
}
```

Then update component color references:
- In Sidebar: Change `bg-gradient-to-b from-slate-900 to-slate-800`
- In Stats: Change color props like `color="amber"`
- In Buttons: Change `bg-amber-500 hover:bg-amber-600`

### Add New Pages

1. Create new folder under `/app/admin/`
2. Add `page.tsx` file
3. Export default component
4. Add navigation link in `components/admin/Sidebar.tsx`

Example:
```typescript
// app/admin/analytics/page.tsx
export default function AnalyticsPage() {
  return <div>Analytics Page</div>
}
```

Then add to Sidebar:
```typescript
{ href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
```

### Modify Dummy Data

Find data in each page:
- `/app/admin/page.tsx` - Dashboard orders
- `/app/admin/products/page.tsx` - Products list
- `/app/admin/orders/page.tsx` - Orders list
- `/app/admin/customers/page.tsx` - Customers list
- `/app/admin/banners/page.tsx` - Banners list

Replace with your data:
```typescript
const [products] = useState<Product[]>([
  {
    id: 'P001',
    name: 'Your Product Name',
    // ... other fields
  },
])
```

## 🔌 Backend Integration

When ready to connect to backend:

1. **Create API client** (`lib/api.ts`):
   ```typescript
   export async function fetchProducts() {
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
     return res.json()
   }
   ```

2. **Use in components**:
   ```typescript
   import { fetchProducts } from '@/lib/api'

   const [products, setProducts] = useState([])
   useEffect(() => {
     fetchProducts().then(setProducts)
   }, [])
   ```

3. **Handle forms**:
   ```typescript
   const handleSubmit = async (data) => {
     await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
       method: 'POST',
       body: JSON.stringify(data),
     })
   }
   ```

## 📱 Testing Responsive Design

### Option 1: Browser DevTools
1. Open DevTools (F12 or Ctrl+Shift+I)
2. Click device toggle (Ctrl+Shift+M)
3. Test on different sizes:
   - Mobile: 375px wide
   - Tablet: 768px wide
   - Desktop: 1024px+ wide

### Option 2: Physical Devices
```bash
# Get your local IP
ipconfig getifaddr en0  # macOS
hostname -I             # Linux
ipconfig                # Windows

# Access from phone on same network
http://YOUR_IP:3000
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import project from GitHub
4. Set environment variables
5. Deploy with one click

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t al-imran-admin .
docker run -p 3000:3000 al-imran-admin
```

### Self-Hosted
1. Build: `npm run build`
2. Install PM2: `npm install -g pm2`
3. Run: `pm2 start npm --name "admin" -- start`
4. Setup reverse proxy (Nginx/Apache)

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Kill process on port 3000
# macOS/Linux
lsof -ti :3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F
```

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Fails
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Styles Not Loading
```bash
# Restart dev server
npm run dev
```

## 📚 Learning Resources

- [Next.js 14 Docs](https://nextjs.org/docs)
- [React 18 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)

## 🎓 Next Steps

1. **Understand the code:**
   - Review `components/admin/` for reusable components
   - Check `app/admin/` for page structures
   - Study TypeScript interfaces

2. **Extend functionality:**
   - Add new admin pages
   - Create custom components
   - Integrate with backend

3. **Optimize performance:**
   - Use React.memo for expensive components
   - Implement pagination for tables
   - Add search and filtering

4. **Improve UX:**
   - Add loading states
   - Add error handling
   - Add toast notifications
   - Implement dark mode

## 📞 Support

### Common Questions

**Q: How do I add a new page?**
A: Create folder under `/app/admin/`, add `page.tsx`, and update Sidebar navigation.

**Q: How do I change colors?**
A: Edit `tailwind.config.ts` and update color references in components.

**Q: Can I use different UI libraries?**
A: Yes, but this dashboard uses only Tailwind CSS to keep it lightweight.

**Q: How do I connect a database?**
A: Create API routes and use them in useEffect hooks to fetch/mutate data.

---

## ✅ Installation Checklist

- [ ] Node.js v18+ installed
- [ ] Project cloned/copied
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Dashboard accessible at `http://localhost:3000`
- [ ] All menu items clickable
- [ ] Forms open correctly
- [ ] Mobile menu works
- [ ] No console errors
- [ ] TypeScript compiling correctly

Once all checks pass, you're ready to customize and deploy! 🚀

---

**Happy coding! 🎉**
