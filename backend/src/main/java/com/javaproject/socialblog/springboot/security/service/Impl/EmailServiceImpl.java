package com.javaproject.socialblog.springboot.security.service.Impl;

import com.javaproject.socialblog.springboot.model.User;
import com.javaproject.socialblog.springboot.security.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.base-url}")
    private String baseUrl;

    @Override
    public void sendVerificationEmail(User user) {
        try {
            MimeMessage message = mailSender.createMimeMessage();

            message.setRecipients(MimeMessage.RecipientType.TO, user.getEmail());
            message.setSubject("[Social Blog] Confirm E-mail Address");

            String username = user.getUsername();
            String htmlContent = "<h1></h1>" +
                    "<p>Welcome " + username + "!\n</p>" +
                    "<p>\n</p>" +
                    "<p>Thanks for signing up with Social Blog!\n</p>" +
                    "<p>You must follow this link to activate your account:</p>" +
                    "<h3><a href=\"[[URL]]\" target=\"_self\">VERIFY</a></h3>" +
                    "<p>Have fun blogging, and don't hesitate to contact us with your feedback.</p>";

            String verifyURL = baseUrl + "/verify?code=" + user.getVerificationCode();

            htmlContent = htmlContent.replace("[[URL]]", verifyURL);
            message.setContent(htmlContent, "text/html; charset=utf-8");

            mailSender.send(message);

        } catch (MessagingException e) {
            log.info(e.toString());
        }
    }

}
