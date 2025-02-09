-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user',
  is_verified BOOLEAN DEFAULT false,
  business_license TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create vehicles table
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL NOT NULL,
  mileage INTEGER,
  fuel_type TEXT,
  transmission TEXT,
  vin TEXT,
  location TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  description TEXT,
  images TEXT[],
  status TEXT DEFAULT 'active',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create favorites table
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, vehicle_id)
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create saved_searches table
CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  filters JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Profiles
CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Vehicles
CREATE POLICY "Vehicles are viewable by everyone" ON vehicles
  FOR SELECT USING (true);

CREATE POLICY "Sellers can insert vehicles" ON vehicles
  FOR INSERT WITH CHECK (
    auth.uid() = seller_id AND 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('dealer', 'admin'))
  );

CREATE POLICY "Sellers can update own vehicles" ON vehicles
  FOR UPDATE USING (
    auth.uid() = seller_id AND 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('dealer', 'admin'))
  );

CREATE POLICY "Sellers can delete own vehicles" ON vehicles
  FOR DELETE USING (
    auth.uid() = seller_id AND 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('dealer', 'admin'))
  );

-- Favorites
CREATE POLICY "Users can view own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Reviews
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = reviewer_id);

CREATE POLICY "Users can delete own reviews" ON reviews
  FOR DELETE USING (auth.uid() = reviewer_id);

-- Saved Searches
CREATE POLICY "Users can view own saved searches" ON saved_searches
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved searches" ON saved_searches
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved searches" ON saved_searches
  FOR DELETE USING (auth.uid() = user_id);

-- Enable realtime subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE vehicles;
ALTER PUBLICATION supabase_realtime ADD TABLE favorites;
ALTER PUBLICATION supabase_realtime ADD TABLE reviews;
ALTER PUBLICATION supabase_realtime ADD TABLE saved_searches;

-- Create functions
CREATE OR REPLACE FUNCTION get_vehicle_favorites_count(vehicle_id UUID)
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER
  FROM favorites
  WHERE vehicle_id = $1;
$$ LANGUAGE SQL STABLE;

CREATE OR REPLACE FUNCTION get_seller_rating(seller_id UUID)
RETURNS DECIMAL AS $$
  SELECT COALESCE(AVG(rating)::DECIMAL(3,2), 0)
  FROM reviews
  WHERE seller_id = $1;
$$ LANGUAGE SQL STABLE;

-- Create indexes
CREATE INDEX idx_vehicles_seller ON vehicles(seller_id);
CREATE INDEX idx_vehicles_make_model ON vehicles(make, model);
CREATE INDEX idx_vehicles_price ON vehicles(price);
CREATE INDEX idx_vehicles_year ON vehicles(year);
CREATE INDEX idx_vehicles_location ON vehicles(location);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_vehicle ON favorites(vehicle_id);
CREATE INDEX idx_reviews_seller ON reviews(seller_id);
CREATE INDEX idx_saved_searches_user ON saved_searches(user_id);
