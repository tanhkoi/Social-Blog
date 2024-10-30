package com.javaproject.socialblog.springboot.security.service.Impl;

import com.javaproject.socialblog.springboot.model.Post;
import com.javaproject.socialblog.springboot.repository.PostRepository;
import com.javaproject.socialblog.springboot.security.service.PostService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

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
        return postRepository.save(post);
    }

    @Override
    public Post updatePost(String id, Post postDetails) {
        return postRepository.findById(id).map(post -> {
            post.setTitle(postDetails.getTitle());
            post.setCategory(postDetails.getCategory());
            post.setTags(postDetails.getTags());
            post.setContent(postDetails.getContent());
            post.setAuthor(postDetails.getAuthor());
            post.setComments(postDetails.getComments());
            post.setInteractions(postDetails.getInteractions());
            post.setCreatedAt(new Date());  // Sets the updated date to now
            return postRepository.save(post);
        }).orElseThrow(() -> new RuntimeException("Post not found with id " + id));
    }

    @Override
    public void deletePost(String id) {
        postRepository.deleteById(id);
    }

}

