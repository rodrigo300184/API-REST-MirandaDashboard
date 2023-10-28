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
exports.roomsController = void 0;
const express_1 = require("express");
const roomsService_1 = require("../services/roomsService");
exports.roomsController = (0, express_1.Router)();
exports.roomsController.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roomsData = yield roomsService_1.roomsService.get();
        res.json(roomsData);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
    ;
}));
exports.roomsController.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield roomsService_1.roomsService.getById(req.params.id);
        res.json(response);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.roomsController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield roomsService_1.roomsService.post(req.body);
        res.json(response);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
}));
exports.roomsController.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield roomsService_1.roomsService.delete(req.params.id);
        res.json('The room was correctly deleted.');
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.roomsController.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield roomsService_1.roomsService.put(req.params.id, req.body);
        res.json(response);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
//# sourceMappingURL=roomsController.js.map