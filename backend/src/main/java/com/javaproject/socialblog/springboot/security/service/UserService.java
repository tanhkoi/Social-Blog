package com.javaproject.socialblog.springboot.security.service;

import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.security.dto.AuthenticatedUserDto;
import com.javaproject.socialblog.springboot.security.dto.RegistrationRequest;
import com.javaproject.socialblog.springboot.security.dto.RegistrationResponse;

/**
 * Created on Ağustos, 2020
 *
 * @author Faruk
 */
public interface UserService {

	User findByUsername(String username);

	RegistrationResponse registration(RegistrationRequest registrationRequest);

	AuthenticatedUserDto findAuthenticatedUserByUsername(String username);

}
