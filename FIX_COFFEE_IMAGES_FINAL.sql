-- Final Fix: Update all coffee images with correct, specific images
-- Run this in Supabase SQL Editor to fix all coffee images

UPDATE public.coffees
SET image_url = CASE
  -- Exact product name matches (most specific)
  WHEN name = 'Vanilla Latte' THEN
    'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  WHEN name = 'Iced Caramel Macchiato' THEN
    'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  WHEN name = 'Nitro Cold Brew' THEN
    'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  WHEN name = 'Classic Espresso' THEN
    'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  WHEN name = 'Double Shot Americano' THEN
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  WHEN name = 'White Chocolate Mocha' THEN
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  -- Pattern-based matching for other products
  WHEN LOWER(name) LIKE '%iced%' AND type = 'Cold' THEN
    'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  WHEN LOWER(name) LIKE '%cold brew%' OR LOWER(name) LIKE '%nitro%' THEN
    'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  WHEN (LOWER(name) LIKE '%latte%' OR LOWER(name) LIKE '%cappuccino%') AND type = 'Hot' THEN
    'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  WHEN LOWER(name) LIKE '%espresso%' AND type = 'Hot' THEN
    'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  WHEN LOWER(name) LIKE '%americano%' AND type = 'Hot' THEN
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  WHEN LOWER(name) LIKE '%mocha%' OR LOWER(name) LIKE '%chocolate%' THEN
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  WHEN LOWER(name) LIKE '%macchiato%' AND type = 'Hot' THEN
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  -- Default by type
  WHEN type = 'Cold' THEN
    'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  WHEN type = 'Hot' THEN
    'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  ELSE image_url
END;

-- Verify the updates
SELECT name, type, image_url 
FROM public.coffees 
ORDER BY type, name;

