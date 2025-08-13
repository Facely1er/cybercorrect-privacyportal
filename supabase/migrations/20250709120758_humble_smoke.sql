/*
# Fix user signup trigger

This migration fixes the signup process by ensuring that when a new user is created in the auth.users table, a corresponding profile is automatically created in the profiles table.

1. **Trigger Function**
   - Creates or replaces the `handle_new_user` function
   - Automatically creates a profile record when a new user signs up
   - Sets default values for required fields

2. **Trigger Setup**
   - Creates a trigger on the `auth.users` table
   - Calls the `handle_new_user` function after a new user is inserted
   - Ensures the profile is created with the user's auth information

3. **Security**
   - Function runs with security definer privileges to bypass RLS
   - Ensures proper data consistency during signup process
*/

-- Create or replace the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    full_name,
    email,
    role,
    created_at,
    updated_at
  )
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'student'::user_role),
    now(),
    now()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update the RLS policy to allow the function to insert profiles
DO $$
BEGIN
  -- Drop existing anon insert policy if it exists
  DROP POLICY IF EXISTS "Allow anon insert for new user profile" ON public.profiles;
  
  -- Create new policy that allows anon inserts during signup
  CREATE POLICY "Allow anon insert for new user profile"
    ON public.profiles
    FOR INSERT
    TO anon
    WITH CHECK (true);
END $$;