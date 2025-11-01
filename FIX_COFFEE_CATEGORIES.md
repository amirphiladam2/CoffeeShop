# Fix Coffee Categories and Types

The issue is that coffees might have incorrect `type` (Hot/Cold) values in the database.

## Quick Fix - Run This SQL

Go to **Supabase Dashboard** → **SQL Editor** and run:

```sql
-- Fix coffee types to ensure correct Hot/Cold categorization
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
  
  -- Auto-detect cold drinks by name
  ELSE CASE
    WHEN LOWER(name) LIKE '%iced%' OR LOWER(name) LIKE '%cold%' OR LOWER(name) LIKE '%nitro%' THEN 'Cold'
    ELSE type
  END
END
WHERE name IN (
  'Classic Espresso', 
  'Vanilla Latte', 
  'Iced Caramel Macchiato', 
  'Nitro Cold Brew', 
  'Double Shot Americano', 
  'White Chocolate Mocha'
) OR LOWER(name) LIKE '%iced%' 
   OR LOWER(name) LIKE '%cold%'
   OR LOWER(name) LIKE '%nitro%';
```

## Verify It Worked

After running, check the types:

```sql
SELECT name, type, category_id 
FROM public.coffees 
ORDER BY type, name;
```

You should see:
- **Hot**: Classic Espresso, Vanilla Latte, Double Shot Americano, White Chocolate Mocha
- **Cold**: Iced Caramel Macchiato, Nitro Cold Brew

## After Running

1. Refresh your shop page
2. Use the "All Types" filter to verify
3. Hot coffees should show under "Hot" filter
4. Cold coffees should show under "Cold" filter

---

**The migration file is also available**: `supabase/migrations/20251103000002_fix_coffee_types.sql`

