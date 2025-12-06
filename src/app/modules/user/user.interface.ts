export enum Role {
    admin = "admin",
    host = "host",
    user = "user",
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    location?: string;
    profileImage?: string;
    bio?: string;
    interests?: string[];
    role: Role;
    isActive?: boolean;
    createdAt?: Date;
}
