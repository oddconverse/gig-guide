package org.guide;

public abstract class Tag {
    private String name;
    private boolean inherited;
    public Tag(String name) {
        this.name = name;
        this.inherited = false;
    }
    public Tag(String name, boolean inherited) {
        this.name = name;
        this.inherited = inherited;
    }
    public String name() {
        return name;
    }
    public boolean isInherited() {
        return inherited;
    }
}
