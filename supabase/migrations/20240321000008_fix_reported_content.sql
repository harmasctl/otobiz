-- Drop and recreate reported_content table with proper relationships
DROP TABLE IF EXISTS reported_content CASCADE;

CREATE TABLE reported_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES profiles(id),
  reported_user_id UUID REFERENCES profiles(id),
  content_type TEXT NOT NULL CHECK (content_type IN ('vehicle', 'review', 'user')),
  content_id UUID NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES profiles(id),
  CONSTRAINT fk_reporter FOREIGN KEY (reporter_id) REFERENCES profiles(id) ON DELETE CASCADE,
  CONSTRAINT fk_reported_user FOREIGN KEY (reported_user_id) REFERENCES profiles(id) ON DELETE CASCADE,
  CONSTRAINT fk_resolver FOREIGN KEY (resolved_by) REFERENCES profiles(id) ON DELETE SET NULL
);

-- Create indexes
CREATE INDEX idx_reported_content_reporter ON reported_content(reporter_id);
CREATE INDEX idx_reported_content_reported_user ON reported_content(reported_user_id);
CREATE INDEX idx_reported_content_status ON reported_content(status);
CREATE INDEX idx_reported_content_type ON reported_content(content_type);

-- Enable RLS
ALTER TABLE reported_content ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can report content"
  ON reported_content FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

CREATE POLICY "Users can view their own reports"
  ON reported_content FOR SELECT
  USING (auth.uid() = reporter_id);

CREATE POLICY "Admins can view all reports"
  ON reported_content FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Only admins can update reports"
  ON reported_content FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));