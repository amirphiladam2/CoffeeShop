-- Fix coffee types (Hot/Cold) for correct categorization
-- This ensures Iced drinks are marked as Cold type

UPDATE public.coffees
SET type = CASE name
  -- Cold drinks
  WHEN 'Iced Caramel Macchiato' THEN 'Cold'
  WHEN 'Nitro Cold Brew' THEN 'Cold'
  
  -- Hot drinks
  WHEN 'Classic Espresso' THEN 'Hot'
  WHEN 'Vanilla Latte' THEN 'Hot'
  WHEN 'Double Shot Americano' THEN 'Hot'
  WHEN 'White Chocolate Mocha' THEN 'Hot'
  
  -- Keep existing type if name doesn't match
  ELSE type
END
WHERE name IN (
  'Classic Espresso', 
  'Vanilla Latte', 
  'Iced Caramel Macchiato', 
  'Nitro Cold Brew', 
  'Double Shot Americano', 
  'White Chocolate Mocha'
);

-- Also update any coffees with 'iced' or 'cold' in the name to be Cold type
UPDATE public.coffees
SET type = 'Cold'
WHERE LOWER(name) LIKE '%iced%' 
   OR LOWER(name) LIKE '%cold%'
   OR LOWER(name) LIKE '%nitro%';

