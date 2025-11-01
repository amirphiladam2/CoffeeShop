# Adding Images to Featured Coffee Products

Images have been added to the Admin panel! You can now add images to your coffee products, especially for featured items.

## Quick Steps

### 1. Using the Admin Panel

1. Go to **Admin Dashboard** (`/admin`)
2. Click **"Add Coffee"** or edit an existing coffee
3. Fill in the form as usual
4. In the **"Image URL (Optional)"** field:
   - Enter a direct image URL (e.g., `https://images.unsplash.com/photo-xxx`)
   - A preview will show below the input
   - For featured products, use high-quality images (800x600px recommended)
5. Check **"Featured Product"** if you want it to appear on the homepage
6. Click **"Add Coffee"** or **"Update Coffee"**

### 2. Running the Migration (Optional - Adds Sample Images)

If you want to automatically add sample images to existing featured products:

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Run the migration: `supabase/migrations/20251103000001_add_sample_coffee_images.sql`
   - This will add Unsplash coffee images based on product names/types
   - Only updates featured products that don't already have images

### 3. Finding Free Coffee Images

**Recommended Sources:**

- **Unsplash** (https://unsplash.com/s/photos/coffee)
  - Free, high-quality photos
  - Right-click image → "Copy image address"
  - Make sure to use the direct image URL (not the Unsplash page URL)

- **Pexels** (https://www.pexels.com/search/coffee/)
  - Free stock photos
  - Click image → Right-click → "Copy image address"

- **Pixabay** (https://pixabay.com/images/search/coffee/)
  - Free images with no attribution required

**Image Requirements:**
- Format: JPG, PNG, or WebP
- Size: 800x600px recommended (or larger, will be automatically resized)
- Direct URL: Must be a direct link to the image file (not a webpage)

### 4. Best Practices

✅ **Do:**
- Use high-quality, professional coffee images
- Match image style to your coffee type (hot/cold, latte/espresso, etc.)
- Use images that represent the actual product
- Keep images optimized (not too large, under 1MB if possible)

❌ **Don't:**
- Use copyrighted images without permission
- Use images that don't match the product
- Use broken or expired image URLs
- Use images with watermarks

## Example Image URLs

Here are some example Unsplash coffee image URLs you can use:

```text
# Espresso
https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&h=600&fit=crop&q=80

# Latte
https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop&q=80

# Cappuccino
https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&h=600&fit=crop&q=80

# Cold Brew/Iced Coffee
https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=600&fit=crop&q=80

# Mocha
https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&q=80
```

## Troubleshooting

**Image not showing?**
- Check if the URL is a direct link to the image (ends with .jpg, .png, etc.)
- Verify the URL is accessible (try opening it in a new tab)
- Check browser console for any CORS or 404 errors

**Preview not working?**
- The preview will hide if the image fails to load (likely CORS issue)
- The image should still work on the actual site if it's from a reputable source

**Images not displaying on homepage?**
- Make sure the coffee product has `featured = true` checked
- Verify the `image_url` field is filled in
- Check that the coffee has `inventory > 0`

---

**Need help?** Check the Admin panel - the image preview will help you verify URLs work correctly!

