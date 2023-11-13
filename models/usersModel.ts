import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    "full_name": {String, required: true},
    "email": {String, required: true},
    "password": {String, required: true},
    "photo": String,
    "start_date": String,
    "description": String,
    "phone_number": String,
    "status": String
})

export const Users = mongoose.model('Users',usersSchema);