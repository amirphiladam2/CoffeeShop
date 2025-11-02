# Frontend Database Tables Reference

This document lists all tables and fields that the frontend expects.

## 📋 Tables Required by Frontend

### 1. **user_roles** (Authentication & Authorization)
- `user_id` (UUID) - References `auth.users(id)`
- `role` (enum: 'admin' | 'user')
- `created_at` (TIMESTAMPTZ)

**Used by:**
- `src/contexts/AuthContext.tsx` - Admin role checking

---

### 2. **profiles** (User Profiles)
- `id` (UUID) - Primary key, references `auth.users(id)`
- `email` (TEXT)
- `full_name` (TEXT, nullable)
- `role` (enum: 'admin' | 'user') - Default: 'user'
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

**Used by:**
- `src/pages/Profile.tsx` - Display user profile
- `src/pages/Admin.tsx` - Count total users

---

### 3. **categories** (Coffee Categories)
- `id` (UUID)
- `name` (TEXT, UNIQUE)
- `description` (TEXT, nullable)
- `created_at` (TIMESTAMPTZ)

**Used by:**
- `src/pages/Shop.tsx` - Filter coffees by category
- `src/pages/Admin.tsx` - Select category when adding coffee

---

### 4. **coffees** (Coffee Products)
- `id` (UUID)
- `name` (TEXT) - Required
- `description` (TEXT, nullable)
- `type` (TEXT) - "Hot" or "Cold"
- `category_id` (UUID, nullable) - References `categories(id)`
- `image_url` (TEXT, nullable)
- `price` (DECIMAL(10,2)) - Default: 100.00
- `inventory` (INTEGER) - Default: 0
- `featured` (BOOLEAN) - Default: false
- `ice_flavour_id` (UUID, nullable) - References `ice_flavours(id)` (optional)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

**Used by:**
- `src/pages/Shop.tsx` - Display products, filter, search
- `src/pages/Landing.tsx` - Show featured products
- `src/pages/Admin.tsx` - CRUD operations
- `src/pages/Checkout.tsx` - Update inventory after order

---

### 5. **ice_flavours** (Ice Cream Flavours - Optional)
- `id` (UUID)
- `name` (TEXT, UNIQUE)
- `description` (TEXT, nullable)
- `color` (TEXT, nullable) - Hex color code
- `created_at` (TIMESTAMPTZ)

**Used by:**
- Optional feature, can be linked to coffees via `ice_flavour_id`

---

### 6. **chat_history** (AI Chat Messages)
- `id` (UUID)
- `user_id` (UUID) - References `auth.users(id)`
- `message` (TEXT) - User's message
- `bot_response` (TEXT, nullable) - AI response
- `created_at` (TIMESTAMPTZ)

**Used by:**
- `src/pages/Chat.tsx` - Save chat messages
- `src/pages/Profile.tsx` - Count user's chat messages
- `src/pages/Admin.tsx` - Count total chats

---

### 7. **orders** (Customer Orders)
- `id` (UUID)
- `user_id` (UUID) - References `auth.users(id)`
- `status` (enum) - 'pending', 'confirmed', 'processing', 'out_for_delivery', 'delivered', 'cancelled'
- `payment_method` (TEXT) - Default: 'COD'
- `shipping_address` (TEXT)
- `shipping_city` (TEXT)
- `shipping_postal_code` (TEXT)
- `shipping_phone` (TEXT)
- `total_amount` (DECIMAL(10,2))
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

**Used by:**
- `src/pages/Checkout.tsx` - Create new orders
- `src/pages/Orders.tsx` - Display user orders
- `src/pages/Admin.tsx` - View all orders (future feature)

---

### 8. **order_items** (Order Line Items)
- `id` (UUID)
- `order_id` (UUID) - References `orders(id)`
- `coffee_id` (UUID) - References `coffees(id)`
- `quantity` (INTEGER) - Must be > 0
- `price` (DECIMAL(10,2)) - Price at time of order
- `subtotal` (DECIMAL(10,2)) - quantity * price
- `created_at` (TIMESTAMPTZ)

**Used by:**
- `src/pages/Checkout.tsx` - Create order items
- `src/pages/Orders.tsx` - Display order details

---

## 🔑 Required Functions

### **has_role** (Check user role)
```sql
has_role(_user_id UUID, _role app_role) RETURNS BOOLEAN
```

**Used by:**
- `src/contexts/AuthContext.tsx` - Check if user is admin
- RLS policies for admin access

---

## 🔐 RLS Policies Required

All tables must have Row Level Security (RLS) enabled with appropriate policies:

1. **Public Read**: `coffees`, `categories`, `ice_flavours`
2. **User Own Data**: `profiles`, `chat_history`, `orders`, `order_items`
3. **Admin Full Access**: All tables for admin role
4. **Role-based**: `user_roles` (users see own, admins see all)

---

## ✅ Verification Checklist

After running `FRESH_SETUP.sql`, verify:

- [ ] All 8 tables created
- [ ] All RLS policies enabled
- [ ] `has_role` function works
- [ ] Default categories inserted
- [ ] Default ice flavours inserted (optional)
- [ ] Triggers created for `updated_at`
- [ ] Auto-profile creation on signup works

---

## 📝 Notes

- The `profiles.role` field exists but the app primarily uses `user_roles` table for role management
- `ice_flavours` is optional - can be removed if not needed
- All prices should be in same currency (app assumes ₹/INR)
- `type` field in `coffees` should only be "Hot" or "Cold" (case-sensitive)

