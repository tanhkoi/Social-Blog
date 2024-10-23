package com.javaproject.socialblog.springboot.repository;

import com.javaproject.socialblog.springboot.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment, String> {
}
