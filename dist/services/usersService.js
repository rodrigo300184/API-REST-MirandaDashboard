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
exports.usersService = void 0;
const api_connection_1 = require("../utils/api_connection");
function fetchAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const getAllUsers = yield (0, api_connection_1.selectQuery)('SELECT * FROM user;');
        return getAllUsers;
    });
}
function fetchOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, api_connection_1.selectQuery)(`SELECT * FROM user WHERE id = ?`, [id]);
        if (!user.length)
            throw new Error("Error obtaining the user or the user doesn't exist");
        return user[0];
    });
}
function createOne(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `INSERT INTO user (full_name, email, photo, start_date, description, phone_number, status) VALUES (?, ?, ?, ?, ?, ?, ?);`;
        const data = [user.full_name, user.email, user.photo, user.start_date, user.description, user.phone_number, user.status];
        const newUser = yield (0, api_connection_1.selectQuery)(query, data);
        if (newUser.affectedRows === 0)
            throw new Error("The user couldn't be created");
        const createdUser = yield fetchOne(newUser.insertId);
        return createdUser;
    });
}
function editOne(id, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `UPDATE user SET full_name = ?, email = ?, photo = ?, start_date = ?, description = ?, phone_number = ?, status = ? WHERE id = ?;`;
        const data = [update.full_name, update.email, update.photo, update.start_date, update.description, update.phone_number, update.status, id];
        const userUpdate = yield (0, api_connection_1.selectQuery)(query, data);
        if (!userUpdate)
            throw new Error("The user doesn't exist or couldn't be updated");
        const updatedUser = yield fetchOne(id);
        return updatedUser;
    });
}
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedUser = yield (0, api_connection_1.selectQuery)(`DELETE FROM user WHERE id = ?`, [id]);
        if (deletedUser.affectedRows === 0)
            throw new Error("The user doesn't exist or couldn't be deleted");
        return;
    });
}
exports.usersService = {
    fetchAll,
    fetchOne,
    createOne,
    editOne,
    deleteOne,
};
//# sourceMappingURL=usersService.js.map