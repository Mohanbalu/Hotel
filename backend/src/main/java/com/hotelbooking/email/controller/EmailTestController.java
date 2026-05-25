package com.hotelbooking.email.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.email.service.TestEmailService;

@RestController
@RequestMapping("/api/test")
public class EmailTestController {

    private final TestEmailService testEmailService;
    private final String defaultRecipient;

    public EmailTestController(TestEmailService testEmailService,
                               @Value("${MAIL_TEST_RECIPIENT:}") String defaultRecipient) {
        this.testEmailService = testEmailService;
        this.defaultRecipient = defaultRecipient;
    }

    @GetMapping("/email")
    public ResponseEntity<Map<String, Object>> sendTestEmail(@RequestParam(required = false) String to) {
        String recipient = (to != null && !to.isBlank()) ? to : defaultRecipient;
        if (recipient == null || recipient.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Recipient email is required. Pass ?to=recipient@example.com or set MAIL_TEST_RECIPIENT."
            ));
        }

        testEmailService.sendTestEmail(recipient);
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Test email queued and sent successfully",
            "recipient", recipient
        ));
    }
}
