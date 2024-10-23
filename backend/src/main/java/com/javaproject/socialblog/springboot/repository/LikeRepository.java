package com.javaproject.socialblog.springboot.repository;

import com.javaproject.socialblog.springboot.model.Like;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LikeRepository extends MongoRepository<Like, String> {
}
