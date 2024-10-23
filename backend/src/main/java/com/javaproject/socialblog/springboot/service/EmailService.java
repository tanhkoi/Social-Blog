package com.javaproject.socialblog.springboot.service;

import com.javaproject.socialblog.springboot.model.User;

public interface EmailService {

    void sendVerificationEmail(User user);

}
