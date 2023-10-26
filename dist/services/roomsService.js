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
exports.roomsService = void 0;
const roomsData_json_1 = __importDefault(require("../assets/data/roomsData.json"));
function get() {
    return __awaiter(this, void 0, void 0, function* () {
        const getAllRooms = yield roomsData_json_1.default;
        if (!getAllRooms)
            throw new Error('Error obtaining all rooms');
        return getAllRooms;
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const room = yield roomsData_json_1.default.filter((element) => { return element.id === id; });
        if (room.length === 0)
            throw new Error("Error obtaining the room or the room doesn't exist");
        return room;
    });
}
function post(newRoom) {
    return __awaiter(this, void 0, void 0, function* () {
        yield roomsData_json_1.default.push(newRoom);
        return roomsData_json_1.default;
    });
}
function put(id, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const index = roomsData_json_1.default.findIndex((element) => element.id === id);
        roomsData_json_1.default[index] = Object.assign(Object.assign({}, roomsData_json_1.default[index]), update);
        return roomsData_json_1.default;
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const index = roomsData_json_1.default.findIndex((element) => element.id === id);
        if (!index)
            throw new Error("The room doesn't exist or couldn't be deleted");
        roomsData_json_1.default.splice(index, 1);
        return;
    });
}
exports.roomsService = {
    get,
    getById,
    post,
    put,
    delete: _delete,
};
//# sourceMappingURL=roomsService.js.map