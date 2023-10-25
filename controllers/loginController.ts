import authService from "../services/loginService";
import { Request, Response, Router } from "express";

export const loginController = Router();

loginController.post("/", async (req: Request<{ user: string; password: string }>, res: Response) => {
    try{
    const userName = req.body.user;
    const password = req.body.password;
    const result = await authService.login(userName,password);
    res.send(result);
} catch(error) {
    res.status(500).json({error: true, messsage: 'Login fail'})
}

  }
);
