-- Supabase SQL Schema for SaaSquatch Leads
-- Run this in your Supabase Project SQL Editor (https://supabase.com/dashboard/project/jtklprmilmecpxqddpgd/sql)

-- 1. Create table for user searches and scraped lead results
CREATE TABLE IF NOT EXISTS public.user_searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    user_email TEXT NOT NULL,
    industry TEXT NOT NULL,
    product TEXT,
    results_count INTEGER DEFAULT 0,
    leads_data JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Optional: Index on user_email and created_at for fast queries
CREATE INDEX IF NOT EXISTS idx_user_searches_user_email ON public.user_searches (user_email);
CREATE INDEX IF NOT EXISTS idx_user_searches_created_at ON public.user_searches (created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.user_searches ENABLE ROW LEVEL SECURITY;

-- 4. Create policy allowing read and insert operations
CREATE POLICY "Allow public read and insert on user_searches"
    ON public.user_searches
    FOR ALL
    USING (true)
    WITH CHECK (true);
