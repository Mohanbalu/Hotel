START TRANSACTION;

INSERT INTO roles (id, role_name)
VALUES
	(1, 'ADMIN'),
	(2, 'USER')
ON DUPLICATE KEY UPDATE role_name = VALUES(role_name);

INSERT INTO users (
	id,
	full_name,
	email,
	password,
	phone_number,
	role_id,
	account_status,
	created_at,
	updated_at
)
VALUES
	(
		1,
		'System Administrator',
		'admin@hotelbooker.com',
		'$2a$10$8z0fU0l6Yf3V3R9Q2hUj3e5xL8Jf2n8A9lP4gYq7Vx2tM1wN6kB8C',
		'+1-555-100-0001',
		1,
		'ACTIVE',
		CURRENT_TIMESTAMP,
		CURRENT_TIMESTAMP
	),
	(
		2,
		'Aarav Sharma',
		'aarav.sharma@example.com',
		'$2a$10$3r2T7Wm9Lq5bY8cV4nP1Je0xK6Dg2sN4fH9mQ1zW7uA5pL3cX9d2O',
		'+1-555-100-0002',
		2,
		'ACTIVE',
		CURRENT_TIMESTAMP,
		CURRENT_TIMESTAMP
	),
	(
		3,
		'Maya Patel',
		'maya.patel@example.com',
		'$2a$10$6t9R3Nm8Qp2xV5cY7kL4Je1bD0fW8sN3hM6zP2uA9yT1qL5cV8d7X',
		'+1-555-100-0003',
		2,
		'ACTIVE',
		CURRENT_TIMESTAMP,
		CURRENT_TIMESTAMP
	),
	(
		4,
		'Liam Johnson',
		'liam.johnson@example.com',
		'$2a$10$2q7V4Lm9Rp5xY8cN3kT1Je6bD0fW2sN8hM6zP1uA4yT9qL5cV7d3K',
		'+1-555-100-0004',
		2,
		'INACTIVE',
		CURRENT_TIMESTAMP,
		CURRENT_TIMESTAMP
	)
ON DUPLICATE KEY UPDATE
	full_name = VALUES(full_name),
	email = VALUES(email),
	password = VALUES(password),
	phone_number = VALUES(phone_number),
	role_id = VALUES(role_id),
	account_status = VALUES(account_status),
	updated_at = CURRENT_TIMESTAMP;

COMMIT;