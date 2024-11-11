package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.model.Follow;
import com.javaproject.socialblog.springboot.security.service.FollowService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/follows")
public class FollowController {

    private final FollowService followService;

    @GetMapping("/{id}/followers")
    @Operation(tags = "Follow Service")
    @PreAuthorize("hasRole('USER') and #user.enabled")
    public ResponseEntity<Set<Follow>> getFollowers(@PathVariable String id) {

        return ResponseEntity.ok(followService.getFollowers(id) != null ? followService.getFollowers(id) : null);

    }

    @GetMapping("/{id}/following")
    @Operation(tags = "Follow Service")
    @PreAuthorize("hasRole('USER') and #user.enabled")
    public ResponseEntity<Set<Follow>> getFollowing(@PathVariable String id) {

        return ResponseEntity.ok(followService.getFollowing(id));

    }

    @PostMapping("/{id1}/{id2}")
    @Operation(tags = "Follow Service")
    @PreAuthorize("hasRole('USER') and #user.enabled")
    public ResponseEntity<Void> getFollowing(@PathVariable String id1, @PathVariable String id2) {

        followService.followUser(id1, id2);

        return ResponseEntity.noContent().build();

    }

}
