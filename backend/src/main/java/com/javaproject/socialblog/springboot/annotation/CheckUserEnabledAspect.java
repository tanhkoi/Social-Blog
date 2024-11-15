package com.javaproject.socialblog.springboot.annotation;

import com.javaproject.socialblog.springboot.exceptions.UserNotEnabledException;
import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.security.service.UserService;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class CheckUserEnabledAspect {

    private final UserService userService;

    @Autowired
    public CheckUserEnabledAspect(UserService userService) {
        this.userService = userService;
    }

    @Before("@annotation(CheckUserEnabled)")
    public void checkUserEnabled(JoinPoint joinPoint) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UserNotEnabledException("User is not authenticated");
        }

        String username = authentication.getName();
        User user = userService.findByUsername(username); // Retrieve the user from the database

        if (user == null || !user.isEnabled()) {
            throw new UserNotEnabledException("User is not enabled");
        }

        // If enabled, the method proceeds as normal
    }
}
