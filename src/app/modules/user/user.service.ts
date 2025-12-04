import { JwtPayload } from "jsonwebtoken";
import { IUser } from "./user.interface";
import { User } from "./user.model";


const userUpdate = async (
    id: string,
    payload: Partial<IUser>,
    verifiedToken: JwtPayload
) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error("User not found");
    }

    // Authorization check
    if (verifiedToken.userId !== id) {
        throw new Error("Unauthorized to update this user");
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        payload,
        { new: true, runValidators: true }
    );

    return updatedUser;
};

const getAllUsers = async () => {
    const users = await User.find().select("-password");
    return users
}

const getUserById = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    return user
}

const getMe = async (userId: string) => {
    const user = await User.findById(userId).select("-password")
    return user
}

export const userService = {
    userUpdate,
    getAllUsers,
    getUserById,
    getMe
}