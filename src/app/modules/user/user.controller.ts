import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const userUpdate = catchAsync(async (req: Request, res: Response) => {
    const user = await userService.userUpdate(req.params.id);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User Created Successfully",
        data: user
    })
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await userService.getAllUsers()

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "All User Retrieved Successfully",
        data: users,

    })

})

const getUserById = catchAsync(async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Single User Retrieved Successfully",
        data: user
    })
})


const getMe = catchAsync(async (req: Request, res: Response,) => {
    const decodedToken = req.user as JwtPayload
    console.log(decodedToken);
    const users = await userService.getMe(decodedToken.userId)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User Retrieved Successfully",
        data: users,

    })
})




export const userController = {
    userUpdate,
    getAllUsers,
    getUserById,
    getMe
}