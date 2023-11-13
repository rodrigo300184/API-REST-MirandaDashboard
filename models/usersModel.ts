import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    "full_name": {type: String, required: true},
    "email": {type: String, required: true},
    "password": {type: String, required: true},
    "photo": String,
    "start_date": String,
    "description": String,
    "phone_number": String,
    "status": String
})

export const Users = mongoose.model('Users',usersSchema);