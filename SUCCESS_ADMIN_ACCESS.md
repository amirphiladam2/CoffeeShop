# ✅ Admin Access Setup - Success!

Great! You've successfully set up admin access. Here's what to do next:

## ✅ What You Did Right

You used the **email-based method** which is the most reliable:

```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

This is better than using UUIDs because:
- ✅ No copy/paste errors with long UUIDs
- ✅ Works with your login email
- ✅ Automatically finds your user ID

## 🎯 Accessing Admin Dashboard

Now you can access the admin dashboard in two ways:

### Method 1: Navigation Button
1. Sign in to https://havenbrew.vercel.app
2. Look for the **"Admin"** button in the top navigation (after "Profile")
3. Click it → Goes to `/admin`

### Method 2: Direct URL
- Go directly to: https://havenbrew.vercel.app/admin

## 📋 What You Can Do in Admin Dashboard

- ✅ **Manage Coffee Products**: Add, edit, delete coffee items
- ✅ **Set Featured Products**: Mark products to show on homepage
- ✅ **Manage Categories**: Organize coffee by categories
- ✅ **Manage Ice Flavours**: Add ice flavour options
- ✅ **View Statistics**: See total users, chats, and coffees
- ✅ **Set Prices**: Must be at least ₹100
- ✅ **Add Images**: Upload image URLs for products

## 🔒 Security Note

Your admin access is stored in the `user_roles` table. Only users with the `admin` role can access `/admin`.

To give admin access to another user:
```sql
-- Replace with their email
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'other-user@example.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

---

**Enjoy managing your coffee shop!** ☕

