import { validationResult } from 'express-validator';
import { Request, Response } from "express";
import { UserService } from '../services';
import jwt from 'jsonwebtoken';

export default class UserController {

    static async createUser(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ status: 0, errors: errors.array() });
        }

        try {
            const { email, name, password, confirmPassword } = req.body;
            const { token } = await UserService.createUser({ email, name, password, confirmPassword });

            res.status(201).json({ token, status: 1 });
        } catch (error) {
            res.status(500).json({ status: 0, message: "An error occurred while creating the user" });
        }

    }

}