package com.javaproject.socialblog.springboot.security.service;

import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.security.dto.AuthenticatedUserDto;
import com.javaproject.socialblog.springboot.security.dto.RegistrationRequest;
import com.javaproject.socialblog.springboot.security.dto.RegistrationResponse;
import com.javaproject.socialblog.springboot.security.dto.UserRequest;

import java.util.List;

public interface UserService {

    User findByUsername(String username);

    RegistrationResponse registration(RegistrationRequest registrationRequest);

    AuthenticatedUserDto findAuthenticatedUserByUsername(String username);

    boolean verify(String verificationCode);

    boolean checkAccountEnabled(String id);

    User updateUser(UserRequest userRequest);

    User authenticateWithGoogle(String token);

    List<User> getUsers();
}
