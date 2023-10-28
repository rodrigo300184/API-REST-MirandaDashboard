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
exports.usersService = void 0;
const employee_data_json_1 = __importDefault(require("../assets/data/employee_data.json"));
function get() {
    return __awaiter(this, void 0, void 0, function* () {
        const getAllUsers = yield employee_data_json_1.default;
        if (!getAllUsers)
            throw new Error('Error obtaining all users');
        return getAllUsers;
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield employee_data_json_1.default.find((element) => { return element.employee_id === id; });
        if (!user)
            throw new Error("Error obtaining the user or the user doesn't exist");
        return user;
    });
}
function post(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        yield employee_data_json_1.default.push(newUser);
        return employee_data_json_1.default;
    });
}
function put(id, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const index = employee_data_json_1.default.findIndex((element) => element.employee_id === id);
        if (index === -1)
            throw new Error("The user doesn't exist or couldn't be updated");
        employee_data_json_1.default[index] = Object.assign(Object.assign({}, employee_data_json_1.default[index]), update);
        return employee_data_json_1.default;
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const index = employee_data_json_1.default.findIndex((element) => element.employee_id === id);
        if (index === -1)
            throw new Error("The user doesn't exist or couldn't be deleted");
        employee_data_json_1.default.splice(index, 1);
        return;
    });
}
exports.usersService = {
    get,
    getById,
    post,
    put,
    delete: _delete,
};
//# sourceMappingURL=usersService.js.map