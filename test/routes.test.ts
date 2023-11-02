// import { app } from '../app'
// import supertest from 'supertest'
// describe('Prueba de Login Dashboard API', () => {
//     it('Prueba de Login exitoso', async () => {
//         const res = await supertest(app)
//             .post('/login')
//             .send({
//                 email: "email@email.com",
//                 password: "1234",
//             })
//         expect(res.statusCode).toEqual(200)
//         expect(res.body.payload.email).toBe('email@email.com')
//         expect(res.body).toHaveProperty('payload' && 'token')
//     })
//     it('Prueba de Login fallida por password equivocado', async () => {
//         const res = await supertest(app)
//             .post('/login')
//             .send({
//                 email: "admin",
//                 password: "admi",
//             })
//         expect(res.statusCode).toEqual(401)
//         expect(res.body).toEqual({ error: true, messsage: 'Error: Wrong email or password!' })
//     })
//     it('Prueba de ir a Contacts/Rooms/Contact/Users sin auntenticar debe responder status 401', async () => {
//         const res = await supertest(app)
//             .get('/bookings')
//         expect(res.statusCode).toEqual(401)
//         expect(res.body).toEqual('Error: Incorrect Token')
//     })
//     it('Prueba de acceder public API Info', async () => {
//         const res = await supertest(app)
//             .get('/')
//         expect(res.statusCode).toEqual(200)
//         expect(res.body[0].name).toEqual("Hotel Miranda Dashboard API")
//     })
// })

// describe('Pruebas de rooms', () => {
//     let authToken: string;

//     beforeAll(async () => {
//         const res = await supertest(app).post("/login").send({
//             email: "email@email.com",
//             password: "1234",
//         });
//         authToken = res.body.token;
//     });
//     it("Acceder a Rooms si se esta autenticado", async () => {
//         const res = await supertest(app).get("/rooms").set("token", authToken);
//         expect(res.statusCode).toEqual(200);
//     });
//     it('Obtener todos los rooms con GET si se esta autenticado', async () => {
//         const res = await supertest(app).get("/rooms").set("token", authToken);
//         const lastIndex = res.body.length - 1;
//         expect(res.body[0]).toHaveProperty("id" && "amenities");
//         expect(res.body[lastIndex]).toHaveProperty("id" && "amenities");
//     })
//     it("Agregando un nuevo room con POST si se esta autenticado", async () => {

//         const newRoom = {
//             "id": "2EFRD56",
//             "room_photo": "https://i.pinimg.com/originals/56/2c/97/562c97a653e162511371c8bb97286486.jpg",
//             "room_type": "Queen Bed",
//             "amenities": [
//                 { "name": "1/3 Bed Space", "description": "Cozy bed area" },
//                 { "name": "Free Wifi", "description": "Complimentary Wi-Fi" },
//                 { "name": "Air Conditioner", "description": "Climate control" },
//                 { "name": "Television", "description": "Flat-screen TV" },
//                 { "name": "Towels", "description": "Fresh towels provided" },
//                 {
//                     "name": "Coffee Set",
//                     "description": "Coffee and tea making facilities"
//                 }
//             ],
//             "price": 120,
//             "offer_price": false,
//             "discount": 5,
//             "status": "Available"
//         }

//         const res = await supertest(app)
//             .post("/rooms")
//             .set("token", authToken)
//             .send(newRoom);
//         const lastIndex: number = res.body.length - 1;
//         expect(res.body[lastIndex]).toStrictEqual(newRoom);
//     });
//     it("Debe retornar con GET el room correspondiente a un Id", async () => {
//         const res = await supertest(app)
//             .get("/rooms/1ABCD123")
//             .set("token", authToken);

//         expect(res.body.room_type).toEqual("Double Superior");
//     });
//     it("Debe eliminar con DELETE el room correspondiente a un Id", async () => {
//         const res = await supertest(app)
//             .delete("/rooms/1ABCD123")
//             .set("token", authToken);

//         expect(res.body).toBe("The room was correctly deleted.");
//     });
// })

// describe('Pruebas de bookings', () => {
//     let authToken: string;

//     beforeAll(async () => {
//         const res = await supertest(app).post("/login").send({
//             email: "email@email.com",
//             password: "1234",
//         });
//         authToken = res.body.token;
//     });
//     it("Acceder a Contacts si se esta autenticado", async () => {
//         const res = await supertest(app).get("/bookings").set("token", authToken);
//         expect(res.statusCode).toEqual(200);
//     });
//     it('Obtener todos los bookings con GET si se esta autenticado', async () => {
//         const res = await supertest(app).get("/bookings").set("token", authToken);
//         const lastIndex = res.body.length - 1;
//         expect(res.body[0]).toHaveProperty("guest");
//         expect(res.body[lastIndex]).toHaveProperty("guest");
//     })
//     it("Agregando un nuevo booking con POST si se esta autenticado", async () => {

//         const newBooking = {
//             "id": "2EFGH237",
//             "guest": "Rodrigo Martinez",
//             "phone_number": "+1 234-567-8901",
//             "order_date": "2023-10-02",
//             "check_in": "2023-10-11",
//             "check_out": "2023-10-16",
//             "special_request": "I'd like an extra blanket.",
//             "room_type": "Single Bed",
//             "room_number": "101",
//             "status": "Check In",
//             "photos": [
//                 "https://example.com/room_photos/single_bed_1_medium.jpg",
//                 "https://example.com/room_photos/single_bed_2_medium.jpg",
//                 "https://example.com/room_photos/single_bed_3_medium.jpg"
//             ]
//         }

//         const res = await supertest(app)
//             .post("/bookings")
//             .set("token", authToken)
//             .send(newBooking);
//         const lastIndex: number = res.body.length - 1;
//         expect(res.body[lastIndex]).toStrictEqual(newBooking);
//     });
//     it("Debe retornar con GET el booking correspondiente a un Id", async () => {
//         const res = await supertest(app)
//             .get("/bookings/2EFGH234")
//             .set("token", authToken);

//         expect(res.body.guest).toEqual("Bob Johnson");
//     });
//     it("Debe eliminar con DELETE el booking correspondiente a un Id", async () => {
//         const res = await supertest(app)
//             .delete("/bookings/2EFGH234")
//             .set("token", authToken);

//         expect(res.body).toBe("The booking was correctly deleted.");
//     });
// })

// describe('Pruebas de Contacts', () => {
//     let authToken: string;

//     beforeAll(async () => {
//         const res = await supertest(app).post("/login").send({
//             email: "email@email.com",
//             password: "1234",
//         });
//         authToken = res.body.token;
//     });
//     it("Acceder a Contacts si se esta autenticado", async () => {
//         const res = await supertest(app).get("/contacts").set("token", authToken);
//         expect(res.statusCode).toEqual(200);
//     });
//     it('Obtener todos los contacts con GET si se esta autenticado', async () => {
//         const res = await supertest(app).get("/contacts").set("token", authToken);
//         const lastIndex = res.body.length - 1;
//         expect(res.body[0]).toHaveProperty("full_name");
//         expect(res.body[lastIndex]).toHaveProperty("full_name");
//     })
//     it("Agregando un nuevo contact con POST si se esta autenticado", async () => {

//         const newContact = {
//             "id": "50",
//             "full_name": "Soledad Romar",
//             "email": "sol.romar@example.com",
//             "phone_number": "555-123-4567",
//             "subject_of_review": "Wonderful Stay",
//             "review_body": "I had a wonderful stay at this hotel. The staff was friendly and accommodating, and the room was clean and comfortable. The hotel's amenities, including the pool and fitness center, were top-notch. I would definitely recommend it.",
//             "date": "2023-09-25",
//             "dateTime": "09:15 AM",
//             "isArchived": "true"
//         }

//         const res = await supertest(app)
//             .post("/contacts")
//             .set("token", authToken)
//             .send(newContact);
//         const lastIndex: number = res.body.length - 1;
//         expect(res.body[lastIndex]).toStrictEqual(newContact);
//     });
//     it("Debe retornar con GET el contact correspondiente a un Id", async () => {
//         const res = await supertest(app)
//             .get("/contacts/1")
//             .set("token", authToken);

//         expect(res.body.full_name).toEqual("Alice Johnson");
//     });
//     it("Debe eliminar con DELETE el contact correspondiente a un Id", async () => {
//         const res = await supertest(app)
//             .delete("/contacts/1")
//             .set("token", authToken);

//         expect(res.body).toBe("The contact was correctly deleted.");
//     });
// })

// describe('Pruebas de Users', () => {
//     let authToken: string;

//     beforeAll(async () => {
//         const res = await supertest(app).post("/login").send({
//             email: "email@email.com",
//             password: "1234",
//         });
//         authToken = res.body.token;
//     });
//     it("Acceder a users si se esta autenticado", async () => {
//         const res = await supertest(app).get("/users").set("token", authToken);
//         expect(res.statusCode).toEqual(200);
//     });
//     it('Obtener todos los users con GET si se esta autenticado', async () => {
//         const res = await supertest(app).get("/users").set("token", authToken);
//         const lastIndex = res.body.length - 1;
//         expect(res.body[0]).toHaveProperty("full_name");
//         expect(res.body[lastIndex]).toHaveProperty("full_name");
//     })
//     it("Agregando un nuevo user con POST si se esta autenticado", async () => {

//         const newUser = {
//             "employee_id": "1ABCD124",
//             "full_name": "Camilo Doe",
//             "email": "camilo.doe@example.com",
//             "photo": "https://robohash.org/JohnDoe.png?set=any",
//             "start_date": "2020-05-15",
//             "description": "Front Desk Manager",
//             "phone_number": "+1 (123) 456-7890",
//             "status": "active"
//         }

//         const res = await supertest(app)
//             .post("/users")
//             .set("token", authToken)
//             .send(newUser);
//         const lastIndex: number = res.body.length - 1;
//         expect(res.body[lastIndex]).toStrictEqual(newUser);
//     });
//     it("Debe retornar con GET el user correspondiente a un Id", async () => {
//         const res = await supertest(app)
//             .get("/users/1ABCD123")
//             .set("token", authToken);

//         expect(res.body.full_name).toEqual("John Doe");
//     });
//     it("Debe eliminar con DELETE el user correspondiente a un Id", async () => {
//         const res = await supertest(app)
//             .delete("/users/1ABCD123")
//             .set("token", authToken);

//         expect(res.body).toBe("The user was correctly deleted.");
//     });
// })