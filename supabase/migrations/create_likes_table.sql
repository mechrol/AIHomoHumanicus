/*
  # Create likes table for post likes

  1. New Tables
    - `likes`
      - `id` (uuid, primary key, default gen_random_uuid())
      - `post_id` (uuid, references posts.id)
      - `user_id` (uuid, references profiles.id)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `likes` table
    - Add policy for authenticated users to read all likes
    - Add policy for users to create likes
    - Add policy for users to delete their own likes

  3. Constraints
    - Unique constraint on (post_id, user_id) to prevent duplicate likes
*/

CREATE TABLE IF NOT EXISTS likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all likes"
  ON likes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create likes"
  ON likes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes"
  ON likes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS likes_post_id_idx ON likes(post_id);
CREATE INDEX IF NOT EXISTS likes_user_id_idx ON likes(user_id);
