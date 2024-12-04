package com.javaproject.socialblog.springboot.security.service.Impl;

import com.javaproject.socialblog.springboot.model.Notification;
import com.javaproject.socialblog.springboot.repository.NotificationRepository;
import com.javaproject.socialblog.springboot.security.service.NotificationService;
import com.javaproject.socialblog.springboot.security.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    private final UserService userService;

    @Override
    public Notification createNotification(String userId, String title, String message) {
        Notification notification = new Notification(userId, title, message);
        return notificationRepository.save(notification);
    }

    @Override
    public void createNewPostNotification(String id, String userId, String title, String message) {
        Notification notification = new Notification(userId, title, message);
        notification.setId(id);
        notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getNotifications(boolean unreadOnly) {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String userId;
        if (loggedInUser != null && loggedInUser.isAuthenticated() && !"anonymousUser".equals(loggedInUser.getPrincipal())) {
            String username = loggedInUser.getName();
            userId = userService.findByUsername(username).getId();
        } else {
            throw new RuntimeException("User not found");
        }

        if (unreadOnly) {
            return notificationRepository.findByUserIdAndRead(userId, false);
        }
        return notificationRepository.findByUserId(userId);
    }

    @Override
    public Notification markAsRead(String notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setRead(true);
        return notificationRepository.save(notification);
    }

    @Override
    public void deleteNotification(String notificationId) {
        notificationRepository.deleteById(notificationId);
    }
}
