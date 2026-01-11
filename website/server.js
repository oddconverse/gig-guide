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
    events = await client.from('events').select('*, venues(venue_id, *)').ilike('date_and_time', `%${date.toISOString().substring(0,10)}%`);
    console.log(date.toISOString().substring(0,10));
    console.log(events.data)
    return events.data;
    //return [{event_id:1, event_name:"Charlier kirk"}, {event_id:2, event_name:"Charliest kirk"}]
}

app.get('/', async (request, response)  => {
    response.render('home', {events: await getEvents(new Date(Date.now()))});
});

app.get('/gigs/', (request, response) => {
    response.sendFile(`${ROOTPATH}gigs/main.html`);

});

app.get('/venues/', (request, response) => {
    response.sendFile(`${ROOTPATH}venues/main.html`);
});

app.get('/artists/', (request, response) => {
    response.sendFile(`${ROOTPATH}artists/main.html`);
});

app.get('/fresh/', (request, response) => {
    response.render('fresh');
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});