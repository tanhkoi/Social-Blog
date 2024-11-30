package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.annotation.CheckUserEnabled;
import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.security.service.FollowService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/follows")
public class FollowController {

    private final FollowService followService;

    @PostMapping("/{id}")
    @CheckUserEnabled
    @Operation(
            summary = "Follow a user",
            description = "Allows the currently logged-in user to follow another user by their ID.",
            tags = "Follow Service"
    )
    public ResponseEntity<String> followUser(@PathVariable String id) {
        if (followService.followUser(id))
            return ResponseEntity.ok("You are now following the user with ID: " + id);
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Can't follow yourself");

    }

    @DeleteMapping("/{id}")
    @CheckUserEnabled
    @Operation(
            summary = "Unfollow a user",
            description = "Allows the currently logged-in user to unfollow another user by their ID.",
            tags = "Follow Service"
    )
    public ResponseEntity<String> unfollowUser(@PathVariable String id) {
        followService.unfollowUser(id);

        return ResponseEntity.ok("You have unfollowed the user with ID: " + id);
    }

    @GetMapping("/my-followers")
    @CheckUserEnabled
    @Operation(
            summary = "Get my followers",
            description = "Retrieves the list of users who are following the currently logged-in user.",
            tags = "Follow Service"
    )
    public ResponseEntity<Set<User>> getMyFollowers() {
        Set<User> followers = followService.getMyFollowers();

        return ResponseEntity.ok(followers);
    }

    @GetMapping("/my-following")
    @CheckUserEnabled
    @Operation(
            summary = "Get my following",
            description = "Retrieves the list of users that the currently logged-in user is following.",
            tags = "Follow Service"
    )
    public ResponseEntity<Set<User>> getMyFollowing() {
        Set<User> following = followService.getMyFollowing();

        return ResponseEntity.ok(following);
    }

    @GetMapping("/{id}/followers")
    @Operation(
            summary = "Get followers of a user",
            description = "Retrieves the list of followers for a specific user by their ID.",
            tags = "Follow Service"
    )
    public ResponseEntity<Set<User>> getFollowers(@PathVariable String id) {
        Set<User> followers = followService.getFollowers(id);

        return ResponseEntity.ok(followers);
    }

    @GetMapping("/{id}/following")
    @Operation(
            summary = "Get following of a user",
            description = "Retrieves the list of users that a specific user is following by their ID.",
            tags = "Follow Service"
    )
    public ResponseEntity<Set<User>> getFollowing(@PathVariable String id) {
        Set<User> following = followService.getFollowing(id);

        return ResponseEntity.ok(following);
    }

}
