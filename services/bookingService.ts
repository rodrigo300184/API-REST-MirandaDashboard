import { ApiError } from '../controllers/apiError';
import { selectQuery } from '../utils/api_connection';
import { BookingInterface } from '../interfaces/bookingsInterface';


async function fetchAll() {
  const getAllBoookings = await selectQuery(`
  SELECT b.*, r.room_number, r.room_type, GROUP_CONCAT(p.photos) AS room_pictures FROM booking b 
  LEFT JOIN room r ON b.room_id = r.id 
	LEFT JOIN photo p ON r.id = p.room_id 
	GROUP BY b.id, r.room_number, r.room_type;
	`);
  return getAllBoookings;
}

async function fetchOne(id: string) {
  const booking = await selectQuery(`
  SELECT b.*, r.room_number, r.room_type, GROUP_CONCAT(p.photos) AS room_pictures FROM booking b 
  LEFT JOIN room r ON b.room_id = r.id 
	LEFT JOIN photo p ON r.id = p.room_id 
  WHERE b.id = ?;`, [id]);
  if (!booking.length) throw new ApiError(400, "Error obtaining the booking or the booking doesn't exist");
  return booking[0];
}

async function createOne(booking: BookingInterface) {
  const query = `INSERT INTO booking (guest,phone_number, order_date, check_in, check_out,special_request, status, room_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
  const data = [booking.guest, booking.phone_number, booking.order_date, booking.check_in, booking.check_out, booking.special_request,
  booking.status, booking.room_id];
  const newBooking = await selectQuery(query, data);
  if (newBooking.affectedRows === 0) throw new Error("The booking couldn't be created");
  const createdBooking = await fetchOne(newBooking.insertId);
  return createdBooking;
}

async function editOne(id: string, update: Partial<BookingInterface>) {
  const query = `UPDATE booking SET guest = ?, phone_number = ?, order_date = ?, check_in = ?, check_out = ?, special_request = ?, status = ?, room_id = ? WHERE id = ?`;
  const data = [update.guest, update.phone_number, update.order_date, update.check_in, update.check_out, update.special_request, update.status, update.room_id, id];
  const bookingUpdate = await selectQuery(query, data);
  console.log(bookingUpdate)
  if (bookingUpdate.affectedRows === 0) throw new Error("The booking doesn't exist or couldn't be updated");
  const updatedBooking = await fetchOne(id);
  return updatedBooking;
}

async function deleteOne(id: string) {
  const deletedBooking = await selectQuery(`DELETE FROM booking WHERE id = ?`, [id]);
  if (deletedBooking.affectedRows===0) throw new Error("The booking doesn't exist or couldn't be deleted");
  return
}

export const bookingService = {
  fetchAll,
  fetchOne,
  createOne,
  editOne,
  deleteOne,
};