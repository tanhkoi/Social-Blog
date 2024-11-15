package com.javaproject.socialblog.springboot.security.service.Impl;

import com.javaproject.socialblog.springboot.model.Comment;
import com.javaproject.socialblog.springboot.model.Post;
import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.repository.PostRepository;
import com.javaproject.socialblog.springboot.security.dto.PostRequest;
import com.javaproject.socialblog.springboot.security.dto.PostResponse;
import com.javaproject.socialblog.springboot.security.service.LikeService;
import com.javaproject.socialblog.springboot.security.service.PostService;
import com.javaproject.socialblog.springboot.security.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    private final UserService userService;

    private final ModelMapper modelMapper;

    private final LikeService likeService;

    @Override
    public List<PostResponse> getAllPosts() {

        List<Post> posts = postRepository.findAll();

        List<PostResponse> postResponses = new ArrayList<>();

        for (Post post : posts) {
            PostResponse postResponse = new PostResponse();
            modelMapper.map(post, postResponse);
            postResponse.setLikeCnt(likeService.getPostLikeCount(post.getId()));
            postResponses.add(postResponse);
        }

        return postResponses;

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

        if (postDetail.getImageCloudUrl() != null)
            post.setImageCloudUrl(postDetail.getImageCloudUrl());
        else
            post.setImageCloudUrl("https://img.freepik.com/free-vector/hand-drawn-flat-design-digital-detox-illustration_23-2149332264.jpg");

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();

        User currUser = userService.findByUsername(username);
        post.setAuthor(currUser); // Set curr user

        return postRepository.save(post);

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

        List<Post> posts = postRepository.findAll()
                .stream()
                .filter(post -> post.getAuthor().getId().equals(currUser.getId()))
                .toList();

        List<PostResponse> postResponses = new ArrayList<>();

        for (Post post : posts) {
            PostResponse postResponse = new PostResponse();
            modelMapper.map(post, postResponse);
            postResponse.setLikeCnt(likeService.getPostLikeCount(post.getId()));
            postResponses.add(postResponse);
        }

        modelMapper.map(posts, postResponses);

        for (var item : postResponses) {
            item.setLikeCnt(likeService.getPostLikeCount(item.getId()));
        }

        return postResponses;

    }

}

