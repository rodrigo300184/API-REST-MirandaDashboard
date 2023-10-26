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
const infoService_1 = require("../services/infoService");
const infoController = (0, express_1.Router)();
infoController.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield infoService_1.infoService.get();
        res.send(info);
    }
    catch (error) {
        return res.status(444).json(`${error}`);
    }
}));
exports.default = infoController;
//# sourceMappingURL=infoController.js.map