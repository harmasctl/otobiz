-- Drop existing tables if they exist
DROP TABLE IF EXISTS system_settings CASCADE;
DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS reported_content CASCADE;

-- Create system_settings table
CREATE TABLE system_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  site_name TEXT DEFAULT 'Vehicle Marketplace',
  maintenance_mode BOOLEAN DEFAULT false,
  allowed_file_types TEXT[] DEFAULT ARRAY['image/jpeg', 'image/png', 'image/webp'],
  max_file_size INTEGER DEFAULT 5242880,
  featured_listing_price DECIMAL DEFAULT 49.99,
  commission_rate DECIMAL DEFAULT 0.05,
  default_currency TEXT DEFAULT 'USD',
  smtp_settings JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT system_settings_single_row CHECK (id = 1)
);

-- Create activity_logs table
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reported_content table
CREATE TABLE reported_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES profiles(id),
  reported_user_id UUID REFERENCES profiles(id),
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES profiles(id)
);

-- Insert default system settings
INSERT INTO system_settings (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- Create indexes
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);
CREATE INDEX idx_reported_content_status ON reported_content(status);
CREATE INDEX idx_reported_content_type ON reported_content(content_type);

-- Enable RLS
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reported_content ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "System settings viewable by everyone"
  ON system_settings FOR SELECT
  USING (true);

CREATE POLICY "Only admins can update system settings"
  ON system_settings FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Only admins can view activity logs"
  ON activity_logs FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Only admins can insert activity logs"
  ON activity_logs FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Users can report content"
  ON reported_content FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Admins can view all reported content"
  ON reported_content FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Only admins can update reports"
  ON reported_content FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));