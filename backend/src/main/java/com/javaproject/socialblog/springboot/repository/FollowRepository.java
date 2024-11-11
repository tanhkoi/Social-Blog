package com.javaproject.socialblog.springboot.repository;

import com.javaproject.socialblog.springboot.model.Follow;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FollowRepository extends MongoRepository<Follow, String> {
}
