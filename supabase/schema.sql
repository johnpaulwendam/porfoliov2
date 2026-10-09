-- Run in the Supabase SQL editor.
create table if not exists projects (
  id bigint generated always as identity primary key,
  title text not null,
  description text not null,
  tags text[] default '{}',
  color text default '#e8742a',
  live_url text,
  repo_url text
);
create table if not exists certifications (
  id bigint generated always as identity primary key,
  title text not null,
  details text,
  link text
);
create table if not exists chat_logs (
  id bigint generated always as identity primary key,
  question text not null,
  created_at timestamptz default now()
);

alter table projects enable row level security;
alter table certifications enable row level security;
alter table chat_logs enable row level security;

create policy "public read projects" on projects for select using (true);
create policy "public read certifications" on certifications for select using (true);
create policy "public insert chat logs" on chat_logs for insert with check (char_length(question) <= 500);

insert into projects (title, description, tags, color) values
 ('TechHub','Full-stack e-commerce platform with a storefront, cart, and admin dashboard.','{React,JavaScript,Supabase}','#e8742a'),
 ('CampusLink','Campus platform for academic forums, a student marketplace, and events.','{React,JavaScript,"Supabase Auth"}','#3b82f6');
