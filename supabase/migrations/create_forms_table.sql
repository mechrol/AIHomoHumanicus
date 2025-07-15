/*
  # Create forms table for interactive forms

  1. New Tables
    - `forms`
      - `id` (uuid, primary key, default gen_random_uuid())
      - `title` (text, not null)
      - `description` (text, not null)
      - `questions` (jsonb, not null) - array of form questions
      - `created_by` (uuid, references profiles.id)
      - `is_active` (boolean, default true)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `forms` table
    - Add policy for authenticated users to read active forms
    - Add policy for users to create forms
    - Add policy for users to update their own forms
*/

CREATE TABLE IF NOT EXISTS forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  questions jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE forms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read active forms"
  ON forms
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Users can create forms"
  ON forms
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own forms"
  ON forms
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS forms_created_by_idx ON forms(created_by);
CREATE INDEX IF NOT EXISTS forms_is_active_idx ON forms(is_active);
CREATE INDEX IF NOT EXISTS forms_created_at_idx ON forms(created_at DESC);
