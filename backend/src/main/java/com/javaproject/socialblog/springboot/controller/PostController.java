package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.model.Post;
import com.javaproject.socialblog.springboot.security.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    // get all
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {

        return ResponseEntity.ok(postService.getAllPosts());
    }

    // get by id
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable String id) {

        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // create
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {

        return ResponseEntity.ok(postService.createPost(post));
    }

    // update
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable String id, @RequestBody Post postDetails) {

        try {

            Post updatedPost = postService.updatePost(id, postDetails);
            return ResponseEntity.ok(updatedPost);

        } catch (RuntimeException e) {

            return ResponseEntity.notFound().build();
        }
    }

    // delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {

        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

}
