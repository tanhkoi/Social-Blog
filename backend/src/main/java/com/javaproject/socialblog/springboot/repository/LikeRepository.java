package com.javaproject.socialblog.springboot.repository;

import com.javaproject.socialblog.springboot.model.Like;
import com.javaproject.socialblog.springboot.model.LikeType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LikeRepository extends MongoRepository<Like, String> {

    // Find likes by contentId and LikeType (e.g., POST or COMMENT)
    List<Like> findByContentIdAndType(String contentId, LikeType type);

    // Count likes by contentId and LikeType
    long countByContentIdAndType(String contentId, LikeType type);

    // Check if a like exists for a specific user, contentId, and LikeType
    boolean existsByUserIdAndContentIdAndType(String userId, String contentId, LikeType type);

    // Delete a like by userId, contentId, and LikeType
    void deleteByUserIdAndContentIdAndType(String userId, String contentId, LikeType type);

}
