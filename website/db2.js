import { createClient } from '@supabase/supabase-js'
import fs from `fs`;
const supabaseUrl = 'http://127.0.0.1:54321'
const supabaseKey = 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH'
const supabase = createClient(supabaseUrl, supabaseKey)

export async function homePageGigs(date) {
    let { data: artists, error } = await supabase
    .from('events')
    .select(`event_id, event_name,
        venues (venue_id, venue_name), date_and_time, ticket_link`)
    .eq(`cast(date_and_time AS DATE)`, `date`)
    await fs.writeFile(`main.json`)
    console.log(artists);
    console.log(error);
}

homePageGigs(0);