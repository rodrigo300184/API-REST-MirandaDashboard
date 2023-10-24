"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const express_1 = require("express");
exports.loginController = (0, express_1.Router)();
exports.loginController.get('/', (req, res) => {
    res.send('Hola Login!');
});
