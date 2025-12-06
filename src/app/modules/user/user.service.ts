import { JwtPayload } from "jsonwebtoken";
import { IUser, Role } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errorHelpers/AppError";
import { RoleRequest } from "./roleRequest.interface";


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

const deleteUser = async (userId: string) => {
    const user = await User.findByIdAndDelete(userId)
    return user
}

const requestHost = async (userId: string) => {
    const existingRequest = await RoleRequest.findOne({ user: userId, status: "pending" });
    if (existingRequest) {
        throw new AppError(400, "You already have a pending request");
    }

    const newRequest = await RoleRequest.create({
        user: userId,
        requestedRole: "host",
        status: "pending",
    });

    return newRequest;
}

const getRoleRequests = async () => {
    const requests = await RoleRequest.find({ status: "pending" }).populate('user', '-password');
    return requests;
}


export const updateUserRole = async (requestId: string, statusUpdate: "approved" | "rejected") => {
    const roleRequest = await RoleRequest.findById(requestId);
    if (!roleRequest) throw new AppError(404, "Role request not found");

    if (!["approved", "rejected"].includes(statusUpdate)) {
        throw new AppError(400, "Invalid status");
    }

    // Update the role request status
    roleRequest.status = statusUpdate;
    await roleRequest.save();

    //  If approved, update user role to host
    if (statusUpdate === "approved") {
        const user = await User.findById(roleRequest.user);
        if (!user) throw new AppError(404, "User not found");

        user.role = Role.host;
        await user.save();
    }

    return roleRequest;
};



export const userService = {
    userUpdate,
    getAllUsers,
    getUserById,
    getMe,
    deleteUser,
    requestHost,
    getRoleRequests,
    updateUserRole

}