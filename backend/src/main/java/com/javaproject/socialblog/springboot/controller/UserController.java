package com.javaproject.socialblog.springboot.controller;


import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.security.dto.UserRequest;
import com.javaproject.socialblog.springboot.security.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    @Operation(tags = "User Service")
    public ResponseEntity<User> authenticatedUser() {

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        User currUser = userService.findByUsername(username);

        return ResponseEntity.ok(currUser);

    }

    @PutMapping()
    @Operation(tags = "User Service")
    public ResponseEntity<User> updateUser(@RequestBody UserRequest userRequest){

        return ResponseEntity.ok(userService.updateUser(userRequest));
    }
}
