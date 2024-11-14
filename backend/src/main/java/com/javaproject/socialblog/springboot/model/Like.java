package com.javaproject.socialblog.springboot.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "likes")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String userId;

    private String contentId; // This can represent either a postId or commentId

    private LikeType type; // Enum to specify if it's a POST or COMMENT like

    private LocalDateTime likedAt = LocalDateTime.now();

    // Constructor to initialize Like with type
    public Like(String userId, String contentId, LikeType type) {
        this.userId = userId;
        this.contentId = contentId;
        this.type = type;
        this.likedAt = LocalDateTime.now();
    }

}
