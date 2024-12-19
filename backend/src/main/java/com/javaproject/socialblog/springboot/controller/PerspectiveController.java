package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.model.ReportItem;
import com.javaproject.socialblog.springboot.repository.ReportItemRepository;
import com.javaproject.socialblog.springboot.security.service.CommentService;
import com.javaproject.socialblog.springboot.security.service.NotificationService;
import com.javaproject.socialblog.springboot.security.service.PostService;
import com.javaproject.socialblog.springboot.security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/perspective")
public class PerspectiveController {

    private final UserService userService;

    private final PostService postService;

    private final NotificationService notificationService;

    private final CommentService commentService;

    private final ReportItemRepository reportItemRepository;

    public String getCurrentUserId() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        if (loggedInUser != null && loggedInUser.isAuthenticated() && !"anonymousUser".equals(loggedInUser.getPrincipal())) {
            String username = loggedInUser.getName();
            return userService.findByUsername(username).getId();
        } else {
            return null;
        }
    }

    public void senDeleteNotificationToUser(String userid, String type) {
        notificationService.createNotification(userid, type + " deleted", "Your " + type + " is consider harmful and inappropriate.");
    }

    public void sendNotificationToAdmin(String type, String id, double percentToxic) {
        System.out.println(type + id + percentToxic);
        String userid;
        if (percentToxic >= 70) {
            if (Objects.equals(type, "Post")) {
                 userid= postService.deletePostR(id);
                senDeleteNotificationToUser(userid, "Post");
            } else if (Objects.equals(type, "Com")) {
                userid = commentService.deleteCommentR(id);
                senDeleteNotificationToUser(userid, "Comment");
            }
        } else {
            ReportItem reportItem = new ReportItem();
            reportItem.setContentId(id);
            reportItem.setType(type);
            reportItem.setPercentToxic(percentToxic);
            reportItem.setUserReportId(getCurrentUserId());
            reportItemRepository.save(reportItem);
        }
    }

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyzeComment(@RequestBody Map<String, String> request) {
        String text = request.get("text");
        String type = request.get("type");
        String id = request.get("id");

        if (text == null || text.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Text is required"));
        }

        String flaskUrl = "http://localhost:5001/api/perspective/analyze";

        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> body = Map.of("text", text);
            HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                    flaskUrl,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> responseBody = response.getBody();

                // Navigate to the value field inside "attributeScores" -> "TOXICITY" -> "summaryScore"
                Map<String, Object> attributeScores = (Map<String, Object>) responseBody.get("attributeScores");
                Map<String, Object> toxicity = (Map<String, Object>) attributeScores.get("TOXICITY");
                Map<String, Object> summaryScore = (Map<String, Object>) toxicity.get("summaryScore");

                Double value = (Double) summaryScore.get("value");

                sendNotificationToAdmin(type, id, value * 100);
                // Return the extracted value or use it in further processing
                return ResponseEntity.ok(Map.of("toxicityValue", value));
            }


            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Unexpected error occurred"));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }
}
