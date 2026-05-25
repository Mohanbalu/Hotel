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

import com.hotelbooking.entity.Room;
import com.hotelbooking.service.RoomService;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) { this.roomService = roomService; }

    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<List<Room>> roomsByHotel(@PathVariable Long hotelId) { return ResponseEntity.ok(roomService.getRoomsByHotel(hotelId)); }

    @GetMapping("/available")
    public ResponseEntity<List<Room>> available(@RequestParam Long hotelId) { return ResponseEntity.ok(roomService.getAvailableRooms(hotelId)); }

    @PostMapping
    public ResponseEntity<Room> add(@RequestBody Room room) { return ResponseEntity.status(201).body(roomService.addRoom(room)); }

    @PutMapping("/{id}")
    public ResponseEntity<Room> update(@PathVariable Long id, @RequestBody Room room) { return ResponseEntity.ok(roomService.updateRoom(id, room)); }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) { roomService.deleteRoom(id); return ResponseEntity.noContent().build(); }
}
