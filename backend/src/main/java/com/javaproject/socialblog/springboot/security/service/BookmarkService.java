package com.javaproject.socialblog.springboot.security.service;

import com.javaproject.socialblog.springboot.model.Post;

import java.util.List;

public interface BookmarkService {

    List<Post> getUserBookmarks();

    void removeBookmark(String postId);

    void bookmarkPost(String postId);

    boolean checkIsSavedPost(String postId);

}
