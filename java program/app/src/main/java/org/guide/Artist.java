package org.guide;

public class Artist {
    private String id;
    private String name;
    private String description;
    //private ArtistLinks links;
    public Artist(String id, String name, String description/*, ArtistLinks links*/) {
        this.id = id;
        this.name = name;
        this.description = description;
        //this.links = links;
    }
    /*public Artist(String id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }*/
    public String toString() {
        return "Artist [id=" + id + ", name=" + name + ", description=" + description + "]";
    }
}
