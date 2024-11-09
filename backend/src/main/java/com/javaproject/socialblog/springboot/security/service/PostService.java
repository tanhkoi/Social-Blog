package com.javaproject.socialblog.springboot.security.service;

import com.javaproject.socialblog.springboot.model.Post;

import java.util.List;
import java.util.Optional;

public interface PostService {

    List<Post> getAllPosts();

    Optional<Post> getPostById(String id);

    Post createPost(Post post);

    Post updatePost(String id, Post postDetails);

    void deletePost(String id);

}

