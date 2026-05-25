package com.hotelbooking.service;

import java.util.List;

import com.hotelbooking.entity.User;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long id);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
}
