"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookingsSchema = new mongoose_1.default.Schema({
    "id": String,
    "guest": String,
    "phone_number": String,
    "order_date": String,
    "check_in": String,
    "check_out": String,
    "special_request": String,
    "room_type": String,
    "room_number": String,
    "status": String,
    "photos": [String]
});
const Bookings = mongoose_1.default.model('Bookings', bookingsSchema);
function fetchAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const getAllBoookings = yield Bookings.find();
        if (!getAllBoookings)
            throw new Error('Error obtaining all bookings');
        return getAllBoookings;
    });
}
function fetchOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const booking = yield Bookings.find({ id: id });
        if (!booking)
            throw new Error("Error obtaining the booking or the booking doesn't exist");
        return booking;
    });
}
function createOne(booking) {
    return __awaiter(this, void 0, void 0, function* () {
        const newBooking = yield Bookings.create(booking);
        return newBooking;
    });
}
function editOne(id, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedBooking = yield Bookings.findByIdAndUpdate(id, update);
        return updatedBooking;
    });
}
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedBooking = yield Bookings.findByIdAndDelete(id);
        return deletedBooking;
    });
}
exports.bookingService = {
    fetchAll,
    fetchOne,
    createOne,
    editOne,
    deleteOne,
};
//# sourceMappingURL=bookingService.js.map