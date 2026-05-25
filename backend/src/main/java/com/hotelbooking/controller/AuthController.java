package com.hotelbooking.controller;

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
    public ResponseEntity<?> register(@RequestBody User user) {
        User created = authService.registerUser(user);
        return ResponseEntity.status(201).body(created);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User credentials) {
        String token = authService.loginUser(credentials.getUsername(), credentials.getPassword());
        return ResponseEntity.ok().body(java.util.Map.of("token", token));
    }
}
