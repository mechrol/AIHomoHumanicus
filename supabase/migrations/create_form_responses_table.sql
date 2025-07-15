/*
  # Create form_responses table for form submissions

  1. New Tables
    - `form_responses`
      - `id` (uuid, primary key, default gen_random_uuid())
      - `form_id` (uuid, references forms.id)
      - `user_id` (uuid, references profiles.id)
      - `responses` (jsonb, not null) - user's answers to form questions
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `form_responses` table
    - Add policy for users to read their own responses
    - Add policy for form creators to read responses to their forms
    - Add policy for users to create responses
    - Add policy for users to update their own responses

  3. Constraints
    - Unique constraint on (form_id, user_id) to prevent duplicate responses per form
*/

CREATE TABLE IF NOT EXISTS form_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_id uuid NOT NULL REFERENCES forms(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  responses jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  UNIQUE(form_id, user_id)
);

ALTER TABLE form_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own responses"
  ON form_responses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Form creators can read responses to their forms"
  ON form_responses
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM forms 
      WHERE forms.id = form_responses.form_id 
      AND forms.created_by = auth.uid()
    )
  );

CREATE POLICY "Users can create responses"
  ON form_responses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own responses"
  ON form_responses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS form_responses_form_id_idx ON form_responses(form_id);
CREATE INDEX IF NOT EXISTS form_responses_user_id_idx ON form_responses(user_id);
CREATE INDEX IF NOT EXISTS form_responses_created_at_idx ON form_responses(created_at DESC);
