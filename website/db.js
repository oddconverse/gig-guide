// does javascript just go like this forever until we die serious question
// ODDCONVERSE 2025 ALL USE LEGAL GO PIES


const {createClient} = window.supabase

const supabaseUrl = 'http://127.0.0.1:54321'
const supabaseKey = 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH'
const client = createClient(supabaseUrl, supabaseKey);


// load all meeting current date
async function loadHomePage(date) {
    // sql to db finds event and venue info
    // also finds artist info for future implementation
    let currentDate = Date.now().toISOString().substring(0, 10);
    let {data: events, error} = await 
    client.from('events')
    .select(`*, venues(venue_id, *), 
        event_lineup(event_id, 
        artist_lineup(artist_id, 
        artists(artist_id, *)))`)
    // events to be shown
    const allEvents = []
    for (let i = 0; i < events.length; i++) {
        // finds date from datetime string

        let eventDateTime = new Date(events[i].date_and_time).toISOString()
        const dateTimeArray = eventDateTime.split(`T`)
        const eventDate = dateTimeArray[0]
        if (date == eventDate) {
            // add events if date equals searched date
            allEvents.push(events[i])
        }
    }
    let table = document.getElementById("guide-table")
    let text = `<tr>
                    <th>Name</th>
                    <th>Venue</th>
                    <th>Date and Time</th>
                    <th>Tickets</th>
                </tr>`
    for (let i = 0; i < allEvents.length; i++) {
        console.log(allEvents[i])
        const event = allEvents[i];
        const venue = event.venues;
        const dateTime = new Date(event.date_and_time);
        text += `<tr><td><a href="gigs/?id=${event.event_id}">${event.event_name}</a></td><td><a href="venues/?id=${event.venue_id}">${venue.venue_name}</td><td>${dateTimeString(dateTime)}</td><td><a href="${event.ticket_link}">Link</a></td></tr>`
    }
    table.innerHTML = text;
}
async function loadArtistPage(artist_id) {
    let {data: events, error} = await client.from('events').select()
}
async function loadEventPage(event_id) {
    let {data: events, error} = await client.from('events').select(`*, event_lineup(event_lineup_id, artist_lineup(artist_id, artists(artist_id, artist_name)))`).eq(`event_id`, event_id);
}
async function loadVenuePage(venue_id) {
    let {data: venue, error} = await client.from('venues').select(`*, events(*)`).eq('venue_id', venue_id);
    console.log(venue)
}
// creates my preferred date string
function dateTimeString(dateTime) {
    let hours = dateTime.getHours();
    let minutes = dateTime.getMinutes();
    let meridian = "AM";
    // changes out of 24hr time and adjusts meridian
    if (hours > 12) {
        hours = hours - 12;
        meridian = "PM"
    }
    // 12:00am
    else if (hours == 0) {
        hours = 12
    }
    // minutes as a number when <10 was appearing as single digit, i.e 18:00 was appearing as 6:0 PM
    if (minutes < 10) {
        minutes = `0${minutes}`;
        console.log(minutes);
    }
    return `${dateTime.getDate()}-${dateTime.getMonth()}-${dateTime.getFullYear()} ${hours}:${minutes} ${meridian}`
}

let currentDate = new Date().toISOString()
let dateArray = currentDate.split('T')
let date = dateArray[0]
loadHomePage(date);