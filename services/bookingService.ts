import bookingsData from '../assets/data/bookingsData.json';
import { BookingInterface } from '../interfaces/bookingsInterface';
import { Bookings } from '../models/bookingsModel';

async function fetchAll() {
  const getAllBoookings = await Bookings.find();
  if (!getAllBoookings) throw new Error('Error obtaining all bookings');
  return getAllBoookings;
}

async function fetchOne(id: string) {
  const booking = await Bookings.find({ id: id });
  if (!booking) throw new Error("Error obtaining the booking or the booking doesn't exist");
  return booking;
}

async function createOne(booking: BookingInterface) {
  const newBooking = await Bookings.create(booking);
  return newBooking;
}

async function editOne(id: string, update: Partial<BookingInterface>) {
  const updatedBooking = await Bookings.findByIdAndUpdate(id, update);
  return updatedBooking;
}

async function deleteOne(id: string) {
  const deletedBooking = await Bookings.findByIdAndDelete(id);
  return deletedBooking;
}

export const bookingService = {
  fetchAll,
  fetchOne,
  createOne,
  editOne,
  deleteOne,
};