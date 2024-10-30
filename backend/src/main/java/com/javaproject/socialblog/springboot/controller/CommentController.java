package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.model.Comment;
import com.javaproject.socialblog.springboot.repository.CommentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentRepository commentRepository;

    // get all
    @GetMapping("/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable String postId) {

        return ResponseEntity.ok(commentRepository.findByPostId(postId));
    }

    // create
    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {

        comment.setCreatedAt(new Date());

        return ResponseEntity.ok(commentRepository.save(comment));
    }

    // delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable String id) {

        commentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
