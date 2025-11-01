-- Create ice_flavours table
CREATE TABLE public.ice_flavours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT, -- Optional: hex color code for UI display
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.ice_flavours ENABLE ROW LEVEL SECURITY;

-- Ice flavours policies (public read, admin write)
CREATE POLICY "Anyone can view ice flavours"
  ON public.ice_flavours FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage ice flavours"
  ON public.ice_flavours FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Add ice_flavour_id to coffees table (optional relationship)
ALTER TABLE public.coffees 
ADD COLUMN IF NOT EXISTS ice_flavour_id UUID REFERENCES public.ice_flavours(id) ON DELETE SET NULL;

-- Insert default ice flavours
INSERT INTO public.ice_flavours (name, description, color) VALUES
  ('None', 'No ice flavour', '#CCCCCC'),
  ('Vanilla', 'Classic vanilla ice flavour', '#FFF8DC'),
  ('Caramel', 'Rich caramel ice flavour', '#D2691E'),
  ('Chocolate', 'Smooth chocolate ice flavour', '#8B4513'),
  ('Strawberry', 'Fresh strawberry ice flavour', '#FFB6C1'),
  ('Mint', 'Cool mint ice flavour', '#98FF98'),
  ('Coconut', 'Tropical coconut ice flavour', '#FFFACD'),
  ('Hazelnut', 'Nutty hazelnut ice flavour', '#D2B48C');

