/*
  # Create storage buckets for file uploads

  1. Storage Buckets
    - `posts` - for post images and attachments
    - `avatars` - for user profile pictures
    - `covers` - for user cover photos

  2. Security
    - Enable RLS on storage buckets
    - Add policies for authenticated users to upload/read files
    - Add policies for users to manage their own files
*/

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('posts', 'posts', true),
  ('avatars', 'avatars', true),
  ('covers', 'covers', true)
ON CONFLICT (id) DO NOTHING;

-- Posts bucket policies
CREATE POLICY "Users can upload post files"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'posts');

CREATE POLICY "Users can read post files"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'posts');

CREATE POLICY "Users can update own post files"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'posts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own post files"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'posts' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Avatars bucket policies
CREATE POLICY "Users can upload avatar files"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Users can read avatar files"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can update own avatar files"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own avatar files"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Covers bucket policies
CREATE POLICY "Users can upload cover files"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'covers');

CREATE POLICY "Users can read cover files"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'covers');

CREATE POLICY "Users can update own cover files"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'covers' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own cover files"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'covers' AND auth.uid()::text = (storage.foldername(name))[1]);
