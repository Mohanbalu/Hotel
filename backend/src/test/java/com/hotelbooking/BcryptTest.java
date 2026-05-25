package com.hotelbooking;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BcryptTest {
    @Test
    public void generateHash() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hash = encoder.encode("2004");
        System.out.println("=== GENERATED BCRYPT HASH FOR 2004 ===");
        System.out.println(hash);
        System.out.println("======================================");
    }
}
