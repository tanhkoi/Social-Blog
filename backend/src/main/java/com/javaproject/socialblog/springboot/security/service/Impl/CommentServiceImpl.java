package com.javaproject.socialblog.springboot.security.service.Impl;

import com.javaproject.socialblog.springboot.model.Comment;
import com.javaproject.socialblog.springboot.model.LikeType;
import com.javaproject.socialblog.springboot.model.Post;
import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.repository.CommentRepository;
import com.javaproject.socialblog.springboot.repository.LikeRepository;
import com.javaproject.socialblog.springboot.repository.PostRepository;
import com.javaproject.socialblog.springboot.security.dto.CommentRequest;
import com.javaproject.socialblog.springboot.security.dto.CommentResponse;
import com.javaproject.socialblog.springboot.security.service.CommentService;
import com.javaproject.socialblog.springboot.security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    private final PostRepository postRepository;

    private final UserService userService;

    private final ModelMapper modelMapper;

    private final LikeRepository likeRepository;

    @Override
    public List<CommentResponse> getCommentsByPost(String id) {
        final List<Comment> comments = commentRepository.findByPostId(id);

        // Fetch the authenticated user's ID if logged in
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String currUserId;
        if (loggedInUser != null && loggedInUser.isAuthenticated() && !"anonymousUser".equals(loggedInUser.getPrincipal())) {
            String username = loggedInUser.getName();
            currUserId = userService.findByUsername(username).getId();
        } else {
            currUserId = null;
        }

        return comments.stream()
                .map(comment -> {
                    CommentResponse response = modelMapper.map(comment, CommentResponse.class);
                    response.setLiked(likeRepository.existsByUserIdAndContentIdAndType(currUserId, comment.getId(), LikeType.COMMENT));
                    return response;
                })
                .collect(Collectors.toList());
    }


    @Override
    public Comment createComment(CommentRequest comment, String postId) {

        Comment newComment = new Comment();

        newComment.setPostId(postId);
        newComment.setCreatedAt(new Date());
        newComment.setContent(comment.getContent());
        newComment.setLikes(new ArrayList<>());

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        User currUser = userService.findByUsername(username);
        newComment.setUser(currUser); // Set curr user

        Comment savedComment = commentRepository.save(newComment);

        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        post.getComments().add(savedComment);

        postRepository.save(post);

        return savedComment;
    }

    @Override
    public Comment updateComment(Comment comment) {
        return null;
    }

    @Override
    public void deleteComment(String id) {
        Comment comment = commentRepository.findById(id).orElseThrow();

        Post post = postRepository.findById(comment.getPostId()).orElseThrow();
        List<Comment> comments = post.getComments();

        comments.removeIf(c -> c.getId().equals(id));

        post.setComments(comments);

        commentRepository.deleteById(id);

        postRepository.save(post);
    }

    @Override
    public String getPostByCommentId(String id) {
        return commentRepository.findById(id).get().getPostId();
    }
}
