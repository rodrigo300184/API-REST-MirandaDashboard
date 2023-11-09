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
exports.usersController = void 0;
const express_1 = require("express");
const usersService_1 = require("../services/usersService");
const validationSchemas_1 = require("../validator/validationSchemas");
const validationMiddleware_1 = require("../validator/validationMiddleware");
exports.usersController = (0, express_1.Router)();
exports.usersController.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersData = yield usersService_1.usersService.fetchAll();
        res.json(usersData);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
    ;
}));
exports.usersController.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield usersService_1.usersService.fetchOne(req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.usersController.post('/', (0, validationMiddleware_1.generateValidationMiddleware)(validationSchemas_1.userSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield usersService_1.usersService.createOne(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
}));
exports.usersController.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield usersService_1.usersService.deleteOne(req.params.id);
        res.json('The user was correctly deleted.');
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.usersController.put('/:id', (0, validationMiddleware_1.generateValidationMiddleware)(validationSchemas_1.userSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield usersService_1.usersService.editOne(req.params.id, req.body);
        res.json(result);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
//# sourceMappingURL=usersController.js.map