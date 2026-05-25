START TRANSACTION;

INSERT INTO hotels (
	id,
	hotel_name,
	description,
	location,
	address,
	city,
	state,
	country,
	zip_code,
	rating,
	contact_number,
	email,
	created_at,
	updated_at
)
VALUES
	(
		1,
		'Grand Horizon Hotel',
		'Luxury business hotel with city skyline view',
		'Downtown Financial District',
		'100 Market Street',
		'San Francisco',
		'California',
		'USA',
		'94105',
		4.5,
		'+1-415-555-2001',
		'contact@grandhorizon.com',
		CURRENT_TIMESTAMP,
		CURRENT_TIMESTAMP
	),
	(
		2,
		'Ocean Pearl Resort',
		'Beachfront resort with family-friendly facilities',
		'Seaside Bay',
		'22 Beach Avenue',
		'Miami',
		'Florida',
		'USA',
		'33139',
		4.2,
		'+1-305-555-2002',
		'info@oceanpearl.com',
		CURRENT_TIMESTAMP,
		CURRENT_TIMESTAMP
	),
	(
		3,
		'Maple Residency',
		'Affordable stay with modern rooms and conference space',
		'Central Business Hub',
		'9 Maple Road',
		'Austin',
		'Texas',
		'USA',
		'73301',
		3.9,
		'+1-512-555-2003',
		'hello@mapleresidency.com',
		CURRENT_TIMESTAMP,
		CURRENT_TIMESTAMP
	)
ON DUPLICATE KEY UPDATE
	description = VALUES(description),
	location = VALUES(location),
	address = VALUES(address),
	city = VALUES(city),
	state = VALUES(state),
	country = VALUES(country),
	zip_code = VALUES(zip_code),
	rating = VALUES(rating),
	contact_number = VALUES(contact_number),
	email = VALUES(email),
	updated_at = CURRENT_TIMESTAMP;

INSERT INTO amenities (id, hotel_id, amenity_name, amenity_description)
VALUES
	(1, 1, 'WiFi', 'High-speed wireless internet'),
	(2, 1, 'Gym', '24x7 fitness center'),
	(3, 1, 'Parking', 'Valet and self parking available'),
	(4, 2, 'Pool', 'Temperature-controlled outdoor pool'),
	(5, 2, 'AC', 'Centralized air conditioning in all rooms'),
	(6, 2, 'WiFi', 'Complimentary resort-wide internet'),
	(7, 3, 'WiFi', 'Business-grade internet connection'),
	(8, 3, 'Parking', 'Basement parking for guests')
ON DUPLICATE KEY UPDATE
	hotel_id = VALUES(hotel_id),
	amenity_name = VALUES(amenity_name),
	amenity_description = VALUES(amenity_description);

COMMIT;