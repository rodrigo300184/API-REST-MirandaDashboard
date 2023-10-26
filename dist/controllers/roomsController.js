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
const roomsService_1 = require("../services/roomsService");
const roomsController = (0, express_1.Router)();
roomsController.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomsData = yield roomsService_1.roomsService.get();
        res.status(200).send(roomsData);
    }
    catch (error) {
        res.status(444).json(`${error}`);
    }
    ;
}));
roomsController.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield roomsService_1.roomsService.getById(req.params.id);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(444).json(`${error}`);
    }
}));
roomsController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield roomsService_1.roomsService.post(req.body);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
}));
roomsController.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield roomsService_1.roomsService.delete(req.params.id);
        res.status(200).send('The room was correctly deleted.');
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
roomsController.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield roomsService_1.roomsService.put(req.params.id, req.body);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(444).send('No response from server');
    }
}));
exports.default = roomsController;
//# sourceMappingURL=roomsController.js.map