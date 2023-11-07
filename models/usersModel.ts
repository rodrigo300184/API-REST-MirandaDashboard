import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    "full_name": String,
    "email": String,
    "photo": String,
    "start_date": String,
    "description": String,
    "phone_number": String,
    "status": String
})

export const User = mongoose.model('Users',usersSchema);