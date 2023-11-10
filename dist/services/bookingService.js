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
const apiError_1 = require("../controllers/apiError");
const api_connection_1 = require("../utils/api_connection");
function fetchAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const getAllBoookings = yield (0, api_connection_1.selectQuery)(`
  SELECT b.*, r.room_number, r.room_type, GROUP_CONCAT(p.photos) AS room_pictures FROM booking b 
  LEFT JOIN room r ON b.room_id = r.id 
	LEFT JOIN photo p ON r.id = p.room_id 
	GROUP BY b.id, r.room_number, r.room_type;
	`);
        return getAllBoookings;
    });
}
function fetchOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const booking = yield (0, api_connection_1.selectQuery)(`
  SELECT b.*, r.room_number, r.room_type, GROUP_CONCAT(p.photos) AS room_pictures FROM booking b 
  LEFT JOIN room r ON b.room_id = r.id 
	LEFT JOIN photo p ON r.id = p.room_id 
  WHERE b.id = ?;`, [id]);
        if (!booking.length)
            throw new apiError_1.ApiError(400, "Error obtaining the booking or the booking doesn't exist");
        return booking[0];
    });
}
function createOne(booking) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `INSERT INTO booking (guest,phone_number, order_date, check_in, check_out,special_request, status, room_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
        const data = [booking.guest, booking.phone_number, booking.order_date, booking.check_in, booking.check_out, booking.special_request,
            booking.status, booking.room_id];
        const newBooking = yield (0, api_connection_1.selectQuery)(query, data);
        if (newBooking.affectedRows === 0)
            throw new Error("The booking couldn't be created");
        const createdBooking = yield fetchOne(newBooking.insertId);
        return createdBooking;
    });
}
function editOne(id, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `UPDATE booking SET guest = ?, phone_number = ?, order_date = ?, check_in = ?, check_out = ?, special_request = ?, status = ?, room_id = ? WHERE id = ?`;
        const data = [update.guest, update.phone_number, update.order_date, update.check_in, update.check_out, update.special_request, update.status, update.room_id, id];
        const bookingUpdate = yield (0, api_connection_1.selectQuery)(query, data);
        console.log(bookingUpdate);
        if (bookingUpdate.affectedRows === 0)
            throw new Error("The booking doesn't exist or couldn't be updated");
        const updatedBooking = yield fetchOne(id);
        return updatedBooking;
    });
}
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedBooking = yield (0, api_connection_1.selectQuery)(`DELETE FROM booking WHERE id = ?`, [id]);
        if (deletedBooking.affectedRows === 0)
            throw new Error("The booking doesn't exist or couldn't be deleted");
        return;
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