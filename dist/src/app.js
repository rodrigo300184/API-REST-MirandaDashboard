"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const login_1 = require("./controllers/login");
const booking_1 = require("./controllers/booking");
exports.app = (0, express_1.default)();
exports.app.use('/login', login_1.loginController);
exports.app.use('/bookings', booking_1.bookingsController);
