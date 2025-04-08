export namespace IUserService {
    export namespace Create {
        export interface Params {
            email: string;
            name: string;
            password: string;
            confirmPassword: string;
        };

        export interface Response {
            token: string;
        }
    }
}