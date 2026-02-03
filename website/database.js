import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'http://127.0.0.1:54321'
const supabaseKey = 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH'
const client = createClient(supabaseUrl, supabaseKey);

export async function getEvents(startDate, endDate) {
    //events = await client.from('events').select('*, venues(venue_id, *)').like('CAST(date_and_time AS text)', `2026-01-11%`);
    const events = await client.from('events').select('*, venues(venue_id, *)').gt('date_and_time', `${startDate.toISOString()}`).lt('date_and_time', `${endDate.toISOString()}`);
    console.log(events);
    return events;
    //return [{event_id:1, event_name:"Charlier kirk"}, {event_id:2, event_name:"Charliest kirk"}]
}

export async function getCollectiveMembers(collective_id) {
    // does not work
    /*const members = await client.from('artists')
    .select(`*, collective_members!collective_members_member_id_fkey(member_id, *)`).eq('artist_id', collective_id);*/
    const members = await client.from('collective_members')
    .select(`*, artists(artist_id, *)`).eq(`collective_id`, collective_id);
    return members;
}

export async function getEvent(id) {
    const event = await client.from('events')
    .select(`*`)
        .eq('event_id', id).limit(1).single();
    return event;
}

export async function getEventLineup(eventId){
    const lineup = await client.from('event_lineup')
    .select(`*, artists(artist_id, *)`)
    .eq(`event_id`, eventId);
    console.log(lineup.data);
    return lineup;
}

export async function getEventsByTag(tag) {
    const events = await client.from('event_tags').select(`*, 
        events(event_id, *)`).eq('tag', tag);
    return events;
}

export async function getArtist(id) {
    const artist = await client.rpc('get_artist', {id: id})
    return artist;
}

export async function getEventTags(id) {
    const tags = await client.from('event_tags').select('tag', {count: 'exact'}).eq('event_id', id)
    return tags;
}

export async function getVenue(id) {
    const venue = await client.from('venues').select('').eq('venue_id', id).limit(1).single();
    return venue;
}