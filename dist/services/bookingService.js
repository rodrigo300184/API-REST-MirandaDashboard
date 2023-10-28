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
const bookingsData_json_1 = __importDefault(require("../assets/data/bookingsData.json"));
function get() {
    return __awaiter(this, void 0, void 0, function* () {
        const getAllBoookings = yield bookingsData_json_1.default;
        if (!getAllBoookings)
            throw new Error('Error obtaining all bookings');
        return getAllBoookings;
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const booking = yield bookingsData_json_1.default.find((element) => { return element.id === id; });
        if (!booking)
            throw new Error("Error obtaining the booking or the booking doesn't exist");
        return booking;
    });
}
function post(booking) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bookingsData_json_1.default.push(booking);
        return bookingsData_json_1.default;
    });
}
function put(id, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const index = bookingsData_json_1.default.findIndex((element) => element.id === id);
        if (index === -1)
            throw new Error("The booking doesn't exist or couldn't be updated");
        bookingsData_json_1.default[index] = Object.assign(Object.assign({}, bookingsData_json_1.default[index]), update);
        return bookingsData_json_1.default;
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const index = bookingsData_json_1.default.findIndex((element) => element.id === id);
        if (index === -1)
            throw new Error("The booking doesn't exist or couldn't be deleted");
        bookingsData_json_1.default.splice(index, 1);
        return;
    });
}
exports.bookingService = {
    get,
    getById,
    post,
    put,
    delete: _delete,
};
//# sourceMappingURL=bookingService.js.map