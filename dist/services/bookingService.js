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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const bookingsModel_1 = require("../models/bookingsModel");
function fetchAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const getAllBoookings = yield bookingsModel_1.Bookings.find();
        if (!getAllBoookings)
            throw new Error('Error obtaining all bookings');
        return getAllBoookings;
    });
}
function fetchOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const booking = yield bookingsModel_1.Bookings.find({ id: id });
        if (!booking)
            throw new Error("Error obtaining the booking or the booking doesn't exist");
        return booking;
    });
}
function createOne(booking) {
    return __awaiter(this, void 0, void 0, function* () {
        const newBooking = yield bookingsModel_1.Bookings.create(booking);
        if (!newBooking)
            throw new Error("The booking couldn't be created");
        return newBooking;
    });
}
function editOne(id, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedBooking = yield bookingsModel_1.Bookings.findByIdAndUpdate(id, update);
        if (!updatedBooking)
            throw new Error("The booking doesn't exist or couldn't be updated");
        return updatedBooking;
    });
}
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedBooking = yield bookingsModel_1.Bookings.findByIdAndDelete(id);
        if (!deletedBooking)
            throw new Error("The booking doesn't exist or couldn't be deleted");
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