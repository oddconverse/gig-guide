import { JSDOM } from 'jsdom';

// uncomment if on pc
const ROOTPATH = `D:/gig-guide/website/`
// uncomment if on laptop
// const ROOTPATH = `C:/Users/jarra/Documents/gig-guide/website`

export class HomePage {
    constructor() {
        
    }
    static build(date) {
        JSDOM.fromFile(`${ROOTPATH}template.html`).then(dom => {
            console.log(dom.serialise());
        })
        return dom;
    }
}
export class Artist {
    constructor(id, name, events, description, links, tags) {
        this.id = id;
        this.name = name;
        this.events = events;
        this.description = description;
        this.links = links;
        this.tags = tags;
    }
    buildPage() {

    }
}
export class ArtistPage {
    constructor() {

    }
    build(artist) {

    }
}
export class Lineup {
    constructor(entries) {
        this.entries = entries;
    }
}
export class LineupEntry {
    constructor(artists, listed_name) {
        if (listed_name == null && artists.length == 1) {
            this.listed_name = artists[0].name;
        }
        else if (listed_name == null) {
            let str = ``;
            for (let i = 0; i < artists.length; i++) {
                if (i + 2 == artists.length) {
                    str += `${artists[i]} & `;
                }
                else if (i + 1 == artists.length) {
                    str += `${artists[i]}`;
                }
                else {
                    str += `${artists[i]}, `;
                }
            }
        }
        else {
            this.listed_name = listed_name;
        }
        this.artists = artists;
    }
}
export class Venue {
    constructor(id, name, address, suburb, postcode, accessibility, events, tags) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.suburb = suburb;
        this.postcode = postcode;
        this.accessibility = accessibility;
        this.events = events;
        this.tags = tags;
    }
    tags_html() {
        let text = ``;
        for (let i = 0; i < tags.length; i++) {

        }
        return text;
    }
    address_string() {
        return `${this.address} ${this.suburb} ${this.postcode}`;
    }
}
export class Event {
    constructor(id, venue, name, date_time, description, lineup, ticket_link, accessibility, additional_info, poster, tags) {
        this.id = id;
        this.venue = venue;
        this.name = name;
        this.date_time = date_time;
        this.description = description;
        this.lineup = lineup;
        this.artists = artists;
        this.ticket_link = ticket_link;
        this.accessibility = accessibility;
        this.additional_info = additional_info;
        this.poster = poster;
        this.tags = tags;
    }
}
export class EventPage {

}