


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."artist_lineup" (
    "artist_id" integer NOT NULL,
    "event_lineup_id" integer NOT NULL
);


ALTER TABLE "public"."artist_lineup" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."artist_tags" (
    "artist_id" integer NOT NULL,
    "tag" "text" NOT NULL,
    "inherited" boolean
);


ALTER TABLE "public"."artist_tags" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."artists" (
    "artist_id" integer NOT NULL,
    "artist_name" character varying(255) NOT NULL,
    "artist_description" "text"
);


ALTER TABLE "public"."artists" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_lineup" (
    "event_id" integer NOT NULL,
    "event_lineup_id" integer NOT NULL,
    "billed_name" "text",
    "lineup_order" integer
);


ALTER TABLE "public"."event_lineup" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_organisers" (
    "event_id" integer NOT NULL,
    "organiser_id" integer NOT NULL
);


ALTER TABLE "public"."event_organisers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_tags" (
    "event_id" integer NOT NULL,
    "tag" "text" NOT NULL
);


ALTER TABLE "public"."event_tags" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."events" (
    "event_id" integer NOT NULL,
    "venue_id" integer,
    "event_name" character varying(255),
    "date_and_time" timestamp with time zone,
    "event_description" "text",
    "ticket_link" character varying(255),
    "additional_info" character varying(255),
    "accessibility" character varying(255),
    "poster_link" character varying(255)
);


ALTER TABLE "public"."events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."organisers" (
    "organiser_id" integer NOT NULL,
    "organiser_name" "text"
);


ALTER TABLE "public"."organisers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."venue_tags" (
    "venue_id" integer NOT NULL,
    "tag" "text" NOT NULL,
    "inherited" boolean
);


ALTER TABLE "public"."venue_tags" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."venues" (
    "venue_id" integer NOT NULL,
    "venue_name" character varying(255),
    "address" character varying(255),
    "accessibility" character varying(255),
    "suburb" character varying(30),
    "postcode" character varying(4)
);


ALTER TABLE "public"."venues" OWNER TO "postgres";


ALTER TABLE ONLY "public"."artist_lineup"
    ADD CONSTRAINT "artist_lineup_pkey" PRIMARY KEY ("artist_id", "event_lineup_id");



ALTER TABLE ONLY "public"."artist_tags"
    ADD CONSTRAINT "artist_tags_pkey" PRIMARY KEY ("artist_id", "tag");



ALTER TABLE ONLY "public"."artists"
    ADD CONSTRAINT "artists_pkey" PRIMARY KEY ("artist_id");



ALTER TABLE ONLY "public"."event_lineup"
    ADD CONSTRAINT "event_lineup_pkey" PRIMARY KEY ("event_lineup_id");



ALTER TABLE ONLY "public"."event_organisers"
    ADD CONSTRAINT "event_organisers_pkey" PRIMARY KEY ("event_id", "organiser_id");



ALTER TABLE ONLY "public"."event_tags"
    ADD CONSTRAINT "event_tags_pkey" PRIMARY KEY ("event_id", "tag");



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_pkey" PRIMARY KEY ("event_id");



ALTER TABLE ONLY "public"."organisers"
    ADD CONSTRAINT "organisers_pkey" PRIMARY KEY ("organiser_id");



ALTER TABLE ONLY "public"."venue_tags"
    ADD CONSTRAINT "venue_tags_pkey" PRIMARY KEY ("venue_id", "tag");



ALTER TABLE ONLY "public"."venues"
    ADD CONSTRAINT "venues_pkey" PRIMARY KEY ("venue_id");



ALTER TABLE ONLY "public"."artist_lineup"
    ADD CONSTRAINT "artist_lineup_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("artist_id");



ALTER TABLE ONLY "public"."artist_lineup"
    ADD CONSTRAINT "artist_lineup_event_lineup_id_fkey" FOREIGN KEY ("event_lineup_id") REFERENCES "public"."event_lineup"("event_lineup_id");



ALTER TABLE ONLY "public"."artist_tags"
    ADD CONSTRAINT "artist_tags_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("artist_id");



ALTER TABLE ONLY "public"."event_tags"
    ADD CONSTRAINT "event_tags_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "public"."events"("event_id");



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("venue_id");



ALTER TABLE ONLY "public"."venue_tags"
    ADD CONSTRAINT "venue_tags_venue_id_fkey" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("venue_id");





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";








































































































































































GRANT ALL ON TABLE "public"."artist_lineup" TO "anon";
GRANT ALL ON TABLE "public"."artist_lineup" TO "authenticated";
GRANT ALL ON TABLE "public"."artist_lineup" TO "service_role";



GRANT ALL ON TABLE "public"."artist_tags" TO "anon";
GRANT ALL ON TABLE "public"."artist_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."artist_tags" TO "service_role";



GRANT ALL ON TABLE "public"."artists" TO "anon";
GRANT ALL ON TABLE "public"."artists" TO "authenticated";
GRANT ALL ON TABLE "public"."artists" TO "service_role";



GRANT ALL ON TABLE "public"."event_lineup" TO "anon";
GRANT ALL ON TABLE "public"."event_lineup" TO "authenticated";
GRANT ALL ON TABLE "public"."event_lineup" TO "service_role";



GRANT ALL ON TABLE "public"."event_organisers" TO "anon";
GRANT ALL ON TABLE "public"."event_organisers" TO "authenticated";
GRANT ALL ON TABLE "public"."event_organisers" TO "service_role";



GRANT ALL ON TABLE "public"."event_tags" TO "anon";
GRANT ALL ON TABLE "public"."event_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."event_tags" TO "service_role";



GRANT ALL ON TABLE "public"."events" TO "anon";
GRANT ALL ON TABLE "public"."events" TO "authenticated";
GRANT ALL ON TABLE "public"."events" TO "service_role";



GRANT ALL ON TABLE "public"."organisers" TO "anon";
GRANT ALL ON TABLE "public"."organisers" TO "authenticated";
GRANT ALL ON TABLE "public"."organisers" TO "service_role";



GRANT ALL ON TABLE "public"."venue_tags" TO "anon";
GRANT ALL ON TABLE "public"."venue_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."venue_tags" TO "service_role";



GRANT ALL ON TABLE "public"."venues" TO "anon";
GRANT ALL ON TABLE "public"."venues" TO "authenticated";
GRANT ALL ON TABLE "public"."venues" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































drop extension if exists "pg_net";


