import mongoose from "mongoose";

const conctactsSchema = new mongoose.Schema({
    "full_name": String,
    "email": String,
    "phone_number": String,
    "subject_of_review": String,
    "review_body": String,
    "date": String,
    "dateTime": String,
    "isArchived": String
})

export const Contact = mongoose.model('Contacts',conctactsSchema);