import { envVars } from "../../config/env"
import AppError from "../../errorHelpers/AppError"
import { createAccessTokenWithRefreshToken, createUserToken } from "../../utils/userToken"
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model"
import bcrypt from "bcryptjs"

// create user
const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    if (!email) {
        throw new AppError(400, "Email is required");
    }

    if (!password) {
        throw new AppError(400, "Password is required");
    }

    const isUserExits = await User.findOne({ email });
    if (isUserExits) {
        throw new AppError(401, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(
        password,
        Number(envVars.BCRYPT_SALT_ROUND)
    );

    const user = await User.create({
        email,
        password: hashedPassword,
        ...rest,
    });

    return user;
};


// user Login
const login = async (payload: Partial<IUser>) => {

    const { email, password } = payload

    const user = await User.findOne({ email })
    if (!user) {
        throw new AppError(401, "Email does not found")
    }

    const isPasswordMatch = bcrypt.compare(password as string, user.password)
    if (!isPasswordMatch) {
        throw new AppError(400, "Incorrect Password")
    }

    // user token 
    const userToken = createUserToken(user)

    return {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: user
    }
}

// Refresh Access Token
const refreshAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createAccessTokenWithRefreshToken(refreshToken)

    return {
        accessToken: newAccessToken
    }
}

export const authService = {
    createUser,
    login,
    refreshAccessToken
}