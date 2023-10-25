"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const loginController_1 = require("./controllers/loginController");
const bookingsController_1 = __importDefault(require("./controllers/bookingsController"));
const auth_1 = __importDefault(require("./middlewares/auth"));
//import cors from 'cors';
exports.app = (0, express_1.default)();
// middlewares
//app.use(cors())
exports.app.use(express_1.default.json());
// public routes
exports.app.use('/login', loginController_1.loginController);
exports.app.use(auth_1.default);
exports.app.use('/bookings', bookingsController_1.default);
//# sourceMappingURL=app.js.map