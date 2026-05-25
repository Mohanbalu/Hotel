package com.hotelbooking.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbooking.entity.Hotel;
import com.hotelbooking.service.HotelService;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping
    public ResponseEntity<List<Hotel>> getAll() { return ResponseEntity.ok(hotelService.getAllHotels()); }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getById(@PathVariable Long id) { return ResponseEntity.ok(hotelService.getHotelById(id)); }

    @GetMapping("/search")
    public ResponseEntity<List<Hotel>> search(@RequestParam(required = false) String city,
                                              @RequestParam(required = false) String name,
                                              @RequestParam(required = false) Double minRating) {
        return ResponseEntity.ok(hotelService.searchHotels(city, name, minRating));
    }

    @PostMapping
    public ResponseEntity<Hotel> create(@RequestBody Hotel hotel) { return ResponseEntity.status(201).body(hotelService.addHotel(hotel)); }

    @PutMapping("/{id}")
    public ResponseEntity<Hotel> update(@PathVariable Long id, @RequestBody Hotel hotel) { return ResponseEntity.ok(hotelService.updateHotel(id, hotel)); }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) { hotelService.deleteHotel(id); return ResponseEntity.noContent().build(); }
}
