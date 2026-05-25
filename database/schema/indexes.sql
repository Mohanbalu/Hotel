-- users
-- Email is already indexed by uq_users_email unique constraint in create_tables.sql.

-- hotels
CREATE INDEX idx_hotels_hotel_name ON hotels (hotel_name);
CREATE INDEX idx_hotels_city ON hotels (city);

-- rooms
CREATE INDEX idx_rooms_availability_status ON rooms (availability_status);
CREATE INDEX idx_rooms_hotel_availability ON rooms (hotel_id, availability_status);

-- bookings
CREATE INDEX idx_bookings_booking_status ON bookings (booking_status);
CREATE INDEX idx_bookings_payment_status ON bookings (payment_status);
CREATE INDEX idx_bookings_room_dates_status ON bookings (room_id, check_in_date, check_out_date, booking_status);
CREATE INDEX idx_bookings_user_created_at ON bookings (user_id, created_at);

-- payments
CREATE INDEX idx_payments_payment_status ON payments (payment_status);
CREATE INDEX idx_payments_payment_date ON payments (payment_date);

-- amenities
CREATE INDEX idx_amenities_hotel_id ON amenities (hotel_id);

-- booking_history
CREATE INDEX idx_booking_history_booking_timestamp ON booking_history (booking_id, action_timestamp);