/*
  # Update communities schema

  1. Schema Updates
    - Add `group_count` column to communities table
    - Ensure all required columns exist with proper defaults

  2. Data Consistency
    - Update existing records with default values
    - Add indexes for better performance
*/

-- Add group_count column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'communities' AND column_name = 'group_count'
  ) THEN
    ALTER TABLE communities ADD COLUMN group_count integer DEFAULT 0;
  END IF;
END $$;

-- Ensure member_count and course_count have proper defaults
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'communities' AND column_name = 'member_count'
  ) THEN
    ALTER TABLE communities ALTER COLUMN member_count SET DEFAULT 0;
  END IF;
  
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'communities' AND column_name = 'course_count'
  ) THEN
    ALTER TABLE communities ALTER COLUMN course_count SET DEFAULT 0;
  END IF;
END $$;

-- Update existing records to have default values
UPDATE communities 
SET 
  member_count = COALESCE(member_count, 0),
  course_count = COALESCE(course_count, 0),
  group_count = COALESCE(group_count, 0)
WHERE member_count IS NULL OR course_count IS NULL OR group_count IS NULL;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS communities_is_active_idx ON communities(is_active);
CREATE INDEX IF NOT EXISTS communities_created_at_idx ON communities(created_at);
CREATE INDEX IF NOT EXISTS communities_created_by_idx ON communities(created_by);