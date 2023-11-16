"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contacts = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const conctactsSchema = new mongoose_1.default.Schema({
    "full_name": String,
    "email": String,
    "phone_number": String,
    "subject_of_review": String,
    "review_body": String,
    "date": String,
    "dateTime": String,
    "status": String
});
exports.Contacts = mongoose_1.default.model('Contacts', conctactsSchema);
//# sourceMappingURL=contactsModel.js.map