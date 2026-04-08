-- ==============================================================================
-- NATILAH SUPABASE INITIALIZATION SCHEMA
-- Run this in your Supabase project: SQL Editor -> New Query -> Paste & Run
-- ==============================================================================

-- 1. CLEANUP PREVIOUS SCHEMA (Tables & Policies)
DROP TABLE IF EXISTS public.news CASCADE;
DROP TABLE IF EXISTS public.team CASCADE;

-- 2. TABLE CREATION
CREATE TABLE public.news (
  id bigint generated always as identity primary key,
  date text not null,
  title text not null,
  excerpt text not null,
  full_content text not null,
  link_url text default '/news',
  created_at timestamptz default CURRENT_TIMESTAMP
);

CREATE TABLE public.team (
  id bigint generated always as identity primary key,
  name text not null,
  role text not null,
  "order" int default 0,
  created_at timestamptz default CURRENT_TIMESTAMP
);

-- 3. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;

-- 4. PUBLIC READ POLICIES (Allows React to fetch data)
CREATE POLICY "news_public_read" ON public.news FOR SELECT USING (true);
CREATE POLICY "team_public_read" ON public.team FOR SELECT USING (true);

-- 5. ENABLE SUPABASE REALTIME
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;
ALTER PUBLICATION supabase_realtime ADD TABLE public.news, public.team;

-- 6. SEED INITIAL DATA
INSERT INTO public.news (date, title, excerpt, full_content) 
VALUES 
  (
    'Mar 20, 2026',
    'At datacenter scale - 100,000 GPUs scheduling 5 million jobs',
    'Predictions based on the Quasar benchmark scaling trends show +12% to +20% makespan reduction versus production schedulers at 100,000 GPU scale.',
    'At datacenter scale - 100,000 GPUs scheduling 5 million jobs - predictions based on the Quasar benchmark scaling trends show Quasar delivering +12% to +20% makespan reduction versus production schedulers, +4 to +8 percentage points higher GPU utilization, 15-25% shorter queue wait times, and 25-50% fewer SLA violations.'
  ),
  (
    'Mar 15, 2026',
    'NATILAH Finishes the Quasar development version v1.0.0',
    'NATILAH has successfully completed the development of Quasar v1.0.0, the production-ready quantum-inspired GPU scheduler.',
    'NATILAH has successfully completed the development of Quasar v1.0.0, marking a major milestone in quantum-inspired optimization for GPU datacenter scheduling.'
  );

INSERT INTO public.team (name, role, "order") 
VALUES 
  ('Máximo Caraballo', 'Founder - CEO', 1);
