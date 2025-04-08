import bcrypt from 'bcrypt';
import { IUserService } from './types';
import { UserRepository } from '../repositories';
import { SessionRepository } from '../repositories/session.repository';
import { IUserRepository } from '../repositories/types';
import jwt from 'jsonwebtoken';

export class UserService {
    static async createUser({ confirmPassword, email, name, password }: IUserService.Create.Params): Promise<IUserService.Create.Response> {
        const isPasswordMatch = password === confirmPassword;

        if (!isPasswordMatch) {
            throw new Error("Password do not match");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData: IUserRepository.Create.Params = {
            email,
            name,
            password: hashedPassword
        }

        const user = await UserRepository.create(userData);

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