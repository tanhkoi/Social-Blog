package com.javaproject.socialblog.springboot.security.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class PostResponse {

    private String id;

    private String title;

    private String imageCloudUrl;

    private Date createdAt;

    private long likeCnt;

    private boolean isLiked = false;

    private boolean isSaved = false;

}
