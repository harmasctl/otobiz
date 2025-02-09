-- System Settings Table
CREATE TABLE system_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  site_name TEXT DEFAULT 'Vehicle Marketplace',
  maintenance_mode BOOLEAN DEFAULT false,
  allowed_file_types TEXT[] DEFAULT ARRAY['image/jpeg', 'image/png', 'image/webp'],
  max_file_size INTEGER DEFAULT 5242880, -- 5MB in bytes
  featured_listing_price DECIMAL DEFAULT 49.99,
  commission_rate DECIMAL DEFAULT 0.05,
  default_currency TEXT DEFAULT 'USD',
  smtp_settings JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (id = 1) -- Ensure only one row
);

-- Activity Logs Table
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reported Content Table
CREATE TABLE reported_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES profiles(id),
  reported_user_id UUID REFERENCES profiles(id),
  content_type TEXT NOT NULL, -- 'vehicle', 'review', 'user'
  content_id UUID NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES profiles(id)
);

-- Analytics Functions
CREATE OR REPLACE FUNCTION get_revenue_stats(period_param TEXT)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  WITH time_series AS (
    SELECT generate_series(
      date_trunc(period_param, NOW() - ('1 ' || period_param)::interval),
      date_trunc(period_param, NOW()),
      ('1 ' || period_param)::interval
    ) AS time_point
  )
  SELECT json_agg(json_build_object(
    'date', time_point,
    'revenue', COALESCE(SUM(amount), 0),
    'transactions', COUNT(*)
  ))
  FROM time_series
  LEFT JOIN transactions ON date_trunc(period_param, transactions.created_at) = time_point
  GROUP BY time_point
  ORDER BY time_point
  INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- User Stats Function
CREATE OR REPLACE FUNCTION get_user_stats(period_param TEXT)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  WITH time_series AS (
    SELECT generate_series(
      date_trunc(period_param, NOW() - ('1 ' || period_param)::interval),
      date_trunc(period_param, NOW()),
      ('1 ' || period_param)::interval
    ) AS time_point
  )
  SELECT json_agg(json_build_object(
    'date', time_point,
    'newUsers', COUNT(DISTINCT p.id),
    'activeUsers', COUNT(DISTINCT s.user_id)
  ))
  FROM time_series
  LEFT JOIN profiles p ON date_trunc(period_param, p.created_at) = time_point
  LEFT JOIN sessions s ON date_trunc(period_param, s.created_at) = time_point
  GROUP BY time_point
  ORDER BY time_point
  INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Report Handling Function
CREATE OR REPLACE FUNCTION handle_report(
  report_id UUID,
  action_taken TEXT,
  admin_notes TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
  report reported_content;
  result JSON;
BEGIN
  -- Get the report
  SELECT * INTO report
  FROM reported_content
  WHERE id = report_id;

  -- Update report status
  UPDATE reported_content
  SET 
    status = action_taken,
    admin_notes = COALESCE(admin_notes, reported_content.admin_notes),
    resolved_at = NOW(),
    resolved_by = auth.uid()
  WHERE id = report_id;

  -- Take action based on report type and action
  IF action_taken = 'approve' THEN
    CASE report.content_type
      WHEN 'vehicle' THEN
        UPDATE vehicles SET status = 'inactive' WHERE id = report.content_id::UUID;
      WHEN 'review' THEN
        DELETE FROM reviews WHERE id = report.content_id::UUID;
      WHEN 'user' THEN
        UPDATE profiles SET is_verified = false WHERE id = report.reported_user_id;
    END CASE;
  END IF;

  -- Log the action
  INSERT INTO activity_logs (user_id, action, details)
  VALUES (
    auth.uid(),
    'handle_report',
    jsonb_build_object(
      'report_id', report_id,
      'action', action_taken,
      'content_type', report.content_type,
      'content_id', report.content_id
    )
  );

  SELECT json_build_object(
    'success', true,
    'message', 'Report handled successfully'
  ) INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add RLS Policies
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE reported_content ENABLE ROW LEVEL SECURITY;

-- System Settings Policies
CREATE POLICY "System settings are viewable by everyone"
  ON system_settings FOR SELECT
  USING (true);

CREATE POLICY "Only admins can update system settings"
  ON system_settings FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Activity Logs Policies
CREATE POLICY "Only admins can view activity logs"
  ON activity_logs FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Reported Content Policies
CREATE POLICY "Admins can view all reported content"
  ON reported_content FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Users can report content"
  ON reported_content FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Only admins can update reports"
  ON reported_content FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Add Indexes
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);
CREATE INDEX idx_reported_content_status ON reported_content(status);
CREATE INDEX idx_reported_content_type ON reported_content(content_type);
