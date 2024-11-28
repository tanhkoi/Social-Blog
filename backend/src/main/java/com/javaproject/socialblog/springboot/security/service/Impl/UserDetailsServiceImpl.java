package com.javaproject.socialblog.springboot.security.service.Impl;

import com.javaproject.socialblog.springboot.model.UserRole;
import com.javaproject.socialblog.springboot.security.dto.AuthenticatedUserDto;
import com.javaproject.socialblog.springboot.security.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private static final String USERNAME_OR_PASSWORD_INVALID = "Invalid username or password.";

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) {

        final AuthenticatedUserDto authenticatedUser = userService.findAuthenticatedUserByUsername(username);

        if (Objects.isNull(authenticatedUser)) {
            throw new UsernameNotFoundException(USERNAME_OR_PASSWORD_INVALID);
        }

        final String authenticatedUsername = authenticatedUser.getUsername();
        final String authenticatedPassword = authenticatedUser.getPassword();
        final UserRole userRole = authenticatedUser.getUserRole();
        final SimpleGrantedAuthority grantedAuthority = new SimpleGrantedAuthority(userRole.name());

        return new User(authenticatedUsername, authenticatedPassword, Collections.singletonList(grantedAuthority));
    }
}
