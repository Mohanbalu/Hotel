package com.hotelbooking.email.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

@Service
public class EmailServiceImpl implements EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailServiceImpl.class);

    @Autowired
    private JavaMailSender mailSender;

    private String loadTemplate(String path) {
        try {
            ClassPathResource res = new ClassPathResource(path);
            byte[] bytes = Files.readAllBytes(res.getFile().toPath());
            return new String(bytes, StandardCharsets.UTF_8);
        } catch (Exception e) {
            log.error("Failed to load email template: {}", path, e);
            return null;
        }
    }

    @Override
    public void sendRegistrationEmail(String to, String userName) throws Exception {
        String template = loadTemplate("emails/registration-template.html");
        if (template == null) template = "<p>Welcome %s</p>";
        String html = String.format(template, userName);
        sendHtmlMail(to, "Welcome to Hotel Booking", html);
    }

    @Override
    public void sendBookingConfirmationEmail(String to, String bookingId, String htmlContent) throws Exception {
        String template = loadTemplate("emails/booking-confirmation.html");
        String html = htmlContent != null ? htmlContent : (template == null ? "" : String.format(template, bookingId));
        sendHtmlMail(to, "Booking Confirmation: " + bookingId, html);
    }

    @Override
    public void sendCancellationEmail(String to, String bookingId, String htmlContent) throws Exception {
        String template = loadTemplate("emails/cancellation-template.html");
        String html = htmlContent != null ? htmlContent : (template == null ? "" : String.format(template, bookingId));
        sendHtmlMail(to, "Booking Cancellation: " + bookingId, html);
    }

    @Override
    public void sendPaymentConfirmationEmail(String to, String transactionId, String htmlContent) throws Exception {
        String template = loadTemplate("emails/payment-confirmation.html");
        String html = htmlContent != null ? htmlContent : (template == null ? "" : String.format(template, transactionId));
        sendHtmlMail(to, "Payment Confirmation: " + transactionId, html);
    }

    private void sendHtmlMail(String to, String subject, String html) throws Exception {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(html, true);
            mailSender.send(message);
            log.info("Email sent to {} subject={}", to, subject);
        } catch (Exception e) {
            log.error("Failed to send email to {}", to, e);
            throw e;
        }
    }
}
