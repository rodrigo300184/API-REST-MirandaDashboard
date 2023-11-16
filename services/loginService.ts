import jwt from "jsonwebtoken";
import 'dotenv/config';
import { Users } from "../models/usersModel";
import bcrypt from 'bcryptjs';

const secret: string = process.env.SECRET_KEY || '';

async function login(email: string, password: string) {
    const result = await Users.findOne({ email: email });
    if (!result) throw new Error('User or password incorrect')
    const passwordCheck = await bcrypt.compare(password, result.password || '')
    if(!passwordCheck) throw new Error('User or password incorrect')
    return signJWT({ email });
};

function signJWT(payload: { email: string }) {
    const token = jwt.sign(payload, secret);
    return { payload, token };
};

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