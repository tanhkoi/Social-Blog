package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.security.service.CloudinaryService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

        final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

        if (file.getSize() > MAX_FILE_SIZE) {
            return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                    .body("File size exceeds the maximum limit of 2 MB.");
        }

        String imageUrl = cloudinaryService.uploadImage(file);
        return ResponseEntity.ok(imageUrl);
    }

}
