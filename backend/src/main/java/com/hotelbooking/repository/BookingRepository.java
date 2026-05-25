package com.hotelbooking.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hotelbooking.entity.Booking;
import com.hotelbooking.entity.Room;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    @Query("SELECT b FROM Booking b WHERE b.room = :room AND b.status <> 'CANCELLED' " +
            "AND b.checkIn <= :checkOut AND b.checkOut >= :checkIn")
    List<Booking> findOverlappingBookings(@Param("room") Room room,
                                          @Param("checkIn") LocalDate checkIn,
                                          @Param("checkOut") LocalDate checkOut);

    List<Booking> findByUserId(Long userId);
}
