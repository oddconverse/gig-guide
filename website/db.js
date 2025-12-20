const {createClient} = window.supabase

const supabaseUrl = 'http://127.0.0.1:54321'
const supabaseKey = 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH'
const client = createClient(supabaseUrl, supabaseKey);

async function loadHomePage(date) {
    let {data: events, error} = await client.from('events').select(`*, event_lineup(event_id, artist_lineup(event_lineup_id, artists(artist_id, artist_name)))`)
    for (let i = 0; i < events.length; i++) {
        let eventDate = new Date(events[0].date_and_time)
        //const dateTimeArray = events[0].date_and_time.split("T")
        //const eventDate = dateTimeArray[0]
        console.log(eventDate)
        console.log(date)
    }
    let {data:dateTime, bad} = await client.from(`events`).select(`date_and_time`);
    console.log(events);
    console.log(dateTime);
}
async function loadArtistPage(artist_id) {
    let {data: events, error} = await client.from('events').select()
}
async function loadEventPage(event_id) {
    let {data: events, error} = await client.from('events').select(`*, event_lineup(event_id, artist_lineup(event_lineup_id, artists(artist_id, artist_name)))`).eq(`event_id`, event_id);

}
async function loadVenuePage(venue_id) {
    let {data: venue, error} = await client.from('venues').select(`*, events(*)`).eq('venue_id', venue_id);
    console.log(venue)
}
let currentDate = new Date(Date.now()).toLocaleDateString(`en-GB`)
console.log(currentDate)
let dateArray = currentDate.split('T')
let date = dateArray[0]
loadHomePage(date);