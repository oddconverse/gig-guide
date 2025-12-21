create extension if not exists "pg_net" with schema "extensions";

alter table "public"."artist_lineup" add column "artist_lineup_id" integer not null;

alter table "public"."artist_lineup" enable row level security;

alter table "public"."artist_tags" enable row level security;

alter table "public"."artists" enable row level security;

alter table "public"."event_lineup" enable row level security;

alter table "public"."event_organisers" enable row level security;

alter table "public"."event_tags" enable row level security;

alter table "public"."events" enable row level security;

alter table "public"."organisers" enable row level security;

alter table "public"."venue_tags" enable row level security;

alter table "public"."venues" enable row level security;


  create policy "Enable read access for all users"
  on "public"."artist_lineup"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."artist_tags"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."artists"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."event_lineup"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."event_organisers"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."event_tags"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."events"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."organisers"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."venue_tags"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."venues"
  as permissive
  for select
  to public
using (true);



