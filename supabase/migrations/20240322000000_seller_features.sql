-- Create seller_profiles table
CREATE TABLE IF NOT EXISTS seller_profiles (
  id UUID PRIMARY KEY REFERENCES profiles(id),
  business_name TEXT,
  business_description TEXT,
  business_address TEXT,
  business_phone TEXT,
  business_email TEXT,
  business_hours JSONB,
  business_logo TEXT,
  business_banner TEXT,
  social_media JSONB DEFAULT '{"facebook": "", "twitter": "", "instagram": ""}',
  rating DECIMAL DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  total_sales INTEGER DEFAULT 0,
  total_revenue DECIMAL DEFAULT 0,
  subscription_plan TEXT DEFAULT 'basic',
  subscription_status TEXT DEFAULT 'active',
  subscription_expires_at TIMESTAMPTZ,
  verification_status TEXT DEFAULT 'pending',
  verification_documents JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create seller_analytics table
CREATE TABLE IF NOT EXISTS seller_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES seller_profiles(id),
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  leads INTEGER DEFAULT 0,
  sales INTEGER DEFAULT 0,
  revenue DECIMAL DEFAULT 0,
  average_response_time INTEGER DEFAULT 0,
  UNIQUE(seller_id, date)
);

-- Create seller_documents table
CREATE TABLE IF NOT EXISTS seller_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES seller_profiles(id),
  type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create seller_subscriptions table
CREATE TABLE IF NOT EXISTS seller_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES seller_profiles(id),
  plan TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  started_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  auto_renew BOOLEAN DEFAULT true,
  payment_method JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create seller_payouts table
CREATE TABLE IF NOT EXISTS seller_payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES seller_profiles(id),
  amount DECIMAL NOT NULL,
  status TEXT DEFAULT 'pending',
  payout_method TEXT NOT NULL,
  payout_details JSONB NOT NULL,
  processed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create seller_inventory table
CREATE TABLE IF NOT EXISTS seller_inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES seller_profiles(id),
  vehicle_id UUID REFERENCES vehicles(id),
  status TEXT DEFAULT 'available',
  cost_price DECIMAL,
  selling_price DECIMAL NOT NULL,
  location TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create seller_leads table
CREATE TABLE IF NOT EXISTS seller_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES seller_profiles(id),
  vehicle_id UUID REFERENCES vehicles(id),
  customer_id UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'new',
  type TEXT NOT NULL,
  message TEXT,
  contact_info JSONB,
  followed_up_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE seller_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_leads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Sellers can view their own profile"
  ON seller_profiles FOR SELECT
  USING (id = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Sellers can update their own profile"
  ON seller_profiles FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "Sellers can view their own analytics"
  ON seller_analytics FOR SELECT
  USING (seller_id = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Sellers can view their own documents"
  ON seller_documents FOR ALL
  USING (seller_id = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Sellers can manage their own inventory"
  ON seller_inventory FOR ALL
  USING (seller_id = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Sellers can view their own leads"
  ON seller_leads FOR ALL
  USING (seller_id = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create functions
CREATE OR REPLACE FUNCTION update_seller_analytics()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO seller_analytics (seller_id, date)
  VALUES (NEW.seller_id, CURRENT_DATE)
  ON CONFLICT (seller_id, date) DO UPDATE
  SET views = seller_analytics.views + 1;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION process_seller_lead()
RETURNS TRIGGER AS $$
BEGIN
  -- Update seller analytics
  INSERT INTO seller_analytics (seller_id, date)
  VALUES (NEW.seller_id, CURRENT_DATE)
  ON CONFLICT (seller_id, date) DO UPDATE
  SET leads = seller_analytics.leads + 1;
  
  -- Create notification for seller
  INSERT INTO notifications (user_id, type, title, message, data)
  VALUES (
    NEW.seller_id,
    'new_lead',
    'New Lead',
    'You have a new lead for your vehicle',
    jsonb_build_object(
      'lead_id', NEW.id,
      'vehicle_id', NEW.vehicle_id
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_seller_analytics_on_view
  AFTER INSERT ON seller_inventory
  FOR EACH ROW
  EXECUTE FUNCTION update_seller_analytics();

CREATE TRIGGER process_seller_lead_on_create
  AFTER INSERT ON seller_leads
  FOR EACH ROW
  EXECUTE FUNCTION process_seller_lead();

-- Create indexes
CREATE INDEX idx_seller_analytics_date ON seller_analytics(date);
CREATE INDEX idx_seller_inventory_status ON seller_inventory(status);
CREATE INDEX idx_seller_leads_status ON seller_leads(status);
CREATE INDEX idx_seller_documents_type ON seller_documents(type);
