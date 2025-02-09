-- Create admin_settings table to store admin emails
CREATE TABLE admin_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_emails TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create a trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_admin_settings_updated_at
  BEFORE UPDATE ON admin_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial admin settings
INSERT INTO admin_settings (admin_emails) VALUES ('{}');

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_settings 
    WHERE admin_emails @> ARRAY[user_email]
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to add admin
CREATE OR REPLACE FUNCTION add_admin(email TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE admin_settings 
  SET admin_emails = array_append(admin_emails, email)
  WHERE NOT (admin_emails @> ARRAY[email]);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to remove admin
CREATE OR REPLACE FUNCTION remove_admin(email TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE admin_settings 
  SET admin_emails = array_remove(admin_emails, email)
  WHERE admin_emails @> ARRAY[email];
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update profiles trigger to set admin role based on email
CREATE OR REPLACE FUNCTION set_admin_role()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT is_admin(NEW.email)) THEN
    NEW.role = 'admin';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER set_admin_role_trigger
  BEFORE INSERT OR UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION set_admin_role();
