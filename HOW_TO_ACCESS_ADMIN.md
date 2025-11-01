# How to Open the Admin Dashboard

## Quick Steps

### Option 1: Using the Navigation Button (Easiest)
1. **Log in** to your account
2. **Look at the top navigation bar** (where you see Chat, Profile, Sign Out buttons)
3. **Find the "Admin" button** - it appears after "Profile" if you have admin access
4. **Click "Admin"** → Goes to `/admin`

### Option 2: Direct URL
1. **Log in** to your account
2. **Type in your browser**: `http://localhost:8080/admin` (or your deployed URL + `/admin`)
3. If you have admin access, you'll see the dashboard
4. If not, you'll be redirected to the home page

## ⚠️ Important: You Need Admin Role First!

The admin button only appears if your user has the `admin` role in the database. Here's how to set it up:

### Step 1: Get Your User ID

**Option A: From Browser Console**
1. Open your browser's Developer Tools (F12)
2. Go to Console tab
3. Type: `localStorage.getItem('sb-<YOUR_PROJECT_REF>-auth-token')`
   - Or check Application → Local Storage
4. Look for your user ID in the auth data

**Option B: From Supabase Dashboard**
1. Go to your Supabase project dashboard
2. Click "Authentication" → "Users"
3. Find your user and copy the UUID (the ID column)

### Step 2: Add Admin Role in Supabase

**In Supabase SQL Editor:**
```sql
-- Replace 'YOUR_USER_ID_HERE' with your actual user UUID
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID_HERE', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

**Example:**
```sql
-- Example (use YOUR actual user ID)
INSERT INTO public.user_roles (user_id, role)
VALUES ('123e4567-e89b-12d3-a456-426614174000', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

### Step 3: Refresh Your App

1. **Sign out** and **sign back in** (or just refresh the page)
2. The "Admin" button should now appear in your navigation
3. Click it to access the dashboard

## Visual Guide

```
┌──────────────────────────────────────────────────┐
│ BrewHaven                                    [Sign Out] │
│                                                         │
│ Navigation Bar:                                         │
│ [Chat] [Profile] [🆕 Admin] ← Appears here!            │
└──────────────────────────────────────────────────┘
```

## Troubleshooting

**❌ I don't see the "Admin" button?**
- You need to add admin role to your user (see Step 2 above)
- Make sure you're logged in
- Sign out and sign back in after adding the role

**❌ I get redirected when I go to /admin?**
- This means you don't have admin privileges
- Run the SQL query in Step 2 to add admin role

**❌ How do I know my User ID?**
- Check Supabase Dashboard → Authentication → Users
- Or check browser console/Application → Local Storage for auth tokens

## Quick SQL Script

Run this in Supabase SQL Editor (replace with your email):

```sql
-- Find your user ID by email
SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';

-- Then add admin role (replace USER_ID with the ID from above)
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_ID_FROM_ABOVE', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

## Verify Admin Access

After adding the role, you can verify:
```sql
-- Check if admin role was added
SELECT ur.*, u.email 
FROM public.user_roles ur
JOIN auth.users u ON u.id = ur.user_id
WHERE ur.role = 'admin';
```

