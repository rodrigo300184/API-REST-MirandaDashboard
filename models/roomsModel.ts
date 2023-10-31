import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema({
    "id": String,
    "room_photo": String,
    "room_type": String,
    "amenities": [Object],
    "price": Number,
    "offer_price": Boolean,
    "discount": Number,
    "status": String
})

export const Rooms = mongoose.model('Rooms', roomsSchema);
