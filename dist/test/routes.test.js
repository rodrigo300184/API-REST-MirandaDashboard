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
const app_1 = require("../app");
const supertest_1 = __importDefault(require("supertest"));
describe('Prueba de Login Dashboard API', () => {
    it('Prueba de Login exitoso', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .post('/login')
            .send({
            user: "admin",
            password: "admin",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.payload.user).toBe('admin');
        expect(res.body).toHaveProperty('payload' && 'token');
    }));
    it('Prueba de Login fallida por password equivocado', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .post('/login')
            .send({
            user: "admin",
            password: "admi",
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({ error: true, messsage: 'Error: Wrong user or password!' });
    }));
    it('Prueba de ir a Bookings/Rooms/Contact/Users sin auntenticar debe responder status 404', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .get('/bookings');
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual('Error: Incorrect Token');
    }));
});
//# sourceMappingURL=routes.test.js.map