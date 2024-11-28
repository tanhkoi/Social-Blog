package com.javaproject.socialblog.springboot.security.service;

import com.javaproject.socialblog.springboot.security.dto.PostResponse;

import java.util.List;

public interface BookmarkService {

    List<PostResponse> getUserBookmarks();

    void removeBookmark(String postId);

    void bookmarkPost(String postId);

    boolean checkIsSavedPost(String postId);

}
