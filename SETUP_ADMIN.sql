-- ============================================
-- EASY ADMIN ACCESS SETUP
-- Run this in Supabase SQL Editor
-- ============================================

-- METHOD 1: Grant admin access using your email (EASIEST)
-- Replace 'YOUR_EMAIL@example.com' with your actual login email
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'YOUR_EMAIL@example.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- METHOD 2: Grant admin access using User ID
-- First, find your User ID from Supabase Dashboard > Authentication > Users
-- Then replace 'YOUR_USER_ID_HERE' with your actual UUID
-- INSERT INTO public.user_roles (user_id, role)
-- VALUES ('YOUR_USER_ID_HERE', 'admin'::public.app_role)
-- ON CONFLICT (user_id, role) DO NOTHING;

-- ============================================
-- VERIFY ADMIN ACCESS WAS GRANTED
-- ============================================
SELECT 
  ur.user_id,
  u.email,
  ur.role,
  ur.created_at
FROM public.user_roles ur
JOIN auth.users u ON u.id = ur.user_id
WHERE ur.role = 'admin';

-- ============================================
-- AFTER RUNNING:
-- 1. Sign out of your app completely
-- 2. Sign back in
-- 3. The "Admin" button should appear in navigation
-- 4. Go to /admin to access the dashboard
-- ============================================
