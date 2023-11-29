import mongoose from 'mongoose';

const bookingsSchema = new mongoose.Schema({
  "guest": String,
  "phone_number": String,
  "email": String,
  "order_date": String,
  "check_in": String,
  "check_out": String,
  "special_request": String,
  "room_id": String,
  "room_type": String,
  "room_number": String,
  "status": String,
  "photos": [String]
});

export const Booking = mongoose.model('Bookings', bookingsSchema);