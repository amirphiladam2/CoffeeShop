# Admin Panel - Database Tables Reference

## Supabase Table URLs

Your Supabase project URL: `https://eoryyqttzktnwjpzdwef.supabase.co`

### Main Tables (REST API Endpoints)

**1. Coffees Table:**
```
https://eoryyqttzktnwjpzdwef.supabase.co/rest/v1/coffees
```
**Used for:** Managing coffee products (add, edit, delete, set featured)

**2. Categories Table:**
```
https://eoryyqttzktnwjpzdwef.supabase.co/rest/v1/categories
```
**Used for:** Managing coffee categories (Espresso, Latte, etc.)

**3. Ice Flavours Table:**
```
https://eoryyqttzktnwjpzdwef.supabase.co/rest/v1/ice_flavours
```
**Used for:** Managing ice coffee flavours (Vanilla, Caramel, etc.)

## Table Schemas

### 1. `coffees` Table

**Columns:**
- `id` (UUID, Primary Key) - Auto-generated
- `name` (TEXT, Required) - Coffee name (e.g., "Caramel Latte")
- `description` (TEXT, Optional) - Coffee description
- `type` (TEXT, Required) - "Hot" or "Cold"
- `category_id` (UUID, Optional) - Links to `categories` table
- `price` (DECIMAL 10,2) - Price in ₹ (default: 100.00)
- `inventory` (INTEGER) - Stock count (default: 0)
- `featured` (BOOLEAN) - Featured product flag (default: false)
- `image_url` (TEXT, Optional) - Direct URL to image
- `ice_flavour_id` (UUID, Optional) - Links to `ice_flavours` table
- `created_at` (TIMESTAMPTZ) - Auto-generated
- `updated_at` (TIMESTAMPTZ) - Auto-updated

**Current Admin Page Supports:**
- ✅ Add coffee (name, description, type, category, price, inventory)
- ✅ Edit coffee
- ✅ Delete coffee
- ✅ Set featured flag
- ✅ Add image URL
- ✅ View all coffees with images

**Can Be Added:**
- ⚠️ Image upload (currently only URL input)
- ⚠️ Ice flavour selection (ice_flavour_id field exists but not in form)

### 2. `categories` Table

**Columns:**
- `id` (UUID, Primary Key)
- `name` (TEXT, Required, Unique) - Category name
- `description` (TEXT, Optional)
- `created_at` (TIMESTAMPTZ)

**Current Status:**
- ✅ Admin can view categories
- ⚠️ No UI to add/edit categories (need to add this)

### 3. `ice_flavours` Table

**Columns:**
- `id` (UUID, Primary Key)
- `name` (TEXT, Required, Unique) - Flavour name
- `description` (TEXT, Optional)
- `color` (TEXT, Optional) - Hex color code for UI
- `created_at` (TIMESTAMPTZ)

**Default Flavours:**
- None, Vanilla, Caramel, Chocolate, Strawberry, Mint, Coconut, Hazelnut

**Current Status:**
- ⚠️ No UI to manage ice flavours in admin panel
- ⚠️ No UI to assign flavours to coffees

## Current Admin Functionality

### ✅ What Works:
1. **Coffee Management:**
   - Add new coffee (name, description, type, category, price, inventory)
   - Edit existing coffee
   - Delete coffee
   - Set featured status
   - Add image URL (direct link)
   - View coffee list with images

2. **Statistics:**
   - Total Users count
   - Total Chats count
   - Total Coffees count

### ⚠️ What's Missing:
1. **Image Upload:**
   - Currently only supports image URLs
   - Need to add Supabase Storage upload functionality

2. **Category Management:**
   - Can select categories, but can't create/edit/delete them

3. **Ice Flavour Management:**
   - Table exists but no UI to manage flavours
   - No way to assign flavours to coffees

4. **Featured Products Display:**
   - Can mark products as featured
   - Need to verify featured products show on landing/shop page

## Supabase Storage (for Image Uploads)

**Storage Bucket URL Pattern:**
```
https://eoryyqttzktnwjpzdwef.supabase.co/storage/v1/object/public/{bucket-name}/{file-path}
```

**Common Buckets:**
- `coffee-images` (you may need to create this)
- `products` 
- `uploads`

**To Upload Images:**
1. Create a storage bucket in Supabase Dashboard → Storage
2. Set bucket to public
3. Upload image files
4. Get public URL
5. Store URL in `coffees.image_url`

## Quick Reference: Supabase Client Usage

```typescript
import { supabase } from "@/integrations/supabase/client";

// Get all coffees
const { data, error } = await supabase.from("coffees").select("*");

// Get featured coffees
const { data } = await supabase
  .from("coffees")
  .select("*")
  .eq("featured", true)
  .order("created_at", { ascending: false });

// Add new coffee
const { error } = await supabase.from("coffees").insert({
  name: "Espresso",
  description: "Strong coffee",
  type: "Hot",
  category_id: "category-uuid",
  price: 120.00,
  inventory: 50,
  featured: true,
  image_url: "https://example.com/image.jpg"
});

// Update coffee
const { error } = await supabase
  .from("coffees")
  .update({ price: 150.00, featured: true })
  .eq("id", "coffee-uuid");

// Delete coffee
const { error } = await supabase
  .from("coffees")
  .delete()
  .eq("id", "coffee-uuid");

// Get categories
const { data } = await supabase.from("categories").select("*");

// Get ice flavours
const { data } = await supabase.from("ice_flavours").select("*");
```

## Next Steps for Enhanced Admin Panel

1. **Add Category Management UI:**
   - Create/edit/delete categories
   - Add to Admin.tsx

2. **Add Ice Flavour Management:**
   - Create/edit/delete flavours
   - Assign flavours to coffees in coffee form

3. **Add Image Upload:**
   - Supabase Storage integration
   - Upload images directly from admin panel
   - Store public URLs in database

4. **Enhanced Featured Products:**
   - Filter view to show only featured
   - Drag-and-drop to reorder featured items
   - Limit number of featured products

