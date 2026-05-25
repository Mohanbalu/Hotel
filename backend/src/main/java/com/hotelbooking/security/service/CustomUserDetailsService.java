package com.hotelbooking.security.service;

import java.util.logging.Logger;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hotelbooking.entity.User;
import com.hotelbooking.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private static final Logger LOGGER = Logger.getLogger(CustomUserDetailsService.class.getName());

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        LOGGER.fine("Authenticated principal loaded: " + username);
        return user;
    }
}
