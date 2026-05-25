package com.hotelbooking.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hotelbooking.entity.User;
import com.hotelbooking.repository.UserRepository;
import com.hotelbooking.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User updateUser(Long id, User user) {
        User existing = getUserById(id);
        existing.setUsername(user.getUsername());
        // Do not overwrite password here; provide separate endpoint
        return userRepository.save(existing);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
