package com.javaproject.socialblog.springboot.security.service;

import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.security.dto.*;

import java.util.List;

public interface UserService {

    User findByUsername(String username);

    User findById(String id);

    UserResponse findByIdR(String id);

    RegistrationResponse registration(RegistrationRequest registrationRequest);

    AuthenticatedUserDto findAuthenticatedUserByUsername(String username);

    boolean verify(String verificationCode);

    boolean checkAccountEnabled(String id);

    User updateUser(UserRequest userRequest);

    User authenticateWithGoogle(String token);

    List<User> getUsers();

    List<UserPostCount> getTopAuthors();

}
