import { Schema, model } from 'mongoose';
import { IUser, Role } from './user.interface';

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    location: { type: String, required: false },
    profileImage: { type: String, required: false },
    bio: { type: String, required: false },
    interests: { type: [String], required: false },
    role: {
        type: String,
        enum: Object.values(Role),
        default: Role.user,
    },
    isActive: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: true
});

export const User = model<IUser>('User', userSchema);
