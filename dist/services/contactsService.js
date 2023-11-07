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
const contactsModel_1 = require("../models/contactsModel");
function fetchAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const getAllContacts = yield contactsModel_1.Contact.find();
        if (!getAllContacts)
            throw new Error('Error obtaining all contacts');
        return getAllContacts;
    });
}
function fetchOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const contact = yield contactsModel_1.Contact.findById(id);
        if (!contact)
            throw new Error("Error obtaining the contact or the contact doesn't exist");
        return contact;
    });
}
function createOne(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const newContact = yield contactsModel_1.Contact.create(contact);
        if (!newContact)
            throw new Error("The contact couldn't be created");
        return newContact;
    });
}
function editOne(id, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedContact = yield contactsModel_1.Contact.findByIdAndUpdate(id, update);
        if (!updatedContact)
            throw new Error("The contact doesn't exist or couldn't be updated");
        return updatedContact;
    });
}
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedContact = yield contactsModel_1.Contact.findByIdAndDelete(id);
        if (!deletedContact)
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