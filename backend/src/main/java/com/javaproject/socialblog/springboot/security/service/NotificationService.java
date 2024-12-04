package com.javaproject.socialblog.springboot.security.service;

import com.javaproject.socialblog.springboot.model.Notification;

import java.util.List;

public interface NotificationService {
    Notification createNotification(String userId, String title, String message);

    void createNewPostNotification(String id, String userId, String title, String message);

    List<Notification> getNotifications(boolean unreadOnly);

    Notification markAsRead(String notificationId);

    void deleteNotification(String notificationId);
}
