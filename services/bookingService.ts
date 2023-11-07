import { ApiError } from '../controllers/apiError';
import { BookingInterface } from '../interfaces/bookingsInterface';
import { Booking } from '../models/bookingsModel';

async function fetchAll() {
  const getAllBoookings = await Booking.find();
  if (!getAllBoookings) throw new ApiError(400,'Error obtaining all bookings',true);
  return getAllBoookings;
}

async function fetchOne(id: string) {
  const booking = await Booking.find({ id: id });
  if (!booking) throw new Error("Error obtaining the booking or the booking doesn't exist");
  return booking;
}

async function createOne(booking: BookingInterface) {
  const newBooking = await Booking.create(booking);
  if (!newBooking) throw new Error("The booking couldn't be created");
  return newBooking;
}

async function editOne(id: string, update: Partial<BookingInterface>) {
  const updatedBooking = await Booking.findByIdAndUpdate(id, update);
  if (!updatedBooking) throw new Error("The booking doesn't exist or couldn't be updated");
  return updatedBooking;
}

async function deleteOne(id: string) {
  const deletedBooking = await Booking.findByIdAndDelete(id);
  if (!deletedBooking) throw new Error("The booking doesn't exist or couldn't be deleted");
  return
}

export const bookingService = {
  fetchAll,
  fetchOne,
  createOne,
  editOne,
  deleteOne,
};