package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.security.dto.UserPostCount;
import com.javaproject.socialblog.springboot.security.dto.UserRequest;
import com.javaproject.socialblog.springboot.security.dto.UserResponse;
import com.javaproject.socialblog.springboot.security.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @GetMapping("/me")
    @Operation(
            summary = "Get authenticated user details",
            description = "Retrieves the details of the currently authenticated user based on the logged-in session.",
            tags = "User Service"
    )
    public ResponseEntity<User> authenticatedUser() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        User currUser = userService.findByUsername(username);
        return ResponseEntity.ok(currUser);
    }

    @GetMapping("/{id}")
    @Operation(
            summary = "Get user by id",
            description = "Retrieves the details of the user with id.",
            tags = "User Service"
    )
    public ResponseEntity<UserResponse> getUser(@PathVariable String id) {
        UserResponse user = userService.findByIdR(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping
    @Operation(
            summary = "Update user details",
            description = "Allows an authenticated user to update their personal details. The updated information is passed in the request body.",
            tags = "User Service"
    )
    public ResponseEntity<User> updateUser(@RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(userService.updateUser(userRequest));
    }

    @GetMapping("/most-posts")
    @Operation(
            summary = "Get user with most posts",
            description = "Fetches the details of the user with the highest number of posts.",
            tags = "User Service"
    )
    public ResponseEntity<List<UserPostCount>> getUserByMostPost() {
        return ResponseEntity.ok(userService.getTopAuthors());
    }
}
