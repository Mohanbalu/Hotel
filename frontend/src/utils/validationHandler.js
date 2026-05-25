export function validateEmail(email) {
  if (!email) return 'Email is required';
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase()) ? null : 'Invalid email address';
}

export function validatePassword(password) {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return null;
}

export function validateBookingDates(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 'Check-in and check-out dates are required';
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  if (isNaN(inDate) || isNaN(outDate)) return 'Invalid dates';
  if (inDate >= outDate) return 'Check-out must be after check-in';
  return null;
}

export function validateRoomSelection(roomId) {
  if (!roomId) return 'Please select a room';
  return null;
}

export default { validateEmail, validatePassword, validateBookingDates, validateRoomSelection };
