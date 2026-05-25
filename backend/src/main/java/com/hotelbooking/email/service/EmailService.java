package com.hotelbooking.email.service;

public interface EmailService {
    void sendRegistrationEmail(String to, String userName) throws Exception;
    void sendBookingConfirmationEmail(String to, String bookingId, String htmlContent) throws Exception;
    void sendCancellationEmail(String to, String bookingId, String htmlContent) throws Exception;
    void sendPaymentConfirmationEmail(String to, String transactionId, String htmlContent) throws Exception;
}
