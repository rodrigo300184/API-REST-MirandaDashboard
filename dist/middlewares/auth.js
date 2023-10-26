"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginService_1 = __importDefault(require("../services/loginService"));
function authMiddleware(req, res, next) {
    let token = req.get('token') || '';
    try {
        loginService_1.default.verifyJWT(token);
        return next();
    }
    catch (error) {
        return res.status(401).json(`${error}`);
    }
}
exports.default = authMiddleware;
//# sourceMappingURL=auth.js.map