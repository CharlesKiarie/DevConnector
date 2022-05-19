import mongoose, { ObjectId } from "mongoose";
export interface IUser extends mongoose.Document {
    id?: ObjectId;
    name: string;
    email: string;
    password: string;
    avatar: string;
    date: Date;
    iat: Date;
    exp: Date;
}

export interface IErrors {
    name?: string;
    email?: string;
    password?: string;
    password2?: string;
}

export interface IDataInputs extends IUser {
    password2?: string;
}