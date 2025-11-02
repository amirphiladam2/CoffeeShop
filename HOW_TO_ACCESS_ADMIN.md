# How to Access Admin Page

## Quick Access Methods

### Method 1: Direct URL (Fastest)
Simply go to:
```
http://localhost:8080/admin
```
or in production:
```
https://your-site.vercel.app/admin
```

### Method 2: Admin Button in Navigation
**If you have admin privileges:**
- The "Admin Panel" button appears in the navigation bar (top right)
- Click it to go to `/admin`

**If the button is NOT visible:**
- You don't have admin role assigned
- See "Setup Admin Access" below

### Method 3: From Profile Page
1. Go to `/profile` page
2. Look for "Admin Access" card
3. Click "Open Admin Panel" button (if you're an admin)

## Setup Admin Access

### Step 1: Get Your User ID

**Option A: From Browser Console**
1. Sign in to your app
2. Open DevTools (F12) → Console
3. Run:
```javascript
// Get your user ID
const user = JSON.parse(localStorage.getItem('sb-eoryyqttzktnwjpzdwef-auth-token') || '{}');
console.log('User ID:', user.user?.id);
```

**Option B: From Supabase Dashboard**
1. Go to Supabase Dashboard → Authentication → Users
2. Find your email
3. Copy your User ID (UUID format)

### Step 2: Add Admin Role

1. Go to **Supabase Dashboard** → Your Project
2. Click **SQL Editor**
3. Run this SQL (replace `YOUR_USER_ID` with your actual User ID):

```sql
-- Add admin role for your user
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID_HERE', 'admin'::public.app_role)
ON CONFLICT (user_id, role) DO NOTHING;

-- Verify it was added
SELECT 
  ur.user_id,
  u.email,
  ur.role,
  ur.created_at
FROM public.user_roles ur
JOIN auth.users u ON u.id = ur.user_id
WHERE ur.role = 'admin';
```

### Step 3: Refresh Admin Status

1. **Sign out** of your app
2. **Sign back in**
3. The admin button should appear
4. Go to `/admin` page

## Verify Admin Access

**Check browser console (F12):**
```javascript
// Should show: isAdmin: true
console.log('Admin status:', JSON.parse(localStorage.getItem('sb-eoryyqttzktnwjpzdwef-auth-token') || '{}'));
```

**Or check in the app:**
1. Go to `/profile` page
2. Look at "Admin Access" card
3. Should show: "✅ You have admin access!"

## Troubleshooting

### "Admin Panel" button not visible
**Cause:** `isAdmin` is false
**Fix:** Add admin role using SQL above

### Can't access `/admin` - redirects to home
**Cause:** Admin role not detected
**Fix:**
1. Check if admin role exists in database
2. Sign out and sign back in
3. Check browser console for admin status logs

### Admin role exists but still not working
**Cause:** Cache or auth state issue
**Fix:**
1. Clear browser localStorage:
```javascript
localStorage.clear();
```
2. Sign out
3. Sign back in
4. Try `/admin` again

## Admin Page Features

Once you access `/admin`, you can:
- ✅ View statistics (users, chats, coffees)
- ✅ Add new coffee items
- ✅ Edit existing coffees
- ✅ Delete coffees
- ✅ Set prices and inventory
- ✅ Mark products as featured
- ✅ Add image URLs

## Quick Test

**To test if admin access works:**
1. Go directly to: `http://localhost:8080/admin`
2. If you see "Admin Dashboard" → ✅ Working!
3. If you're redirected to home → ⚠️ Need to add admin role

