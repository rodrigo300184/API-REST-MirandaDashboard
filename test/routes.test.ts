import { app } from '../app'
import supertest from 'supertest'
import { BookingInterface } from '../models/bookingsModel';
describe('Prueba de Login Dashboard API', () => {
    it('Prueba de Login exitoso', async () => {
        const res = await supertest(app)
            .post('/login')
            .send({
                email: "email@email.com",
                password: "1234",
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.payload.email).toBe('email@email.com')
        expect(res.body).toHaveProperty('payload' && 'token')
    })
    it('Prueba de Login fallida por password equivocado', async () => {
        const res = await supertest(app)
            .post('/login')
            .send({
                email: "admin",
                password: "admi",
            })
        expect(res.statusCode).toEqual(401)
        expect(res.body).toEqual({ error: true, messsage: 'Error: Wrong email or password!' })
    })
    it('Prueba de ir a Bookings/Rooms/Contact/Users sin auntenticar debe responder status 401', async () => {
        const res = await supertest(app)
            .get('/bookings')
        expect(res.statusCode).toEqual(401)
        expect(res.body).toEqual('Error: Incorrect Token')
    })
    it('Prueba de acceder public API Info', async () => {
        const res = await supertest(app)
            .get('/')
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].name).toEqual("Hotel Miranda Dashboard API")
    })
})

describe('Pruebas de bookings', () => {
    let authToken: string;

    beforeAll(async () => {
        const res = await supertest(app).post("/login").send({
            email: "email@email.com",
            password: "1234",
        });
        authToken = res.body.token;
    });
    it("Acceder a Bookings si se esta autenticado", async () => {
        const res = await supertest(app).get("/bookings").set("token", authToken);
        expect(res.statusCode).toEqual(200);
    });
    it('Obtener todos los bookings con GET si se esta autenticado', async () => {
        const res = await supertest(app).get("/bookings").set("token", authToken);
        expect(res.body[0]).toHaveProperty("guest");
    })
    it("Agregando un nuevo booking con POST si se esta autenticado", async () => {

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
        }

        const res = await supertest(app)
            .post("/bookings")
            .set("token", authToken)
            .send(newBooking);
        const lastIndex: number = res.body.length - 1;
        expect(res.body[lastIndex]).toStrictEqual(newBooking);
    });
    it("Debe retornar con GET el booking correspondiente a un Id", async () => {
        const res = await supertest(app)
          .get("/bookings/2EFGH234")
          .set("token", authToken);
    
        expect(res.body.guest).toEqual("Bob Johnson");
      });
      it("Debe eliminar con DELETE el booking correspondiente a un Id", async () => {
        const res = await supertest(app)
          .delete("/bookings/2EFGH234")
          .set("token", authToken);
    
        expect(res.body).toBe("The booking was correctly deleted.");
      });
})