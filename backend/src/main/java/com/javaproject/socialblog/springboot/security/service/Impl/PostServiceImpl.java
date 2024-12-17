package com.javaproject.socialblog.springboot.security.service.Impl;

import com.javaproject.socialblog.springboot.model.*;
import com.javaproject.socialblog.springboot.repository.BookmarkRepository;
import com.javaproject.socialblog.springboot.repository.LikeRepository;
import com.javaproject.socialblog.springboot.repository.PostRepository;
import com.javaproject.socialblog.springboot.security.dto.PostRequest;
import com.javaproject.socialblog.springboot.security.dto.PostResponse;
import com.javaproject.socialblog.springboot.security.service.NotificationService;
import com.javaproject.socialblog.springboot.security.service.PostService;
import com.javaproject.socialblog.springboot.security.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    private final UserService userService;

    private final ModelMapper modelMapper;

    private final LikeRepository likeRepository;

    private final BookmarkRepository bookmarkRepository;

    private final NotificationService notificationService;

    public String getCurrentUserId() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        if (loggedInUser != null && loggedInUser.isAuthenticated() && !"anonymousUser".equals(loggedInUser.getPrincipal())) {
            String username = loggedInUser.getName();
            return userService.findByUsername(username).getId();
        } else {
            return null;
        }
    }

    public PostResponse customMap(Post post, String currUserId) {
        PostResponse postResponse = modelMapper.map(post, PostResponse.class);
        postResponse.setLikeCnt(post.getLikes().size());
        postResponse.setLiked(likeRepository.existsByUserIdAndContentIdAndType(currUserId, post.getId(), LikeType.POST));
        postResponse.setSaved(bookmarkRepository.existsByUserIdAndPostId(currUserId, post.getId()));
        return postResponse;
    }

    public void sendNewPostNotificationToUsers(Set<Follow> follows, String postId, String currUsername) {
        for (Follow fl : follows) {
            notificationService.createNewPostNotification(fl.getUser(), postId, "New post", "New post from " + currUsername);
        }
    }

    @Override
    public Page<PostResponse> getPostsByUser(String id, Pageable pageable) {
        Page<Post> posts = postRepository.findByAuthorId(id, pageable);
        return posts.map(post -> customMap(post, getCurrentUserId()));
    }

    @Override
    public List<PostResponse> getPostsByUser(String id) {
        List<Post> posts = postRepository.findByAuthorId(id);
        return posts.stream().map(post -> customMap(post, getCurrentUserId()))
                .collect(Collectors.toList());
    }

    @Override
    public Page<PostResponse> getAllPosts(Pageable pageable) {
        Page<Post> posts = postRepository.findAll(pageable);
        return posts.map(post -> customMap(post, getCurrentUserId()));
    }


    @Override
    public Post getPostById(String id) {
        return postRepository.findById(id).orElseThrow();
    }

    @Override
    public Post createPost(PostRequest postDetail) {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        User currUser = userService.findByUsername(username);

        Post post = new Post();
        post.setCreatedAt(new Date());  // Sets the created date to now
        post.setComments(new ArrayList<>()); // Just init the post, so it doesn't have any comments and interactions yet
        post.setLikes(new ArrayList<>());
        post.setContent(postDetail.getContent());
        post.setTitle(postDetail.getTitle());
        post.setTags(postDetail.getTags());
        post.setCategory(postDetail.getCategory());
        if (postDetail.getImageCloudUrl().isBlank())
            post.setImageCloudUrl("https://img.freepik.com/free-vector/hand-drawn-flat-design-digital-detox-illustration_23-2149332264.jpg");
        else
            post.setImageCloudUrl(postDetail.getImageCloudUrl());
        post.setAuthor(currUser); // Set curr user
        postRepository.save(post);

        sendNewPostNotificationToUsers(currUser.getFollowers(), post.getId(), currUser.getUsername());

        return post;
    }

    @Override
    public Post updatePost(String id, PostRequest postDetails) {
        return postRepository.findById(id).map(post -> {
            post.setTitle(postDetails.getTitle());
            post.setCategory(postDetails.getCategory());
            post.setTags(postDetails.getTags());
            post.setContent(postDetails.getContent());
            post.setCreatedAt(new Date());  // Sets the updated date to now
            return postRepository.save(post);
        }).orElseThrow(() -> new RuntimeException("Post not found with id " + id));
    }

    @Override
    public void deletePost(String id) {
        postRepository.deleteById(id);
    }

    @Override
    public void deleteNullComment(String id) {
        Post post = postRepository.findById(id).orElseThrow();
        List<Comment> list = post.getComments();
        list.removeIf(c -> c.getContent() == null);
        post.setComments(list);
        postRepository.save(post);
    }

    @Override
    public List<PostResponse> getMyPosts() {
        String currUserId = getCurrentUserId();
        List<Post> posts = postRepository.findByAuthorId(currUserId);
        return posts.stream().map(post -> customMap(post, getCurrentUserId())).collect(Collectors.toList());
    }

    @Override
    public List<PostResponse> searchPosts(String keyword, List<String> tags) {
        List<Post> posts;
        if (keyword != null && !keyword.isEmpty() && (tags == null || tags.isEmpty())) {
            posts = postRepository.findByTitleContainingIgnoreCase(keyword);
        } else if (tags != null && !tags.isEmpty() && (keyword == null || keyword.isEmpty())) {
            posts = postRepository.findByTagsIn(tags);
        } else if (keyword != null && !keyword.isEmpty()) {
            posts = postRepository.findByTitleContainingIgnoreCase(keyword);
            posts.addAll(postRepository.findByTagsIn(tags));
        } else {
            posts = postRepository.findAll();
        }
        return posts.stream()
                .map(post -> customMap(post, getCurrentUserId()))
                .collect(Collectors.toList());
    }

    @Override
    public Page<PostResponse> getPostsByMostLikes(Pageable pageable) {
        Page<Post> posts = postRepository.findAll(pageable);
        List<PostResponse> postResponses = posts.getContent().stream()
                .map(post -> customMap(post, getCurrentUserId()))
                .sorted(Comparator.comparing(PostResponse::getLikeCnt).reversed()) // Sort by most likes
                .toList();
        return new PageImpl<>(postResponses, pageable, posts.getTotalElements());
    }

    @Override
    public Page<PostResponse> getRelatedPosts(String tag, String postId, Pageable pageable) {
        List<String> tags = new ArrayList<>();
        tags.add(tag);
        Page<Post> posts = postRepository.findByTags(tags, pageable);
        List<PostResponse> filteredResponses = posts.getContent().stream()
                .filter(post -> !post.getId().equals(postId)) // Exclude the current post by ID
                .map(post -> customMap(post, getCurrentUserId()))
                .toList();
        return new PageImpl<>(filteredResponses, pageable, posts.getTotalElements());
    }

}
