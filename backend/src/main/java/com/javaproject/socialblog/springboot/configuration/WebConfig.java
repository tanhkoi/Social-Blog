package com.javaproject.socialblog.springboot.configuration;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Cấu hình cho các API
                .allowedOrigins("http://localhost:5173") // Cho phép frontend từ origin này
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Các phương thức HTTP được phép
                .allowCredentials(true) // Cho phép gửi cookie nếu cần
                .allowedHeaders("*"); // Cho phép tất cả các header
    }
}
