package com.hotelbooking.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @Column(nullable = false)
    private String number;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private Double pricePerNight;

    @Column(nullable = false)
    private boolean available = true;

    public Room() {}

    public Room(Long id, Hotel hotel, String number, Integer capacity, Double pricePerNight, boolean available) {
        this.id = id;
        this.hotel = hotel;
        this.number = number;
        this.capacity = capacity;
        this.pricePerNight = pricePerNight;
        this.available = available;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Hotel getHotel() { return hotel; }
    public void setHotel(Hotel hotel) { this.hotel = hotel; }
    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }
    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
    public Double getPricePerNight() { return pricePerNight; }
    public void setPricePerNight(Double pricePerNight) { this.pricePerNight = pricePerNight; }
    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
}
