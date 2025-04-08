import { check } from 'express-validator';
import { Router } from "express";
import { UserController } from "../controllers";

class UserRoutes {
    router = Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post("/", [
            check("email", "Email is required").not().isEmpty(),
            check("name", "Name is required").not().isEmpty(),
            check("password", "Password is required").not().isEmpty(),
            check("confirmPassword", "Confirm Password is required").not().isEmpty()
        ], UserController.createUser);
    }
}

export default new UserRoutes().router;
