"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const usersSchema = new mongoose_1.default.Schema({
    "full_name": String,
    "email": String,
    "photo": String,
    "start_date": String,
    "description": String,
    "phone_number": String,
    "status": String
});
exports.User = mongoose_1.default.model('Users', usersSchema);
//# sourceMappingURL=usersModel.js.map