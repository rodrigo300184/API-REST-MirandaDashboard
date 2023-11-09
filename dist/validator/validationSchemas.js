"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.contactSchema = exports.userSchema = exports.bookingSchema = exports.roomSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.roomSchema = joi_1.default.object({
    "room_number": joi_1.default.string().pattern(/^[1-9]\d[1-9]$/).required(),
    "room_type": joi_1.default.string().valid('Single Bed', 'Double Bed', 'Double Superior', 'Suite').required(),
    "description": joi_1.default.string().min(30).max(1000).required(),
    "price": joi_1.default.number().positive().precision(2).required(),
    "offer_price": joi_1.default.boolean().required(),
    "discount": joi_1.default.number().integer().min(0).max(50),
    "status": joi_1.default.string().valid('Booked', 'Available').required()
});
exports.bookingSchema = joi_1.default.object({
    "guest": joi_1.default.string().min(1).max(255).required(),
    "phone_number": joi_1.default.string().max(255).required(),
    "order_date": joi_1.default.date().iso().required(),
    "check_in": joi_1.default.date().greater(joi_1.default.ref('order_date')).message('The check in date must be greater than the order date').required(),
    "check_out": joi_1.default.date().greater(joi_1.default.ref('check_in')).message('The check in date must be greater than the order date').required(),
    "special_request": joi_1.default.string().required().min(1).max(255),
    "status": joi_1.default.string().valid('Check In', 'Check Out', 'In Progress').required(),
    "room_id": joi_1.default.number().integer().required(),
});
exports.userSchema = joi_1.default.object({
    full_name: joi_1.default.string().min(1).max(255).required(),
    email: joi_1.default.string().email().required(),
    photo: joi_1.default.string().max(255).required(),
    start_date: joi_1.default.date().required(),
    description: joi_1.default.string().min(1).max(255).required(),
    phone_number: joi_1.default.string().required(),
    status: joi_1.default.string().valid('Active', 'Inactive').required(),
});
exports.contactSchema = joi_1.default.object({
    full_name: joi_1.default.string().max(255).required(),
    email: joi_1.default.string().email().required(),
    phone_number: joi_1.default.string().max(255).required(),
    subject_of_review: joi_1.default.string().min(1).max(255).required(),
    review_body: joi_1.default.string().min(1).max(1000).required(),
    date: joi_1.default.date().required(),
    status: joi_1.default.string().required().valid('Active', 'Inactive'),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(3).max(10),
});
//# sourceMappingURL=validationSchemas.js.map