"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rooms = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const roomsSchema = new mongoose_1.default.Schema({
    "id": String,
    "room_photo": String,
    "room_type": String,
    "amenities": [Object],
    "price": Number,
    "offer_price": Boolean,
    "discount": Number,
    "status": String
});
exports.Rooms = mongoose_1.default.model('Rooms', roomsSchema);
//# sourceMappingURL=roomsModel.js.map