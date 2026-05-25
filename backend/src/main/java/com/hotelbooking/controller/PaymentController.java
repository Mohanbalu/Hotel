package com.hotelbooking.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.entity.Payment;
import com.hotelbooking.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) { this.paymentService = paymentService; }

    @PostMapping
    public ResponseEntity<Payment> create(@RequestParam Long bookingId, @RequestParam Double amount) {
        return ResponseEntity.status(201).body(paymentService.processPayment(bookingId, amount));
    }

    @PutMapping("/status/{paymentId}")
    public ResponseEntity<Payment> updateStatus(@PathVariable Long paymentId, @RequestParam String status) {
        return ResponseEntity.ok(paymentService.updatePaymentStatus(paymentId, status));
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<Payment> byBooking(@PathVariable Long bookingId) { return ResponseEntity.ok(paymentService.getPaymentByBooking(bookingId)); }
}
