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

// Is this the best way to solve it?
export interface IErrors {
    name?: string;
    email?: string;
    password?: string;
    password2?: string;
    noprofile?: string;
    handle?: string;
    title?: string;
    status?: string;
    skills?: string;
    url?: string;
    company?: string;
    school?: string;
    degree?: string;
    fieldofstudy?: string;
    from?: string;
    posts?: string;
    text?: string;
}

export interface IDataInputs extends IUser {
    password2?: string;
    youtube: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    instagram: string;
    text: string;
}

export interface IProfile extends mongoose.Document {
    id?: ObjectId;
    user: ObjectId;
    handle: string;
    company: string;
    website: string;
    location: string;
    status: string;
    skills: string[];
    bio: string;
    githubusername: string;
    experience?: Array<Experience>;
    education?: Array<Education>;
    social: Social;
    date?: Date;
}

export interface IPost extends mongoose.Document {
    id?: ObjectId;
    user: ObjectId;
    text: string;
    name: string;
    avatar: string;
    likes: Array<User>;
    comments: Array<Comment>;
    date: Date;
}

export interface Comment {
    id?: ObjectId;
    user: ObjectId;
    text: string;
    name: string;
    avatar: string;
    date: Date;
}

export interface User {
    user: ObjectId;
}

export interface Experience {
    id?: mongoose.Types.ObjectId;
    title: string;
    company: string;
    location: string;
    from: string;
    to: string;
    current: boolean;
    description: string;
}

export interface Education {
    id?: ObjectId;
    school: string;
    degree: string;
    fieldofstudy: string;
    from: string;
    to: string;
    current: boolean;
    description: string;
}

export interface Social {
    youtube: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    instagram: string;
} 