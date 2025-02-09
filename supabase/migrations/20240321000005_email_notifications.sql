-- Email Templates Table
CREATE TABLE email_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  variables JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications Table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email Log Table
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID REFERENCES email_templates(id),
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Only admins can manage email templates"
  ON email_templates
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Users can view own notifications"
  ON notifications
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Only admins can view email logs"
  ON email_logs
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Create Indexes
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_email_logs_template ON email_logs(template_id);
CREATE INDEX idx_email_logs_status ON email_logs(status);

-- Insert Default Email Templates
INSERT INTO email_templates (name, subject, body, variables) VALUES
('Welcome Email', 'Welcome to {{site_name}}!', 'Hi {{user_name}},

Welcome to {{site_name}}! We''re excited to have you on board.

Best regards,
The {{site_name}} Team', '["site_name", "user_name"]'),
('Password Reset', 'Reset Your Password', 'Hi {{user_name}},

Click the link below to reset your password:
{{reset_link}}

Best regards,
The {{site_name}} Team', '["site_name", "user_name", "reset_link"]'),
('Listing Approved', 'Your Listing Has Been Approved', 'Hi {{user_name}},

Your listing for {{vehicle_name}} has been approved and is now live.

Best regards,
The {{site_name}} Team', '["site_name", "user_name", "vehicle_name"]');