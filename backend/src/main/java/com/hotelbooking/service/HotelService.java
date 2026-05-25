package com.hotelbooking.service;

import java.util.List;

import com.hotelbooking.entity.Hotel;

public interface HotelService {
    List<Hotel> getAllHotels();
    Hotel getHotelById(Long id);
    List<Hotel> searchHotels(String city, String name, Double minRating);
    Hotel addHotel(Hotel hotel);
    Hotel updateHotel(Long id, Hotel hotel);
    void deleteHotel(Long id);
}
