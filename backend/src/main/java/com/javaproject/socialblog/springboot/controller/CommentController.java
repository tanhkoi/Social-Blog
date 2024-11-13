package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.model.Comment;
import com.javaproject.socialblog.springboot.security.dto.CommentRequest;
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

    // get by post id
    @GetMapping("/{postId}")
    @Operation(tags = "Comment Service")
    public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable String postId) {

        return ResponseEntity.ok(commentService.getCommentsByPost(postId));
    }

    // create
    @PostMapping("/{postId}")
    @Operation(tags = "Comment Service")
//    @PreAuthorize("hasRole('USER') and #user.enabled")
    public ResponseEntity<Comment> createComment(@PathVariable String postId, @RequestBody CommentRequest comment) {

        return ResponseEntity.ok(commentService.createComment(comment, postId));
    }

    // delete
    @DeleteMapping("/{id}")
    @Operation(tags = "Comment Service")
//    @PreAuthorize("hasRole('USER') and #user.enabled")
    public ResponseEntity<Void> deleteComment(@PathVariable String id) {

        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }

}
