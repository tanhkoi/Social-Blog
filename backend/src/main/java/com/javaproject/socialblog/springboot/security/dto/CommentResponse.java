package com.javaproject.socialblog.springboot.security.dto;

import com.javaproject.socialblog.springboot.model.Like;
import com.javaproject.socialblog.springboot.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CommentResponse {

    private String id;

    private String postId;

    @DBRef
    private User user;

    private String content;

    private Date createdAt;

    private List<Like> likes;

    private boolean isLiked = false;

}
