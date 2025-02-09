-- Fix the profiles table foreign key relationship
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;
ALTER TABLE profiles ADD CONSTRAINT profiles_id_fkey 
  FOREIGN KEY (id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;

-- Create invitations table
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'dealer', 'admin')),
  invited_by UUID REFERENCES profiles(id),
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create email_templates table if not exists
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  variables JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Only admins can create invitations"
  ON invitations FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Only admins can view invitations"
  ON invitations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create indexes
CREATE INDEX idx_invitations_email ON invitations(email);
CREATE INDEX idx_invitations_token ON invitations(token);
CREATE INDEX idx_invitations_expires ON invitations(expires_at);

-- Insert default email templates
INSERT INTO email_templates (name, subject, body, variables) VALUES
('Invitation', 'You''ve been invited to join {{site_name}}', 
'Hi,

You''ve been invited to join {{site_name}} as a {{role}}. Click the link below to accept your invitation:

{{invitation_link}}

This invitation will expire in 24 hours.

Best regards,
The {{site_name}} Team',
'["site_name", "role", "invitation_link"]')
ON CONFLICT DO NOTHING;