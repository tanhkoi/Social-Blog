package com.javaproject.socialblog.springboot.security.service.Impl;

import com.javaproject.socialblog.springboot.model.*;
import com.javaproject.socialblog.springboot.repository.BookmarkRepository;
import com.javaproject.socialblog.springboot.repository.PostRepository;
import com.javaproject.socialblog.springboot.security.service.BookmarkService;
import com.javaproject.socialblog.springboot.security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;

    private final UserService userService;

    private final PostRepository postRepository;

    // Bookmark a post
    public void bookmarkPost(String postId) {

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();

        User currUser = userService.findByUsername(username);

        if (!bookmarkRepository.existsByUserIdAndPostId(currUser.getId(), postId)) {

            bookmarkRepository.save(new Bookmark(null, currUser.getId(), postId, null));
        }

    }

    // Remove a bookmark
    public void removeBookmark(String postId) {

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();

        User currUser = userService.findByUsername(username);

        bookmarkRepository.deleteByUserIdAndPostId(currUser.getId(), postId);

    }

    // Get all bookmarks for a user
    public List<Post> getUserBookmarks() {

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();

        User currUser = userService.findByUsername(username);

        List<Bookmark> bookmarks = bookmarkRepository.findByUserId(currUser.getId());

        List<Post> posts = new ArrayList<>();

        for (var bookmark : bookmarks) {
            postRepository.findById(bookmark.getPostId()).ifPresent(posts::add);
        }

        return posts;

    }

    @Override
    public boolean checkIsSavedPost(String postId) {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        // Check if the user is authenticated
        if (loggedInUser == null || !loggedInUser.isAuthenticated() || "anonymousUser".equals(loggedInUser.getPrincipal())) {
            // Return false or throw an exception if the user is not logged in
            return false;
        }
        String username = loggedInUser.getName();
        String currUserId = userService.findByUsername(username).getId();

        Bookmark bookmark = bookmarkRepository.findAll().stream()
                .filter(l -> l.getUserId().equals(currUserId)
                        && l.getPostId().equals(postId)
                )
                .findFirst() // Extract the first match
                .orElse(null); // Return null if no match is found

        return bookmark != null;
    }


}
