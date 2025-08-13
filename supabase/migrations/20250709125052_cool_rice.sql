/*
  # Simplified User Registration Trigger

  1. New Trigger Function
     - Minimalistic handle_new_user function that only creates a basic profile entry
     - Removes role validation and other potential failure points
     - Uses SECURITY DEFINER to ensure it runs with elevated privileges
     - Adds explicit error handling and logging

  2. Security
     - Maintains all existing RLS policies
     - Ensures the trigger can create profiles regardless of RLS settings
*/

-- Create a simplified handle_new_user function that only inserts the ID
-- This minimizes potential points of failure in the trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert only the bare minimum - just the user ID
  -- This ensures the function is extremely resilient to data issues
  BEGIN
    INSERT INTO public.profiles (id)
    VALUES (NEW.id);
  EXCEPTION WHEN OTHERS THEN
    -- Log the error but don't fail user creation
    RAISE LOG 'Error in simplified handle_new_user function: %', SQLERRM;
  END;
  
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