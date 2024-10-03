package com.javaproject.socialblog.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SocialBlogApplication {

    public static void main(String[] args) {

        SpringApplication.run(SocialBlogApplication.class, args);
        System.out.println("http://localhost:8080/swagger-ui/index.html");

    }

}
