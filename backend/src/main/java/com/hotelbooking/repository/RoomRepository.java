package com.hotelbooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotelbooking.entity.Hotel;
import com.hotelbooking.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByHotel(Hotel hotel);
    List<Room> findByHotelIdAndAvailableTrue(Long hotelId);
}
