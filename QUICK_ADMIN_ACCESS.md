# Quick Guide: Access Admin Dashboard

## Step 1: Get Your User ID

### Option A: From Supabase Dashboard (Easiest)
1. Go to **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project
3. Click **"Authentication"** → **"Users"**
4. Find your email address
5. **Copy the User ID** (the UUID in the ID column)

### Option B: From Browser Console
1. Open your app and log in
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Type: `JSON.parse(localStorage.getItem('sb-<YOUR_PROJECT_REF>-auth-token')).user.id`
   - Replace `<YOUR_PROJECT_REF>` with your Supabase project reference
5. Copy the ID that appears

## Step 2: Add Admin Role ✅ EASIEST METHOD

**Recommended: Use your email (no need to find User ID)**

1. In **Supabase Dashboard**, go to **SQL Editor**
2. **Paste this SQL** (replace with YOUR email):

```sql
-- Add admin role using email (EASIEST METHOD)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

3. Replace `your-email@example.com` with YOUR actual email
4. Click **"Run"** or press `Ctrl+Enter`

**Alternative: Using User ID** (if you prefer)
```sql
-- If you want to use User ID instead
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID_HERE', 'admin'::public.app_role)
ON CONFLICT (user_id, role) DO NOTHING;
```

## Step 3: Verify Admin Role Was Added

Run this to check:
```sql
-- Verify admin role
SELECT ur.*, u.email 
FROM public.user_roles ur
JOIN auth.users u ON u.id = ur.user_id
WHERE ur.role = 'admin';
```

You should see your email and user ID listed.

## Step 4: Access Admin Dashboard

1. **Sign out** and **sign back in** (important!)
2. After logging in, you should see **"Admin"** button in the top navigation
3. Click **"Admin"** → Goes to `/admin`

OR

Just go directly to: `https://your-site-url.com/admin`

---

## If You Still Don't See Admin Button

1. ✅ Make sure you ran the SQL query correctly
2. ✅ Sign out completely and sign back in
3. ✅ Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
4. ✅ Check if you're logged in with the correct account

## Need Help Finding Your User ID?

Run this SQL in Supabase to find your user by email:

```sql
-- Find user by email
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'your-email@example.com';
```

Then use the `id` from the result in Step 2 above.

---

**That's it!** Once you have admin role, you can access `/admin` anytime.

