ALTER TABLE users
	ADD CONSTRAINT fk_users_role
		FOREIGN KEY (role_id)
		REFERENCES roles(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT;

ALTER TABLE rooms
	ADD CONSTRAINT fk_rooms_hotel
		FOREIGN KEY (hotel_id)
		REFERENCES hotels(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE;

ALTER TABLE bookings
	ADD CONSTRAINT fk_bookings_user
		FOREIGN KEY (user_id)
		REFERENCES users(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT,
	ADD CONSTRAINT fk_bookings_room
		FOREIGN KEY (room_id)
		REFERENCES rooms(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT;

ALTER TABLE payments
	ADD CONSTRAINT fk_payments_booking
		FOREIGN KEY (booking_id)
		REFERENCES bookings(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE;

ALTER TABLE amenities
	ADD CONSTRAINT fk_amenities_hotel
		FOREIGN KEY (hotel_id)
		REFERENCES hotels(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE;

ALTER TABLE booking_history
	ADD CONSTRAINT fk_booking_history_booking
		FOREIGN KEY (booking_id)
		REFERENCES bookings(id)
		ON UPDATE CASCADE
		ON DELETE CASCADE;

DELIMITER $$

CREATE TRIGGER trg_bookings_validate_insert
BEFORE INSERT ON bookings
FOR EACH ROW
BEGIN
	IF NEW.check_out_date <= NEW.check_in_date THEN
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Invalid booking date range: check_out_date must be after check_in_date';
	END IF;

	IF EXISTS (
		SELECT 1
		FROM bookings b
		WHERE b.room_id = NEW.room_id
		  AND b.booking_status IN ('PENDING', 'CONFIRMED')
		  AND NEW.check_in_date < b.check_out_date
		  AND NEW.check_out_date > b.check_in_date
	) THEN
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Room is already booked for the selected date range';
	END IF;
END$$

CREATE TRIGGER trg_bookings_validate_update
BEFORE UPDATE ON bookings
FOR EACH ROW
BEGIN
	IF NEW.check_out_date <= NEW.check_in_date THEN
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Invalid booking date range: check_out_date must be after check_in_date';
	END IF;

	IF EXISTS (
		SELECT 1
		FROM bookings b
		WHERE b.room_id = NEW.room_id
		  AND b.id <> NEW.id
		  AND b.booking_status IN ('PENDING', 'CONFIRMED')
		  AND NEW.check_in_date < b.check_out_date
		  AND NEW.check_out_date > b.check_in_date
	) THEN
		SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'Room is already booked for the selected date range';
	END IF;
END$$

DELIMITER ;