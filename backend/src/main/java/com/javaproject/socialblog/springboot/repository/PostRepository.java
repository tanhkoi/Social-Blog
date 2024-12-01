package com.javaproject.socialblog.springboot.repository;

import com.javaproject.socialblog.springboot.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post, String>, PagingAndSortingRepository<Post, String> {

    List<Post> findByTitleContainingIgnoreCase(String title);

    List<Post> findByTagsIn(List<String> tags);

    Page<Post> findByAuthorId(String id, Pageable pageable);

    List<Post> findByAuthorId(String id);
}
