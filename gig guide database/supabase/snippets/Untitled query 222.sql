SELECT *
FROM events
WHERE CAST(date_and_time AS text) LIKE '2026-01-11%';

alter database postgres
set timezone to 'Australia/Melbourne'; 

INSERT INTO Events (event_id, venue_id, event_name) VALUES (3, 3, 'NAPTIME!!!!!');

INSERT INTO Venues (venue_id, venue_name) VALUES (3, 'Ava''s Bed');

INSERT INTO Artists (artist_id, artist_name) VALUES (1, 'IShowSpeed')

SELECT *
FROM events E
INNER JOIN venues V ON E.venue_id = V.venue_id
INNER JOIN event_lineup EL ON E.event_id = EL.event_id
INNER JOIN artist_lineup AL ON EL.event_lineup_id = AL.event_lineup_id
INNER JOIN artists A on AL.artist_id = A.artist_id
WHERE E.event_id = 1;

CREATE TABLE collective_members (collective_id int, member_id int, PRIMARY KEY (collective_id, member_id));

DROP TABLE artist_lineup;

INSERT INTO Artists (artist_id, artist_name) VALUES (3, 'Sidney Phillips')

INSERT INTO Artists (artist_id, artist_name) VALUES (4, 'stealthyn00b')

INSERT INTO collective_members VALUES (4, 3)

INSERT INTO Artists (artist_id, artist_name) VALUES (5, 'lil ket')

INSERT INTO collective_members VALUES (4, 5);

DROP TABLE collective_members;

SELECT artist_name
FROM artists
INNER JOIN collective_members ON artist_id = member_id
WHERE collective_id = 4;

INSERT INTO Artists (artist_id, artist_name) VALUES (6, 'Diddy collective');

INSERT INTO collective_members VALUES (6, 3);

CREATE OR REPLACE FUNCTION get_artist(id int4)
returns artists
language sql
as $$
select *
from artists
where artist_id = id;
$$

CREATE OR REPLACE FUNCTION get_events_by_dates(start_date timestamptz, end_date timestamptz) 
returns setof event_with_venue
language sql
as $$
select E.*, V.venue_name
from events E
inner join venues V on V.venue_id = E.venue_id
where date_and_time >= start_date
and date_and_time <= end_date;
$$

drop function get_events_by_dates(timestamptz, timestamptz)

select *
from get_events_by_dates(TIMESTAMPTZ '2026-01-19 00:00:00 +11:00', TIMESTAMPTZ '2026-01-26 23:59:59 +11:00')

CREATE OR REPLACE FUNCTION get_event(id int) 
returns events
language sql
as $$
select *
from events
where event_id = id;
$$

CREATE OR REPLACE FUNCTION get_event_lineup(id int)
returns setof artist_lineup
language sql
as $$
select EL.billed_name, EL.lineup_order, A.artist_id, A.artist_name
from event_lineup EL
inner join artists A on EL.artist_id = A.artist_id
where EL.event_id = id;
$$

select A.artist_id, A.artist_name
from event_lineup EL
inner join artists A on EL.artist_id = A.artist_id
where EL.event_id = 1;

select *
from get_event_lineup(1)

CREATE TYPE artist_lineup AS (
  billed_name text,
  lineup_order text,
  artist_id int,
  artist_name text
);

DROP FUNCTION get_event_lineup(int)

CREATE OR REPLACE FUNCTION get_event_tags(id int)
returns setof event_tags
language sql
as $$
select *
from event_tags
where id = event_id;
$$

select *
from get_event_tags(1)

CREATE OR REPLACE FUNCTION get_venue(id int)
returns venues
language sql
as $$
select *
from venues
where id = venue_id;
$$

CREATE OR REPLACE FUNCTION get_artist(id int)
returns artists
language sql
as $$
select *
from artists
where id = artist_id;
$$

select *
from get_venue(1);

CREATE OR REPLACE FUNCTION get_collective_members(id int)
returns setof artists
language sql
as $$
select A.*
from artists A
inner join collective_members CM on A.artist_id = CM.member_id
where cm.collective_id = id;
$$

DROP FUNCTION get_collective_members(int)

select A.*
from artists A
inner join collective_members CM on A.artist_id = CM.member_id
where cm.collective_id = 4;

select *
from get_collective_members(4)

CREATE OR REPLACE FUNCTION get_member_of(id int)
returns setof artists
language sql
as $$
select A.*
from artists A
inner join collective_members CM on A.artist_id = CM.collective_id
where cm.member_id = id;
$$

CREATE OR REPLACE FUNCTION get_artist_events(id int)
returns setof event_with_venue
language sql
as $$
select E.*, V.venue_name
from events E
inner join event_lineup EL on E.event_id = EL.event_id
inner join artists A on EL.artist_id = A.artist_id
inner join venues V on E.venue_id = V.venue_id
where A.artist_id = id;
$$

DROP FUNCTION get_artist_events(int)

CREATE TYPE event_with_venue AS ( 
event_id int,
venue_id int,
event_name text,
date_and_time timestamptz,
event_description text,
ticket_link text,
additional_info text,
accessibility text,
poster_link text,
venue_name text
)
select *
from events;

select E.*, V.venue_name
from events E
inner join event_lineup EL on E.event_id = EL.event_id
inner join artists A on EL.artist_id = A.artist_id
inner join venues V on E.venue_id = V.venue_id
where A.artist_id = 1;

CREATE OR REPLACE FUNCTION get_venue_events (id int)
returns setof events
language sql
as $$
SELECT *
FROM events
WHERE venue_id = id;
$$