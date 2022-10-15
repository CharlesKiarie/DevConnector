export interface IUser {
    name?: string;
    email: string;
    password: string;
    password2?: string;
}

export interface IErrors {
    name: string;
    email: string;
    password: string;
    password2: string;
}