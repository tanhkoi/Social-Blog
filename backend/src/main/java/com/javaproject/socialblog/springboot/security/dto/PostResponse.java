package com.javaproject.socialblog.springboot.security.dto;

import com.javaproject.socialblog.springboot.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class PostResponse {

    private String id;

    private String title;

    private String category;

    private String imageCloudUrl;

    private Date createdAt;

    @DBRef
    private User author;

    private long likeCnt;

    private boolean isLiked = false;

    private boolean isSaved = false;

}
