package org.guide;

import java.util.ArrayList;

public class ArtistLinks {
    private String instagram;
    private String spotify;
    private String bandcamp;
    private String appleMusic;
    private String tidal;
    private String twitter;
    private String deezer;
    private String soundcloud;
    private String unearthed;
    private String ninaprotocol;
    private String youtube;
    public ArtistLinks(ArrayList<String> links) {
        for (String link : links) {
            if (link.contains("instagram"))
                this.instagram = link;
            else if (link.contains("spotify"))
                this.spotify = link;
            else if (link.contains("bandcamp"))
                this.bandcamp = link;
            else if (link.contains("apple"))
                this.appleMusic = link;
            else if (link.contains("tidal"))
                this.tidal = link;
            else if (link.contains("x.com"))
                this.twitter = link;
            else if (link.contains("deezer"))
                this.deezer = link;
            else if (link.contains("soundcloud"))
                this.soundcloud = link;
            else if (link.contains("unearthed"))
                this.unearthed = link;
            else if (link.contains("ninaprotocol"))
                this.ninaprotocol = link;
            else if (link.contains("youtube"))
                this.youtube = link;
        }
    }
}
