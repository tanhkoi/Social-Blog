package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.security.dto.RegistrationResponse;
import com.javaproject.socialblog.springboot.security.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.ResponseUtil;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/verify")
public class VerificationController {

    private final UserService userService;

    @GetMapping
    @Operation(tags = "Verification Service", description = "You can verify account by this endpoint.")
    public ResponseEntity<String>  verificationRequest(@Param("code") String code){
        if (userService.verify(code)){
            return ResponseEntity.ok("Verify Success");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Verification failed: Code not found.");
        }
    }

}
