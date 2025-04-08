import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SessionRepository } from '../repositories/session.repository';
import { AuthenticatedRequest } from '../types/request';
import { IUser } from '../types/user';

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error('No token provided');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as jwt.JwtPayload;

        const session = await SessionRepository.findByToken(token);

        if (!session) {
            throw new Error('Invalid or expired session');
        }

        req.user = decoded as Pick<IUser, 'email' | 'name'>;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
}; 