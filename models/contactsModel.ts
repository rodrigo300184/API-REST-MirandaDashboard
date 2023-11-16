import mongoose from "mongoose";

const conctactsSchema = new mongoose.Schema({
    "full_name": String,
    "email": String,
    "phone_number": String,
    "subject_of_review": String,
    "review_body": String,
    "date": String,
    "dateTime": String,
    "status": String
})

export const Contacts = mongoose.model('Contacts',conctactsSchema);