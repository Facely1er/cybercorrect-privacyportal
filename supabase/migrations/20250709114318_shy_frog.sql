/*
  # Add anonymous profile insert policy

  1. Policy Changes
    - Add RLS policy for `anon` role to insert profiles during signup
    - Ensures handle_new_user() trigger can successfully create profiles for new users

  2. Purpose
    - Fixes "Database error saving new user" issue during registration
    - Works in conjunction with existing handle_new_user trigger
*/

-- Add policy to allow anon role to insert profiles during signup
CREATE POLICY "Allow anon insert for new user profile"
  ON profiles
  FOR INSERT
  TO anon
  WITH CHECK (auth.uid() = id);