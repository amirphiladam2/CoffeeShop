-- Fix images and prices for all coffee products
-- This migration adds correct images and updates prices to minimum ₹100

UPDATE public.coffees
SET 
  -- Fix images: Match by exact name first, then patterns
  -- Using curated Unsplash image URLs - each coffee gets a specific, appropriate image
  image_url = CASE
    -- Exact name matches first (most specific) - carefully chosen images
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
    
    -- Cold/Iced drinks - check before generic patterns
    WHEN LOWER(name) LIKE '%iced caramel macchiato%' THEN
      'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN LOWER(name) LIKE '%nitro cold brew%' OR LOWER(name) LIKE '%nitro%' THEN
      'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN LOWER(name) LIKE '%cold brew%' OR LOWER(name) LIKE '%coldbrew%' THEN
      'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN LOWER(name) LIKE '%iced%' AND type = 'Cold' THEN
      'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    
    -- Specific hot drinks - check type to ensure correct image
    WHEN LOWER(name) LIKE '%vanilla latte%' AND type = 'Hot' THEN
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN LOWER(name) LIKE '%white chocolate mocha%' OR LOWER(name) LIKE '%chocolate mocha%' THEN
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN LOWER(name) LIKE '%double shot americano%' OR LOWER(name) LIKE '%americano%' THEN
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN LOWER(name) LIKE '%classic espresso%' OR (LOWER(name) LIKE '%espresso%' AND type = 'Hot') THEN
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    
    -- Generic patterns - check type to assign correct image
    WHEN LOWER(name) LIKE '%latte%' AND type = 'Hot' THEN
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN LOWER(name) LIKE '%latte%' AND type = 'Cold' THEN
      'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN LOWER(name) LIKE '%mocha%' THEN
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN LOWER(name) LIKE '%macchiato%' AND type = 'Hot' THEN
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN LOWER(name) LIKE '%macchiato%' AND type = 'Cold' THEN
      'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN LOWER(name) LIKE '%cappuccino%' THEN
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN LOWER(name) LIKE '%americano%' THEN
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    
    -- Default by type if nothing matched
    WHEN type = 'Cold' THEN
      'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    WHEN type = 'Hot' THEN
      'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ELSE
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  END,
  
  -- Update prices to minimum ₹100 (convert old prices proportionally)
  price = CASE name
    WHEN 'Classic Espresso' THEN 150.00
    WHEN 'Vanilla Latte' THEN 200.00
    WHEN 'Iced Caramel Macchiato' THEN 220.00
    WHEN 'Nitro Cold Brew' THEN 250.00
    WHEN 'Double Shot Americano' THEN 180.00
    WHEN 'White Chocolate Mocha' THEN 230.00
    ELSE GREATEST(price, 100.00)  -- Keep existing price if >= 100, else set to 100
  END
WHERE name IN (
  'Classic Espresso', 
  'Vanilla Latte', 
  'Iced Caramel Macchiato', 
  'Nitro Cold Brew', 
  'Double Shot Americano', 
  'White Chocolate Mocha'
) OR image_url IS NULL OR image_url = '' OR price < 100;

