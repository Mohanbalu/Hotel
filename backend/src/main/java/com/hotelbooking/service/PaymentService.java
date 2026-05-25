package com.hotelbooking.service;

import com.hotelbooking.entity.Payment;

public interface PaymentService {
    Payment createPayment(Long bookingId, Double amount);
    Payment updatePaymentStatus(Long paymentId, String status);
    Payment getPaymentByBooking(Long bookingId);
    Payment processPayment(Long bookingId, Double amount);
}
