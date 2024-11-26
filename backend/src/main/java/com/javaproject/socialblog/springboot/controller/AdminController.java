package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.security.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;

    @GetMapping("/users")
    @Operation(tags = "Admin Service")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getUsers();

        return ResponseEntity.ok(users);
    }
}
