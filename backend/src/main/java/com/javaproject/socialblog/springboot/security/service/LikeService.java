package com.javaproject.socialblog.springboot.security.service;

public interface LikeService {

    long likePost(String postId);

    long unlikePost(String postId);

    long likeComment(String commentId);

    long unlikeComment(String commentId);

    long getPostLikeCount(String postId);

    long getCommentLikeCount(String commentId);

    boolean checkIsLikedPost(String postId);

    boolean checkIsLikedComment(String commentId);

}
