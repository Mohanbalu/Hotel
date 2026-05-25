START TRANSACTION;

INSERT INTO rooms (
	id,
	hotel_id,
	room_number,
	room_type,
	price_per_night,
	capacity,
	availability_status,
	room_description,
	created_at,
	updated_at
)
VALUES
	(1, 1, '101', 'SINGLE', 120.00, 1, 'AVAILABLE', 'Compact business room with work desk', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(2, 1, '102', 'DOUBLE', 180.00, 2, 'AVAILABLE', 'Spacious double bed room with city view', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(3, 1, '201', 'SUITE', 350.00, 4, 'UNAVAILABLE', 'Executive suite with lounge area', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(4, 2, 'B11', 'DELUXE', 220.00, 3, 'AVAILABLE', 'Deluxe room with sea-facing balcony', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(5, 2, 'B12', 'FAMILY', 300.00, 5, 'AVAILABLE', 'Family room with two queen beds', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(6, 2, 'B21', 'DOUBLE', 190.00, 2, 'MAINTENANCE', 'Double room under scheduled maintenance', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(7, 3, 'C01', 'SINGLE', 90.00, 1, 'AVAILABLE', 'Budget single room near conference wing', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(8, 3, 'C02', 'DOUBLE', 140.00, 2, 'AVAILABLE', 'Double room with ergonomic workspace', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(9, 3, 'C10', 'DELUXE', 210.00, 3, 'AVAILABLE', 'Deluxe room with smart TV and minibar', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON DUPLICATE KEY UPDATE
	hotel_id = VALUES(hotel_id),
	room_number = VALUES(room_number),
	room_type = VALUES(room_type),
	price_per_night = VALUES(price_per_night),
	capacity = VALUES(capacity),
	availability_status = VALUES(availability_status),
	room_description = VALUES(room_description),
	updated_at = CURRENT_TIMESTAMP;

COMMIT;