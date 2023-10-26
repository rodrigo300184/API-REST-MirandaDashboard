import bookingsData from '../assets/data/bookingsData.json';
import { BookingInterface } from '../models/bookingsModel';

async function get() {
  const getAllBoookings = await bookingsData;
  if (!getAllBoookings) throw new Error('Error obtaining all bookings');
  return getAllBoookings;
}

async function getById(id: string) {
  const booking = await bookingsData.filter((element) => { return element.id === id })
  if (booking.length === 0) throw new Error("Error obtaining the booking or the booking doesn't exist");
  return booking;
}

async function post(booking: BookingInterface) {
  await bookingsData.push(booking);
  return bookingsData;
}

async function put(id: string, update: Partial<BookingInterface>) {
  const index = bookingsData.findIndex((element) => element.id === id)
  if (index === -1) throw new Error("The booking doesn't exist or couldn't be updated");
  bookingsData[index] = { ...bookingsData[index], ...update };
  return bookingsData;
}

async function _delete(id: string) {
  const index = bookingsData.findIndex((element) => element.id === id)
  if (index === -1) throw new Error("The booking doesn't exist or couldn't be deleted");
  bookingsData.splice(index, 1)
  return
}

export const bookingService = {
  get,
  getById,
  post,
  put,
  delete: _delete,
};