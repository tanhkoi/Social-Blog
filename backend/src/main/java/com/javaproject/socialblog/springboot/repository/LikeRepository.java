package com.javaproject.socialblog.springboot.repository;

import com.javaproject.socialblog.springboot.model.Like;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LikeRepository extends MongoRepository<Like, String> {

    List<Like> findByPostId(String postId);

    List<Like> findByCommentId(String commentId);

    long countByPostId(String postId);

    long countByCommentId(String commentId);

    boolean existsByUserIdAndPostId(String userId, String postId);

    boolean existsByUserIdAndCommentId(String userId, String commentId);

    void deleteByUserIdAndPostId(String userId, String postId);

    void deleteByUserIdAndCommentId(String userId, String commentId);

}
