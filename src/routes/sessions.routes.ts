import { check } from 'express-validator';
import { Router } from 'express';
import { SessionsController } from '../controllers';


class SessionsRoutes {
    router = Router();

    constructor() {
        this.intializeRoutes();
    }

    intializeRoutes() {
        this.router.post('/', [
            check('email', 'Email is required').not().isEmpty(),
            check('password', 'Password is required').not().isEmpty()
        ], SessionsController.create);
    }
}

export default new SessionsRoutes().router;
