// server.js

const express = require('express');
const app = express();

const database = require('./database.js');

const handlebars = require('express-handlebars');

const supabase = require('@supabase/supabase-js')

const supabaseUrl = 'http://127.0.0.1:54321'
const supabaseKey = 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH'
const client = supabase.createClient(supabaseUrl, supabaseKey);

const hostname = '192.168.0.61';
const port = 80;
// uncomment below if working on pc
// const ROOTPATH = 'D:/gig-guide/website/';
// uncomment below if working on laptop
const ROOTPATH = 'C:/Users/jarra/Documents/gig-guide/website/';

const hbs = handlebars.create({
    helpers: {dateString(date) {
        return date.toLocaleDateString('en-AU');
    },
    dateTimeString(dateString) {
        let date = new Date(dateString);
        console.log(dateString);
        return date.toLocaleString('en-AU', {dateStyle:"short", timeStyle:"short"});
    }
}});

app.use(express.static(ROOTPATH));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
app.set('partials', './views/partials')

app.get('/', async (request, response) => {
    let end_date = new Date(Date.now());
    end_date.setDate(end_date.getDate() + 7);
    end_date.setHours(23, 59, 59, 999);
    // events = await database.getEvents(new Date(Date.now()), end_date)
    const events = await client.rpc('get_events_by_dates', { start_date: new Date(Date.now()), end_date: end_date });
    console.log(events.data);
    response.render('home', {events: events.data, start_date: new Date(Date.now()), end_date: end_date});
});

app.get('/events/:id', async (request, response) => {
    const event = await client.rpc('get_event', {id: parseInt(request.params.id)})
    // const lineup = await database.getEventLineup(parseInt(request.params.id))
    const lineup = await client.rpc('get_event_lineup', {id: parseInt(request.params.id)})
    const event_tags = await client.rpc('get_event_tags', {id: parseInt(request.params.id)})
    const venue = await client.rpc('get_venue', {id: event.data.venue_id})
    console.log(lineup.data);
    response.render('events', {event: event.data, 
        lineup: lineup.data,
        event_tags: event_tags.data,
        venue: venue.data});
});

app.get('/tags/:tag', async (request, response) => {
    const results = await database.getEventsByTag(request.params.tag);
    response.render('tags', {results: results.data});
})

app.get('/venues/:id', async (request, response) => {
    const venue = await client.rpc('get_venue', {id: request.params.id})
    const events = await client.rpc('get_venue_events', {id: request.params.id})
    console.log(venue.data);
    response.render(`venues`, {venue: venue.data, events: events.data});
});

app.get('/artists/:id', async (request, response) => {
    const artist = await client.rpc('get_artist', {id: parseInt(request.params.id)})
    const collectiveMembers = await client.rpc('get_collective_members', {id: parseInt(request.params.id)})
    const memberOf = await client.rpc('get_member_of', {id: parseInt(request.params.id)});
    const events = await client.rpc('get_artist_events', {id: parseInt(request.params.id)});
    console.log(events.data);
    response.render('artists', {artist: artist.data, collectiveMembers: collectiveMembers.data, memberOf: memberOf.data, events: events.data});
});

app.get('/contribute/', async (request, response) => {
    const venues = await client.from('venues').select('venue_id, venue_name');
    const artists = await client.from('artists').select('artist_id, artist_name').order('artist_name');
    let venues_object = new Map();
    for (let i = 0; i < venues.data.length; i++) {
        console.log(venues.data[i]);
        venues_object.set(`${venues.data[i].venue_id}: ${venues.data[i].venue_name}`, venues.data[i]);
    }
    console.log(venues_object);
    response.render('contribute', {venue_names: JSON.stringify(venues.data), artist_names: JSON.stringify(artists.data)});
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});