/*
  # Add admin roles and permissions

  1. New Tables
    - `admin_roles` - Define admin roles and permissions
    - `user_admin_roles` - Assign admin roles to users

  2. Security
    - Enable RLS on admin tables
    - Add policies for admin access control
*/

-- Admin roles table
CREATE TABLE IF NOT EXISTS admin_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  permissions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

-- User admin roles table
CREATE TABLE IF NOT EXISTS user_admin_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES admin_roles(id) ON DELETE CASCADE,
  granted_by uuid REFERENCES profiles(id),
  granted_at timestamptz DEFAULT now(),
  UNIQUE(user_id, role_id)
);

ALTER TABLE user_admin_roles ENABLE ROW LEVEL SECURITY;

-- Insert default admin roles
INSERT INTO admin_roles (name, description, permissions) VALUES
  ('super_admin', 'Super Administrator', '["all"]'::jsonb),
  ('admin', 'Administrator', '["users", "communities", "courses", "analytics"]'::jsonb),
  ('moderator', 'Moderator', '["communities", "courses"]'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- Policies for admin_roles
CREATE POLICY "Admins can read admin roles"
  ON admin_roles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_admin_roles uar
      JOIN admin_roles ar ON uar.role_id = ar.id
      WHERE uar.user_id = auth.uid()
      AND (ar.permissions ? 'all' OR ar.permissions ? 'admin')
    )
  );

-- Policies for user_admin_roles
CREATE POLICY "Admins can read user admin roles"
  ON user_admin_roles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_admin_roles uar
      JOIN admin_roles ar ON uar.role_id = ar.id
      WHERE uar.user_id = auth.uid()
      AND (ar.permissions ? 'all' OR ar.permissions ? 'admin')
    )
  );

CREATE POLICY "Super admins can manage user admin roles"
  ON user_admin_roles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_admin_roles uar
      JOIN admin_roles ar ON uar.role_id = ar.id
      WHERE uar.user_id = auth.uid()
      AND ar.permissions ? 'all'
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS user_admin_roles_user_id_idx ON user_admin_roles(user_id);
CREATE INDEX IF NOT EXISTS user_admin_roles_role_id_idx ON user_admin_roles(role_id);
