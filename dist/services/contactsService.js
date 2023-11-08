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
exports.contactsService = void 0;
const api_connection_1 = require("../utils/api_connection");
function fetchAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const getAllContacts = yield (0, api_connection_1.selectQuery)('SELECT * FROM contact;');
        return getAllContacts;
    });
}
function fetchOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const contact = yield (0, api_connection_1.selectQuery)(`SELECT * FROM contact WHERE id = ?`, [id]);
        if (!contact.length)
            throw new Error("Error obtaining the contact or the contact doesn't exist");
        return contact[0];
    });
}
function createOne(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `INSERT INTO contact (full_name, email, phone_number, subject_of_review, review_body, date, status) VALUES (?, ?, ?, ?, ?, ?, ?);`;
        const data = [contact.full_name, contact.email, contact.phone_number, contact.subject_of_review, contact.review_body, contact.date, contact.status];
        const newContact = yield (0, api_connection_1.selectQuery)(query, data);
        if (newContact.affectedRows === 0)
            throw new Error("The contact couldn't be created");
        const createdContact = yield fetchOne(newContact.insertId);
        return createdContact;
    });
}
function editOne(id, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `UPDATE contact SET full_name = ?, email = ?, phone_number = ?, subject_of_review = ?, review_body = ?, date = ?, status = ? WHERE id = ?;`;
        const data = [update.full_name, update.email, update.phone_number, update.subject_of_review, update.review_body, update.date, update.status, id];
        const contactUpdate = yield (0, api_connection_1.selectQuery)(query, data);
        if (contactUpdate.affectedRows === 0)
            throw new Error("The contact doesn't exist or couldn't be updated");
        const updatedContact = yield fetchOne(id);
        return updatedContact;
    });
}
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedContact = yield (0, api_connection_1.selectQuery)('DELETE FROM contact WHERE id = ?;', [id]);
        if (deletedContact.affectedRows === 0)
            throw new Error("The contact doesn't exist or couldn't be deleted");
        return;
    });
}
exports.contactsService = {
    fetchAll,
    fetchOne,
    createOne,
    editOne,
    deleteOne,
};
//# sourceMappingURL=contactsService.js.map