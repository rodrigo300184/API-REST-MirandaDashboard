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
exports.roomsService = void 0;
const api_connection_1 = require("../utils/api_connection");
function fetchAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const getAllRooms = yield (0, api_connection_1.selectQuery)('SELECT * FROM room;');
        if (!getAllRooms)
            throw new Error('Error obtaining all rooms');
        return getAllRooms;
    });
}
function fetchOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const room = yield (0, api_connection_1.selectQuery)(`SELECT * FROM room WHERE id = ?`, [id]);
        if (!room)
            throw new Error("Error obtaining the room or the room doesn't exist");
        return room[0];
    });
}
function createOne(room) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `INSERT INTO room (room_number, room_type, description, price, offer_price, discount, status) VALUES (?, ?, ?, ?, ?, ?, ?);`;
        const data = [room.room_number, room.room_type, room.description, room.price, room.offer_price, room.discount, room.status];
        const newRoom = yield (0, api_connection_1.selectQuery)(query, data);
        if (newRoom.affectedRows === 0)
            throw new Error("The room couldn't be created");
        const createdRoom = yield fetchOne(newRoom.insertId);
        return createdRoom;
    });
}
function editOne(id, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `UPDATE room SET room_number = ?, room_type = ?, description = ?, price = ?, offer_price = ?, discount = ?, status = ? WHERE id = ?`;
        const data = [update.room_number, update.room_type, update.description, update.price, update.offer_price, update.discount, update.status, id];
        const roomUpdate = yield (0, api_connection_1.selectQuery)(query, data);
        if (roomUpdate.affectedRows === 0)
            throw new Error("The room doesn't exist or couldn't be updated");
        const updatedRoom = yield fetchOne(id);
        return updatedRoom;
    });
}
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedRoom = yield (0, api_connection_1.selectQuery)(`DELETE FROM room WHERE id = ${id}`);
        if (deletedRoom.affectedRows === 0)
            throw new Error("The room doesn't exist or couldn't be deleted");
        return;
    });
}
exports.roomsService = {
    fetchAll,
    fetchOne,
    createOne,
    editOne,
    deleteOne,
};
//# sourceMappingURL=roomsService.js.map