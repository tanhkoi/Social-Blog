package com.javaproject.socialblog.springboot.security.service.Impl;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.model.UserRole;
import com.javaproject.socialblog.springboot.repository.UserRepository;
import com.javaproject.socialblog.springboot.security.dto.*;
import com.javaproject.socialblog.springboot.security.mapper.UserMapper;
import com.javaproject.socialblog.springboot.security.service.EmailService;
import com.javaproject.socialblog.springboot.security.service.UserService;
import com.javaproject.socialblog.springboot.service.UserValidationService;
import com.javaproject.socialblog.springboot.utils.GeneralMessageAccessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.utility.RandomString;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final String REGISTRATION_SUCCESSFUL = "registration_successful";

    @Value("${google.clientId}")
    private String clientId;

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final UserValidationService userValidationService;

    private final GeneralMessageAccessor generalMessageAccessor;

    private final EmailService emailService;

    private final ModelMapper modelMapper;

    @Override
    public User findByUsername(String username) {

        return userRepository.findByUsername(username);
    }

    @Override
    public User findById(String id) {

        return userRepository.findById(id).orElseThrow();
    }

    @Override
    public UserResponse findByIdR(String id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        UserResponse userResponse = new UserResponse();

        modelMapper.map(user, userResponse);
        userResponse.setFollowerNumber(user.getFollowers().size()); // Number of followers
        userResponse.setFollowingNumber(user.getFollowing().size()); // Number of following

        // Check logged user is following user with id or not
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();

        User currUser = this.findByUsername(username);
        if (currUser != null)
            userResponse.setAmIFollowing(user.getFollowers().stream()
                    .anyMatch(follower -> follower.getId().equals(currUser.getId())));
        else
            userResponse.setAmIFollowing(false);

        return userResponse;
    }

    @Override
    public RegistrationResponse registration(RegistrationRequest registrationRequest) {

        userValidationService.validateUser(registrationRequest);

        final User user = UserMapper.INSTANCE.convertToUser(registrationRequest);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setUserRole(UserRole.USER);
        user.setProfilePicture("https://img.freepik.com/premium-psd/3d-male-cute-cartoon-character-avatar-isolated-illustration_530669-1708.jpg");

        String randomCode = RandomString.make(64);
        user.setVerificationCode(randomCode);
        user.setEnabled(false);

        userRepository.save(user);

        emailService.sendVerificationEmail(user);

        final String username = registrationRequest.getUsername();
        final String registrationSuccessMessage = generalMessageAccessor.getMessage(null, REGISTRATION_SUCCESSFUL, username);

        log.info("{} registered successfully!", username);

        return new RegistrationResponse(registrationSuccessMessage);
    }

    @Override
    public AuthenticatedUserDto findAuthenticatedUserByUsername(String username) {

        final User user = findByUsername(username);

        return UserMapper.INSTANCE.convertToAuthenticatedUserDto(user);
    }

    @Override
    public boolean verify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode);

        if (user == null || user.isEnabled()) {
            return false;
        } else {
            user.setVerificationCode(null);
            user.setEnabled(true);
            userRepository.save(user);

            return true;
        }
    }

    @Override
    public boolean checkAccountEnabled(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (Boolean.FALSE.equals(user.isEnabled())) {
            return false;
        }
        return true;
    }

    @Override
    public User updateUser(UserRequest userRequest) {

        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();

        User user = this.findByUsername(username);

        if (userRequest.getPassword() == null) {
            userRequest.setPassword(user.getPassword());
        } else {
            userRequest.setPassword(bCryptPasswordEncoder.encode(userRequest.getPassword()));
        }

        modelMapper.map(userRequest, user);
        userRepository.save(user);

        return user;

    }

    @Override
    public User authenticateWithGoogle(String token) {

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(clientId))
                .build();

        GoogleIdToken idToken;
        try {
            idToken = verifier.verify(token);
        } catch (GeneralSecurityException | IOException e) {
            throw new RuntimeException("Invalid Google Token");
        }

        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");

            User user = userRepository.findByEmail(email);
            if (user == null) {
                // If user doesn't exist, create a new one
                user = new User();
                user.setName(name);
                user.setEmail(email);
                user.setProfilePicture(pictureUrl);
                user.setUsername(email.split("@")[0]); // Use email prefix as default username
                user.setEnabled(true); // Automatically enable for OAuth
                user.setUserRole(UserRole.USER);
                userRepository.save(user);
            }

            return user;
        } else {
            throw new RuntimeException("Invalid ID Token");
        }
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

}
