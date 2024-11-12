package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.security.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/likes")
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/post/{postId}")
    public ResponseEntity<Void> likePost(@RequestParam String userId, @PathVariable String postId) {

        likeService.likePost(userId, postId);

        return ResponseEntity.noContent().build();

    }

    @DeleteMapping("/post/{postId}")
    public ResponseEntity<Void> unlikePost(@RequestParam String userId, @PathVariable String postId) {

        likeService.unlikePost(userId, postId);

        return ResponseEntity.noContent().build();

    }

    @PostMapping("/comment/{commentId}")
    public ResponseEntity<Void> likeComment(@RequestParam String userId, @PathVariable String commentId) {

        likeService.likeComment(userId, commentId);

        return ResponseEntity.noContent().build();

    }

    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<Void> unlikeComment(@RequestParam String userId, @PathVariable String commentId) {

        likeService.unlikeComment(userId, commentId);

        return ResponseEntity.noContent().build();

    }

    @GetMapping("/post/{postId}/count")
    public ResponseEntity<Long> getPostLikeCount(@PathVariable String postId) {

        return ResponseEntity.ok(likeService.getPostLikeCount(postId));

    }

    @GetMapping("/comment/{commentId}/count")
    public ResponseEntity<Long> getCommentLikeCount(@PathVariable String commentId) {

        return ResponseEntity.ok(likeService.getCommentLikeCount(commentId));

    }

}
