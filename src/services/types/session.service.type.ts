export namespace ISessionService {
    export namespace Create {
        export interface Params {
            email: string;
            password: string;
        }

        export interface Response {
            token: string;
        }
    }
}