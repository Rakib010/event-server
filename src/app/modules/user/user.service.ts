import { User } from "./user.model";


const userUpdate = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    return user
}

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