package com.javaproject.socialblog.springboot.security.service;

import com.javaproject.socialblog.springboot.model.Comment;
import com.javaproject.socialblog.springboot.security.dto.CommentRequest;

import java.util.List;

public interface CommentService {

    List<Comment> getCommentsByPost(String id);

    Comment createComment(CommentRequest comment, String postId);

    Comment updateComment(Comment comment);

    void deleteComment(String id);
}
