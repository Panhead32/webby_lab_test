declare global {
    namespace NodeJS {
        interface ProcessEnv {
            APP_PORT?: string;
            JWT_SECRET?: string;
        }
    }
}

export { }