package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.annotation.CheckUserEnabled;
import com.javaproject.socialblog.springboot.model.Post;
import com.javaproject.socialblog.springboot.security.dto.PostRequest;
import com.javaproject.socialblog.springboot.security.dto.PostResponse;
import com.javaproject.socialblog.springboot.security.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    // Get all posts
    @GetMapping
    @Operation(
            summary = "Get all posts",
            description = "Retrieve a list of all posts, including their details.",
            tags = "Post Service"
    )
    public ResponseEntity<Page<PostResponse>> getAllPosts(Pageable pageable) {
        return ResponseEntity.ok(postService.getAllPosts(pageable));
    }

    // Get a post by ID
    @GetMapping("/{id}")
    @Operation(
            summary = "Get post by ID",
            description = "Retrieve a specific post by its unique ID.",
            tags = "Post Service"
    )
    public ResponseEntity<Post> getPostById(@PathVariable String id) {

        return ResponseEntity.ok(postService.getPostById(id));
    }

    // Get the logged-in user's posts
    @GetMapping("/me")
    @Operation(
            summary = "Get my posts",
            description = "Retrieve a list of posts created by the currently logged-in user.",
            tags = "Post Service"
    )
    public ResponseEntity<List<PostResponse>> getMyPosts() {
        return ResponseEntity.ok(postService.getMyPosts());
    }

    // Retrieve posts created by a specific user
    @GetMapping("/{id}-posts")
    @Operation(
            summary = "Get User's Posts",
            description = "Retrieve a list of posts authored by the user with the specified ID.",
            tags = "Post Service"
    )
    public ResponseEntity<List<PostResponse>> getUserPosts(@PathVariable String id) {

        return ResponseEntity.ok(postService.getUserPosts(id));
    }

    // Create a new post
    @PostMapping
    @Operation(
            summary = "Create a post",
            description = "Allows a logged-in user to create a new post. Requires account to be enabled.",
            tags = "Post Service"
    )
    @CheckUserEnabled
    public ResponseEntity<Post> createPost(@RequestBody PostRequest post) {
        return ResponseEntity.ok(postService.createPost(post));
    }

    // Update an existing post
    @PutMapping("/{id}")
    @Operation(
            summary = "Update a post",
            description = "Update the details of an existing post by its ID. Requires the user's account to be enabled.",
            tags = "Post Service"
    )
    @CheckUserEnabled
    public ResponseEntity<Post> updatePost(@PathVariable String id, @RequestBody PostRequest postDetails) {
        try {
            Post updatedPost = postService.updatePost(id, postDetails);
            return ResponseEntity.ok(updatedPost);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a post
    @DeleteMapping("/{id}")
    @Operation(
            summary = "Delete a post",
            description = "Delete a post by its ID. The user must be logged in and have an enabled account.",
            tags = "Post Service"
    )
    @CheckUserEnabled
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

//    // Delete null comments from a post
//    @PostMapping("/null/{postId}")
//    @Operation(
//            summary = "Delete null comments",
//            description = "Remove all comments from a specified post that have null or empty values.",
//            tags = "Comment Service"
//    )
//    public ResponseEntity<Void> deleteNullComment(@PathVariable String postId) {
//        postService.deleteNullComment(postId);
//        return ResponseEntity.noContent().build();
//    }

    // Search posts by keyword or tags
    @GetMapping("/search")
    @Operation(
            summary = "Search posts",
            description = "Search for posts based on a keyword and/or a list of tags.",
            tags = "Post Service"
    )
    public ResponseEntity<List<PostResponse>> searchPosts(
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "tags", required = false) List<String> tags
    ) {
        return ResponseEntity.ok(postService.searchPosts(keyword, tags));
    }

    @GetMapping("/most-liked")
    @Operation(
            summary = "Get posts by most likes",
            description = "List posts based on most likes.",
            tags = "Post Service"
    )
    public ResponseEntity<List<PostResponse>> getPostsByMostLikes() {
        return ResponseEntity.ok(postService.getPostsByMostLikes());
    }

}
