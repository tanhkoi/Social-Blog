package com.javaproject.socialblog.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SocialBlogApplication {

    public static void main(String[] args) {

        SpringApplication.run(SocialBlogApplication.class, args);
        System.out.println("http://localhost:8080/swagger-ui/index.html");

    }

//    @Bean
//    CommandLineRunner run(NotificationService notificationService, UserService userService) {
//        return args -> {
//            try {
//                User currUser = userService.findByUsername("tankhoitest3");
//
//                int cnt = 0;
//                for (Follow fl : currUser.getFollowers()) {
//                    notificationService.createNewPostNotification("postid" + cnt, fl.getUser(),"New post", "New post from " + currUser.getName());
//                    cnt++;
//                }
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        };
//    }

}
