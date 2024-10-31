package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.security.service.CloudinaryService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cloudinary/upload")
public class UploadImageController {

    private final CloudinaryService cloudinaryService;

    @PostMapping
    @Operation(tags = "Upload Service")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) {

        String data = cloudinaryService.uploadImage(file);
        return ResponseEntity.ok(data);
    }

}
