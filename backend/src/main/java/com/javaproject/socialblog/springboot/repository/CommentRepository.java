package com.javaproject.socialblog.springboot.repository;

import com.javaproject.socialblog.springboot.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByPostId(String postId);
}
