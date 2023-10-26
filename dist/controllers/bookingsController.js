"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookingsData_json_1 = __importDefault(require("../assets/data/bookingsData.json"));
const express_1 = require("express");
const bookingsController = (0, express_1.Router)();
bookingsController.get('/', (_req, res) => {
    try {
        res.send(bookingsData_json_1.default);
    }
    catch (error) {
        res.status(444).send('No response from server');
    }
    ;
});
bookingsController.get('/:id', (req, res) => {
    try {
        const response = bookingsData_json_1.default.filter((element) => { return element.id === req.params.id; });
        res.send(response);
    }
    catch (error) {
        res.status(444).send('No response from server');
    }
});
bookingsController.post('/', (req, res) => {
    try {
        bookingsData_json_1.default.push(req.body);
        res.send(bookingsData_json_1.default);
    }
    catch (error) {
        res.status(444).send('No response from server');
    }
});
bookingsController.delete('/:id', (req, res) => {
    try {
        const index = bookingsData_json_1.default.findIndex((element) => element.id === req.params.id);
        bookingsData_json_1.default.splice(index, 1);
        res.send(bookingsData_json_1.default);
        res.status(200).send('The booking was correctly deleted.');
    }
    catch (error) {
        res.status(444).send('No response from server');
    }
});
bookingsController.put('/:id', (req, res) => {
    try {
        const newData = req.body;
        const index = bookingsData_json_1.default.findIndex((element) => element.id === req.params.id);
        bookingsData_json_1.default[index] = Object.assign(Object.assign({}, bookingsData_json_1.default[index]), newData);
        res.send(bookingsData_json_1.default);
    }
    catch (error) {
        res.status(444).send('No response from server');
    }
});
exports.default = bookingsController;
//# sourceMappingURL=bookingsController.js.map