package com.javaproject.socialblog.springboot.security.service.Impl;

import com.javaproject.socialblog.springboot.model.Post;
import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.repository.PostRepository;
import com.javaproject.socialblog.springboot.security.service.PostService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.javaproject.socialblog.springboot.security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    private final UserService userService;

    @Override
    public List<Post> getAllPosts() {

        return postRepository.findAll();
    }

    @Override
    public Optional<Post> getPostById(String id) {

        return postRepository.findById(id);
    }

    @Override
    public Post createPost(Post post) {

        post.setCreatedAt(new Date());  // Sets the created date to now
        post.setComments(new ArrayList<>()); // Just init the post, so it doesn't have any comments and interactions yet
        post.setInteractions(new ArrayList<>());

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        User currUser = userService.findByUsername(username);
        post.setAuthorId(currUser.getId()); // Set curr user

        return postRepository.save(post);
    }

    @Override
    public Post updatePost(String id, Post postDetails) {

        return postRepository.findById(id).map(post -> {
            post.setTitle(postDetails.getTitle());
            post.setCategory(postDetails.getCategory());
            post.setTags(postDetails.getTags());
            post.setContent(postDetails.getContent());
            post.setAuthorId(postDetails.getAuthorId());
            // TODO: need change the logic update of comment and interaction
            post.setComments(postDetails.getComments());
            post.setInteractions(postDetails.getInteractions());
            //
            post.setCreatedAt(new Date());  // Sets the updated date to now
            return postRepository.save(post);
        }).orElseThrow(() -> new RuntimeException("Post not found with id " + id));
    }

    @Override
    public void deletePost(String id) {

        postRepository.deleteById(id);
    }

}

