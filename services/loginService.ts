import jwt from "jsonwebtoken";
import 'dotenv/config';

const defaultUser = {
    email: "email@email.com",
    password: "1234",
};

const secret: string = process.env.SECRET_KEY || '';

async function login(email: string, password: string) {
    if (email === defaultUser.email && password === defaultUser.password) return signJWT({ email })
    throw new Error('Wrong email or password!')
}

function signJWT(payload: { email: string }) {
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return { payload, token };
}

function verifyJWT(token: string) {
    const verifiedResult = jwt.verify(token, secret)
    return verifiedResult;
};

const loginService = {
    login,
    signJWT,
    verifyJWT,
};

export default loginService;