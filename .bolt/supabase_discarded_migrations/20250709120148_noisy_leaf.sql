/*
  # Create automatic profile creation trigger

  1. New Functions
    - `handle_new_user()` - Automatically creates a profile when a new user signs up
    
  2. New Triggers  
    - Trigger on `auth.users` INSERT to call `handle_new_user()`
    
  3. Security
    - Function runs with `SECURITY DEFINER` to bypass RLS during profile creation
    - Ensures every new user gets a profile record automatically
    
  4. Changes
    - Updates existing `handle_new_user` function to properly handle profile creation
    - Ensures compatibility with existing signup flow
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
-- Allow service role to bypass RLS for profile creation
CREATE POLICY IF NOT EXISTS "Service role can manage profiles"
  ON profiles
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);