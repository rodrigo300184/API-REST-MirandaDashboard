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
exports.contactController = void 0;
const express_1 = require("express");
const contactsService_1 = require("../services/contactsService");
exports.contactController = (0, express_1.Router)();
exports.contactController.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersData = yield contactsService_1.contactsService.get();
        res.json(usersData);
    }
    catch (error) {
        res.status(500).json(`${error}`);
    }
    ;
}));
exports.contactController.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield contactsService_1.contactsService.getById(req.params.id);
        res.json(response);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.contactController.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield contactsService_1.contactsService.post(req.body);
        res.json(response);
    }
    catch (error) {
        res.status(500).json('Internal Server Error');
    }
}));
exports.contactController.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield contactsService_1.contactsService.delete(req.params.id);
        res.json('The contact was correctly deleted.');
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
exports.contactController.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield contactsService_1.contactsService.put(req.params.id, req.body);
        res.json(response);
    }
    catch (error) {
        res.status(400).json(`${error}`);
    }
}));
//# sourceMappingURL=contactController.js.map