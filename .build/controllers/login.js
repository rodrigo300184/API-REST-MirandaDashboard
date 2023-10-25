"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController = (0, express_1.Router)();
loginController.get('/', (req, res) => {
    res.send('Hola Login!');
});
exports.default = loginController;
//# sourceMappingURL=login.js.map