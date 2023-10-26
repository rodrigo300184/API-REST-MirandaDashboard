import {app} from '../app'
import supertest from 'supertest'
describe('Prueba de Login exitoso', () => {
    it('should create a new post', async () => {
        const res = await supertest(app)
            .post('/login')
            .send({
                user: "admin",
                password: "admin",
            })
        expect(res.statusCode).toEqual(200)
        //expect(res.body).toHaveProperty('post')
    })
})