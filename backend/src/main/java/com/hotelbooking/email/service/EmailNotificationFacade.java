package com.hotelbooking.email.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EmailNotificationFacade {

    @Autowired
    private EmailService emailService;

    public void notifyRegistration(String to, String userName) {
        try {
            emailService.sendRegistrationEmail(to, userName);
        } catch (Exception e) {
            // log and continue — caller should handle retries if necessary
        }
    }

    public void notifyBookingConfirmation(String to, String bookingId, String htmlContent) {
        try {
            emailService.sendBookingConfirmationEmail(to, bookingId, htmlContent);
        } catch (Exception e) {
            // log and continue
        }
    }

    public void notifyCancellation(String to, String bookingId, String htmlContent) {
        try {
            emailService.sendCancellationEmail(to, bookingId, htmlContent);
        } catch (Exception e) {
            // log and continue
        }
    }

    public void notifyPayment(String to, String transactionId, String htmlContent) {
        try {
            emailService.sendPaymentConfirmationEmail(to, transactionId, htmlContent);
        } catch (Exception e) {
            // log and continue
        }
    }
}
