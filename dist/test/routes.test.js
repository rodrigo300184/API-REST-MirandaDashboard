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
    it('Prueba de ir a Contacts/Rooms/Contact/Users sin auntenticar debe responder status 401', () => __awaiter(void 0, void 0, void 0, function* () {
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
describe('Pruebas de rooms', () => {
    let authToken;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).post("/login").send({
            email: "email@email.com",
            password: "1234",
        });
        authToken = res.body.token;
    }));
    it("Acceder a Rooms si se esta autenticado", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/rooms").set("token", authToken);
        expect(res.statusCode).toEqual(200);
    }));
    it('Obtener todos los rooms con GET si se esta autenticado', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/rooms").set("token", authToken);
        const lastIndex = res.body.length - 1;
        expect(res.body[0]).toHaveProperty("id" && "amenities");
        expect(res.body[lastIndex]).toHaveProperty("id" && "amenities");
    }));
    it("Agregando un nuevo room con POST si se esta autenticado", () => __awaiter(void 0, void 0, void 0, function* () {
        const newRoom = {
            "id": "2EFRD56",
            "room_photo": "https://i.pinimg.com/originals/56/2c/97/562c97a653e162511371c8bb97286486.jpg",
            "room_type": "Queen Bed",
            "amenities": [
                { "name": "1/3 Bed Space", "description": "Cozy bed area" },
                { "name": "Free Wifi", "description": "Complimentary Wi-Fi" },
                { "name": "Air Conditioner", "description": "Climate control" },
                { "name": "Television", "description": "Flat-screen TV" },
                { "name": "Towels", "description": "Fresh towels provided" },
                {
                    "name": "Coffee Set",
                    "description": "Coffee and tea making facilities"
                }
            ],
            "price": 120,
            "offer_price": false,
            "discount": 5,
            "status": "Available"
        };
        const res = yield (0, supertest_1.default)(app_1.app)
            .post("/rooms")
            .set("token", authToken)
            .send(newRoom);
        const lastIndex = res.body.length - 1;
        expect(res.body[lastIndex]).toStrictEqual(newRoom);
    }));
    it("Debe retornar con GET el room correspondiente a un Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .get("/rooms/1ABCD123")
            .set("token", authToken);
        expect(res.body.room_type).toEqual("Double Superior");
    }));
    it("Debe eliminar con DELETE el room correspondiente a un Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .delete("/rooms/1ABCD123")
            .set("token", authToken);
        expect(res.body).toBe("The room was correctly deleted.");
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
    it("Acceder a Contacts si se esta autenticado", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/bookings").set("token", authToken);
        expect(res.statusCode).toEqual(200);
    }));
    it('Obtener todos los bookings con GET si se esta autenticado', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/bookings").set("token", authToken);
        const lastIndex = res.body.length - 1;
        expect(res.body[0]).toHaveProperty("guest");
        expect(res.body[lastIndex]).toHaveProperty("guest");
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
describe('Pruebas de Contacts', () => {
    let authToken;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).post("/login").send({
            email: "email@email.com",
            password: "1234",
        });
        authToken = res.body.token;
    }));
    it("Acceder a Contacts si se esta autenticado", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/contacts").set("token", authToken);
        expect(res.statusCode).toEqual(200);
    }));
    it('Obtener todos los contacts con GET si se esta autenticado', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/contacts").set("token", authToken);
        const lastIndex = res.body.length - 1;
        expect(res.body[0]).toHaveProperty("full_name");
        expect(res.body[lastIndex]).toHaveProperty("full_name");
    }));
    it("Agregando un nuevo contact con POST si se esta autenticado", () => __awaiter(void 0, void 0, void 0, function* () {
        const newContact = {
            "id": "50",
            "full_name": "Soledad Romar",
            "email": "sol.romar@example.com",
            "phone_number": "555-123-4567",
            "subject_of_review": "Wonderful Stay",
            "review_body": "I had a wonderful stay at this hotel. The staff was friendly and accommodating, and the room was clean and comfortable. The hotel's amenities, including the pool and fitness center, were top-notch. I would definitely recommend it.",
            "date": "2023-09-25",
            "dateTime": "09:15 AM",
            "isArchived": "true"
        };
        const res = yield (0, supertest_1.default)(app_1.app)
            .post("/contacts")
            .set("token", authToken)
            .send(newContact);
        const lastIndex = res.body.length - 1;
        expect(res.body[lastIndex]).toStrictEqual(newContact);
    }));
    it("Debe retornar con GET el contact correspondiente a un Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .get("/contacts/1")
            .set("token", authToken);
        expect(res.body.full_name).toEqual("Alice Johnson");
    }));
    it("Debe eliminar con DELETE el contact correspondiente a un Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .delete("/contacts/1")
            .set("token", authToken);
        expect(res.body).toBe("The contact was correctly deleted.");
    }));
});
describe('Pruebas de Users', () => {
    let authToken;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).post("/login").send({
            email: "email@email.com",
            password: "1234",
        });
        authToken = res.body.token;
    }));
    it("Acceder a users si se esta autenticado", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/users").set("token", authToken);
        expect(res.statusCode).toEqual(200);
    }));
    it('Obtener todos los users con GET si se esta autenticado', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/users").set("token", authToken);
        const lastIndex = res.body.length - 1;
        expect(res.body[0]).toHaveProperty("full_name");
        expect(res.body[lastIndex]).toHaveProperty("full_name");
    }));
    it("Agregando un nuevo user con POST si se esta autenticado", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            "employee_id": "1ABCD124",
            "full_name": "Camilo Doe",
            "email": "camilo.doe@example.com",
            "photo": "https://robohash.org/JohnDoe.png?set=any",
            "start_date": "2020-05-15",
            "description": "Front Desk Manager",
            "phone_number": "+1 (123) 456-7890",
            "status": "active"
        };
        const res = yield (0, supertest_1.default)(app_1.app)
            .post("/users")
            .set("token", authToken)
            .send(newUser);
        const lastIndex = res.body.length - 1;
        expect(res.body[lastIndex]).toStrictEqual(newUser);
    }));
    it("Debe retornar con GET el user correspondiente a un Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .get("/users/1ABCD123")
            .set("token", authToken);
        expect(res.body.full_name).toEqual("John Doe");
    }));
    it("Debe eliminar con DELETE el user correspondiente a un Id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .delete("/users/1ABCD123")
            .set("token", authToken);
        expect(res.body).toBe("The user was correctly deleted.");
    }));
});
//# sourceMappingURL=routes.test.js.map