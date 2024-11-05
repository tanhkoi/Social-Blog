package com.javaproject.socialblog.springboot.security.service;

import com.javaproject.socialblog.springboot.model.Comment;

import java.util.List;

public interface CommentService {

    List<Comment> getCommentsByPost(String id);

    Comment createComment(Comment comment, String postId);

    Comment updateComment(Comment comment);

    void deleteComment(String id);
}
