package com.hotelbooking.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hotelbooking.entity.Hotel;
import com.hotelbooking.entity.Room;
import com.hotelbooking.repository.HotelRepository;
import com.hotelbooking.repository.RoomRepository;
import com.hotelbooking.service.RoomService;

@Service
@Transactional
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final HotelRepository hotelRepository;

    public RoomServiceImpl(RoomRepository roomRepository, HotelRepository hotelRepository) {
        this.roomRepository = roomRepository;
        this.hotelRepository = hotelRepository;
    }

    @Override
    public List<Room> getRoomsByHotel(Long hotelId) {
        Hotel hotel = hotelRepository.findById(hotelId).orElseThrow(() -> new RuntimeException("Hotel not found"));
        return roomRepository.findByHotel(hotel);
    }

    @Override
    public List<Room> getAvailableRooms(Long hotelId) {
        return roomRepository.findByHotelIdAndAvailableTrue(hotelId);
    }

    @Override
    public Room addRoom(Room room) {
        // Basic validations
        if (room.getCapacity() == null || room.getCapacity() <= 0) throw new RuntimeException("Invalid capacity");
        if (room.getPricePerNight() == null || room.getPricePerNight() < 0) throw new RuntimeException("Invalid price");
        return roomRepository.save(room);
    }

    @Override
    public Room updateRoom(Long id, Room room) {
        Room existing = roomRepository.findById(id).orElseThrow(() -> new RuntimeException("Room not found"));
        existing.setNumber(room.getNumber());
        existing.setCapacity(room.getCapacity());
        existing.setPricePerNight(room.getPricePerNight());
        existing.setAvailable(room.isAvailable());
        return roomRepository.save(existing);
    }

    @Override
    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}
