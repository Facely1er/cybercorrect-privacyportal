/*
  # Profiles Table RLS Setup and User Registration

  1. Table Structure
    - Ensures profiles table exists with proper columns
    - Sets up proper constraints and indexes
    
  2. Row Level Security
    - Enables RLS on profiles table
    - Creates policies for INSERT, SELECT, UPDATE operations
    - Allows users to manage their own profile data
    
  3. User Registration Trigger
    - Creates function to automatically create profile on user signup
    - Sets up trigger to call function on auth.users INSERT
    
  4. Security Policies
    - Users can insert their own profile (auth.uid() = id)
    - Users can view their own profile data
    - Users can update their own profile information
    - No DELETE policy (profiles should be soft-deleted if needed)
*/

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id uuid,
  role text NOT NULL CHECK (role IN ('administrator', 'teacher', 'it-staff', 'student')),
  full_name text,
  email text,
  department text,
  avatar_url text,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create updated_at trigger
DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Enable RLS on profiles table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create RLS policies for profiles table
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Create assessment_results table with RLS
CREATE TABLE IF NOT EXISTS assessment_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assessment_type text NOT NULL CHECK (assessment_type IN ('administrator', 'teacher', 'it-staff', 'student')),
  assessment_id text NOT NULL,
  area_id text NOT NULL,
  area_title text NOT NULL,
  current_level integer NOT NULL CHECK (current_level >= 0 AND current_level <= 5),
  target_level integer CHECK (target_level >= 0 AND target_level <= 5),
  score integer NOT NULL CHECK (score >= 0 AND score <= 100),
  gap_indicators text[],
  remediation_actions jsonb DEFAULT '{}',
  responses jsonb DEFAULT '{}',
  completed_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on assessment_results
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;

-- RLS policies for assessment_results
CREATE POLICY "Users can view own assessment results"
  ON assessment_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessment results"
  ON assessment_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assessment results"
  ON assessment_results
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create training_progress table with RLS
CREATE TABLE IF NOT EXISTS training_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  module_id text NOT NULL,
  module_title text NOT NULL,
  status text NOT NULL CHECK (status IN ('not-started', 'in-progress', 'completed')) DEFAULT 'not-started',
  progress integer NOT NULL CHECK (progress >= 0 AND progress <= 100) DEFAULT 0,
  current_lesson_id text,
  syllabus_progress jsonb DEFAULT '{}',
  quiz_scores jsonb DEFAULT '{}',
  started_at timestamptz,
  completed_at timestamptz,
  last_accessed timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, module_id)
);

-- Enable RLS on training_progress
ALTER TABLE training_progress ENABLE ROW LEVEL SECURITY;

-- RLS policies for training_progress
CREATE POLICY "Users can view own training progress"
  ON training_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own training progress"
  ON training_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own training progress"
  ON training_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create compliance_tracking table with RLS
CREATE TABLE IF NOT EXISTS compliance_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid,
  event_id text NOT NULL,
  event_title text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'in-progress', 'completed', 'overdue')) DEFAULT 'pending',
  assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  due_date timestamptz NOT NULL,
  completed_at timestamptz,
  documentation jsonb DEFAULT '{}',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on compliance_tracking
ALTER TABLE compliance_tracking ENABLE ROW LEVEL SECURITY;

-- RLS policies for compliance_tracking
CREATE POLICY "Users can view compliance tracking for their organization"
  ON compliance_tracking
  FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id FROM profiles WHERE id = auth.uid()
    )
    OR assigned_to = auth.uid()
  );

CREATE POLICY "Administrators can manage compliance tracking"
  ON compliance_tracking
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'administrator'
      AND organization_id = compliance_tracking.organization_id
    )
  );

-- Create updated_at trigger for compliance_tracking
DROP TRIGGER IF EXISTS compliance_tracking_updated_at ON compliance_tracking;
CREATE TRIGGER compliance_tracking_updated_at
  BEFORE UPDATE ON compliance_tracking
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_organization_id ON profiles(organization_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_assessment_results_user_id ON assessment_results(user_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_assessment_type ON assessment_results(assessment_type);
CREATE INDEX IF NOT EXISTS idx_training_progress_user_id ON training_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_training_progress_module_id ON training_progress(module_id);
CREATE INDEX IF NOT EXISTS idx_compliance_tracking_organization_id ON compliance_tracking(organization_id);
CREATE INDEX IF NOT EXISTS idx_compliance_tracking_assigned_to ON compliance_tracking(assigned_to);
CREATE INDEX IF NOT EXISTS idx_compliance_tracking_due_date ON compliance_tracking(due_date);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;