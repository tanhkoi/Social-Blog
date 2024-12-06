package com.javaproject.socialblog.springboot.security.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserPostCount {
    private String id; // User ID

    private long postCount; // Number of posts

    private List<UserResponse> userDetails; // Optional: Populate user details if needed
}
