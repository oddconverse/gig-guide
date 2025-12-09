package org.guide;

import java.time.LocalDateTime;
import java.util.ArrayList;

public class Gig {
    private String id;
    private String title;
    private String venueId;
    private LocalDateTime dateTime;
    private ArrayList<String> tags;
    private ArrayList<String> artistIds;
    private String description;
    private String ticketLink;

    public Gig(String id, String title, String venueId, LocalDateTime dateTime, ArrayList<String> tags, ArrayList<String> artistIds, String description, String ticketLink) {
        this.id = id;
        this.title = title;
        this.venueId = venueId;
        this.dateTime = dateTime;
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
    public LocalDateTime dateTime() {
        return dateTime;
    }
    public ArrayList<String> tags() {
        return tags;
    }
    public ArrayList<String> artistIds() {
        return artistIds;
    }
    public String description() {
        return description;
    }
    public String ticketLink() {
        return ticketLink;
    }
}