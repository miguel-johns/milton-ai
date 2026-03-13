-- Create leads table for storing demo request form submissions
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for public form submissions)
CREATE POLICY "Allow anonymous inserts" ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Only allow service role to read leads (for admin access)
CREATE POLICY "Service role can read leads" ON public.leads
  FOR SELECT
  USING (auth.role() = 'service_role');
