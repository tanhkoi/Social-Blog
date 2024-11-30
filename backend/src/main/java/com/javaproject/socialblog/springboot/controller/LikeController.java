package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.annotation.CheckUserEnabled;
import com.javaproject.socialblog.springboot.security.service.LikeService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/likes")
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/post/{id}")
    @Operation(
            summary = "Like a post",
            description = "Allows a logged-in user with an enabled account to like a specific post by its ID.",
            tags = "Like Service"
    )
    @CheckUserEnabled
    public ResponseEntity<Void> likePost(@PathVariable String id) {
        likeService.likePost(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/post/{id}")
    @Operation(
            summary = "Unlike a post",
            description = "Allows a logged-in user with an enabled account to remove their like from a specific post by its ID.",
            tags = "Like Service"
    )
    public ResponseEntity<Void> unlikePost(@PathVariable String id) {
        likeService.unlikePost(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/comment/{id}")
    @Operation(
            summary = "Like a comment",
            description = "Allows a logged-in user with an enabled account to like a specific comment by its ID.",
            tags = "Like Service"
    )
    public ResponseEntity<Void> likeComment(@PathVariable String id) {
        likeService.likeComment(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/comment/{id}")
    @Operation(
            summary = "Unlike a comment",
            description = "Allows a logged-in user with an enabled account to remove their like from a specific comment by its ID.",
            tags = "Like Service"
    )
    public ResponseEntity<Void> unlikeComment(@PathVariable String id) {
        likeService.unlikeComment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/post/{id}-count")
    @Operation(
            summary = "Get post like count",
            description = "Retrieves the total number of likes for a specific post, identified by its ID.",
            tags = "Like Service"
    )
    public ResponseEntity<Long> getPostLikeCount(@PathVariable String id) {
        return ResponseEntity.ok(likeService.getPostLikeCount(id));
    }

    @GetMapping("/comment/{id}-count")
    @Operation(
            summary = "Get comment like count",
            description = "Retrieves the total number of likes for a specific comment, identified by its ID.",
            tags = "Like Service"
    )
    public ResponseEntity<Long> getCommentLikeCount(@PathVariable String id) {
        return ResponseEntity.ok(likeService.getCommentLikeCount(id));
    }
}
