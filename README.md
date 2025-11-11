# ☕ BrewHaven - Modern E-Commerce Platform

<div align="center">

![BrewHaven](https://img.shields.io/badge/BrewHaven-E--Commerce-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**A modern, full-featured coffee e-commerce platform built with cutting-edge web technologies**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Deployment](#-deployment)

</div>

---

## 📖 About

BrewHaven is a production-ready e-commerce platform designed for coffee retailers. It provides a seamless shopping experience with advanced features including user authentication, shopping cart management, order processing, and a comprehensive admin dashboard. Built with React, TypeScript, and Supabase for scalability and performance.

### ✨ Key Highlights

- 🛒 **Complete E-Commerce Solution** - Full shopping cart, checkout, and order management
- 🔐 **Secure Authentication** - Built-in user authentication with Supabase Auth
- 👨‍💼 **Admin Dashboard** - Comprehensive admin panel for product and order management
- 📱 **Fully Responsive** - Beautiful UI that works on all devices
- ⚡ **Lightning Fast** - Optimized with Vite and modern React patterns
- 🎨 **Modern Design** - Built with shadcn/ui and Tailwind CSS

---

## 🚀 Features

### 🛍️ E-Commerce Features

| Feature | Description |
|---------|-------------|
| **Product Catalog** | Browse coffee products with detailed descriptions, images, and pricing |
| **Smart Filtering** | Filter by category, type (Hot/Cold), and search by name or description |
| **Shopping Cart** | Add items, update quantities, and manage your cart with real-time updates |
| **Checkout Flow** | Complete checkout process with shipping details and order confirmation |
| **Order Tracking** | View order history with status updates and delivery information |
| **Inventory Management** | Real-time stock tracking and availability updates |

### 👤 User Features

- **Secure Authentication** - Email/password authentication with session management
- **User Profiles** - Manage personal information and view account details
- **Order History** - Complete order history with itemized receipts
- **Protected Routes** - Secure access to user-specific pages
- **Session Persistence** - Stay logged in across browser sessions

### 🎛️ Admin Dashboard

- **Product Management** - Add, edit, and delete coffee products with ease
- **Inventory Control** - Manage stock levels and product availability
- **Order Management** - View and manage all customer orders with detailed information
- **Statistics Dashboard** - Real-time metrics for users, orders, and products
- **Category Management** - Organize products into categories
- **Customer Details** - View complete customer information for each order

### 🎨 UI/UX Features

- **Modern Design System** - Built with shadcn/ui components
- **Responsive Layout** - Seamless experience on desktop, tablet, and mobile
- **Dark Mode Ready** - Theme support with next-themes
- **Loading States** - Smooth loading indicators and skeleton screens
- **Error Handling** - Comprehensive error boundaries and user-friendly messages
- **Toast Notifications** - Instant feedback for all user actions

---

## 🛠️ Tech Stack

### Frontend

<div align="center">

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Library | 18.3 |
| **TypeScript** | Type Safety | 5.8 |
| **Vite** | Build Tool | 5.4 |
| **React Router** | Client-side Routing | v6 |
| **TanStack Query** | Server State Management | Latest |
| **shadcn/ui** | Component Library | Latest |
| **Tailwind CSS** | Styling Framework | Latest |
| **Radix UI** | Accessible Primitives | Latest |

</div>

### Backend

- **Supabase** - Backend-as-a-Service
  - 🔐 Authentication (Email/Password)
  - 🗄️ PostgreSQL Database
  - 🔒 Row Level Security (RLS)
  - ⚡ Edge Functions (Deno)
  - 📦 Storage (for future image uploads)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** for version control
- A **Supabase account** ([Sign up for free](https://supabase.com/))

---

## ⚡ Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/amirphiladam2/BrewHaven.git
cd BrewHaven
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

> **Note:** Get these values from your Supabase project settings → API

### 4️⃣ Set Up Supabase Backend

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run `FRESH_SETUP.sql` in the Supabase SQL Editor
3. Add admin role for your user (see `MAKE_ADMIN.sql`)

📚 **Detailed Setup:** See `BACKEND_SETUP.md` for complete step-by-step instructions

### 5️⃣ Start Development Server

```bash
npm run dev
```

🎉 Your app will be running at `http://localhost:8080`

---

## 📁 Project Structure

```
BrewHaven/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── ErrorBoundary.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── LoadingSpinner.tsx
│   ├── contexts/            # React Context providers
│   │   ├── AuthContext.tsx  # Authentication state
│   │   └── CartContext.tsx  # Shopping cart state
│   ├── hooks/               # Custom React hooks
│   ├── integrations/        # External service integrations
│   │   └── supabase/        # Supabase client and types
│   ├── lib/                 # Utility functions
│   │   ├── env.ts           # Environment validation
│   │   └── utils.ts         # General utilities
│   └── pages/               # Page components
│       ├── Landing.tsx      # Homepage
│       ├── Auth.tsx         # Login/Signup
│       ├── Shop.tsx         # Product catalog
│       ├── Cart.tsx         # Shopping cart
│       ├── Checkout.tsx     # Checkout process
│       ├── Orders.tsx       # Order history
│       ├── Profile.tsx      # User profile
│       └── Admin.tsx        # Admin dashboard
├── supabase/
│   ├── functions/           # Edge functions
│   └── migrations/          # Database migrations
├── public/                  # Static assets
├── BACKEND_SETUP.md         # Backend setup guide
├── FRESH_SETUP.sql          # Database setup script
└── MAKE_ADMIN.sql           # Admin role setup script
```

---

## 🎮 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 8080 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
4. Deploy! 🎉

### Other Platforms

- **Netlify**: Connect GitHub repo → Build: `npm run build` → Publish: `dist`
- **Railway**: Deploy from GitHub with automatic builds
- **Any Static Host**: Build with `npm run build` and serve the `dist` folder

### Pre-Deployment Checklist

- ✅ Complete backend setup (see `BACKEND_SETUP.md`)
- ✅ Set environment variables in hosting platform
- ✅ Update Supabase redirect URLs to production domain
- ✅ Test all features in production environment

---

## 🔒 Security

- **Row Level Security (RLS)** - All database tables have RLS policies enabled
- **Environment Variables** - Sensitive keys never committed to version control
- **Protected Routes** - User and admin routes protected with authentication
- **API Security** - Edge Functions use Supabase's built-in authentication
- **Input Validation** - Client and server-side validation for all inputs

---

## 📚 Documentation

- **[BACKEND_SETUP.md](./BACKEND_SETUP.md)** - Complete backend setup guide
- **[FRONTEND_TABLES_REFERENCE.md](./FRONTEND_TABLES_REFERENCE.md)** - Database schema reference
- **[MAKE_ADMIN.sql](./MAKE_ADMIN.sql)** - SQL script to grant admin access

---

## 🐛 Troubleshooting

### Admin Panel Not Accessible?

1. Run the admin role SQL query (see `MAKE_ADMIN.sql`)
2. Sign out and sign back in to refresh your session
3. Check browser console for errors
4. Verify RLS policies are set correctly

### Database Errors?

1. Re-run `FRESH_SETUP.sql` in Supabase SQL Editor
2. Verify all tables and policies were created successfully
3. Check Supabase logs for detailed error messages

### Build Errors?

1. Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
2. Clear Vite cache: `rm -rf .vite`
3. Verify all environment variables are set correctly

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Amazing component library
- [Supabase](https://supabase.com/) - Backend infrastructure
- [Vite](https://vitejs.dev/) - Lightning-fast build tool
- [React](https://react.dev/) - UI library

---

<div align="center">

**Made with ☕ coffee and ❤️ dedication**

[⬆ Back to Top](#-brewhaven---modern-e-commerce-platform)

</div>
