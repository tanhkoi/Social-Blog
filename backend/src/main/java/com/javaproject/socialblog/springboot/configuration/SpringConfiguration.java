package com.javaproject.socialblog.springboot.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfiguration {
    @Bean
    ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
