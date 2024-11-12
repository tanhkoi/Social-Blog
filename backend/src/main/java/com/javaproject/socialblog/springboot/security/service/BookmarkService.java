package com.javaproject.socialblog.springboot.security.service;

import com.javaproject.socialblog.springboot.model.Bookmark;

import java.util.List;

public interface BookmarkService {

    List<Bookmark> getUserBookmarks(String userId);

    void removeBookmark(String userId, String postId);

    void bookmarkPost(String userId, String postId);

}
