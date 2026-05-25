package com.hotelbooking.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hotelbooking.entity.Hotel;
import com.hotelbooking.repository.HotelRepository;
import com.hotelbooking.service.HotelService;

@Service
@Transactional
public class HotelServiceImpl implements HotelService {

    private final HotelRepository hotelRepository;

    public HotelServiceImpl(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    @Override
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    @Override
    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id).orElseThrow(() -> new RuntimeException("Hotel not found"));
    }

    @Override
    public List<Hotel> searchHotels(String city, String name, Double minRating) {
        if (city != null && !city.isBlank()) return hotelRepository.findByCityContainingIgnoreCase(city);
        if (name != null && !name.isBlank()) return hotelRepository.findByNameContainingIgnoreCase(name);
        return hotelRepository.findAll();
    }

    @Override
    public Hotel addHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    @Override
    public Hotel updateHotel(Long id, Hotel hotel) {
        Hotel existing = getHotelById(id);
        existing.setName(hotel.getName());
        existing.setCity(hotel.getCity());
        existing.setLocation(hotel.getLocation());
        existing.setRating(hotel.getRating());
        return hotelRepository.save(existing);
    }

    @Override
    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }
}
