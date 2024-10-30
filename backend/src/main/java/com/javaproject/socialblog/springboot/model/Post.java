package com.javaproject.socialblog.springboot.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String title;

    private String category;

    private List<String> tags;

    private String content;

    private Date createdAt;

    @DBRef
    private User author;

    @DBRef
    private List<Comment> comments;

    @DBRef
    private List<Interaction> interactions;

}
