package com.javaproject.socialblog.springboot.repository;

import com.javaproject.socialblog.springboot.model.Follow;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends MongoRepository<Follow, String> {
}
