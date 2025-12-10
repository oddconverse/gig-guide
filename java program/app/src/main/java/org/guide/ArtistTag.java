package org.guide;

public class ArtistTag extends Tag {
    public ArtistTag(String name, boolean inherited) {
        super(name, inherited);
    }
    public ArtistTag(String name) {
        super(name, false);
    }
}
