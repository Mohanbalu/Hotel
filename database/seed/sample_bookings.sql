START TRANSACTION;

INSERT INTO bookings (
	id,
	user_id,
	room_id,
	check_in_date,
	check_out_date,
	total_amount,
	booking_status,
	payment_status,
	created_at,
	updated_at
)
VALUES
	(1, 2, 2, '2026-06-10', '2026-06-13', 540.00, 'CONFIRMED', 'SUCCESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(2, 3, 4, '2026-06-15', '2026-06-18', 660.00, 'PENDING', 'PENDING', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(3, 2, 7, '2026-07-01', '2026-07-03', 180.00, 'CANCELLED', 'FAILED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(4, 4, 9, '2026-07-10', '2026-07-14', 840.00, 'COMPLETED', 'SUCCESS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON DUPLICATE KEY UPDATE
	user_id = VALUES(user_id),
	room_id = VALUES(room_id),
	check_in_date = VALUES(check_in_date),
	check_out_date = VALUES(check_out_date),
	total_amount = VALUES(total_amount),
	booking_status = VALUES(booking_status),
	payment_status = VALUES(payment_status),
	updated_at = CURRENT_TIMESTAMP;

INSERT INTO payments (
	id,
	booking_id,
	payment_method,
	payment_amount,
	payment_status,
	transaction_reference,
	payment_date,
	created_at
)
VALUES
	(1, 1, 'CARD', 540.00, 'SUCCESS', 'TXN-BOOK-0001', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(2, 2, 'UPI', 660.00, 'PENDING', 'TXN-BOOK-0002', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(3, 3, 'NET_BANKING', 180.00, 'FAILED', 'TXN-BOOK-0003', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
	(4, 4, 'WALLET', 840.00, 'SUCCESS', 'TXN-BOOK-0004', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON DUPLICATE KEY UPDATE
	booking_id = VALUES(booking_id),
	payment_method = VALUES(payment_method),
	payment_amount = VALUES(payment_amount),
	payment_status = VALUES(payment_status),
	transaction_reference = VALUES(transaction_reference),
	payment_date = VALUES(payment_date);

INSERT INTO booking_history (
	id,
	booking_id,
	action_type,
	action_description,
	action_timestamp
)
VALUES
	(1, 1, 'BOOKING_CREATED', 'Booking created by user aarav.sharma@example.com', CURRENT_TIMESTAMP),
	(2, 1, 'BOOKING_CONFIRMED', 'Booking confirmed after successful payment', CURRENT_TIMESTAMP),
	(3, 2, 'BOOKING_CREATED', 'Booking initiated and awaiting payment', CURRENT_TIMESTAMP),
	(4, 3, 'BOOKING_CREATED', 'Booking created for budget stay', CURRENT_TIMESTAMP),
	(5, 3, 'BOOKING_CANCELLED', 'Booking cancelled due to payment failure', CURRENT_TIMESTAMP),
	(6, 4, 'BOOKING_CREATED', 'Booking created for deluxe stay', CURRENT_TIMESTAMP),
	(7, 4, 'PAYMENT_COMPLETED', 'Payment captured successfully', CURRENT_TIMESTAMP)
ON DUPLICATE KEY UPDATE
	booking_id = VALUES(booking_id),
	action_type = VALUES(action_type),
	action_description = VALUES(action_description),
	action_timestamp = VALUES(action_timestamp);

COMMIT;