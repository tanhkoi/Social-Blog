package com.javaproject.socialblog.springboot.utils;

import java.util.Locale;

public final class ProjectConstants {

    // Constants for the project

    public static final String DEFAULT_ENCODING = "UTF-8";

    public static final Locale VIETNAMESE_LOCALE = new Locale.Builder().setLanguage("vi").setRegion("VN").build();

    private ProjectConstants() {
        throw new UnsupportedOperationException();
    }
}
