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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const loginController_1 = require("./controllers/loginController");
const roomsController_1 = require("./controllers/roomsController");
const bookingsController_1 = require("./controllers/bookingsController");
const usersController_1 = require("./controllers/usersController");
const login_1 = require("./middlewares/login");
const infoController_1 = require("./controllers/infoController");
const contactController_1 = require("./controllers/contactController");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const UrlMongo = process.env.URL_ATLAS || '';
const UrlLocal = process.env.URL_LOCAL || '';
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(UrlLocal, {
            dbName: 'Miranda_API',
        });
        console.log('Conectado a Mongo');
    }
    catch (error) {
        console.log(error);
    }
}))();
exports.app = (0, express_1.default)();
// middlewares
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// public routes
exports.app.use('/', infoController_1.infoController);
exports.app.use('/login', loginController_1.loginController);
exports.app.use(login_1.authMiddleware);
exports.app.use('/bookings', bookingsController_1.bookingsController);
exports.app.use('/rooms', roomsController_1.roomsController);
exports.app.use('/employees', usersController_1.usersController);
exports.app.use('/contacts', contactController_1.contactController);
exports.app.use((error, _req, res) => {
    console.error(error);
    return res.status(500).json({ error: true, message: 'Application error' });
});
//# sourceMappingURL=app.js.map