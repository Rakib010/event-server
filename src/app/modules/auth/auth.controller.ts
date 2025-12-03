import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import { setAuthCookie } from "../../utils/setCookie"
import AppError from "../../errorHelpers/AppError"
import { authService } from "./auth.service"


// create user
const createUser = catchAsync(async (req: Request, res: Response) => {

    // If form-data with 'data' field
    const bodyData = req.body.data ? JSON.parse(req.body.data) : req.body;

    const payload = {
        ...bodyData,
        profileImage: req.file?.path
    }
    const user = await authService.createUser(payload)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "User Created Successfully",
        data: user
    })
})

// user Login 
const login = catchAsync(async (req: Request, res: Response) => {

    const logInfo = await authService.login(req.body)

    setAuthCookie(res, logInfo)

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Login SuccessFully",
        data: logInfo
    })

})

// Refresh Token create
const refreshAccessToken = catchAsync(async (req: Request, res: Response) => {

    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        throw new AppError(400, "No refresh token received from cookies")
    }

    const tokenInfo = await authService.refreshAccessToken(refreshToken)

    // cookie set 
    setAuthCookie(res, tokenInfo)

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "New Access Token Retrieved Successfully",
        data: tokenInfo
    })
})

//  logout
const accessTokenLogout = catchAsync(async (req: Request, res: Response) => {

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User Log out Successfully",
        data: null
    })
})


export const authController = {
    createUser,
    login,
    refreshAccessToken,
    accessTokenLogout
}