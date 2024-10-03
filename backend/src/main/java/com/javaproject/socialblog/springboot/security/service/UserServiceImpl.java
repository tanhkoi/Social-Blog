package com.javaproject.socialblog.springboot.security.service;

import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.model.UserRole;
import com.javaproject.socialblog.springboot.repository.UserRepository;
import com.javaproject.socialblog.springboot.security.dto.AuthenticatedUserDto;
import com.javaproject.socialblog.springboot.security.dto.RegistrationRequest;
import com.javaproject.socialblog.springboot.security.dto.RegistrationResponse;
import com.javaproject.socialblog.springboot.security.mapper.UserMapper;
import com.javaproject.socialblog.springboot.service.UserValidationService;
import com.javaproject.socialblog.springboot.utils.GeneralMessageAccessor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final String REGISTRATION_SUCCESSFUL = "registration_successful";

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final UserValidationService userValidationService;

    private final GeneralMessageAccessor generalMessageAccessor;

    @Override
    public User findByUsername(String username) {

        return userRepository.findByUsername(username);
    }

    @Override
    public RegistrationResponse registration(RegistrationRequest registrationRequest) {

        userValidationService.validateUser(registrationRequest);

        final User user = UserMapper.INSTANCE.convertToUser(registrationRequest);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setUserRole(UserRole.USER);

        userRepository.save(user);

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
}
