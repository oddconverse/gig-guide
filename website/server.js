// server.js

const supabase = require('@supabase/supabase-js')
const createClient = supabase.createClient;

const supabaseUrl = 'http://127.0.0.1:54321'
const supabaseKey = 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH'
const client = createClient(supabaseUrl, supabaseKey);

const express = require('express');
const app = express();

const classes = require('./page_classes.js')
const HomePage = classes.HomePage;

const handlebars = require('express-handlebars');
const engine = handlebars.engine();

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;
// uncomment below if working on pc
// const ROOTPATH = 'D:/gig-guide/website/';
// uncomment below if working on laptop
const ROOTPATH = 'C:/Users/jarra/Documents/gig-guide/website/';

app.use(express.static(ROOTPATH));
app.engine('handlebars', engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
app.set('partials', './views/partials')

async function getEvents(date) {
    //events = await client.from('events').select('*, venues(venue_id, *)').like('CAST(date_and_time AS text)', `2026-01-11%`);
    date.setDate(date.getDate())
    const tomorrow = new Date();
    tomorrow.setDate(date.getDate() + 1)
    events = await client.from('events').select('*, venues(venue_id, *)').gt('date_and_time', `${date.toISOString()}`).lt('date_and_time', `${tomorrow.toISOString()}`);
    return events.data;
    //return [{event_id:1, event_name:"Charlier kirk"}, {event_id:2, event_name:"Charliest kirk"}]
}

async function getEvent(id) {
    const event = await client.from('events')
    .select(`*, 
        event_lineup(event_id, 
        artist_lineup(event_lineup_id, 
        artists(artist_id, *))), venues(venue_id, *), event_tags(event_id, *))`)
        .eq('event_id', id).limit(1).single();
    console.log(event.data);
    return event.data;
}

async function getArtist(id) {
    const artist = await client.from('artists')
    .select(`*`).eq('artist_id', id).limit(1).single();
    return artist.data;
}

app.get('/', async (request, response)  => {
    response.render('home', {events: await getEvents(new Date(Date.now()))});
});

app.get('/events/:id', async (request, response) => {
    console.log(request.params.id);
    response.render('events', {event: await getEvent(parseInt(request.params.id))});
});

app.get('/venues/:id', (request, response) => {
    response.sendFile(`${ROOTPATH}venues/main.html`);
});

app.get('/artists/:id', async (request, response) => {
    response.render('artists', {artist: await getArtist(parseInt(request.params.id))});
});

app.get('/fresh/', (request, response) => {
    response.render('fresh');
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});