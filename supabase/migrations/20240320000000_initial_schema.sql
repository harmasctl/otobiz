-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  email text,
  phone text,
  role text default 'user',
  is_verified boolean default false,
  business_license text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Create vehicles table
create table vehicles (
  id uuid default uuid_generate_v4() primary key,
  seller_id uuid references profiles(id) on delete cascade,
  make text not null,
  model text not null,
  year integer not null,
  price numeric not null,
  mileage numeric,
  fuel_type text,
  transmission text,
  vin text,
  description text,
  images text[],
  location text,
  latitude numeric,
  longitude numeric,
  status text default 'available',
  is_featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create favorites table
create table favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade,
  vehicle_id uuid references vehicles(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, vehicle_id)
);

-- Create reviews table
create table reviews (
  id uuid default uuid_generate_v4() primary key,
  reviewer_id uuid references profiles(id) on delete cascade,
  seller_id uuid references profiles(id) on delete cascade,
  rating integer check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table profiles enable row level security;
alter table vehicles enable row level security;
alter table favorites enable row level security;
alter table reviews enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (true);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Vehicles are viewable by everyone"
  on vehicles for select
  using (true);

create policy "Authenticated users can create vehicles"
  on vehicles for insert
  with check (auth.role() = 'authenticated');

create policy "Users can update own vehicles"
  on vehicles for update
  using (auth.uid() = seller_id);

create policy "Users can delete own vehicles"
  on vehicles for delete
  using (auth.uid() = seller_id);

create policy "Users can manage their favorites"
  on favorites for all
  using (auth.uid() = user_id);

create policy "Reviews are viewable by everyone"
  on reviews for select
  using (true);

create policy "Authenticated users can create reviews"
  on reviews for insert
  with check (auth.role() = 'authenticated');

create policy "Users can update own reviews"
  on reviews for update
  using (auth.uid() = reviewer_id);

create policy "Users can delete own reviews"
  on reviews for delete
  using (auth.uid() = reviewer_id);

-- Create functions
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
