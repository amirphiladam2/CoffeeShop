# ⚠️ ADMIN ACCESS SETUP - DO THIS NOW

You're being redirected from `/admin` because you don't have admin role yet. Follow these steps:

## Step 1: Get Your User ID

1. Go to **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project
3. Click **"Authentication"** → **"Users"**
4. Find your email address in the list
5. **Copy the User ID** (the UUID in the ID column)

## Step 2: Add Admin Role (Run This SQL) ✅ RECOMMENDED METHOD

1. In Supabase Dashboard, go to **SQL Editor**
2. **Paste this SQL** (replace `your-email@example.com` with YOUR email):

```sql
-- Add admin role using your email (RECOMMENDED - easier and more reliable)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

3. Replace `your-email@example.com` with YOUR actual email address
4. Click **"Run"**

**Why this method is better:**
- ✅ No need to copy/paste UUIDs (less error-prone)
- ✅ Works with your login email
- ✅ Automatically finds your user ID

## Step 3: Verify It Worked

Run this SQL to check:

```sql
-- Verify admin role was added
SELECT ur.*, u.email 
FROM public.user_roles ur
JOIN auth.users u ON u.id = ur.user_id
WHERE ur.role = 'admin';
```

You should see your email listed.

## Step 4: Refresh Your App

1. **Sign out** completely from https://havenbrew.vercel.app
2. **Sign back in**
3. Now go to: https://havenbrew.vercel.app/admin
4. ✅ It should work!

---

## Quick SQL Template (Copy-Paste Ready)

```sql
-- Replace 'your-email@example.com' with YOUR email
-- This automatically finds your user ID and adds admin role
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

This will automatically find your user ID by email and add admin role!

---

## Still Not Working?

1. ✅ Make sure you ran the SQL query correctly
2. ✅ Make sure you signed out and signed back in
3. ✅ Clear browser cache (Ctrl+Shift+Delete)
4. ✅ Check browser console (F12) for any errors
5. ✅ Verify in Supabase that your user has admin role in `user_roles` table

After completing these steps, `/admin` will work! 🎉

