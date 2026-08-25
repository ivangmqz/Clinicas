-- =========================================================
-- Esquema: Plataforma Web Clínica Dental / Estética
-- =========================================================

create extension if not exists "uuid-ossp";

-- ---------------------------------------------------------
-- profiles: extiende auth.users. Un solo rol "admin" por ahora.
-- ---------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role text not null default 'admin' check (role in ('admin')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Evita recursión de RLS al validar el rol admin desde otras policies.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin' and active = true
  );
$$;

-- ---------------------------------------------------------
-- site_settings: fila única (id = 1) con el contenido general.
-- ---------------------------------------------------------
create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  clinic_name text not null default 'Clínica',
  tagline text not null default '',
  hero_subtitle text not null default '',
  hero_image_url text,
  about_title text not null default 'Sobre nosotros',
  about_text text not null default '',
  phone text not null default '',
  whatsapp_number text not null default '',
  email text not null default '',
  address text not null default '',
  schedule_text text not null default '',
  instagram_url text,
  facebook_url text,
  map_embed_url text,
  primary_color text not null default '#279e95',
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id) values (1) on conflict (id) do nothing;

-- ---------------------------------------------------------
-- services: tratamientos dentales / estéticos.
-- ---------------------------------------------------------
create table if not exists public.services (
  id uuid primary key default uuid_generate_v4(),
  category text not null check (category in ('dental', 'estetica')),
  name text not null,
  description text not null default '',
  price numeric(10, 2),
  duration_minutes int,
  image_url text,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- team_members: doctores / especialistas.
-- ---------------------------------------------------------
create table if not exists public.team_members (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role_title text not null default '',
  bio text not null default '',
  photo_url text,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- testimonials: reseñas de pacientes.
-- ---------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  author_name text not null,
  content text not null,
  rating int not null default 5 check (rating between 1 and 5),
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- gallery_images: fotos de antes/después, instalaciones, etc.
-- ---------------------------------------------------------
create table if not exists public.gallery_images (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  caption text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- products: productos de venta al público (línea de retail) con stock.
-- ---------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text not null default '',
  sku text,
  category text not null default '',
  price numeric(10, 2),
  stock int not null default 0,
  low_stock_threshold int not null default 5,
  image_url text,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------
-- appointment_requests: leads del formulario de contacto público.
-- ---------------------------------------------------------
create table if not exists public.appointment_requests (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  email text,
  service_id uuid references public.services(id) on delete set null,
  preferred_date text,
  message text not null default '',
  status text not null default 'nuevo' check (status in ('nuevo', 'contactado', 'agendado', 'cancelado')),
  created_at timestamptz not null default now()
);

-- =========================================================
-- RLS
-- =========================================================
alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.services enable row level security;
alter table public.team_members enable row level security;
alter table public.testimonials enable row level security;
alter table public.gallery_images enable row level security;
alter table public.products enable row level security;
alter table public.appointment_requests enable row level security;

-- profiles
create policy "profiles: ver el propio" on public.profiles
  for select using (id = auth.uid());
create policy "profiles: admin ve todos" on public.profiles
  for select using (public.is_admin());
create policy "profiles: admin actualiza" on public.profiles
  for update using (public.is_admin());

-- site_settings: lectura pública, escritura solo admin
create policy "site_settings: lectura publica" on public.site_settings
  for select using (true);
create policy "site_settings: admin actualiza" on public.site_settings
  for update using (public.is_admin());
create policy "site_settings: admin inserta" on public.site_settings
  for insert with check (public.is_admin());

-- services: público ve activos, admin ve/gestiona todo
create policy "services: publico ve activos" on public.services
  for select using (active = true or public.is_admin());
create policy "services: admin inserta" on public.services
  for insert with check (public.is_admin());
create policy "services: admin actualiza" on public.services
  for update using (public.is_admin());
create policy "services: admin borra" on public.services
  for delete using (public.is_admin());

-- team_members
create policy "team: publico ve activos" on public.team_members
  for select using (active = true or public.is_admin());
create policy "team: admin inserta" on public.team_members
  for insert with check (public.is_admin());
create policy "team: admin actualiza" on public.team_members
  for update using (public.is_admin());
create policy "team: admin borra" on public.team_members
  for delete using (public.is_admin());

-- testimonials
create policy "testimonials: publico ve activos" on public.testimonials
  for select using (active = true or public.is_admin());
create policy "testimonials: admin inserta" on public.testimonials
  for insert with check (public.is_admin());
create policy "testimonials: admin actualiza" on public.testimonials
  for update using (public.is_admin());
create policy "testimonials: admin borra" on public.testimonials
  for delete using (public.is_admin());

-- gallery_images
create policy "gallery: lectura publica" on public.gallery_images
  for select using (true);
create policy "gallery: admin inserta" on public.gallery_images
  for insert with check (public.is_admin());
create policy "gallery: admin actualiza" on public.gallery_images
  for update using (public.is_admin());
create policy "gallery: admin borra" on public.gallery_images
  for delete using (public.is_admin());

-- products: público ve activos (con stock o no), admin ve/gestiona todo (incl. stock)
create policy "products: publico ve activos" on public.products
  for select using (active = true or public.is_admin());
create policy "products: admin inserta" on public.products
  for insert with check (public.is_admin());
create policy "products: admin actualiza" on public.products
  for update using (public.is_admin());
create policy "products: admin borra" on public.products
  for delete using (public.is_admin());

-- appointment_requests: cualquiera inserta (form público), solo admin lee/gestiona
create policy "leads: cualquiera inserta" on public.appointment_requests
  for insert with check (true);
create policy "leads: admin lee" on public.appointment_requests
  for select using (public.is_admin());
create policy "leads: admin actualiza" on public.appointment_requests
  for update using (public.is_admin());
create policy "leads: admin borra" on public.appointment_requests
  for delete using (public.is_admin());

-- =========================================================
-- Storage: bucket público para imágenes (logo, hero, servicios, galería)
-- =========================================================
insert into storage.buckets (id, name, public)
values ('clinic-images', 'clinic-images', true)
on conflict (id) do nothing;

create policy "clinic-images: lectura publica"
  on storage.objects for select
  using (bucket_id = 'clinic-images');

create policy "clinic-images: admin sube"
  on storage.objects for insert
  with check (bucket_id = 'clinic-images' and public.is_admin());

create policy "clinic-images: admin borra"
  on storage.objects for delete
  using (bucket_id = 'clinic-images' and public.is_admin());
