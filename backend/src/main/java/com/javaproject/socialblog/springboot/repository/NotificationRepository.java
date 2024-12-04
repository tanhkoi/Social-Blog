package com.javaproject.socialblog.springboot.repository;

import com.javaproject.socialblog.springboot.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByUserIdAndRead(String userId, boolean read);

    List<Notification> findByUserId(String userId);
}
