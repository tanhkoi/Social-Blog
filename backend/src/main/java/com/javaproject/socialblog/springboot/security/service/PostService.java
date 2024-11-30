package com.javaproject.socialblog.springboot.security.service;

import com.javaproject.socialblog.springboot.model.Post;
import com.javaproject.socialblog.springboot.security.dto.PostRequest;
import com.javaproject.socialblog.springboot.security.dto.PostResponse;

import java.util.List;

public interface PostService {

    List<PostResponse> getAllPosts();

    Post getPostById(String id);

    List<PostResponse> getMyPosts();

    Post createPost(PostRequest post);

    Post updatePost(String id, PostRequest postDetails);

    void deletePost(String id);

    void deleteNullComment(String id);

    List<PostResponse> searchPosts(String keyword, List<String> tags);
}

