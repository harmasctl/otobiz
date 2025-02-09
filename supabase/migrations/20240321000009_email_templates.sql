-- Create email_templates table
CREATE TABLE email_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  variables JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create invitations table
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'dealer', 'admin')),
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  invited_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create function to send invitation
CREATE OR REPLACE FUNCTION send_invitation(p_email TEXT, p_role TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_token TEXT;
  v_id UUID;
BEGIN
  -- Generate a random token
  v_token := encode(gen_random_bytes(32), 'hex');
  
  -- Insert the invitation
  INSERT INTO invitations (email, role, token, expires_at, invited_by)
  VALUES (
    p_email,
    p_role,
    v_token,
    NOW() + INTERVAL '7 days',
    auth.uid()
  )
  RETURNING id INTO v_id;

  -- Here you would typically send the email using your email service
  -- The invitation link would be: https://your-domain.com/auth/register?token=v_token

  RETURN v_id;
END;
$$;

-- Insert default email templates
INSERT INTO email_templates (name, subject, body, variables) VALUES
('Welcome Email', 
 'Welcome to {{site_name}}!',
 'Hi {{name}},

Welcome to {{site_name}}! We''re excited to have you join us.

Best regards,
The {{site_name}} Team',
 '["site_name", "name"]'),
('Invitation Email',
 'You''ve been invited to join {{site_name}}',
 'Hi,

You''ve been invited to join {{site_name}} as a {{role}}.

Click the link below to complete your registration:
{{invitation_link}}

This invitation expires in 7 days.

Best regards,
The {{site_name}} Team',
 '["site_name", "role", "invitation_link"]'),
('Password Reset',
 'Reset Your Password',
 'Hi {{name}},

We received a request to reset your password. Click the link below to set a new password:

{{reset_link}}

If you didn''t request this, please ignore this email.

Best regards,
The {{site_name}} Team',
 '["name", "reset_link"]');

-- Enable RLS
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Only admins can manage email templates"
  ON email_templates
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Only admins can manage invitations"
  ON invitations
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));