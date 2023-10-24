"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsController = void 0;
const express_1 = require("express");
const bookingsData_json_1 = __importDefault(require("../assets/data/bookingsData.json"));
exports.bookingsController = (0, express_1.Router)();
exports.bookingsController.get('/', (req, res) => {
    res.send(bookingsData_json_1.default);
});
