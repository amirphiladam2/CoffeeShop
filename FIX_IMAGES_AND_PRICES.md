# Fix Images and Prices - Quick Guide

A migration has been created to fix both image and price issues.

## What the Migration Does

1. **Fixes Images for ALL Products** (not just featured):
   - Assigns correct images based on product names
   - Handles specific products like "Iced Caramel Macchiato", "Nitro Cold Brew"
   - Ensures all products have images (no more placeholders)

2. **Updates Prices to Minimum ₹100**:
   - Sets prices for existing products to reasonable values (₹150-₹250)
   - Ensures all prices meet the ₹100 minimum requirement

## How to Run the Migration

### Option 1: Supabase Dashboard (Easiest)

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Open the file: `supabase/migrations/20251103000001_add_sample_coffee_images.sql`
3. Copy ALL the SQL code
4. Paste into SQL Editor
5. Click **"Run"** or press `Ctrl+Enter`

### Option 2: Using Supabase CLI

```bash
# Make sure you're in the project directory
cd coffee-ai-brew

# Link to your project if not already linked
supabase link --project-ref YOUR_PROJECT_REF

# Run the migration
supabase db push
```

## What Will Be Fixed

### Images:
- ✅ **Vanilla Latte**: Proper latte image (hot coffee)
- ✅ **Iced Caramel Macchiato**: Iced coffee image (not cafe interior)
- ✅ **Nitro Cold Brew**: Cold brew image
- ✅ **Classic Espresso**: Espresso shot image
- ✅ **Double Shot Americano**: Americano image
- ✅ **White Chocolate Mocha**: Mocha/chocolate coffee image

### Prices:
- ✅ **Classic Espresso**: ₹150 (was ₹3.50)
- ✅ **Vanilla Latte**: ₹200 (was ₹5.00)
- ✅ **Iced Caramel Macchiato**: ₹220 (was ₹5.50)
- ✅ **Nitro Cold Brew**: ₹250 (was ₹6.00)
- ✅ **Double Shot Americano**: ₹180 (was ₹4.00)
- ✅ **White Chocolate Mocha**: ₹230 (was ₹5.75)

## After Running

1. **Refresh your shop page** - images should now be correct
2. **Check prices** - all should be ₹100+
3. **Verify featured items** - should have proper images

## If Issues Persist

If some images are still wrong:
1. Go to **Admin Dashboard** (`/admin`)
2. Edit the problematic product
3. Use the Image URL field to add a specific image URL
4. You can find coffee images on Unsplash: https://unsplash.com/s/photos/coffee

---

**Note**: This migration is safe to run multiple times - it only updates products that need fixing (missing/wrong images or prices < ₹100).

