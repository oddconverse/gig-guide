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

