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
const usersService_1 = require("../services/usersService");
const usersController = (0, express_1.Router)();
usersController.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersData = yield usersService_1.usersService.get();
        res.status(200).send(usersData);
    }
    catch (error) {
        res.status(444).json(`${error}`);
    }
    ;
}));
usersController.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield usersService_1.usersService.getById(req.params.id);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(444).json(`${error}`);
    }
}));
usersController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield usersService_1.usersService.post(req.body);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
}));
usersController.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield usersService_1.usersService.delete(req.params.id);
        res.status(200).send('The user was correctly deleted.');
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
usersController.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield usersService_1.usersService.put(req.params.id, req.body);
        res.status(200).send(response);
    }
    catch (error) {
        res.status(444).send('No response from server');
    }
}));
exports.default = usersController;
//# sourceMappingURL=usersController.js.map