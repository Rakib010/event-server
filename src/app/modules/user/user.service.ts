import { IUser } from "./user.interface";
import { User } from "./user.model";


const userUpdate = async (
    userId: string,
    payload: Partial<IUser>,
    verifiedToken: { userId: string }
) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    console.log("Payload for update:", payload);
    console.log("Verified Token User ID:", verifiedToken.userId);
    console.log("Target User ID:", userId);
    // Authorization check
    if (verifiedToken.userId !== userId) {
        throw new Error("Unauthorized to update this user");
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
        userId,
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