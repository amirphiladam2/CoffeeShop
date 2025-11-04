-- ============================================
-- MAKE USER ADMIN - SQL SCRIPT
-- ============================================
-- Run this in Supabase SQL Editor
-- ============================================

-- Method 1: Make admin by EMAIL (easiest)
-- Replace 'your-email@example.com' with the actual user's email
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Method 2: Make admin by USER ID (UUID)
-- Replace 'USER_ID_HERE' with the actual user's UUID from auth.users table
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_ID_HERE', 'admin'::public.app_role)
ON CONFLICT (user_id, role) DO NOTHING;

-- ============================================
-- VERIFY ADMIN ROLE WAS ADDED
-- ============================================
-- Check all admins:
SELECT 
  ur.user_id,
  u.email,
  ur.role,
  ur.created_at
FROM public.user_roles ur
JOIN auth.users u ON u.id = ur.user_id
WHERE ur.role = 'admin';

-- ============================================
-- REMOVE ADMIN ROLE (if needed)
-- ============================================
-- DELETE FROM public.user_roles 
-- WHERE user_id = 'USER_ID_HERE' 
-- AND role = 'admin'::public.app_role;

