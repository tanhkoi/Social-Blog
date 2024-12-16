package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.security.dto.LoginResponse;
import com.javaproject.socialblog.springboot.security.jwt.JwtTokenManager;
import com.javaproject.socialblog.springboot.security.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    private final JwtTokenManager jwtTokenManager;

    @PostMapping("/google")
    public ResponseEntity<?> authenticateWithGoogle(@RequestBody Map<String, String> request) {
        String token = request.get("token");

        User user = userService.authenticateWithGoogle(token);

        LoginResponse loginResponse = new LoginResponse(jwtTokenManager.generateToken(user),
                user.getId(),
                user.getUsername(),
                user.getProfilePicture(),
                user.isEnabled(),
                user.getUserRole().toString());

        return ResponseEntity.ok(loginResponse);
    }

}

