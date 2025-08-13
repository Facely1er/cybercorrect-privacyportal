/*
  # Fix user signup database error

  1. New Functions
    - `handle_new_user()` - Trigger function to create profile records for new users
  
  2. Triggers
    - `on_auth_user_created` - Automatically creates profile when new user signs up
  
  3. Security
    - Update RLS policies to allow profile creation during signup
*/

-- Create or replace the handle_new_user function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Create a profile record for the new user
  INSERT INTO profiles (
    id,
    full_name,
    email,
    role,
    organization_id,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')::user_role,
    NULL, -- We'll handle organization assignment separately
    NOW(),
    NOW()
  );
  
  RETURN NEW;
END;
$$;

-- Create the trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update the RLS policies to ensure proper access during signup
-- Drop existing policy if it exists, then create new one
DROP POLICY IF EXISTS "Service role can manage profiles" ON profiles;
CREATE POLICY "Service role can manage profiles"
  ON profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);