import { IUser } from '../../types';

export namespace IUserRepository {
    export namespace Create {
        export interface Params {
            email: string;
            name: string;
            password: string;
        };

        export type Response = IUser;
    }
}

