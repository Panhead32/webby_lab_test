import { User } from '../models';
import { IUserRepository } from './types';
import { CreationAttributes } from 'sequelize';

export default class UserRepository {
    static async create(userData: IUserRepository.Create.Params): Promise<IUserRepository.Create.Response> {
        const userCreationData: CreationAttributes<User> = {
            email: userData.email,
            name: userData.name,
            password: userData.password
        };
        return User.create(userCreationData);
    }

    static async findByEmail(email: string): Promise<User | null> {
        return User.findOne({ where: { email } });
    }
}