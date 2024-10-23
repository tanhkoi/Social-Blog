package com.javaproject.socialblog.springboot;

import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.service.Impl.EmailServiceImpl;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SocialBlogApplication {

    public static void main(String[] args) {

        SpringApplication.run(SocialBlogApplication.class, args);
        System.out.println("http://localhost:8080/swagger-ui/index.html");

    }

//    @Bean
//    CommandLineRunner run(EmailServiceImpl emailService) {
//        return args -> {
//            try {
//                User newUser = new User();
//                newUser.setEmail("tankhoi46@gmail.com");
//                newUser.setUsername("tankhoi");
//                emailService.sendVerificationEmail(newUser);  // Calling the sendHtmlEmail method
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        };
//    }

}
