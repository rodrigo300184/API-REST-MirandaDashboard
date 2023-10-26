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
const express_1 = require("express");
const bookingService_1 = require("../services/bookingService");
const bookingsController = (0, express_1.Router)();
bookingsController.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingsData = yield bookingService_1.bookingService.get();
        res.status(200).send(bookingsData);
    }
    catch (error) {
        res.status(444).json(`${error}`);
    }
    ;
}));
bookingsController.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield bookingService_1.bookingService.getById(req.params.id);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(444).json(`${error}`);
    }
}));
bookingsController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield bookingService_1.bookingService.post(req.body);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
}));
bookingsController.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield bookingService_1.bookingService.delete(req.params.id);
        res.status(200).send('The booking was correctly deleted.');
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
bookingsController.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield bookingService_1.bookingService.put(req.params.id, req.body);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(444).send('No response from server');
    }
}));
exports.default = bookingsController;
//# sourceMappingURL=bookingsController.js.map