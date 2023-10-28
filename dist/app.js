"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const loginController_1 = require("./controllers/loginController");
const roomsController_1 = __importDefault(require("./controllers/roomsController"));
const bookingsController_1 = __importDefault(require("./controllers/bookingsController"));
const usersController_1 = __importDefault(require("./controllers/usersController"));
const login_1 = __importDefault(require("./middlewares/login"));
const infoController_1 = __importDefault(require("./controllers/infoController"));
const contactController_1 = __importDefault(require("./controllers/contactController"));
//import cors from 'cors';
exports.app = (0, express_1.default)();
// middlewares
//app.use(cors())
exports.app.use(express_1.default.json());
// public routes
exports.app.use('/', infoController_1.default);
exports.app.use('/login', loginController_1.loginController);
exports.app.use(login_1.default);
exports.app.use('/bookings', bookingsController_1.default);
exports.app.use('/rooms', roomsController_1.default);
exports.app.use('/users', usersController_1.default);
exports.app.use('/contacts', contactController_1.default);
exports.app.use((error, _req, res) => {
    console.error(error);
    return res.status(500).json({ error: true, message: 'Application error' });
});
//# sourceMappingURL=app.js.map