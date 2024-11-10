package com.javaproject.socialblog.springboot.security.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentRequest {

    @NotEmpty(message = "{comment_not_empty}")
    private String content;

}
