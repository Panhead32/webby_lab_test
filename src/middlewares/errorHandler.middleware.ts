import { Request, Response, NextFunction } from "express";

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
    });
}