import { Request, Response } from 'express';
import { SessionsService } from '../services';

export default class SessionsController {
    static async create(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const result = await SessionsService.createSession({ email, password });
            res.json(result);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
} 