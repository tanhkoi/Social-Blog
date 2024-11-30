package com.javaproject.socialblog.springboot.repository;

import com.javaproject.socialblog.springboot.model.Follow;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface FollowRepository extends MongoRepository<Follow, String> {
    Optional<Follow> findByUserAndFollowing(String userId, String thatUserId);


}
