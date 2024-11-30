package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.annotation.CheckUserEnabled;
import com.javaproject.socialblog.springboot.model.Comment;
import com.javaproject.socialblog.springboot.security.dto.CommentRequest;
import com.javaproject.socialblog.springboot.security.dto.CommentResponse;
import com.javaproject.socialblog.springboot.security.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    // Get comments by post ID
    @GetMapping("/{id}")
    @Operation(
            summary = "Get comments for a post",
            description = "Retrieve a list of comments associated with a specific post, identified by the post ID.",
            tags = "Comment Service"
    )
    public ResponseEntity<List<CommentResponse>> getCommentsByPost(@PathVariable String id) {
        return ResponseEntity.ok(commentService.getCommentsByPost(id));
    }

    // Create a comment for a post
    @PostMapping("/{id}")
    @Operation(
            summary = "Create a comment for a post",
            description = "Allows a logged-in user with an enabled account to add a comment to a specific post, identified by the post ID.",
            tags = "Comment Service"
    )
    @CheckUserEnabled
    public ResponseEntity<Comment> createComment(@PathVariable String id, @RequestBody CommentRequest comment) {
        return ResponseEntity.ok(commentService.createComment(comment, id));
    }

    // Delete a comment
    @DeleteMapping("/{id}")
    @Operation(
            summary = "Delete a comment",
            description = "Allows a logged-in user with an enabled account to delete a specific comment by its ID.",
            tags = "Comment Service"
    )
    @CheckUserEnabled
    public ResponseEntity<Void> deleteComment(@PathVariable String id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}
