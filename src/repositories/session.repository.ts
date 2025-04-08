import Session from '../models/session.model';
import { Op } from 'sequelize';

export class SessionRepository {
    static async create(userId: number, token: string, expiresAt: Date): Promise<Session> {
        return Session.create({
            userId,
            token,
            expiresAt,
            isActive: true
        });
    }

    static async findByToken(token: string): Promise<Session | null> {
        return Session.findOne({
            where: {
                token,
                isActive: true,
                expiresAt: {
                    [Op.gt]: new Date()
                }
            }
        });
    }

    static async deactivate(token: string): Promise<void> {
        await Session.update(
            { isActive: false },
            { where: { token } }
        );
    }
} 