package com.hotelbooking.service;

import com.hotelbooking.entity.User;

public interface AuthService {
    User registerUser(User user);
    String loginUser(String username, String password);
    boolean validateUser(String username);
}
