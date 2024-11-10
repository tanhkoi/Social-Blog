package com.javaproject.socialblog.springboot.security.service;

import com.javaproject.socialblog.springboot.model.Post;
import com.javaproject.socialblog.springboot.security.dto.PostRequest;

import java.util.List;
import java.util.Optional;

public interface PostService {

    List<Post> getAllPosts();

    Optional<Post> getPostById(String id);

    Post createPost(PostRequest post);

    Post updatePost(String id, PostRequest postDetails);

    void deletePost(String id);

}

