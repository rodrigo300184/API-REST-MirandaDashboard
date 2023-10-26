import {app} from '../app'
import supertest from 'supertest'
describe('Prueba de Login Dashboard API', () => {
    it('Prueba de Login exitoso', async () => {
        const res = await supertest(app)
            .post('/login')
            .send({
                user: "admin",
                password: "admin",
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body.payload.user).toBe('admin')
        expect(res.body).toHaveProperty('payload' && 'token')
    })
    it('Prueba de Login fallida por password equivocado', async () => {
        const res = await supertest(app)
            .post('/login')
            .send({
                user: "admin",
                password: "admi",
            })
        expect(res.statusCode).toEqual(400)
        expect(res.body).toEqual({error: true, messsage: 'Error: Wrong user or password!'})
    })
    it('Prueba de ir a Bookings/Rooms/Contact/Users sin auntenticar debe responder status 404', async () => {
        const res = await supertest(app)
            .get('/bookings')
        expect(res.statusCode).toEqual(401)
        expect(res.body).toEqual('Error: Incorrect Token')
    })
})