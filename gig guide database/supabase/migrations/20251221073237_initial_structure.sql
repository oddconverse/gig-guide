alter table "public"."artist_lineup" drop constraint "artist_lineup_pkey";

drop index if exists "public"."artist_lineup_pkey";

CREATE UNIQUE INDEX artist_lineup_pkey ON public.artist_lineup USING btree (artist_lineup_id);

alter table "public"."artist_lineup" add constraint "artist_lineup_pkey" PRIMARY KEY using index "artist_lineup_pkey";

alter table "public"."event_lineup" add constraint "event_lineup_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public.events(event_id) not valid;

alter table "public"."event_lineup" validate constraint "event_lineup_event_id_fkey";


