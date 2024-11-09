package com.javaproject.socialblog.springboot.repository;

import com.javaproject.socialblog.springboot.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> {
}
