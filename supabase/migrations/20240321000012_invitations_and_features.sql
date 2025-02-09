-- Create invitations table if not exists
CREATE TABLE IF NOT EXISTS invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'dealer', 'admin')),
  token TEXT NOT NULL UNIQUE,
  invited_by UUID REFERENCES profiles(id),
  used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES profiles(id),
  receiver_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  read_at TIMESTAMPTZ,
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
  -- Check if user is admin
  IF NOT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Only admins can send invitations';
  END IF;

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

  -- Insert activity log
  INSERT INTO activity_logs (user_id, action, details)
  VALUES (
    auth.uid(),
    'send_invitation',
    jsonb_build_object(
      'email', p_email,
      'role', p_role
    )
  );

  -- Create notification for admin
  INSERT INTO notifications (user_id, type, title, message, data)
  VALUES (
    auth.uid(),
    'invitation_sent',
    'Invitation Sent',
    'You have sent an invitation to ' || p_email,
    jsonb_build_object(
      'email', p_email,
      'role', p_role,
      'invitation_id', v_id
    )
  );

  RETURN v_id;
END;
$$;

-- Enable RLS
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Admins can manage invitations"
  ON invitations FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can see their own notifications"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can see their messages"
  ON messages FOR SELECT
  USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (sender_id = auth.uid());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_invitations_email ON invitations(email);
