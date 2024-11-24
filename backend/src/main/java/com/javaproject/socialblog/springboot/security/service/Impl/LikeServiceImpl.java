package com.javaproject.socialblog.springboot.security.service.Impl;

import com.javaproject.socialblog.springboot.model.*;
import com.javaproject.socialblog.springboot.repository.CommentRepository;
import com.javaproject.socialblog.springboot.repository.LikeRepository;
import com.javaproject.socialblog.springboot.repository.PostRepository;
import com.javaproject.socialblog.springboot.security.service.LikeService;
import com.javaproject.socialblog.springboot.security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {


    private final LikeRepository likeRepository;

    private final PostRepository postRepository;

    private final CommentRepository commentRepository;

    private final UserService userService;

    @Override
    public long likePost(String postId) {

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();

        User currUser = userService.findByUsername(username);

        if (!likeRepository.existsByUserIdAndContentIdAndType(currUser.getId(), postId, LikeType.POST)) {

            Like like = new Like(currUser.getId(), postId, LikeType.POST);
            likeRepository.save(like);

            Post post = postRepository.findById(postId).orElseThrow();
            post.getLikes().add(like);

            postRepository.save(post);
        }

        return this.getPostLikeCount(postId);
    }

    @Override
    public long unlikePost(String postId) {

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();

        User currUser = userService.findByUsername(username);

        likeRepository.deleteByUserIdAndContentIdAndType(currUser.getId(), postId, LikeType.POST);

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        post.getLikes().removeIf(like -> like.getUserId().equals(currUser.getId()));

        postRepository.save(post);

        return this.getPostLikeCount(postId);

    }

    @Override
    public long likeComment(String commentId) {

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();

        User currUser = userService.findByUsername(username);

        if (!likeRepository.existsByUserIdAndContentIdAndType(currUser.getId(), commentId, LikeType.COMMENT)) {

            Like like = new Like(currUser.getId(), commentId, LikeType.COMMENT);
            likeRepository.save(like);

            Comment comment = commentRepository.findById(commentId).orElseThrow();
            comment.getLikes().add(like);

            commentRepository.save(comment);

            Post post = postRepository.findById(comment.getPostId()).orElseThrow();
            List<Comment> comments = post.getComments();

            for (int i = 0; i < comments.size(); i++) {
                if (comments.get(i).getId().equals(comment.getId())) {
                    comments.set(i, comment);
                    break;
                }
            }

            postRepository.save(post);
        }

        return this.getCommentLikeCount(commentId);

    }

    @Override
    public long unlikeComment(String commentId) {

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();

        User currUser = userService.findByUsername(username);

        likeRepository.deleteByUserIdAndContentIdAndType(currUser.getId(), commentId, LikeType.COMMENT);

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        comment.getLikes().removeIf(like -> like.getUserId().equals(currUser.getId()));

        Post post = postRepository.findById(comment.getPostId()).orElseThrow();
        List<Comment> comments = post.getComments();

        commentRepository.save(comment);

        for (int i = 0; i < comments.size(); i++) {
            if (comments.get(i).getId().equals(comment.getId())) {
                comments.set(i, comment);
                break;
            }
        }

        postRepository.save(post);

        return this.getCommentLikeCount(commentId);

    }

    @Override
    public long getPostLikeCount(String postId) {

        return likeRepository.countByContentIdAndType(postId, LikeType.POST);

    }

    @Override
    public long getCommentLikeCount(String commentId) {

        return likeRepository.countByContentIdAndType(commentId, LikeType.COMMENT);

    }

    @Override
    public boolean checkIsLikedPost(String postId) {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        String currUserId = userService.findByUsername(username).getId();

        Like like = likeRepository.findAll().stream()
                .filter(l -> l.getUserId().equals(currUserId)
                        && l.getType().equals(LikeType.POST)
                        && l.getContentId().equals(postId)
                )
                .findFirst() // Extract the first match
                .orElse(null); // Return null if no match is found

        return like != null;
    }

    @Override
    public boolean checkIsLikedComment(String commentId) {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        String currUserId = userService.findByUsername(username).getId();

        Like like = likeRepository.findAll().stream()
                .filter(l -> l.getUserId().equals(currUserId)
                        && l.getType().equals(LikeType.POST)
                        && l.getContentId().equals(commentId)
                )
                .findFirst() // Extract the first match
                .orElse(null); // Return null if no match is found

        return like != null;
    }

}
