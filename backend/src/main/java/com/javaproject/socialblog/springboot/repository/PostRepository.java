package com.javaproject.socialblog.springboot.repository;

import com.javaproject.socialblog.springboot.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {

    List<Post> findByTitleContainingIgnoreCase(String title);

    List<Post> findByTagsIn(List<String> tags);

    List<Post> findByContentContainingIgnoreCase(String content);

}
