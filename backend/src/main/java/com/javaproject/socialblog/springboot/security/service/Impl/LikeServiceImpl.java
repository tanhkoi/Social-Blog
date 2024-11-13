package com.javaproject.socialblog.springboot.security.service.Impl;

import com.javaproject.socialblog.springboot.repository.LikeRepository;
import com.javaproject.socialblog.springboot.security.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;

    @Override
    public void likePost(String userId, String postId) {

//        if (!likeRepository.existsByUserIdAndPostId(userId, postId)) {
//
//            likeRepository.save(new Like(userId, postId, LikeType.POST));
//        }

    }

    @Override
    public void unlikePost(String userId, String postId) {

//        likeRepository.deleteByUserIdAndPostId(userId, postId);

    }

    @Override
    public void likeComment(String userId, String commentId) {

//        if (!likeRepository.existsByUserIdAndCommentId(userId, commentId)) {
//
//            likeRepository.save(new Like(userId, commentId, LikeType.COMMENT));
//        }

    }

    @Override
    public void unlikeComment(String userId, String commentId) {

//        likeRepository.deleteByUserIdAndCommentId(userId, commentId);

    }

    @Override
    public long getPostLikeCount(String postId) {

//        return likeRepository.countByPostId(postId);
        return 0;
    }

    @Override
    public long getCommentLikeCount(String commentId) {

//        return likeRepository.countByCommentId(commentId);
        return 0;
    }

}
