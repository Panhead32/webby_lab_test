import { Request } from 'express';
import { IUser } from './user';

export interface AuthenticatedRequest extends Request {
    user: Pick<IUser, 'email' | 'name'>;
    token: string;
} 