declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV?: 'development' | 'production';
            PWD: string;
            PORT?: string;
            DATABASE: string;
            DATABASE_STRING: string;
            SECRET_KEY: string;
        }
    }
}

export {}