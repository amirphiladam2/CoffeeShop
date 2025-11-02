-- ============================================
-- FRESH SUPABASE SETUP - RUN ALL OF THIS
-- ============================================
-- Copy all this SQL and run in Supabase SQL Editor
-- ============================================

-- Step 1: Create app_role enum for role-based access
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Step 2: Create has_role function (SECURITY DEFINER - bypasses RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
    AND role = _role
  );
END;
$$;

-- Step 3: Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- User roles policies
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Step 4: Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Anyone can view profiles"
  ON public.profiles FOR SELECT
  USING (true);

-- Step 5: Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Step 6: Create coffees table
CREATE TABLE IF NOT EXISTS public.coffees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  image_url TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 100.00,
  inventory INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.coffees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view coffees"
  ON public.coffees FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage coffees"
  ON public.coffees FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Step 7: Create ice_flavours table
CREATE TABLE IF NOT EXISTS public.ice_flavours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.ice_flavours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ice flavours"
  ON public.ice_flavours FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage ice flavours"
  ON public.ice_flavours FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Add ice_flavour_id to coffees (optional)
ALTER TABLE public.coffees 
ADD COLUMN IF NOT EXISTS ice_flavour_id UUID REFERENCES public.ice_flavours(id) ON DELETE SET NULL;

-- Step 8: Create chat_history table
CREATE TABLE IF NOT EXISTS public.chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  bot_response TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own chat history"
  ON public.chat_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat history"
  ON public.chat_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all chat history"
  ON public.chat_history FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Step 9: Create orders table
CREATE TYPE IF NOT EXISTS public.order_status AS ENUM ('pending', 'confirmed', 'processing', 'out_for_delivery', 'delivered', 'cancelled');

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status public.order_status NOT NULL DEFAULT 'pending',
  payment_method TEXT NOT NULL DEFAULT 'COD',
  shipping_address TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_postal_code TEXT NOT NULL,
  shipping_phone TEXT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders"
  ON public.orders FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update orders"
  ON public.orders FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Step 10: Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  coffee_id UUID NOT NULL REFERENCES public.coffees(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own order items"
  ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items for their orders"
  ON public.order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all order items"
  ON public.order_items FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Step 11: Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 12: Create triggers for updated_at
CREATE TRIGGER update_coffees_updated_at
  BEFORE UPDATE ON public.coffees
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Step 13: Insert default categories
INSERT INTO public.categories (name, description) VALUES
  ('Espresso', 'Strong, concentrated coffee'),
  ('Latte', 'Espresso with steamed milk'),
  ('Cappuccino', 'Equal parts espresso, milk, and foam'),
  ('Americano', 'Espresso with hot water'),
  ('Cold Brew', 'Smooth, less acidic cold coffee'),
  ('Specialty', 'Unique coffee creations')
ON CONFLICT (name) DO NOTHING;

-- Step 14: Insert default ice flavours
INSERT INTO public.ice_flavours (name, description, color) VALUES
  ('None', 'No ice flavour', '#CCCCCC'),
  ('Vanilla', 'Classic vanilla ice flavour', '#FFF8DC'),
  ('Caramel', 'Rich caramel ice flavour', '#D2691E'),
  ('Chocolate', 'Smooth chocolate ice flavour', '#8B4513'),
  ('Strawberry', 'Fresh strawberry ice flavour', '#FFB6C1'),
  ('Mint', 'Cool mint ice flavour', '#98FF98'),
  ('Coconut', 'Tropical coconut ice flavour', '#FFFACD'),
  ('Hazelnut', 'Nutty hazelnut ice flavour', '#D2B48C')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- SETUP COMPLETE! ✅
-- ============================================
-- Next steps:
-- 1. Get your Supabase URL and anon key
-- 2. Set environment variables in Vercel
-- 3. Deploy edge function (see FRESH_SETUP.md)
-- 4. Add admin role for your user (see below)
-- ============================================

-- TO ADD ADMIN ROLE FOR YOUR USER:
-- Replace 'your-email@example.com' with your actual email
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Verify admin role was added:
SELECT 
  ur.user_id,
  u.email,
  ur.role,
  ur.created_at
FROM public.user_roles ur
JOIN auth.users u ON u.id = ur.user_id
WHERE ur.role = 'admin';

