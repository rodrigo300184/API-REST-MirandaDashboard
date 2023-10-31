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
const roomsModel_1 = require("../models/roomsModel");
function fetchAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const getAllRooms = yield roomsModel_1.Rooms.find();
        if (!getAllRooms)
            throw new Error('Error obtaining all rooms');
        return getAllRooms;
    });
}
function fetchOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const room = yield roomsModel_1.Rooms.findById(id);
        if (!room)
            throw new Error("Error obtaining the room or the room doesn't exist");
        return room;
    });
}
function createOne(room) {
    return __awaiter(this, void 0, void 0, function* () {
        const newRoom = yield roomsModel_1.Rooms.create(room);
        if (!newRoom)
            throw new Error("The room couldn't be created");
        return newRoom;
    });
}
function editOne(id, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedRoom = roomsModel_1.Rooms.findByIdAndUpdate(id, update);
        if (!updatedRoom)
            throw new Error("The room doesn't exist or couldn't be updated");
        return updatedRoom;
    });
}
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedRoom = roomsModel_1.Rooms.findByIdAndDelete(id);
        if (!deletedRoom)
            throw new Error("The room doesn't exist or couldn't be deleted");
        return deletedRoom;
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