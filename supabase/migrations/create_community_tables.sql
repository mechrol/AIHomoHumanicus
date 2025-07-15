/*
  # Create community-related tables

  1. New Tables
    - `communities`
      - `id` (uuid, primary key, default gen_random_uuid())
      - `name` (text, not null)
      - `description` (text, not null)
      - `banner_url` (text, optional)
      - `avatar_url` (text, optional)
      - `created_by` (uuid, references profiles.id)
      - `is_active` (boolean, default true)
      - `member_count` (integer, default 0)
      - `course_count` (integer, default 0)
      - `group_count` (integer, default 0)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

    - `courses`
      - `id` (uuid, primary key, default gen_random_uuid())
      - `community_id` (uuid, references communities.id)
      - `title` (text, not null)
      - `description` (text, not null)
      - `thumbnail_url` (text, optional)
      - `price` (decimal, default 0)
      - `lesson_count` (integer, default 0)
      - `created_by` (uuid, references profiles.id)
      - `is_published` (boolean, default false)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

    - `lessons`
      - `id` (uuid, primary key, default gen_random_uuid())
      - `course_id` (uuid, references courses.id)
      - `title` (text, not null)
      - `description` (text, not null)
      - `type` (text, check in ('video', 'text', 'quiz', 'assignment'))
      - `content_url` (text, optional)
      - `duration` (integer, optional) -- in minutes
      - `order` (integer, not null)
      - `is_published` (boolean, default false)
      - `created_at` (timestamptz, default now())

    - `community_members`
      - `id` (uuid, primary key, default gen_random_uuid())
      - `community_id` (uuid, references communities.id)
      - `user_id` (uuid, references profiles.id)
      - `role` (text, check in ('owner', 'admin', 'moderator', 'member'), default 'member')
      - `joined_at` (timestamptz, default now())

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
*/

-- Communities table
CREATE TABLE IF NOT EXISTS communities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  banner_url text,
  avatar_url text,
  created_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  is_active boolean DEFAULT true,
  member_count integer DEFAULT 0,
  course_count integer DEFAULT 0,
  group_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE communities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read active communities"
  ON communities
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Users can create communities"
  ON communities
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Community owners can update their communities"
  ON communities
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id uuid NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  thumbnail_url text,
  price decimal DEFAULT 0,
  lesson_count integer DEFAULT 0,
  created_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read published courses"
  ON courses
  FOR SELECT
  TO authenticated
  USING (is_published = true);

CREATE POLICY "Course creators can read their courses"
  ON courses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = created_by);

CREATE POLICY "Users can create courses"
  ON courses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Course creators can update their courses"
  ON courses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by);

-- Lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL CHECK (type IN ('video', 'text', 'quiz', 'assignment')),
  content_url text,
  duration integer, -- in minutes
  "order" integer NOT NULL,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read published lessons"
  ON lessons
  FOR SELECT
  TO authenticated
  USING (
    is_published = true AND
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = lessons.course_id 
      AND courses.is_published = true
    )
  );

CREATE POLICY "Course creators can read their lessons"
  ON lessons
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = lessons.course_id 
      AND courses.created_by = auth.uid()
    )
  );

CREATE POLICY "Course creators can create lessons"
  ON lessons
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = course_id 
      AND courses.created_by = auth.uid()
    )
  );

CREATE POLICY "Course creators can update their lessons"
  ON lessons
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = lessons.course_id 
      AND courses.created_by = auth.uid()
    )
  );

-- Community members table
CREATE TABLE IF NOT EXISTS community_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id uuid NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'moderator', 'member')) DEFAULT 'member',
  joined_at timestamptz DEFAULT now(),
  UNIQUE(community_id, user_id)
);

ALTER TABLE community_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read community members"
  ON community_members
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can join communities"
  ON community_members
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Community owners and admins can manage members"
  ON community_members
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM community_members cm
      WHERE cm.community_id = community_members.community_id
      AND cm.user_id = auth.uid()
      AND cm.role IN ('owner', 'admin')
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS communities_created_by_idx ON communities(created_by);
CREATE INDEX IF NOT EXISTS communities_is_active_idx ON communities(is_active);
CREATE INDEX IF NOT EXISTS courses_community_id_idx ON courses(community_id);
CREATE INDEX IF NOT EXISTS courses_created_by_idx ON courses(created_by);
CREATE INDEX IF NOT EXISTS courses_is_published_idx ON courses(is_published);
CREATE INDEX IF NOT EXISTS lessons_course_id_idx ON lessons(course_id);
CREATE INDEX IF NOT EXISTS lessons_order_idx ON lessons("order");
CREATE INDEX IF NOT EXISTS community_members_community_id_idx ON community_members(community_id);
CREATE INDEX IF NOT EXISTS community_members_user_id_idx ON community_members(user_id);