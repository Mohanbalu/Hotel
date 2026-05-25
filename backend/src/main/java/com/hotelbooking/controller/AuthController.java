package com.hotelbooking.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.entity.User;
import com.hotelbooking.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, Object> payload) {
        User user = new User();
        user.setUsername(firstNonBlank(payload.get("username"), payload.get("email")));
        user.setPassword(stringValue(payload.get("password")));
        
        Object roleVal = payload.get("role");
        if (roleVal != null) {
            try {
                user.setRole(com.hotelbooking.enums.Role.valueOf(roleVal.toString().toUpperCase()));
            } catch (Exception e) {
                // fallback to default
            }
        }
        
        User created = authService.registerUser(user);
        return ResponseEntity.status(201).body(created);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, Object> payload) {
        String token = authService.loginUser(
                firstNonBlank(payload.get("username"), payload.get("email")),
                stringValue(payload.get("password"))
        );
        return ResponseEntity.ok().body(java.util.Map.of("token", token));
    }

    private String firstNonBlank(Object... values) {
        for (Object value : values) {
            String text = stringValue(value);
            if (text != null && !text.isBlank()) {
                return text;
            }
        }
        return null;
    }

    private String stringValue(Object value) {
        return value == null ? null : value.toString();
    }
}
