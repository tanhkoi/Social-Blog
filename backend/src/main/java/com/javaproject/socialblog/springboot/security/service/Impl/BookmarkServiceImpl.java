package com.javaproject.socialblog.springboot.security.service.Impl;

import com.javaproject.socialblog.springboot.model.Bookmark;
import com.javaproject.socialblog.springboot.model.LikeType;
import com.javaproject.socialblog.springboot.model.Post;
import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.repository.BookmarkRepository;
import com.javaproject.socialblog.springboot.repository.LikeRepository;
import com.javaproject.socialblog.springboot.repository.PostRepository;
import com.javaproject.socialblog.springboot.security.dto.PostResponse;
import com.javaproject.socialblog.springboot.security.service.BookmarkService;
import com.javaproject.socialblog.springboot.security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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

    private final ModelMapper modelMapper;

    private final LikeRepository likeRepository;

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
    public List<PostResponse> getUserBookmarks() {

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();

        User currUser = userService.findByUsername(username);

        List<Bookmark> bookmarks = bookmarkRepository.findByUserId(currUser.getId());

        List<Post> posts = new ArrayList<>();

        for (var bookmark : bookmarks) {
            postRepository.findById(bookmark.getPostId()).ifPresent(posts::add);
        }

        List<PostResponse> postResponses = new ArrayList<>();

        for (Post post : posts) {
            PostResponse postResponse = new PostResponse();
            modelMapper.map(post, postResponse);
            postResponse.setLikeCnt(post.getLikes().size());
            postResponse.setLiked(likeRepository.existsByUserIdAndContentIdAndType(currUser.getId(), post.getId(), LikeType.POST));
            postResponse.setSaved(bookmarkRepository.existsByUserIdAndPostId(currUser.getId(), post.getId()));
            postResponses.add(postResponse);
        }

        return postResponses;

    }

}
