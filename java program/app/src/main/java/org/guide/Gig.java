package org.guide;

import java.util.ArrayList;

public class Gig {
    private String id;
    private String title;
    private String venueId;
    private String date;
    private ArrayList<String> tags;
    private ArrayList<String> artistIds;
    private String description;
    private String ticketLink;

    public Gig(String id, String title, String venueId, String date, ArrayList<String> tags, ArrayList<String> artistIds, String description, String ticketLink) {
        this.id = id;
        this.title = title;
        this.venueId = venueId;
        this.date = date;
        this.tags = tags;
        this.artistIds = artistIds;
        this.description = description;
        this.ticketLink = ticketLink;
    }
    public String id() {
        return id;
    }
    public String title() {
        return title;
    }
    public String venueId() {
        return venueId;
    }
    public String dateTime() {
        return date;
    }
    public ArrayList<String> tags() {
        return tags;
    }
    public String description() {
        return description;
    }
    public String ticketLink() {
        return ticketLink;
    }
    @Override
    public String toString() {
        return "Gig [id=" + id + ", title=" + title + ", venueId=" + venueId + ", date=" + date + ", tags=" + tags + ", artists=" + artists + "]";
    }
}