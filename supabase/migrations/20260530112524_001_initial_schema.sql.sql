/*
  # Initial Database Schema for NOIR Fashion

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `slug` (text, unique, required)
      - `price` (decimal, required)
      - `original_price` (decimal, nullable)
      - `category` (text, required)
      - `tag` (text, nullable)
      - `image` (text, required)
      - `images` (text array, nullable)
      - `description` (text, required)
      - `sizes` (text array, required)
      - `colors` (jsonb, nullable)
      - `in_stock` (boolean, default true)
      - `featured` (boolean, default false)
      - `created_at` (timestamp)
    
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `status` (text, default 'pending')
      - `total` (decimal, required)
      - `shipping_address` (jsonb, required)
      - `billing_address` (jsonb, nullable)
      - `created_at` (timestamp)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, references orders)
      - `product_id` (uuid, references products)
      - `quantity` (integer, required)
      - `price` (decimal, required)
      - `size` (text, required)
    
    - `wishlist`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `product_id` (uuid, references products)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Products: Public read, authenticated write
    - Orders: Users can only access their own orders
    - Wishlist: Users can only access their own wishlist
*/

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  price decimal NOT NULL,
  original_price decimal,
  category text NOT NULL,
  tag text,
  image text NOT NULL,
  images text[] DEFAULT '{}',
  description text NOT NULL,
  sizes text[] NOT NULL DEFAULT ARRAY['XS', 'S', 'M', 'L', 'XL'],
  colors jsonb DEFAULT '[]',
  in_stock boolean DEFAULT true,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total decimal NOT NULL,
  shipping_address jsonb NOT NULL,
  billing_address jsonb,
  created_at timestamptz DEFAULT now()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  price decimal NOT NULL,
  size text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

-- Products policies (public read)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Orders policies (user ownership)
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Wishlist policies
CREATE POLICY "Users can view own wishlist"
  ON wishlist FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own wishlist"
  ON wishlist FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from own wishlist"
  ON wishlist FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert seed products
INSERT INTO products (name, slug, price, original_price, category, tag, image, description, sizes) VALUES
('Deconstructed Blazer', 'deconstructed-blazer', 485, NULL, 'Outerwear', 'NEW', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop', 'A deconstructed masterpiece featuring asymmetric lapels and exposed seams.', ARRAY['XS', 'S', 'M', 'L', 'XL']),
('Asymmetric Trench', 'asymmetric-trench', 620, NULL, 'Outerwear', 'HOT', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop', 'Revolutionary trench coat with dramatic asymmetric hemline.', ARRAY['XS', 'S', 'M', 'L', 'XL']),
('Tech Cargo Pants', 'tech-cargo-pants', 340, NULL, 'Bottoms', NULL, 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop', 'Technical fabric cargo pants with modular pocket system.', ARRAY['XS', 'S', 'M', 'L', 'XL']),
('Oversized Hoodie', 'oversized-hoodie', 280, 350, 'Knitwear', 'SALE', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop', 'Extreme oversized fit with raw hem details.', ARRAY['XS', 'S', 'M', 'L', 'XL']),
('Sculptural Bag', 'sculptural-bag', 395, NULL, 'Accessories', 'NEW', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop', 'Architectural leather bag with geometric hardware.', ARRAY['ONE SIZE']),
('Combat Boots', 'combat-boots', 450, NULL, 'Footwear', NULL, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop', 'Heavy-duty combat boots with platform sole.', ARRAY['36', '37', '38', '39', '40', '41', '42']),
('Minimalist T-Shirt', 'minimalist-tshirt', 125, NULL, 'Tops', NULL, 'https://images.unsplash.com/photo-1521572163474-60672f1f0f50?q=80&w=800&auto=format&fit=crop', 'Clean lines meet premium cotton in this essential piece.', ARRAY['XS', 'S', 'M', 'L', 'XL']),
('Statement Belt', 'statement-belt', 195, NULL, 'Accessories', NULL, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop', 'Bold hardware and premium leather construction.', ARRAY['S', 'M', 'L']),
('Wool Overcoat', 'wool-overcoat', 890, NULL, 'Outerwear', 'HOT', 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop', 'Luxurious wool blend with sculptural silhouette.', ARRAY['XS', 'S', 'M', 'L', 'XL']),
('Mesh Long Sleeve', 'mesh-long-sleeve', 210, NULL, 'Tops', 'NEW', 'https://images.unsplash.com/photo-1618354691373-d851c5c5a877?q=80&w=800&auto=format&fit=crop', 'Breathable mesh fabric with avant-garde cut.', ARRAY['XS', 'S', 'M', 'L', 'XL']);

-- Update featured product
UPDATE products SET featured = true WHERE slug = 'deconstructed-blazer';

-- Create index for faster searches
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id);