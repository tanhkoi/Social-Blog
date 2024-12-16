package com.javaproject.socialblog.springboot.security.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {

    private String token;

    private String id;

    private String username;

    private String profilePicture;

    private boolean enabled;

    private String userRole;
}
