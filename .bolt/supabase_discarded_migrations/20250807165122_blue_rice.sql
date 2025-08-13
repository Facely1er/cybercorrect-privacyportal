/*
  # Create data subject requests table

  1. New Tables
    - `data_subject_requests`
      - `id` (uuid, primary key)
      - `organization_id` (uuid, foreign key to organizations)
      - `user_id` (uuid, foreign key to profiles)
      - `request_type` (text) - access, rectification, erasure, etc.
      - `requester_name` (text)
      - `requester_email` (text)
      - `requester_relationship` (text) - parent, guardian, student, etc.
      - `student_identifier` (text)
      - `request_details` (jsonb)
      - `applicable_regulations` (text array)
      - `status` (text)
      - `submitted_at` (timestamp)
      - `due_date` (timestamp)
      - `completed_at` (timestamp)
      - `assigned_to` (uuid, foreign key to profiles)
      - `notes` (text)
      - `response_data` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      
  2. Security
    - Enable RLS on `data_subject_requests` table
    - Add policies for organization-based access control
    - Add policies for assigned users to manage requests
*/

CREATE TABLE IF NOT EXISTS data_subject_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  request_type text NOT NULL,
  requester_name text NOT NULL,
  requester_email text NOT NULL,
  requester_relationship text,
  student_identifier text,
  request_details jsonb DEFAULT '{}',
  applicable_regulations text[] DEFAULT '{}',
  status text DEFAULT 'submitted',
  submitted_at timestamptz DEFAULT now(),
  due_date timestamptz NOT NULL,
  completed_at timestamptz,
  assigned_to uuid REFERENCES profiles(id) ON DELETE SET NULL,
  notes text,
  response_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE data_subject_requests ENABLE ROW LEVEL SECURITY;

-- Allow users from the same organization to view requests
CREATE POLICY "Organization members can view data subject requests"
  ON data_subject_requests
  FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT organization_id 
      FROM profiles 
      WHERE id = auth.uid()
    )
  );

-- Allow administrators to manage requests
CREATE POLICY "Administrators can manage data subject requests"
  ON data_subject_requests
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role = 'administrator' 
      AND organization_id = data_subject_requests.organization_id
    )
  );

-- Allow assigned users to update requests
CREATE POLICY "Assigned users can update data subject requests"
  ON data_subject_requests
  FOR UPDATE
  TO authenticated
  USING (assigned_to = auth.uid());

-- Allow public insert for external requests
CREATE POLICY "Allow public insert for data subject requests"
  ON data_subject_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_data_subject_requests_organization_id 
  ON data_subject_requests(organization_id);
CREATE INDEX IF NOT EXISTS idx_data_subject_requests_status 
  ON data_subject_requests(status);
CREATE INDEX IF NOT EXISTS idx_data_subject_requests_due_date 
  ON data_subject_requests(due_date);
CREATE INDEX IF NOT EXISTS idx_data_subject_requests_assigned_to 
  ON data_subject_requests(assigned_to);

-- Add trigger for updated_at
CREATE TRIGGER update_data_subject_requests_updated_at
  BEFORE UPDATE ON data_subject_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();