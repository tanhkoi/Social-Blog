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

    @Override
    public Page<PostResponse> getUserPosts(String id, Pageable pageable) {
        Page<Post> posts = postRepository.findByAuthorId(id, pageable);

        // Fetch the authenticated user's ID if logged in
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String currUserId;
        if (loggedInUser != null && loggedInUser.isAuthenticated() && !"anonymousUser".equals(loggedInUser.getPrincipal())) {
            String username = loggedInUser.getName();
            currUserId = userService.findByUsername(username).getId();
        } else {
            currUserId = null;
        }

        return posts.map(post -> {
            PostResponse postResponse = modelMapper.map(post, PostResponse.class);
            postResponse.setLikeCnt(post.getLikes().size());
            postResponse.setLiked(likeRepository.existsByUserIdAndContentIdAndType(currUserId, post.getId(), LikeType.POST));
            postResponse.setSaved(bookmarkRepository.existsByUserIdAndPostId(currUserId, post.getId()));
            return postResponse;
        });
    }

    @Override
    public List<PostResponse> getUserPosts(String id) {
        List<Post> posts = postRepository.findByAuthorId(id);

        // Fetch the authenticated user's ID if logged in
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String currUserId;
        if (loggedInUser != null && loggedInUser.isAuthenticated() && !"anonymousUser".equals(loggedInUser.getPrincipal())) {
            String username = loggedInUser.getName();
            currUserId = userService.findByUsername(username).getId();
        } else {
            currUserId = null;
        }

        return posts.stream().map(post -> {
            PostResponse postResponse = modelMapper.map(post, PostResponse.class);
            postResponse.setLikeCnt(post.getLikes().size());
            postResponse.setLiked(likeRepository.existsByUserIdAndContentIdAndType(currUserId, post.getId(), LikeType.POST));
            postResponse.setSaved(bookmarkRepository.existsByUserIdAndPostId(currUserId, post.getId()));
            return postResponse;
        }).collect(Collectors.toList());
    }

    @Override
    public Page<PostResponse> getAllPosts(Pageable pageable) {
        Page<Post> posts = postRepository.findAll(pageable);

        // Fetch user details
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String currUserId;
        if (loggedInUser != null && loggedInUser.isAuthenticated() && !"anonymousUser".equals(loggedInUser.getPrincipal())) {
            String username = loggedInUser.getName();
            currUserId = userService.findByUsername(username).getId();
        } else {
            currUserId = null;
        }

        // Map posts to PostResponse
        return posts.map(post -> {
            PostResponse postResponse = modelMapper.map(post, PostResponse.class);
            postResponse.setLikeCnt(post.getLikes().size());
            postResponse.setLiked(likeRepository.existsByUserIdAndContentIdAndType(currUserId, post.getId(), LikeType.POST));
            postResponse.setSaved(bookmarkRepository.existsByUserIdAndPostId(currUserId, post.getId()));
            return postResponse;
        });
    }


    @Override
    public Post getPostById(String id) {

        return postRepository.findById(id).orElseThrow();

    }

    @Override
    public Post createPost(PostRequest postDetail) {

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
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();

        User currUser = userService.findByUsername(username);
        post.setAuthor(currUser); // Set curr user

        postRepository.save(post);

        System.out.println(post.getId());

        // todo: create a new post notification for all followers
        for (Follow fl : currUser.getFollowers()) {
            notificationService.createNewPostNotification(fl.getUser(), post.getId(), "New post", "New post from " + currUser.getName());
        }

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
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        User currUser = userService.findByUsername(username);

        List<Post> posts = postRepository.findByAuthorId(currUser.getId());

        return posts.stream().map(post -> {
            PostResponse postResponse = modelMapper.map(post, PostResponse.class);
            postResponse.setLikeCnt(post.getLikes().size());
            postResponse.setLiked(likeRepository.existsByUserIdAndContentIdAndType(currUser.getId(), post.getId(), LikeType.POST));
            postResponse.setSaved(bookmarkRepository.existsByUserIdAndPostId(currUser.getId(), post.getId()));
            return postResponse;
        }).collect(Collectors.toList());
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

        // Fetch user-related data
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String currUserId;
        if (loggedInUser != null && loggedInUser.isAuthenticated() && !"anonymousUser".equals(loggedInUser.getPrincipal())) {
            String username = loggedInUser.getName();
            currUserId = userService.findByUsername(username).getId();
        } else {
            currUserId = null;
        }

        return posts.stream()
                .map(post -> {
                    PostResponse postResponse = modelMapper.map(post, PostResponse.class);
                    postResponse.setLikeCnt(post.getLikes().size());
                    postResponse.setLiked(likeRepository.existsByUserIdAndContentIdAndType(currUserId, post.getId(), LikeType.POST));
                    postResponse.setSaved(bookmarkRepository.existsByUserIdAndPostId(currUserId, post.getId()));
                    return postResponse;
                })
                .collect(Collectors.toList());
    }

    @Override
    public Page<PostResponse> getPostsByMostLikes(Pageable pageable) {
        // Step 1: Get Current User ID
        String currUserId = Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
                .filter(auth -> auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal()))
                .map(auth -> userService.findByUsername(auth.getName()).getId())
                .orElse(null);

        // Step 2: Fetch Posts (Paginated)
        Page<Post> posts = postRepository.findAll(pageable);

        // Step 3: Map to PostResponse and Set Derived Fields
        List<PostResponse> postResponses = posts.getContent().stream()
                .map(post -> {
                    PostResponse postResponse = modelMapper.map(post, PostResponse.class);
                    postResponse.setLikeCnt(post.getLikes().size());
                    if (currUserId != null) {
                        postResponse.setLiked(likeRepository.existsByUserIdAndContentIdAndType(currUserId, post.getId(), LikeType.POST));
                        postResponse.setSaved(bookmarkRepository.existsByUserIdAndPostId(currUserId, post.getId()));
                    }
                    return postResponse;
                })
                .sorted(Comparator.comparing(PostResponse::getLikeCnt).reversed()) // Sort by most likes
                .toList();

        // Step 4: Return Paginated Result
        return new PageImpl<>(postResponses, pageable, posts.getTotalElements());
    }

    @Override
    public Page<PostResponse> getRelatedPosts(String tag, Pageable pageable) {
        List<String> tags = new ArrayList<>();
        tags.add(tag);
        Page<Post> posts = postRepository.findByTags(tags, pageable);

        // Fetch user details
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String currUserId;
        if (loggedInUser != null && loggedInUser.isAuthenticated() && !"anonymousUser".equals(loggedInUser.getPrincipal())) {
            String username = loggedInUser.getName();
            currUserId = userService.findByUsername(username).getId();
        } else {
            currUserId = null;
        }

        // Map posts to PostResponse
        return posts.map(post -> {
            PostResponse postResponse = modelMapper.map(post, PostResponse.class);
            postResponse.setLikeCnt(post.getLikes().size());
            postResponse.setLiked(likeRepository.existsByUserIdAndContentIdAndType(currUserId, post.getId(), LikeType.POST));
            postResponse.setSaved(bookmarkRepository.existsByUserIdAndPostId(currUserId, post.getId()));
            return postResponse;
        });
    }

}
