# Hotel Booking Application ER Diagram Description

## Entities

1. roles
- Primary Key: id
- Unique: role_name
- Parent of users

2. users
- Primary Key: id
- Foreign Key: role_id -> roles.id
- Unique: email, phone_number
- Parent of bookings

3. hotels
- Primary Key: id
- Unique: (hotel_name, city, country)
- Parent of rooms, amenities

4. rooms
- Primary Key: id
- Foreign Key: hotel_id -> hotels.id
- Unique: (hotel_id, room_number)
- Parent of bookings

5. bookings
- Primary Key: id
- Foreign Keys: user_id -> users.id, room_id -> rooms.id
- Parent of payments (1:1), booking_history (1:N)
- Date range validated: check_out_date > check_in_date
- Overlap prevention enforced by triggers for active bookings

6. payments
- Primary Key: id
- Foreign Key: booking_id -> bookings.id
- Unique: booking_id (enforces 1:1 with booking)
- Unique: transaction_reference

7. amenities
- Primary Key: id
- Foreign Key: hotel_id -> hotels.id
- Unique: (hotel_id, amenity_name)

8. booking_history
- Primary Key: id
- Foreign Key: booking_id -> bookings.id
- Tracks lifecycle actions for each booking

## Cardinality Summary

- roles 1 -> N users
- hotels 1 -> N rooms
- users 1 -> N bookings
- rooms 1 -> N bookings
- bookings 1 -> 1 payments
- hotels 1 -> N amenities
- bookings 1 -> N booking_history

## Notes for JPA/Hibernate Compatibility

- All tables use BIGINT UNSIGNED AUTO_INCREMENT primary keys.
- Audit timestamps are available for write-heavy entities.
- FK cascades are configured to preserve integrity while avoiding accidental user/room deletion side effects.
- Enumerations are suitable for mapping with @Enumerated(EnumType.STRING).
