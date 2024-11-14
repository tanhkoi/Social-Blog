package com.javaproject.socialblog.springboot.security.service.Impl;

import com.javaproject.socialblog.springboot.model.Bookmark;
import com.javaproject.socialblog.springboot.model.Post;
import com.javaproject.socialblog.springboot.model.User;
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

}
