package com.javaproject.socialblog.springboot.security.service.Impl;

import com.javaproject.socialblog.springboot.model.Bookmark;
import com.javaproject.socialblog.springboot.repository.BookmarkRepository;
import com.javaproject.socialblog.springboot.security.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;

    // Bookmark a post
    public void bookmarkPost(String userId, String postId) {

        if (!bookmarkRepository.existsByUserIdAndPostId(userId, postId)) {

            bookmarkRepository.save(new Bookmark(null, userId, postId, null));
        }

    }

    // Remove a bookmark
    public void removeBookmark(String userId, String postId) {

        bookmarkRepository.deleteByUserIdAndPostId(userId, postId);

    }

    // Get all bookmarks for a user
    public List<Bookmark> getUserBookmarks(String userId) {

        return bookmarkRepository.findByUserId(userId);

    }

}
