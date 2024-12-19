package com.javaproject.socialblog.springboot.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/audio")
public class AudioController {

    @PostMapping("/generate")
    public ResponseEntity<byte[]> generateAudio(@RequestBody Map<String, String> request) {
        String text = request.get("text");

        if (text == null || text.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        String flaskUrl = "http://localhost:5002/generate-audio";

        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> body = Map.of("text", text);
            HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<byte[]> response = restTemplate.exchange(
                    flaskUrl,
                    HttpMethod.POST,
                    entity,
                    byte[].class
            );

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType("audio/wav"))
                    .body(response.getBody());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

