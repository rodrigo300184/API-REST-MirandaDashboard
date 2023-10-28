import authService from "../services/loginService";
import { Request, Response, Router } from "express";

export const loginController = Router();

loginController.post("/", async (req: Request<{ email: string; password: string }>, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
      res.status(401).json({ error: true, messsage: `${error}` })
    }
}
);
