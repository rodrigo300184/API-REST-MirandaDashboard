import { Request, Response, Router } from "express";
import { infoService } from "../services/infoService";

export const infoController = Router();

infoController.get('/', async (_req: Request, res: Response) => {
    try {
        const info = await infoService.get();
        res.json(info);
    } catch (error) {
        return res.status(444).json(`${error}`);
    }
})
