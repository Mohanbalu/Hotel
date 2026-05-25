/*
TABLE RELATIONSHIPS
1. roles (1) -> users (N)
2. hotels (1) -> rooms (N)
3. users (1) -> bookings (N)
4. rooms (1) -> bookings (N)
5. bookings (1) -> payments (1)
6. hotels (1) -> amenities (N)
7. bookings (1) -> booking_history (N)
*/

/*
REFERENCE QUERIES FOR RELATIONSHIP VALIDATION
*/

-- One Role -> Many Users
SELECT r.id AS role_id, r.role_name, COUNT(u.id) AS user_count
FROM roles r
LEFT JOIN users u ON u.role_id = r.id
GROUP BY r.id, r.role_name;

-- One Hotel -> Many Rooms
SELECT h.id AS hotel_id, h.hotel_name, COUNT(r.id) AS room_count
FROM hotels h
LEFT JOIN rooms r ON r.hotel_id = h.id
GROUP BY h.id, h.hotel_name;

-- One User -> Many Bookings
SELECT u.id AS user_id, u.email, COUNT(b.id) AS booking_count
FROM users u
LEFT JOIN bookings b ON b.user_id = u.id
GROUP BY u.id, u.email;

-- One Room -> Many Bookings
SELECT rm.id AS room_id, rm.room_number, COUNT(b.id) AS booking_count
FROM rooms rm
LEFT JOIN bookings b ON b.room_id = rm.id
GROUP BY rm.id, rm.room_number;

-- One Booking -> One Payment
SELECT b.id AS booking_id, p.id AS payment_id
FROM bookings b
LEFT JOIN payments p ON p.booking_id = b.id;

-- One Hotel -> Many Amenities
SELECT h.id AS hotel_id, h.hotel_name, COUNT(a.id) AS amenity_count
FROM hotels h
LEFT JOIN amenities a ON a.hotel_id = h.id
GROUP BY h.id, h.hotel_name;

-- One Booking -> Many Booking History records
SELECT b.id AS booking_id, COUNT(bh.id) AS history_event_count
FROM bookings b
LEFT JOIN booking_history bh ON bh.booking_id = b.id
GROUP BY b.id;