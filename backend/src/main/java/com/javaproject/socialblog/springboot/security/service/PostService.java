package com.javaproject.socialblog.springboot.security.service;

import com.javaproject.socialblog.springboot.model.Post;
import com.javaproject.socialblog.springboot.security.dto.PostRequest;
import com.javaproject.socialblog.springboot.security.dto.PostResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostService {

    Page<PostResponse> getAllPosts(Pageable pageable);

    Post getPostById(String id);

    List<PostResponse> getMyPosts();

    Page<PostResponse> getUserPosts(String id, Pageable pageable);

    List<PostResponse> getUserPosts(String id);

    Post createPost(PostRequest post);

    Post updatePost(String id, PostRequest postDetails);

    void deletePost(String id);

    void deleteNullComment(String id);

    List<PostResponse> searchPosts(String keyword, List<String> tags);

    Page<PostResponse> getPostsByMostLikes(Pageable pageable);

    Page<PostResponse> getRelatedPosts(String tag, String postId,Pageable pageable);
}

