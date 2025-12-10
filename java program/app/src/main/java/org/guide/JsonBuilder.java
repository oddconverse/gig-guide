package org.guide;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.io.*;
import java.util.Scanner;

import com.google.gson.*;

public class JsonBuilder {
    private ArrayList<Artist> artists;
    private ArrayList<Gig> gigs;
    private ArrayList<Venue> venues;
    public JsonBuilder() {
        this.artists = new ArrayList<>();
        this.gigs = new ArrayList<>();
        this.venues = new ArrayList<>();
    }
    public void addArtist(Artist artist) {
        this.artists.add(artist);
    }
    public void addGig(Gig gig) {
        this.gigs.add(gig);
    }
    public void addVenue(Venue venue) {
        this.venues.add(venue);
    }
    public static <T> ArrayList<T> toArrayList(T[] list) {
        ArrayList<T> temp = new ArrayList<>();
        try {
            for (T o : list) {
                if (o == null) {
                    return temp;
                }
                temp.add(o);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            return temp;
        }
        return temp;
    }
    public void loadData() throws Exception{
        Path currentDir =  Paths.get(System.getProperty("user.dir"));
        Path parentDir = currentDir.getParent();
        File masterDir = new File(parentDir.getParent().toString() + "/website");
        File artistDir = new File(masterDir.getPath() + "/artists");
        File gigDir = new File(masterDir.getPath() + "/gigs");
        File venuesDir = new File(masterDir.getPath() + "/venues");
        for (File dir : toArrayList(artistDir.listFiles())) {
            if (dir.isDirectory()) {
                for (File file : toArrayList(dir.listFiles())) {
                    if (file.getName().endsWith(".json")) {
                        Gson gson = new Gson();
                        Scanner sc = new Scanner(file);
                        String temp = "";
                        while (sc.hasNextLine()) {
                            temp += sc.nextLine();
                        }
                        Artist artist = gson.fromJson(temp, Artist.class);
                        System.out.println(artist);
                        addArtist(artist);
                    }
                }
            }
        }
        for (File dir : toArrayList(gigDir.listFiles())) {
            if (dir.isDirectory()) {
                for (File file : toArrayList(dir.listFiles())) {
                    if (file.getName().endsWith(".json")) {
                        Gson gson = new Gson();
                        Scanner sc = new Scanner(file);
                        String temp = "";
                        while (sc.hasNextLine()) {
                            temp += sc.nextLine();
                        }
                        Gig gig = gson.fromJson(temp, Gig.class);
                        System.out.println(gig);
                        addGig(gig);
                    }
                }
            }
        }
    }
    public static void main(String[] args) throws Exception {
        JsonBuilder builder = new JsonBuilder();
        builder.loadData();
        for (Artist artist : builder.artists) {
            System.out.println(artist);
        }
    }
}
