import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories';
import { SessionRepository } from '../repositories/session.repository';
import { ISessionService } from './types';

export class SessionsService {
    static async createSession(payload: ISessionService.Create.Params): Promise<ISessionService.Create.Response> {
        const user = await UserRepository.findByEmail(payload.email);

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(payload.password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign(
            {
                email: user.email,
                name: user.name,
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 1); // 24 hours from now

        await SessionRepository.create(user.id, token, expiresAt);

        return {
            token,
        };
    }
} 