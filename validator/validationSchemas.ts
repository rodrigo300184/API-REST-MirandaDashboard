import Joi from "joi";

export const roomSchema = Joi.object({
    "room_number": Joi.string().pattern(/^[1-9]\d[1-9]$/).required(),
    "room_type": Joi.string().valid('Single Bed', 'Double Bed', 'Double Superior', 'Suite').required(),
    "description":Joi.string().min(30).max(1000).required(),
    "price": Joi.number().positive().precision(2).required(),
    "offer_price": Joi.boolean().required(),
    "discount": Joi.number().integer().min(0).max(50),
    "status": Joi.string().valid('Booked', 'Available').required()
});

export const bookingSchema = Joi.object({
	"guest": Joi.string().min(1).max(255).required(),
	"phone_number": Joi.string().max(255).required(),
	"order_date": Joi.date().iso().required(),
	"check_in": Joi.date().greater(Joi.ref('order_date')).message('The check in date must be greater than the order date').required(),
	"check_out": Joi.date().greater(Joi.ref('check_in')).message('The check in date must be greater than the order date').required(),
	"special_request": Joi.string().required().min(1).max(255),
	"status": Joi.string().valid('Check In', 'Check Out', 'In Progress').required(),
	"room_id": Joi.number().integer().required(),
});

export const userSchema = Joi.object({
	full_name: Joi.string().min(1).max(255).required(),
	email: Joi.string().email().required(),
	photo: Joi.string().max(255).required(),
	start_date: Joi.date().required(),	
	description: Joi.string().min(1).max(255).required(),
	phone_number: Joi.string().required(),
	status: Joi.string().valid('Active', 'Inactive').required(),
});

export const contactSchema = Joi.object({
	full_name: Joi.string().max(255).required(),
	email: Joi.string().email().required(),
	phone_number: Joi.string().max(255).required(),
	subject_of_review: Joi.string().min(1).max(255).required(),
	review_body: Joi.string().min(1).max(1000).required(),
	date: Joi.date().required(),
	status: Joi.string().required().valid('Active', 'Inactive'),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
	password: Joi.string().min(3).max(10),

});