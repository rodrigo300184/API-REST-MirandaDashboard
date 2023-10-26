import { Request, Response, Router } from "express";
import { infoService } from "../services/infoService";

const infoController = Router();

infoController.get('/', async (_req: Request, res: Response) => {
    try {
        const info = await infoService.get();
        res.send(info);
    } catch (error) {
        return res.status(444).json(`${error}`);
    }
})

export default infoController;