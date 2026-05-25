package com.hotelbooking.email.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailAuthenticationException;
import org.springframework.mail.MailSendException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.mail.MessagingException;

@RestControllerAdvice(basePackages = "com.hotelbooking.email")
public class EmailExceptionHandler {

    @ExceptionHandler(EmailOperationException.class)
    public ResponseEntity<Map<String, Object>> handleEmailOperation(EmailOperationException ex) {
        return build(ex.getStatus(), ex.getErrorCode(), ex.getMessage(), ex.getCause() != null ? ex.getCause().getMessage() : "");
    }

    @ExceptionHandler({MailAuthenticationException.class})
    public ResponseEntity<Map<String, Object>> handleAuthentication(MailAuthenticationException ex) {
        return build(HttpStatus.UNAUTHORIZED, "EMAIL_AUTH_FAILURE", "Gmail authentication failed or app password is invalid", ex.getMessage());
    }

    @ExceptionHandler({MailSendException.class})
    public ResponseEntity<Map<String, Object>> handleSendFailure(MailSendException ex) {
        return build(HttpStatus.BAD_GATEWAY, "EMAIL_SEND_FAILURE", "SMTP send failure", ex.getMostSpecificCause() != null ? ex.getMostSpecificCause().getMessage() : ex.getMessage());
    }

    @ExceptionHandler({MessagingException.class})
    public ResponseEntity<Map<String, Object>> handleTimeout(Exception ex) {
        return build(HttpStatus.GATEWAY_TIMEOUT, "EMAIL_TIMEOUT", "SMTP timeout or messaging failure", ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneric(Exception ex) {
        return build(HttpStatus.INTERNAL_SERVER_ERROR, "EMAIL_SERVICE_ERROR", "Email service error", ex.getMessage());
    }

    private ResponseEntity<Map<String, Object>> build(HttpStatus status, String errorCode, String message, String detail) {
        return ResponseEntity.status(status).body(Map.of(
            "success", false,
            "status", status.value(),
            "errorCode", errorCode,
            "message", message,
            "detail", detail == null ? "" : detail
        ));
    }
}