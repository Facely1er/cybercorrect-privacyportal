/*
  # Fix user registration with improved handle_new_user function

  1. Changes
    - Improve role validation and casting in handle_new_user function
    - Add proper validation before casting to user_role enum
    - Add explicit error handling to prevent registration failures
    - Maintain SECURITY DEFINER context for proper permissions
*/

-- Create or replace the handle_new_user function with improved error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  role_value text;
  valid_role boolean;
BEGIN
  -- Extract role from metadata with proper validation
  role_value := NULLIF(TRIM(NEW.raw_user_meta_data->>'role'), '');
  
  -- Check if role value is valid
  IF role_value IS NULL THEN
    role_value := 'student'; -- Default role
  ELSE
    -- Verify role is a valid enum value
    PERFORM 1 FROM pg_enum 
    WHERE enumtypid = 'user_role'::regtype 
    AND enumlabel = role_value;
    
    IF NOT FOUND THEN
      role_value := 'student'; -- Default to student if invalid role
    END IF;
  END IF;

  -- Create a profile record for the new user with validated role
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
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
      NEW.email,
      role_value::user_role,
      now(),
      now()
    );
  EXCEPTION WHEN OTHERS THEN
    -- Log error but don't fail user creation
    RAISE LOG 'Error in handle_new_user function: %', SQLERRM;
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure trigger is properly set up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();