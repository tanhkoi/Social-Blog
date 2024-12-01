package com.javaproject.socialblog.springboot.repository;

import com.javaproject.socialblog.springboot.model.Like;
import com.javaproject.socialblog.springboot.model.LikeType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LikeRepository extends MongoRepository<Like, String> {

    List<Like> findByContentIdAndType(String contentId, LikeType type);

    long countByContentIdAndType(String contentId, LikeType type);

    boolean existsByUserIdAndContentIdAndType(String userId, String contentId, LikeType type);

    void deleteByUserIdAndContentIdAndType(String userId, String contentId, LikeType type);

}
