package com.hotelbooking.controller;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgument(IllegalArgumentException ex) {
        String msg = ex.getMessage();
        int status = 400;
        if (msg != null && msg.toLowerCase().contains("already exists")) {
            status = 409; // Conflict
        }
        return ResponseEntity.status(status).body(Map.of("message", msg));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntime(RuntimeException ex) {
        String msg = ex.getMessage();
        int status = 400;
        if (msg != null && msg.toLowerCase().contains("not found")) {
            status = 404; // Not Found
        }
        return ResponseEntity.status(status).body(Map.of("message", msg));
    }
    
    @ExceptionHandler(org.springframework.dao.DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrity(org.springframework.dao.DataIntegrityViolationException ex) {
        return ResponseEntity.status(409).body(Map.of("message", "User already exists with this email"));
    }
}
