-- Run this in your Supabase project: SQL Editor → New Query → Paste & Run

-- NEWS table
create table news (
  id bigint generated always as identity primary key,
  date text not null,
  title text not null,
  excerpt text not null,
  full_content text not null,
  link_url text default '/news',
  created_at timestamptz default now()
);

-- RESEARCH PAPERS table
create table research_papers (
  id bigint generated always as identity primary key,
  title text not null,
  authors text not null,
  date text not null,
  abstract text not null,
  tags text[] default '{}',
  created_at timestamptz default now()
);

-- TEAM table
create table team (
  id bigint generated always as identity primary key,
  name text not null,
  role text not null,
  bio text not null,
  "order" int default 0,
  created_at timestamptz default now()
);

-- CONTACT MESSAGES table
create table contact_messages (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Allow public read access (no login required to view the site)
alter table news enable row level security;
alter table research_papers enable row level security;
alter table team enable row level security;
alter table contact_messages enable row level security;

create policy "Public read" on news for select using (true);
create policy "Public read" on research_papers for select using (true);
create policy "Public read" on team for select using (true);
create policy "Public insert" on contact_messages for insert with check (true);

-- Seed initial news data
insert into news (date, title, excerpt, full_content) values
(
  'Mar 20, 2026',
  'At datacenter scale — 100,000 GPUs scheduling 5 million jobs',
  'Predictions based on Quasar''s benchmark scaling trends show +12% to +20% makespan reduction versus production schedulers at 100,000 GPU scale.',
  'At datacenter scale — 100,000 GPUs scheduling 5 million jobs — predictions based on Quasar''s benchmark scaling trends show Quasar delivering +12% to +20% makespan reduction versus production schedulers, +4 to +8 percentage points higher GPU utilization, 15-25% shorter queue wait times, and 25-50% fewer SLA violations.'
),
(
  'Mar 15, 2026',
  'NATILAH Finishes Quasar''s development version v1.0.0',
  'NATILAH has successfully completed the development of Quasar v1.0.0, the production-ready quantum-inspired GPU scheduler.',
  'NATILAH has successfully completed the development of Quasar v1.0.0, marking a major milestone in quantum-inspired optimization for GPU datacenter scheduling.'
);

-- Seed team data
insert into team (name, role, bio, "order") values
('Máximo Caraballo', 'Founder - CEO and Quasar''s developer', 'Milanesa', 1);
