package com.hotelbooking.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.entity.Booking;
import com.hotelbooking.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) { this.bookingService = bookingService; }

    @PostMapping
    public ResponseEntity<Booking> create(@RequestParam Long userId,
                                          @RequestParam Long roomId,
                                          @RequestParam String checkIn,
                                          @RequestParam String checkOut) {
        Booking b = bookingService.createBooking(userId, roomId, LocalDate.parse(checkIn), LocalDate.parse(checkOut));
        return ResponseEntity.status(201).body(b);
    }

    @PutMapping("/cancel/{bookingId}")
    public ResponseEntity<Booking> cancel(@PathVariable Long bookingId) { return ResponseEntity.ok(bookingService.cancelBooking(bookingId)); }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> get(@PathVariable Long id) { return ResponseEntity.ok(bookingService.getBookingById(id)); }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> userBookings(@PathVariable Long userId) { return ResponseEntity.ok(bookingService.getUserBookings(userId)); }

    @GetMapping
    public ResponseEntity<List<Booking>> all() { return ResponseEntity.ok(bookingService.getAllBookings()); }
}
