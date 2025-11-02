# Quick Start: Admin Access & Coffee Management

## 🚀 Get Admin Access in 3 Steps

### Step 1: Open Supabase SQL Editor
1. Go to your Supabase Dashboard
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New Query"**

### Step 2: Run the Setup SQL
Copy and paste this SQL (replace `YOUR_EMAIL@example.com` with your actual login email):

```sql
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'YOUR_EMAIL@example.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

**Example:**
```sql
-- If your email is john@example.com:
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'john@example.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

Click **"Run"** ✅

### Step 3: Sign Out & Sign Back In
1. Sign out of your app completely
2. Sign back in with the same email
3. The **"Admin"** button will now appear in the navigation
4. Click it or go to `/admin`

---

## ☕ Managing Coffee Products

Once you have admin access, you can:

### Add a New Coffee
1. Click **"Add Coffee"** button in Admin Dashboard
2. Fill in the form:
   - **Name**: e.g., "Caramel Latte"
   - **Description**: Describe your coffee
   - **Type**: Hot or Cold
   - **Category**: Select from dropdown (make sure categories exist!)
   - **Price**: Minimum ₹100
   - **Inventory**: Stock quantity
   - **Image URL**: Direct link to coffee image (optional but recommended)
   - **Featured**: Check to show on homepage
3. Click **"Add Coffee"**

### Add Images to Coffee

**Method 1: Using Unsplash (Free)**
1. Go to https://unsplash.com/s/photos/coffee
2. Find a suitable image
3. Right-click the image → **"Copy image address"**
4. Paste the URL in the "Image URL" field
5. The preview will show below the input

**Method 2: Direct Image URL**
- Use any direct image URL (not a webpage URL)
- Format: `https://example.com/image.jpg`
- Recommended size: 800x600px or larger

### Edit a Coffee
1. Find the coffee in the list
2. Click the **Edit** icon (pencil)
3. Modify any fields
4. Click **"Update Coffee"**

### Delete a Coffee
1. Find the coffee in the list
2. Click the **Delete** icon (trash)
3. Confirm deletion

---

## 🔍 Troubleshooting

### "No Admin button in navigation"
- Make sure you ran the SQL query in Step 2
- Sign out completely and sign back in
- Check browser console (F12) for errors

### "Can't access /admin"
- Verify your email has admin role: Run this SQL:
  ```sql
  SELECT u.email, ur.role 
  FROM public.user_roles ur
  JOIN auth.users u ON u.id = ur.user_id
  WHERE u.email = 'YOUR_EMAIL@example.com';
  ```
- Sign out and sign back in
- Clear browser cache (Ctrl+Shift+Delete)

### "No categories found"
- Categories should be created automatically by migrations
- If missing, you can create them in Supabase Dashboard → Table Editor → `categories`

### "Image not showing"
- Make sure the URL is a direct image link (ends with .jpg, .png, etc.)
- Check the URL in a new browser tab to verify it loads
- Some sites block external image embedding - use Unsplash or your own hosting

---

## 📝 Quick Reference

- **Admin Dashboard**: `/admin`
- **Setup File**: `SETUP_ADMIN.sql` (run in Supabase SQL Editor)
- **Minimum Price**: ₹100
- **Image Sources**: Unsplash, Pexels, Pixabay (all free)

---

## 💡 Tips

1. **Use Featured Products Wisely**: Only mark 3-6 best products as featured - they appear on the homepage
2. **High-Quality Images**: Use professional coffee images (800x600px minimum)
3. **Descriptive Names**: Clear names help customers find what they want
4. **Inventory Management**: Keep inventory numbers accurate to avoid overselling
5. **Categories**: Organize coffees by type (Espresso, Latte, Cold Brew, etc.)

---

## ✅ Verify Everything Works

After setup, you should be able to:
- ✅ See "Admin" button in navigation
- ✅ Access `/admin` without being redirected
- ✅ See statistics (Users, Chats, Coffees)
- ✅ Click "Add Coffee" and see the form
- ✅ Add/edit/delete coffee products
- ✅ Upload images with preview
- ✅ See coffee images in the admin list

If all these work, you're all set! 🎉

