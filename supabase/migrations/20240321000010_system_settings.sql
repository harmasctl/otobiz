-- Create system_settings table
CREATE TABLE IF NOT EXISTS system_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  site_name TEXT NOT NULL DEFAULT 'Otobiz',
  maintenance_mode BOOLEAN DEFAULT false,
  allowed_file_types JSONB DEFAULT '["image/jpeg", "image/png", "image/webp"]',
  max_file_size INTEGER DEFAULT 5242880,
  featured_listing_price DECIMAL DEFAULT 49.99,
  commission_rate DECIMAL DEFAULT 5.0,
  default_currency TEXT DEFAULT 'USD',
  smtp_settings JSONB DEFAULT '{
    "host": "",
    "port": 587,
    "user": "",
    "password": "",
    "from_email": "",
    "from_name": ""
  }',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert default settings if not exists
INSERT INTO system_settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Only admins can manage system settings"
  ON system_settings FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));