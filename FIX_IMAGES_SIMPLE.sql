-- SIMPLE FIX: Update images for each coffee product
-- Run this in Supabase SQL Editor

UPDATE public.coffees
SET image_url = CASE name
  -- Vanilla Latte: Hot cappuccino/latte image
  WHEN 'Vanilla Latte' THEN
    'https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  -- Iced Caramel Macchiato: Iced coffee in glass with ice
  WHEN 'Iced Caramel Macchiato' THEN
    'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  -- Nitro Cold Brew: Cold brew coffee
  WHEN 'Nitro Cold Brew' THEN
    'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  -- Classic Espresso: Espresso shot
  WHEN 'Classic Espresso' THEN
    'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  -- Double Shot Americano: Black coffee
  WHEN 'Double Shot Americano' THEN
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  -- White Chocolate Mocha: Mocha/chocolate coffee
  WHEN 'White Chocolate Mocha' THEN
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  
  ELSE image_url
END
WHERE name IN (
  'Vanilla Latte',
  'Iced Caramel Macchiato',
  'Nitro Cold Brew',
  'Classic Espresso',
  'Double Shot Americano',
  'White Chocolate Mocha'
);

-- Check results
SELECT name, type, LEFT(image_url, 50) as image_preview
FROM public.coffees
ORDER BY type, name;

