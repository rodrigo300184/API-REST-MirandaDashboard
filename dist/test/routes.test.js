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
            email: "email@email.com",
            password: "1234",
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.payload.email).toBe('email@email.com');
        expect(res.body).toHaveProperty('payload' && 'token');
    }));
    it('Prueba de Login fallida por password equivocado', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .post('/login')
            .send({
            email: "admin",
            password: "admi",
        });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({ error: true, messsage: 'Error: Wrong email or password!' });
    }));
    it('Prueba de ir a Bookings/Rooms/Contact/Users sin auntenticar debe responder status 401', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .get('/bookings');
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual('Error: Incorrect Token');
    }));
    it('Prueba de acceder public API Info', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body[0].name).toEqual("Hotel Miranda Dashboard API");
    }));
});
describe('Pruebas de bookings', () => {
    let authToken;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).post("/login").send({
            email: "email@email.com",
            password: "1234",
        });
        authToken = res.body.token;
    }));
    it("Acceder a Bookings si se esta autenticado", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/bookings").set("token", authToken);
        expect(res.statusCode).toEqual(200);
    }));
    it('Obtener todos los bookings con GET si se esta autenticado', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/bookings").set("token", authToken);
        expect(res.body[0]).toHaveProperty("guest");
    }));
    it("Agregando un nuevo booking con POST si se esta autenticado", () => __awaiter(void 0, void 0, void 0, function* () {
        const newBooking = {
            "id": "2EFGH237",
            "guest": "Rodrigo Martinez",
            "phone_number": "+1 234-567-8901",
            "order_date": "2023-10-02",
            "check_in": "2023-10-11",
            "check_out": "2023-10-16",
            "special_request": "I'd like an extra blanket.",
            "room_type": "Single Bed",
            "room_number": "101",
            "status": "Check In",
            "photos": [
                "https://example.com/room_photos/single_bed_1_medium.jpg",
                "https://example.com/room_photos/single_bed_2_medium.jpg",
                "https://example.com/room_photos/single_bed_3_medium.jpg"
            ]
        };
        const res = yield (0, supertest_1.default)(app_1.app)
            .post("/bookings")
            .set("token", authToken)
            .send(newBooking);
        const lastIndex = res.body.length - 1;
        expect(res.body[lastIndex]).toStrictEqual(newBooking);
    }));
    it("Debe retornar con GET el booking correspondiente a un Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .get("/bookings/2EFGH234")
            .set("token", authToken);
        expect(res.body.guest).toEqual("Bob Johnson");
    }));
    it("Debe eliminar con DELETE el booking correspondiente a un Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .delete("/bookings/2EFGH234")
            .set("token", authToken);
        expect(res.body).toBe("The booking was correctly deleted.");
    }));
});
//# sourceMappingURL=routes.test.js.map