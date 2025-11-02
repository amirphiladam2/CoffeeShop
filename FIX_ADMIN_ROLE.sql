-- ============================================
-- FIX ADMIN ROLE FOR YOUR ACCOUNT
-- Run this in Supabase SQL Editor
-- ============================================

-- STEP 1: Verify your user exists and get your email
SELECT id, email, created_at 
FROM auth.users 
WHERE id = 'bbb3ac9c-6b63-4672-854e-f47b61e2302d';

-- STEP 2: Add admin role using your User ID (RECOMMENDED)
INSERT INTO public.user_roles (user_id, role)
VALUES ('bbb3ac9c-6b63-4672-854e-f47b61e2302d', 'admin'::public.app_role)
ON CONFLICT (user_id, role) DO NOTHING;

-- STEP 3: Verify admin role was added
SELECT 
  ur.user_id,
  u.email,
  ur.role,
  ur.created_at
FROM public.user_roles ur
JOIN auth.users u ON u.id = ur.user_id
WHERE ur.user_id = 'bbb3ac9c-6b63-4672-854e-f47b61e2302d';

-- You should see your email with role = 'admin'
-- If you see the row, the admin role is set correctly!

-- ============================================
-- ALTERNATIVE: If you prefer using email
-- ============================================
-- Replace 'YOUR_EMAIL@example.com' with your actual email
-- INSERT INTO public.user_roles (user_id, role)
-- SELECT id, 'admin'::public.app_role
-- FROM auth.users
-- WHERE email = 'YOUR_EMAIL@example.com'
-- ON CONFLICT (user_id, role) DO NOTHING;

-- ============================================
-- AFTER RUNNING:
-- 1. Sign out completely from the app
-- 2. Sign back in
-- 3. Check browser console - you should see: ✅ Admin role confirmed
-- 4. Admin button should appear in navigation
-- ============================================

