package com.javaproject.socialblog.springboot.security.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserResponse {

    private String id;

    private String name;

    private String username;

    private String email;

    private String profilePicture;

    private long followerNumber = 0; // number of followers

    private long followingNumber = 0; // number of following

    private boolean amIFollowing = false;

}
