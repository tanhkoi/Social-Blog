package com.javaproject.socialblog.springboot.controller;

import com.javaproject.socialblog.springboot.model.Notification;
import com.javaproject.socialblog.springboot.security.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

//    @Operation(
//            summary = "Create a notification",
//            description = "Add a new notification for a user.",
//            tags = "Notification Service"
//    )
//    @PostMapping
//    public ResponseEntity<Notification> createNotification(@RequestParam String userId,
//                                                           @RequestParam String title,
//                                                           @RequestParam String message) {
//        Notification notification = notificationService.createNotification(userId, title, message);
//        return ResponseEntity.ok(notification);
//    }

    @Operation(
            summary = "Get user notifications",
            description = "Get all notifications for a user. Use `unreadOnly=true` to get only unread notifications.",
            tags = "Notification Service"
    )
    @GetMapping
    public ResponseEntity<List<Notification>> getNotifications(
                                                               @RequestParam(defaultValue = "false") boolean unreadOnly) {
        List<Notification> notifications = notificationService.getNotifications(unreadOnly);
        return ResponseEntity.ok(notifications);
    }

    @Operation(
            summary = "Mark a notification as read",
            description = "Set a notification's status to read.",
            tags = "Notification Service"
    )
    @PatchMapping("/{id}/read")
    public ResponseEntity<Notification> markAsRead(@PathVariable String id) {
        Notification notification = notificationService.markAsRead(id);
        return ResponseEntity.ok(notification);
    }

    @Operation(
            summary = "Delete a notification",
            description = "Remove a notification by its ID.",
            tags = "Notification Service"
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable String id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }
}
