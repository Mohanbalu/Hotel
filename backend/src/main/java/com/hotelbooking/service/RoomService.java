package com.hotelbooking.service;

import java.util.List;

import com.hotelbooking.entity.Room;

public interface RoomService {
    List<Room> getRoomsByHotel(Long hotelId);
    List<Room> getAvailableRooms(Long hotelId);
    Room addRoom(Room room);
    Room updateRoom(Long id, Room room);
    void deleteRoom(Long id);
}
