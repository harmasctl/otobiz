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

-- Enable RLS
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Admins can manage invitations"
  ON invitations FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create send_invitation function
CREATE OR REPLACE FUNCTION public.send_invitation(email TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_token TEXT;
  v_id UUID;
  v_user_role TEXT;
BEGIN
  -- Get the current user's role
  SELECT role INTO v_user_role FROM profiles WHERE id = auth.uid();
  
  -- Check if user is admin or if self-registration is allowed for dealers
  IF v_user_role IS NULL OR (v_user_role != 'admin' AND v_user_role != 'user') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- Generate a random token
  v_token := encode(gen_random_bytes(32), 'hex');
  
  -- Insert the invitation
  INSERT INTO invitations (email, role, token, expires_at, invited_by)
  VALUES (
    email,
    'dealer',  -- Always create dealer invitations
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
      'email', email,
      'role', 'dealer'
    )
  );

  RETURN v_id;
END;
$$;