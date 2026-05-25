package com.hotelbooking.email.service;

import java.nio.charset.StandardCharsets;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.hotelbooking.email.exception.EmailOperationException;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class TestEmailService {

    private static final Logger log = LoggerFactory.getLogger(TestEmailService.class);

    private final JavaMailSender mailSender;
    private final String fromAddress;

    public TestEmailService(JavaMailSender mailSender,
                            @Value("${spring.mail.username}") String fromAddress) {
        this.mailSender = mailSender;
        this.fromAddress = fromAddress;
    }

    public void sendTestEmail(String to) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name()
            );
            helper.setFrom(fromAddress);
            helper.setTo(to);
            helper.setSubject("Hotel Booking Application - SMTP Test");
            helper.setText("<p>SMTP test email delivered successfully.</p>", true);
            mailSender.send(message);
            log.info("Test email sent successfully to {}", to);
        } catch (MailAuthenticationException | MailSendException | MessagingException ex) {
            log.error("SMTP email delivery failed for {}", to, ex);
            throw mapException(ex);
        } catch (Exception ex) {
            log.error("Unexpected email delivery failure for {}", to, ex);
            throw new EmailOperationException(HttpStatus.INTERNAL_SERVER_ERROR, "EMAIL_UNKNOWN_ERROR", "Failed to send test email", ex);
        }
    }

    private EmailOperationException mapException(Exception ex) {
        if (ex instanceof MailAuthenticationException) {
            return new EmailOperationException(HttpStatus.UNAUTHORIZED, "EMAIL_AUTH_FAILURE", "Gmail authentication failed", ex);
        }
        if (ex instanceof MailSendException) {
            return new EmailOperationException(HttpStatus.BAD_GATEWAY, "EMAIL_SEND_FAILURE", "SMTP send failure", ex);
        }
        if (ex instanceof MessagingException) {
            return new EmailOperationException(HttpStatus.GATEWAY_TIMEOUT, "EMAIL_MESSAGING_FAILURE", "SMTP messaging failure", ex);
        }
        return new EmailOperationException(HttpStatus.INTERNAL_SERVER_ERROR, "EMAIL_UNKNOWN_ERROR", "Failed to send test email", ex);
    }
}
