package com.javaproject.socialblog.springboot.security.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

public interface LikeService {

    void likePost(String userId, String postId);

    void unlikePost(String userId, String postId);

    void likeComment(String userId, String commentId);

    void unlikeComment(String userId, String commentId);

    long getPostLikeCount(String postId);

    long getCommentLikeCount(String commentId);

}
