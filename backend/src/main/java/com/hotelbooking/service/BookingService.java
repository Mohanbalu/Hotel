package com.hotelbooking.service;

import java.time.LocalDate;
import java.util.List;

import com.hotelbooking.entity.Booking;

public interface BookingService {
    Booking createBooking(Long userId, Long roomId, LocalDate checkIn, LocalDate checkOut);
    Booking cancelBooking(Long bookingId);
    Booking getBookingById(Long id);
    List<Booking> getUserBookings(Long userId);
    List<Booking> getAllBookings();
}
