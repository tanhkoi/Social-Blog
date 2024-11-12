package com.javaproject.socialblog.springboot.security.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserRequest {

    @NotBlank(message = "{user.name.notBlank}")
    @Size(min = 2, max = 50, message = "{user.name.size}")
    private String name;

    @NotBlank(message = "{user.email.notBlank}")
    @Email(message = "{user.email.valid}")
    private String email;

    private String profilePicture; // Add validation here if needed

    @NotBlank(message = "{user.password.notBlank}")
    @Size(min = 8, message = "{user.password.size}")
    private String password;

}
