import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const userUpdate = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const verifiedToken = req.user as JwtPayload;

    // If form-data with 'data' field
    const bodyData = req.body.data ? JSON.parse(req.body.data) : req.body;

    const payload = {
        ...bodyData,
        profileImage: req.file?.path
    }

    const user = await userService.userUpdate(id, payload, verifiedToken as JwtPayload);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User Updated Successfully",
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
    const decodedToken = req.user as JwtPayload;
    //console.log(decodedToken);
    const users = await userService.getMe(decodedToken.userId)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User Retrieved Successfully",
        data: users,

    })
})

const deleteUser = catchAsync(async (req: Request, res: Response,) => {

    const users = await userService.deleteUser(req.params.id)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User Deleted Successfully",
        data: users,

    })
})

const requestHost = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    const newRequest = await userService.requestHost(userId);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Host request sent successfully",
        data: newRequest,
    });
});

const getRoleRequests = catchAsync(async (req: Request, res: Response) => {

    const newRequest = await userService.getRoleRequests();

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Pending role requests fetched",
        data: newRequest,
    });
});

const updateRoleRequest = catchAsync(async (req: Request, res: Response) => {
    const requestId = req.params.id;
    const { status } = req.body;

    const roleRequest = await userService.updateUserRole(requestId, status);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: `Request ${status} successfully`,
        data: roleRequest,
    });
});






export const userController = {
    userUpdate,
    getAllUsers,
    getUserById,
    getMe,
    deleteUser,
    requestHost,
    getRoleRequests,
    updateRoleRequest
}