package com.javaproject.socialblog.springboot.security.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PostRequest {

    @NotEmpty(message = "{title_not_empty}")
    private String title;

    @NotEmpty(message = "{category_not_empty}")
    private String category;

    @NotEmpty(message = "{tags_not_empty}")
    private List<String> tags;

    @NotEmpty(message = "{content_not_empty}")
    private String content;

    private String imageCloudUrl;

}
