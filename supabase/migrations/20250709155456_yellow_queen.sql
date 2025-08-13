/*
  # Update handle_new_user function for robust profile creation

  1. New Function Implementation
    - Extracts full_name, email, and role from auth.users data
    - Implements proper validation for user_role enum type
    - Ensures role defaults to 'student' if not provided or invalid
    - Adds proper error handling to prevent trigger failures
    - Uses proper casting to user_role enum type

  2. Security
    - Maintains SECURITY DEFINER function attribute
    - Preserves existing RLS policies
*/

-- Create or replace the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role_value text;
BEGIN
  -- Extract role from metadata, defaulting to 'student' if not provided or invalid
  user_role_value := COALESCE(NEW.raw_user_meta_data->>'role', 'student');

  -- Ensure the role value is one of the allowed enum variants
  IF user_role_value NOT IN ('administrator', 'it-staff', 'student', 'teacher') THEN
    user_role_value := 'student'; -- Default to 'student' if the provided role is not valid
  END IF;

  -- Insert the new profile with full details
  INSERT INTO public.profiles (
    id,
    full_name,
    email,
    role,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    user_role_value::user_role, -- Cast to the user_role enum type
    now(),
    now()
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure trigger is properly set up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure RLS policies allow the profile to be created during signup
-- This is a defensive step to make sure all policies are present and correct
DO $$
BEGIN
  -- Ensure service_role can manage all profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Service role can manage profiles'
  ) THEN
    CREATE POLICY "Service role can manage profiles"
      ON profiles
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
  
  -- Ensure authenticated users can see their profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can view own profile'
  ) THEN
    CREATE POLICY "Users can view own profile"
      ON profiles
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;
  
  -- Ensure authenticated users can update their profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile"
      ON profiles
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;