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
const usersModel_1 = require("../models/usersModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function fetchAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const getAllUsers = yield usersModel_1.Users.find();
        if (!getAllUsers)
            throw new Error('Error obtaining all employees');
        return getAllUsers;
    });
}
function fetchOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield usersModel_1.Users.findById(id);
        if (!user)
            throw new Error("Error obtaining the employee or the employee doesn't exist");
        return user;
    });
}
function createOne(user) {
    return __awaiter(this, void 0, void 0, function* () {
        user.password = bcryptjs_1.default.hashSync(user.password || '', 10);
        const newUser = yield usersModel_1.Users.create(user);
        if (!newUser)
            throw new Error("The employee couldn't be created");
        return newUser;
    });
}
function editOne(id, update) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedUser = yield usersModel_1.Users.findByIdAndUpdate(id, update);
        if (!updatedUser)
            throw new Error("The employee doesn't exist or couldn't be updated");
        return updatedUser;
    });
}
function deleteOne(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedUser = yield usersModel_1.Users.findByIdAndDelete(id);
        if (!deletedUser)
            throw new Error("The user doesn't exist or couldn't be deleted");
        return deletedUser;
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