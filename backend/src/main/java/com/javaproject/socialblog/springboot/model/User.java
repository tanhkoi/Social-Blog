package com.javaproject.socialblog.springboot.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String name;

    private String username;

    private String password;

    private String email;

    private String profilePicture;

    private String verificationCode;

    private boolean enabled;

    @DBRef
    private Set<Follow> followers = new HashSet<>();  // This is the user who follows you.

    @DBRef
    private Set<Follow> following = new HashSet<>();  // This is the user you follow.

    @Enumerated(EnumType.STRING)
    private UserRole userRole;

}
